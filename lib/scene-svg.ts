export type SceneKind = "city" | "museum" | "hero";

type Palette = {
  sky: [string, string, string, string];
  ridge: [string, string, string, string];
  glow: string;
};

const PAL: Record<"city" | "museum", Palette> = {
  city: {
    sky: ["#4B5FC4", "#2E3277", "#181B47", "#080A1E"],
    ridge: ["#2C3160", "#242A5E", "#181C42", "#0C0E26"],
    glow: "#5C6BD8",
  },
  museum: {
    sky: ["#FFC79A", "#FB8F63", "#B4526E", "#3B2B54"],
    ridge: ["#8B5F79", "#6B4566", "#4A3054", "#2C1D3C"],
    glow: "#FF9A6B",
  },
};

const HERO_PAL: Palette = {
  sky: ["#FFC79A", "#FB8F63", "#B4526E", "#3B2B54"],
  ridge: ["#8B5F79", "#6B4566", "#4A3054", "#2C1D3C"],
  glow: "#FF9A6B",
};

function rng(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function defs(p: Palette, uid: string, glowPeak: string): string {
  return `<defs><linearGradient id="sk${uid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${p.sky[0]}"/><stop offset="34%" stop-color="${p.sky[1]}"/>
    <stop offset="68%" stop-color="${p.sky[2]}"/><stop offset="100%" stop-color="${p.sky[3]}"/></linearGradient>
    <radialGradient id="gl${uid}"><stop offset="0%" stop-color="${p.glow}" stop-opacity="${glowPeak}"/>
    <stop offset="60%" stop-color="${p.glow}" stop-opacity=".2"/>
    <stop offset="100%" stop-color="${p.glow}" stop-opacity="0"/></radialGradient></defs>`;
}

function wrapSvg(w: number, h: number, inner: string): string {
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${inner}</svg>`;
}

function buildHeroSvg(seed: number, uid: string): string {
  const p = HERO_PAL;
  const rand = rng(seed);
  const w = 1600;
  const h = 900;
  let o = defs(p, uid, ".82");
  o += `<rect width="${w}" height="${h}" fill="url(#sk${uid})"/>`;
  let st = "";
  for (let i = 0; i < 60; i++) {
    st += `<circle cx="${(rand() * w).toFixed(0)}" cy="${(rand() * h * 0.45).toFixed(0)}" r="${(rand() * 1.3 + 0.3).toFixed(1)}" fill="#fff" opacity="${(rand() * 0.6 + 0.12).toFixed(2)}"/>`;
  }
  o += `<g>${st}</g>`;
  o += `<circle cx="${(w * 0.68).toFixed(0)}" cy="${(h * 0.22).toFixed(0)}" r="${(h * 0.55).toFixed(0)}" fill="url(#gl${uid})"/>`;
  for (let i = 0; i < 5; i++) {
    const t = i / 4;
    const baseY = h * (0.4 + t * 0.36);
    const amp = h * (0.12 - t * 0.042);
    let d = `M-40 ${h + 40} L-40 ${baseY.toFixed(1)}`;
    for (let k = 0; k <= 6; k++) {
      const x = (w / 6 * k).toFixed(1);
      const y = (baseY + Math.sin(k * 1.1 + i * 2.3) * amp * (0.5 + rand() * 0.7) - rand() * amp * 0.4).toFixed(1);
      d += ` L${x} ${y}`;
    }
    d += ` L${w + 40} ${baseY.toFixed(1)} L${w + 40} ${h + 40} Z`;
    o += `<path d="${d}" fill="${p.ridge[Math.min(i, 3)]}" fill-opacity="${(0.74 + t * 0.26).toFixed(2)}"/>`;
  }
  const fc = p.ridge[3];
  const cx = w * 0.46;
  const bw = w * 0.3;
  const bh = h * 0.24;
  const bx = cx - bw / 2;
  const by = h - bh;
  o += `<path d="M${(bx - 28).toFixed(1)} ${by.toFixed(1)} L${cx.toFixed(1)} ${(by - h * 0.09).toFixed(1)} L${(bx + bw + 28).toFixed(1)} ${by.toFixed(1)} Z" fill="${fc}"/>`;
  o += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 40).toFixed(1)}" fill="${fc}"/>`;
  for (let i = 0; i < 8; i++) {
    const colx = bx + bw * 0.07 + i * (bw * 0.86 / 7);
    o += `<rect x="${colx.toFixed(1)}" y="${(by + h * 0.03).toFixed(1)}" width="${(bw * 0.04).toFixed(1)}" height="${(bh - h * 0.03).toFixed(1)}" fill="${p.ridge[1]}" opacity=".5"/>`;
  }
  return wrapSvg(w, h, o);
}

function buildSalonSvg(kind: "city" | "museum", seed: number, uid: string): string {
  const p = PAL[kind];
  const rand = rng(seed);
  const w = 1200;
  const h = 900;
  let o = defs(p, uid, ".78");
  o += `<rect width="${w}" height="${h}" fill="url(#sk${uid})"/>`;
  if (kind === "city") {
    let st = "";
    for (let i = 0; i < 70; i++) {
      st += `<circle cx="${(rand() * w).toFixed(0)}" cy="${(rand() * h * 0.5).toFixed(0)}" r="${(rand() * 1.4 + 0.3).toFixed(1)}" fill="#fff" opacity="${(rand() * 0.7 + 0.15).toFixed(2)}"/>`;
    }
    o += `<g>${st}</g>`;
  }
  o += `<circle cx="${(w * (0.2 + rand() * 0.6)).toFixed(0)}" cy="${(h * 0.22).toFixed(0)}" r="${(h * 0.5).toFixed(0)}" fill="url(#gl${uid})"/>`;
  for (let i = 0; i < 4; i++) {
    const t = i / 3;
    const baseY = h * (0.42 + t * 0.34);
    const amp = h * (0.12 - t * 0.045);
    let d = `M-40 ${h + 40} L-40 ${baseY.toFixed(1)}`;
    for (let k = 0; k <= 6; k++) {
      const x = (w / 6 * k).toFixed(1);
      const y = (baseY + Math.sin(k * 1.1 + i * 2.3) * amp * (0.5 + rand() * 0.7) - rand() * amp * 0.4).toFixed(1);
      d += ` L${x} ${y}`;
    }
    d += ` L${w + 40} ${baseY.toFixed(1)} L${w + 40} ${h + 40} Z`;
    o += `<path d="${d}" fill="${p.ridge[Math.min(i, 3)]}" fill-opacity="${(0.74 + t * 0.26).toFixed(2)}"/>`;
  }
  const fc = p.ridge[3];
  if (kind === "city") {
    let x = -20;
    while (x < w + 20) {
      const bw = 34 + rand() * 60;
      const bh = h * (0.12 + rand() * 0.3);
      o += `<rect x="${x.toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 40).toFixed(1)}" fill="${fc}"/>`;
      for (let wy = 0; wy < Math.floor(bh / 28); wy++) {
        for (let wx = 0; wx < Math.floor(bw / 20); wx++) {
          if (rand() > 0.55) {
            o += `<rect x="${(x + 8 + wx * 20).toFixed(1)}" y="${(h - bh + 12 + wy * 28).toFixed(1)}" width="6" height="9" fill="#FFD79A" opacity="${(0.3 + rand() * 0.5).toFixed(2)}"/>`;
          }
        }
      }
      x += bw + 9;
    }
  } else {
    const cx = w * 0.5;
    const bw = w * 0.36;
    const bh = h * 0.26;
    const bx = cx - bw / 2;
    const by = h - bh;
    o += `<path d="M${(bx - 26).toFixed(1)} ${by.toFixed(1)} L${cx.toFixed(1)} ${(by - h * 0.1).toFixed(1)} L${(bx + bw + 26).toFixed(1)} ${by.toFixed(1)} Z" fill="${fc}"/>`;
    o += `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh + 40).toFixed(1)}" fill="${fc}"/>`;
    for (let i = 0; i < 7; i++) {
      const colx = bx + bw * 0.08 + i * (bw * 0.84 / 6);
      o += `<rect x="${colx.toFixed(1)}" y="${(by + h * 0.035).toFixed(1)}" width="${(bw * 0.045).toFixed(1)}" height="${(bh - h * 0.035).toFixed(1)}" fill="${p.ridge[1]}" opacity=".5"/>`;
    }
  }
  return wrapSvg(w, h, o);
}

export function buildSceneSvg(kind: SceneKind, seed: number, uid: string): string {
  if (kind === "hero") return buildHeroSvg(seed, uid);
  return buildSalonSvg(kind, seed, uid);
}
