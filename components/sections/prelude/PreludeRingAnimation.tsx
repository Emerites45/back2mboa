"use client";

import { useEffect, useRef } from "react";
import "./PreludeRingAnimation.css";

/** Logo couleur officiel — jaune marque + typo Back2Mboa */
const LOGO_SRC = "/images/logo.webp";

/** Tokens marque (alignés globals.css) */
const BRAND = {
  yellow: "#fbbf24",
  cream: "#f9f7f0",
  teal: "#45b3a9",
  forest: "#0e3b2d",
} as const;

type Particle = {
  tx: number;
  ty: number;
  sx: number;
  sy: number;
  color: string;
  size: number;
};

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInCubic(t: number) {
  return t * t * t;
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

function wedgePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const [x1, y1] = polarToXY(cx, cy, r, startAngle);
  const [x2, y2] = polarToXY(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const [x1, y1] = polarToXY(cx, cy, r, startAngle);
  const [x2, y2] = polarToXY(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

/**
 * Couleurs du logo officiel sur fond clair :
 * or → --brand-yellow ; reste = pixels logo (encre lisible).
 */
function brandPixelColor(r: number, g: number, b: number, a: number): string {
  const isGold = r > 180 && g > 140 && b < 120 && r - b > 60;

  if (isGold) {
    return `rgba(251, 191, 36, ${(a / 255) * 0.98})`;
  }

  return `rgba(${r},${g},${b},${(a / 255) * 0.96})`;
}

export function PreludeRingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pieRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<SVGGElement>(null);
  const markRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pieContainer = pieRef.current;
    const sweepGroup = sweepRef.current;
    const mark = markRef.current;
    if (!canvas || !pieContainer || !sweepGroup) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssSize = 320;
    canvas.width = Math.round(cssSize * dpr);
    canvas.height = Math.round(cssSize * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const W = cssSize;
    const H = cssSize;

    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const octx = off.getContext("2d");
    if (!octx) return;

    let particles: Particle[] = [];
    let logoReady = false;
    let startTime: number | null = null;
    let raf = 0;
    let reducedMotion = false;

    const CX = 100;
    const CY = 100;
    const R = 78;

    const ASSEMBLE_DUR = 1200;
    const HOLD_DUR = 1600;
    const DISSOLVE_DUR = 800;
    const BREATH_DUR = 180;
    const PIE_SWEEP_DUR = 2400;
    const PIE_FADE_DUR = 420;

    const ASSEMBLE_END = ASSEMBLE_DUR;
    const HOLD_END = ASSEMBLE_END + HOLD_DUR;
    const DISSOLVE_END = HOLD_END + DISSOLVE_DUR;
    const BREATH_END = DISSOLVE_END + BREATH_DUR;
    const PIE_SWEEP_END = BREATH_END + PIE_SWEEP_DUR;
    const LOOP_DURATION = PIE_SWEEP_END + PIE_FADE_DUR + 220;

    function drawLogoToOffscreen(img: HTMLImageElement) {
      octx!.clearRect(0, 0, W, H);
      /* Wordmark plus présent dans le disque — marge fine vers la brique */
      const targetW = W * 0.8;
      const scale = targetW / img.width;
      const targetH = img.height * scale;
      const x = (W - targetW) / 2;
      const y = (H - targetH) / 2;
      octx!.drawImage(img, x, y, targetW, targetH);
    }

    function buildParticles(img: HTMLImageElement) {
      drawLogoToOffscreen(img);
      const data = octx!.getImageData(0, 0, W, H).data;
      particles = [];
      const step = 2;
      const cx = W / 2;
      const cy = H / 2;

      for (let py = 0; py < H; py += step) {
        for (let px = 0; px < W; px += step) {
          const idx = (py * W + px) * 4;
          const a = data[idx + 3];
          if (a < 55) continue;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];

          /* Dispersion courte, radiale — évite l’effet « herbe » */
          const angle = Math.atan2(py - cy, px - cx) + (Math.random() - 0.5) * 0.9;
          const dist = 28 + Math.random() * 52;

          particles.push({
            tx: px,
            ty: py,
            sx: Math.cos(angle) * dist,
            sy: Math.sin(angle) * dist,
            color: brandPixelColor(r, g, b, a),
            size: step * 0.92 + Math.random() * 0.55,
          });
        }
      }
    }

    function setMarkOpacity(opacity: number) {
      if (mark) mark.style.opacity = String(opacity);
    }

    function renderLogo(
      phase: "none" | "assemble" | "hold" | "dissolve",
      local: number,
    ) {
      ctx!.clearRect(0, 0, W, H);
      if (phase === "none") return;

      let ease = 1;
      if (phase === "assemble") ease = easeOutCubic(local);
      else if (phase === "dissolve") ease = easeInCubic(local);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let x: number;
        let y: number;
        let alphaMul: number;
        if (phase === "assemble") {
          x = p.tx + p.sx * (1 - ease);
          y = p.ty + p.sy * (1 - ease);
          alphaMul = ease;
        } else if (phase === "hold") {
          x = p.tx;
          y = p.ty;
          alphaMul = 1;
        } else {
          x = p.tx + p.sx * ease;
          y = p.ty + p.sy * ease;
          alphaMul = 1 - ease;
        }
        if (alphaMul <= 0.01) continue;
        ctx!.globalAlpha = alphaMul;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(x - p.size / 2, y - p.size / 2, p.size, p.size);
      }
      ctx!.globalAlpha = 1;
    }

    function buildSweep() {
      const svgNS = "http://www.w3.org/2000/svg";
      while (sweepGroup!.firstChild) {
        sweepGroup!.removeChild(sweepGroup!.firstChild);
      }

      const wedgeTeal = document.createElementNS(svgNS, "path");
      wedgeTeal.setAttribute("d", wedgePath(CX, CY, R, 0, 38));
      wedgeTeal.setAttribute("fill", BRAND.forest);
      sweepGroup!.appendChild(wedgeTeal);

      const wedgeYellow = document.createElementNS(svgNS, "path");
      wedgeYellow.setAttribute("d", wedgePath(CX, CY, R, 38, 105));
      wedgeYellow.setAttribute("fill", BRAND.yellow);
      sweepGroup!.appendChild(wedgeYellow);

      const tailStart = 105 + 12;
      const tailSpan = 210;
      const segments = 16;
      const gap = 1.3;
      const segLen = tailSpan / segments - gap;

      for (let i = 0; i < segments; i++) {
        const segStart = tailStart + i * (tailSpan / segments);
        const segEnd = segStart + segLen;
        const t = i / (segments - 1);
        const opacity = Math.max(0.05, 0.72 * (1 - t) * (1 - t));
        const strokeW = 7.5 - 4.2 * t;

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", arcPath(CX, CY, R, segStart, segEnd));
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", i < 2 ? BRAND.yellow : BRAND.teal);
        path.setAttribute("stroke-width", strokeW.toFixed(2));
        path.setAttribute("stroke-linecap", "round");
        path.setAttribute("opacity", opacity.toFixed(2));
        sweepGroup!.appendChild(path);
      }
    }

    function frame(ts: number) {
      if (startTime === null) startTime = ts;
      const t = (ts - startTime) % LOOP_DURATION;

      if (!logoReady) {
        raf = requestAnimationFrame(frame);
        return;
      }

      if (reducedMotion) {
        renderLogo("hold", 1);
        pieContainer!.style.opacity = "0";
        setMarkOpacity(0.22);
        return;
      }

      if (t < ASSEMBLE_END) {
        const local = t / ASSEMBLE_DUR;
        renderLogo("assemble", local);
        pieContainer!.style.opacity = "0";
        setMarkOpacity(0.1 + 0.12 * easeOutCubic(local));
      } else if (t < HOLD_END) {
        renderLogo("hold", 1);
        pieContainer!.style.opacity = "0";
        setMarkOpacity(0.22);
      } else if (t < DISSOLVE_END) {
        const local = (t - HOLD_END) / DISSOLVE_DUR;
        renderLogo("dissolve", local);
        pieContainer!.style.opacity = "0";
        setMarkOpacity(0.22 * (1 - local));
      } else if (t < BREATH_END) {
        renderLogo("none", 0);
        pieContainer!.style.opacity = "0";
        setMarkOpacity(0.06);
      } else if (t < PIE_SWEEP_END) {
        renderLogo("none", 0);
        const local = (t - BREATH_END) / PIE_SWEEP_DUR;
        const angle = easeOutCubic(local) * 720;
        sweepGroup!.setAttribute(
          "transform",
          `rotate(${angle.toFixed(2)} ${CX} ${CY})`,
        );
        pieContainer!.style.transform = "scale(1)";
        pieContainer!.style.opacity = "1";
        setMarkOpacity(0.08);
      } else {
        renderLogo("none", 0);
        const local = Math.min(1, (t - PIE_SWEEP_END) / PIE_FADE_DUR);
        pieContainer!.style.transform = `scale(${1 - 0.14 * local})`;
        pieContainer!.style.opacity = String(1 - local);
        setMarkOpacity(0.08 + 0.04 * local);
      }

      raf = requestAnimationFrame(frame);
    }

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion = mq.matches;

    const logoImg = new Image();
    logoImg.decoding = "async";
    logoImg.onload = () => {
      logoReady = true;
      buildParticles(logoImg);
      buildSweep();
      if (reducedMotion) {
        renderLogo("hold", 1);
        pieContainer.style.opacity = "0";
        setMarkOpacity(0.22);
      } else {
        raf = requestAnimationFrame(frame);
      }
    };
    logoImg.src = LOGO_SRC;

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="prelude-ring-anim" aria-hidden="true">
      <div className="prelude-ring-anim__pulse" />
      <div className="prelude-ring-anim__glow" />
      {/* Filigramme : même asset couleur que le logo officiel */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={markRef}
        className="prelude-ring-anim__mark"
        src={LOGO_SRC}
        alt=""
        draggable={false}
      />
      <canvas ref={canvasRef} className="prelude-ring-anim__canvas" />
      <div ref={pieRef} className="prelude-ring-anim__pie">
        <svg viewBox="0 0 200 200">
          <g ref={sweepRef} />
        </svg>
      </div>
    </div>
  );
}
