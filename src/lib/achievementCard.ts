import type { Milestone } from "./milestones";
import { siteConfig } from "./siteConfig";

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

export function drawAchievementCard(
  milestone: Milestone,
  songsCount: number,
): HTMLCanvasElement {
  const W = 1000;
  const H = 560;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // ── Deep background ──
  const bg = ctx.createRadialGradient(W / 2, H * 0.35, 0, W / 2, H * 0.35, W * 0.8);
  bg.addColorStop(0, "#1a1040");
  bg.addColorStop(0.5, "#0d0d1a");
  bg.addColorStop(1, "#050510");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // ── Central glow orb ──
  const glow = ctx.createRadialGradient(W / 2, 180, 0, W / 2, 180, 280);
  glow.addColorStop(0, "rgba(139,92,246,0.25)");
  glow.addColorStop(0.4, "rgba(99,102,241,0.08)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // ── Decorative star particles (deterministic) ──
  const rand = seededRandom(milestone.threshold * 7 + 42);
  ctx.save();
  for (let i = 0; i < 50; i++) {
    const x = rand() * W;
    const y = rand() * H;
    const r = rand() * 1.8 + 0.3;
    const alpha = rand() * 0.5 + 0.1;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fill();
  }
  ctx.restore();

  // ── Top accent arc ──
  ctx.save();
  const arc = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
  arc.addColorStop(0, "rgba(99,102,241,0)");
  arc.addColorStop(0.3, "rgba(139,92,246,0.6)");
  arc.addColorStop(0.5, "rgba(168,85,247,0.8)");
  arc.addColorStop(0.7, "rgba(139,92,246,0.6)");
  arc.addColorStop(1, "rgba(99,102,241,0)");
  ctx.strokeStyle = arc;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W * 0.15, 2);
  ctx.quadraticCurveTo(W / 2, 18, W * 0.85, 2);
  ctx.stroke();
  ctx.restore();

  // ── Card border glow ──
  ctx.save();
  ctx.shadowColor = "rgba(139,92,246,0.3)";
  ctx.shadowBlur = 40;
  ctx.strokeStyle = "rgba(139,92,246,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(1, 1, W - 2, H - 2, 20);
  ctx.stroke();
  ctx.restore();

  // ── ACHIEVEMENT UNLOCKED label ──
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "600 11px system-ui, -apple-system, sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillStyle = "rgba(168,85,247,0.7)";
  ctx.fillText("ACHIEVEMENT UNLOCKED", W / 2, 50);
  ctx.letterSpacing = "0px";

  // ── Emoji with glow halo ──
  ctx.save();
  const emojiGlow = ctx.createRadialGradient(W / 2, 120, 0, W / 2, 120, 60);
  emojiGlow.addColorStop(0, "rgba(251,191,36,0.15)");
  emojiGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = emojiGlow;
  ctx.fillRect(W / 2 - 60, 60, 120, 120);
  ctx.restore();

  ctx.font = "72px serif";
  ctx.fillText(milestone.emoji, W / 2, 125);

  // ── Title with glow ──
  ctx.save();
  ctx.shadowColor = "rgba(139,92,246,0.6)";
  ctx.shadowBlur = 20;
  ctx.font = "bold 40px system-ui, -apple-system, sans-serif";
  const titleGrad = ctx.createLinearGradient(W * 0.25, 185, W * 0.75, 215);
  titleGrad.addColorStop(0, "#e0e7ff");
  titleGrad.addColorStop(0.5, "#c4b5fd");
  titleGrad.addColorStop(1, "#e0e7ff");
  ctx.fillStyle = titleGrad;
  ctx.fillText(milestone.title, W / 2, 200);
  ctx.restore();

  // ── Decorative separator ──
  ctx.save();
  const sepGrad = ctx.createLinearGradient(W * 0.3, 0, W * 0.7, 0);
  sepGrad.addColorStop(0, "rgba(139,92,246,0)");
  sepGrad.addColorStop(0.5, "rgba(139,92,246,0.5)");
  sepGrad.addColorStop(1, "rgba(139,92,246,0)");
  ctx.strokeStyle = sepGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W * 0.3, 235);
  ctx.lineTo(W * 0.7, 235);
  ctx.stroke();
  // Diamond in center
  ctx.fillStyle = "rgba(168,85,247,0.6)";
  ctx.save();
  ctx.translate(W / 2, 235);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-3.5, -3.5, 7, 7);
  ctx.restore();
  ctx.restore();

  // ── Message (word-wrap) ──
  ctx.font = "18px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  const words = milestone.message.split(" ");
  const maxWidth = W - 200;
  let line = "";
  let y = 275;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, W / 2, y);
      line = word;
      y += 28;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, W / 2, y);

  // ── Stats badge ──
  const statsText = `${songsCount} ${songsCount === 1 ? "song" : "songs"} completed`;
  ctx.font = "bold 15px system-ui, -apple-system, sans-serif";
  const tw = ctx.measureText(statsText).width;
  const pillW = tw + 50;
  const pillH = 38;
  const pillX = (W - pillW) / 2;
  const pillY = y + 35;
  // Pill background
  const pillBg = ctx.createLinearGradient(pillX, pillY, pillX + pillW, pillY);
  pillBg.addColorStop(0, "rgba(99,102,241,0.2)");
  pillBg.addColorStop(1, "rgba(139,92,246,0.2)");
  ctx.fillStyle = pillBg;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 19);
  ctx.fill();
  // Pill border
  ctx.strokeStyle = "rgba(139,92,246,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, 19);
  ctx.stroke();
  // Pill text
  ctx.fillStyle = "#c4b5fd";
  ctx.fillText(statsText, W / 2, pillY + pillH / 2 + 1);

  // ── Bottom separator ──
  const divY = pillY + pillH + 40;
  const divGrad = ctx.createLinearGradient(W * 0.2, 0, W * 0.8, 0);
  divGrad.addColorStop(0, "rgba(255,255,255,0)");
  divGrad.addColorStop(0.5, "rgba(255,255,255,0.06)");
  divGrad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W * 0.15, divY);
  ctx.lineTo(W * 0.85, divY);
  ctx.stroke();

  // ── Branding ──
  ctx.font = "bold 18px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.fillText(siteConfig.name, W / 2, divY + 35);

  ctx.font = "13px system-ui, -apple-system, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.3)";
  ctx.fillText(siteConfig.url, W / 2, divY + 58);

  return canvas;
}

export function downloadAchievementCard(
  milestone: Milestone,
  songsCount: number,
) {
  const canvas = drawAchievementCard(milestone, songsCount);
  const link = document.createElement("a");
  link.download = `${milestone.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function shareAchievementCard(
  milestone: Milestone,
  songsCount: number,
) {
  const canvas = drawAchievementCard(milestone, songsCount);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return;

  const file = new File([blob], `${milestone.title.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()}.png`, {
    type: "image/png",
  });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        title: `${milestone.title} — ${siteConfig.name}`,
        text: `${milestone.message} 🎵 ${siteConfig.url}`,
        files: [file],
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      throw e;
    }
  } else {
    downloadAchievementCard(milestone, songsCount);
  }
}
