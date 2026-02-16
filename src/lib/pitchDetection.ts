// Pitch detection using YIN algorithm
// Reference: "YIN, a fundamental frequency estimator for speech and music"
// by Alain de Cheveigné and Hideki Kawahara

// Polyfill for Safari/older iOS
const AudioCtx =
  typeof window !== "undefined"
    ? window.AudioContext ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitAudioContext
    : null;

export class PitchDetector {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private gainNode: GainNode | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private isRunning = false;
  private isIOS = false;
  private buffer: Float32Array<ArrayBuffer> = new Float32Array(0);
  private sampleRate = 44100;

  async start(): Promise<void> {
    if (this.isRunning) return;

    if (!AudioCtx) {
      throw new Error("Web Audio API is not supported in this browser.");
    }

    this.isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent);

    try {
      // Step 1: Request microphone access.
      // On iOS, let the browser use its native audio processing (AGC, etc.)
      // since iOS mics are quieter and the built-in AGC helps normalize levels.
      // On desktop, disable processing for a cleaner signal.
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: this.isIOS
            ? {
                echoCancellation: true,
                noiseSuppression: false,
                autoGainControl: true,
              }
            : {
                echoCancellation: { ideal: false },
                noiseSuppression: { ideal: false },
                autoGainControl: { ideal: false },
              },
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      this.stream = stream;

      // Step 2: Create AudioContext and resume (required on iOS).
      this.audioContext = new AudioCtx();

      if (this.audioContext.state === "suspended") {
        await this.audioContext.resume();
      }

      this.sampleRate = this.audioContext.sampleRate;

      // Step 3: Set up the analyser node.
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 8192;
      this.analyser.smoothingTimeConstant = 0.0;
      this.analyser.minDecibels = -100;
      this.analyser.maxDecibels = -10;

      // Step 4: Add a gain node to boost the mic signal.
      // iOS microphones deliver a much quieter signal than desktop mics,
      // so we amplify before feeding the analyser.
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = this.isIOS ? 4.0 : 1.5;

      // Step 5: Connect: mic → gain → analyser
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.analyser);

      this.buffer = new Float32Array(
        this.analyser.fftSize
      ) as Float32Array<ArrayBuffer>;
      this.isRunning = true;
    } catch (err) {
      this.cleanUp();
      console.error("Failed to start pitch detection:", err);
      throw err;
    }
  }

  stop(): void {
    this.isRunning = false;
    this.cleanUp();
  }

  private cleanUp(): void {
    if (this.source) {
      try {
        this.source.disconnect();
      } catch {
        /* already disconnected */
      }
      this.source = null;
    }
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        /* already disconnected */
      }
      this.gainNode = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      try {
        this.audioContext.close();
      } catch {
        /* already closed */
      }
      this.audioContext = null;
    }
    this.analyser = null;
  }

  getFrequency(): number | null {
    if (!this.isRunning || !this.analyser || !this.audioContext) return null;

    // iOS Safari: if AudioContext got interrupted (e.g. phone call, lock screen)
    // try to resume it silently
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      return null;
    }

    this.analyser.getFloatTimeDomainData(this.buffer);

    // Check if signal is loud enough
    let rms = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      rms += this.buffer[i] * this.buffer[i];
    }
    rms = Math.sqrt(rms / this.buffer.length);

    // Lower threshold on iOS since mic signal is weaker even after gain boost
    const silenceThreshold = this.isIOS ? 0.003 : 0.006;
    if (rms < silenceThreshold) return null;

    return this.yinDetect(this.buffer, this.sampleRate);
  }

  getVolume(): number {
    if (!this.isRunning || !this.analyser) return 0;

    this.analyser.getFloatTimeDomainData(this.buffer);

    let rms = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      rms += this.buffer[i] * this.buffer[i];
    }
    rms = Math.sqrt(rms / this.buffer.length);

    return Math.min(1, rms * 10);
  }

  get running(): boolean {
    return this.isRunning;
  }

  /**
   * YIN pitch detection algorithm with octave correction.
   * Handles the full harmonica range (holes 1-10) reliably.
   */
  private yinDetect(
    buffer: Float32Array<ArrayBuffer>,
    sampleRate: number
  ): number | null {
    const bufferSize = buffer.length;
    const halfSize = Math.floor(bufferSize / 2);

    // Frequency range for harmonica: ~180 Hz to ~2200 Hz
    const tauMin = Math.max(2, Math.floor(sampleRate / 2200));
    const tauMax = Math.min(halfSize - 1, Math.floor(sampleRate / 180));
    // More lenient threshold on iOS to catch weaker signals
    const threshold = this.isIOS ? 0.3 : 0.2;

    // Step 1: Compute squared difference function for ALL taus from 1..tauMax
    const diffBuf = new Float32Array(tauMax + 1);
    for (let tau = 1; tau <= tauMax; tau++) {
      let sum = 0;
      for (let j = 0; j < halfSize; j++) {
        const delta = buffer[j] - buffer[j + tau];
        sum += delta * delta;
      }
      diffBuf[tau] = sum;
    }

    // Step 2: Cumulative mean normalized difference function
    const yinBuffer = new Float32Array(tauMax + 1);
    yinBuffer[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau <= tauMax; tau++) {
      runningSum += diffBuf[tau];
      if (runningSum === 0) {
        yinBuffer[tau] = 1;
      } else {
        yinBuffer[tau] = (diffBuf[tau] * tau) / runningSum;
      }
    }

    // Step 3: Collect ALL local minima that dip below threshold
    const candidates: { tau: number; value: number }[] = [];
    for (let tau = tauMin; tau <= tauMax; tau++) {
      if (yinBuffer[tau] < threshold) {
        while (tau + 1 <= tauMax && yinBuffer[tau + 1] < yinBuffer[tau]) {
          tau++;
        }
        candidates.push({ tau, value: yinBuffer[tau] });
      }
    }

    // Fallback: if nothing crossed threshold, use global minimum
    if (candidates.length === 0) {
      let minVal = Infinity;
      let minTau = tauMin;
      for (let tau = tauMin; tau <= tauMax; tau++) {
        if (yinBuffer[tau] < minVal) {
          minVal = yinBuffer[tau];
          minTau = tau;
        }
      }
      if (minVal > (this.isIOS ? 0.65 : 0.5)) return null;
      candidates.push({ tau: minTau, value: minVal });
    }

    // Step 4: Prefer shortest tau (highest frequency) for octave correction
    let bestCandidate = candidates[0];
    const absoluteBest = candidates.reduce((a, b) =>
      b.value < a.value ? b : a
    );

    if (bestCandidate.value < absoluteBest.value + 0.1) {
      // Already the shortest, keep it
    } else {
      bestCandidate = absoluteBest;
    }

    // Check for octave-down errors
    for (const c of candidates) {
      const ratio = bestCandidate.tau / c.tau;
      if (
        ratio > 1.8 &&
        ratio < 2.2 &&
        c.value < bestCandidate.value + 0.15
      ) {
        bestCandidate = c;
        break;
      }
    }

    const bestTau = bestCandidate.tau;
    if (bestTau < tauMin) return null;

    // Step 5: Parabolic interpolation for sub-sample accuracy
    const tauEstimate = this.parabolicInterpolation(
      yinBuffer,
      bestTau,
      tauMax
    );

    const frequency = sampleRate / tauEstimate;

    if (frequency < 180 || frequency > 2200) return null;

    return frequency;
  }

  /**
   * Parabolic interpolation around a minimum to get sub-sample accuracy.
   */
  private parabolicInterpolation(
    yinBuffer: Float32Array,
    tau: number,
    tauMax: number
  ): number {
    if (tau <= 0 || tau >= tauMax) return tau;

    const s0 = yinBuffer[tau - 1];
    const s1 = yinBuffer[tau];
    const s2 = yinBuffer[tau + 1];

    const adjustment = (s2 - s0) / (2 * (2 * s1 - s2 - s0));

    if (Math.abs(adjustment) < 1) {
      return tau + adjustment;
    }

    return tau;
  }
}
