// Pitch detection using YIN algorithm
// Reference: "YIN, a fundamental frequency estimator for speech and music"
// by Alain de Cheveigné and Hideki Kawahara
export class PitchDetector {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private isRunning = false;
  private buffer: Float32Array<ArrayBuffer> = new Float32Array(0);
  private sampleRate = 44100;

  async start(): Promise<void> {
    if (this.isRunning) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      this.audioContext = new AudioContext();
      this.sampleRate = this.audioContext.sampleRate;
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 8192;
      this.analyser.smoothingTimeConstant = 0.0;

      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.source.connect(this.analyser);

      this.buffer = new Float32Array(this.analyser.fftSize) as Float32Array<ArrayBuffer>;
      this.isRunning = true;
    } catch (err) {
      console.error("Failed to start pitch detection:", err);
      throw err;
    }
  }

  stop(): void {
    this.isRunning = false;
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    this.analyser = null;
  }

  getFrequency(): number | null {
    if (!this.isRunning || !this.analyser) return null;

    this.analyser.getFloatTimeDomainData(this.buffer);

    // Check if signal is loud enough
    let rms = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      rms += this.buffer[i] * this.buffer[i];
    }
    rms = Math.sqrt(rms / this.buffer.length);

    if (rms < 0.008) return null;

    return this.yinDetect(this.buffer, this.sampleRate);
  }

  getVolume(): number {
    if (!this.isRunning || !this.analyser) return 0;

    const buf = new Float32Array(this.analyser.fftSize) as Float32Array<ArrayBuffer>;
    this.analyser.getFloatTimeDomainData(buf);

    let rms = 0;
    for (let i = 0; i < buf.length; i++) {
      rms += buf[i] * buf[i];
    }
    rms = Math.sqrt(rms / buf.length);

    return Math.min(1, rms * 10);
  }

  get running(): boolean {
    return this.isRunning;
  }

  /**
   * YIN pitch detection algorithm with octave correction.
   * Handles the full harmonica range (holes 1-10) reliably.
   */
  private yinDetect(buffer: Float32Array<ArrayBuffer>, sampleRate: number): number | null {
    const bufferSize = buffer.length;
    const halfSize = Math.floor(bufferSize / 2);

    // Frequency range for harmonica: ~180 Hz to ~2200 Hz
    const tauMin = Math.max(2, Math.floor(sampleRate / 2200));
    const tauMax = Math.min(halfSize - 1, Math.floor(sampleRate / 180));
    const threshold = 0.2;

    // Step 1: Compute squared difference function for ALL taus from 1..tauMax
    // so the cumulative normalization in Step 2 is accurate even at small tau.
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
    // (not just the first one). This allows octave correction in Step 5.
    const candidates: { tau: number; value: number }[] = [];
    for (let tau = tauMin; tau <= tauMax; tau++) {
      if (yinBuffer[tau] < threshold) {
        // Walk to the local minimum
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
      if (minVal > 0.5) return null;
      candidates.push({ tau: minTau, value: minVal });
    }

    // Step 4: Among candidates, pick the best.
    // Prefer the SHORTEST tau (highest frequency) if its YIN value is
    // within a tolerance of the absolute best, because octave errors
    // always produce a candidate at 2x the correct tau.
    let bestCandidate = candidates[0];
    const absoluteBest = candidates.reduce((a, b) =>
      b.value < a.value ? b : a
    );

    // If the first (shortest tau) candidate is reasonably close
    // to the absolute best value, prefer it (octave correction).
    if (bestCandidate.value < absoluteBest.value + 0.1) {
      // Already the shortest, keep it
    } else {
      bestCandidate = absoluteBest;
    }

    // Also check: if a candidate at ~half the bestCandidate's tau exists,
    // prefer it (catches octave-down errors from strong harmonics).
    for (const c of candidates) {
      const ratio = bestCandidate.tau / c.tau;
      if (ratio > 1.8 && ratio < 2.2 && c.value < bestCandidate.value + 0.15) {
        bestCandidate = c;
        break;
      }
    }

    const bestTau = bestCandidate.tau;
    if (bestTau < tauMin) return null;

    // Step 5: Parabolic interpolation for sub-sample accuracy
    const tauEstimate = this.parabolicInterpolation(yinBuffer, bestTau, tauMax);

    const frequency = sampleRate / tauEstimate;

    // Sanity check: harmonica range
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
