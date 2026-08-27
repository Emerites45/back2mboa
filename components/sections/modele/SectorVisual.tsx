import Image from "next/image";
import type { ModeleVisual } from "@/types/modele";

const PALETTES: Record<
  Exclude<ModeleVisual, "photo">,
  { sky: [string, string]; far: string; mid: string; near: string; ridge: string }
> = {
  gold: {
    sky: ["#F3C77A", "#C47A32"],
    far: "#A56B35",
    mid: "#6E4320",
    near: "#2A160C",
    ridge: "#1A0E08",
  },
  teal: {
    sky: ["#1C5C58", "#0E2E2C"],
    far: "#2F7A6E",
    mid: "#1A4A44",
    near: "#0A2422",
    ridge: "#061614",
  },
  blue: {
    sky: ["#1A4A62", "#0C2436"],
    far: "#2A6B7A",
    mid: "#163E4C",
    near: "#0A222C",
    ridge: "#06141A",
  },
  green: {
    sky: ["#2A4A3A", "#121C18"],
    far: "#3A5C48",
    mid: "#1E382C",
    near: "#0E1C16",
    ridge: "#08110D",
  },
};

type SectorVisualProps = {
  visual: ModeleVisual;
  image?: string;
  imagePosition?: string;
  chart?: boolean;
};

export function SectorVisual({ visual, image, imagePosition, chart }: SectorVisualProps) {
  if (visual === "photo" && image) {
    return (
      <>
        <Image
          className="modele-photo"
          src={image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        {chart && <BarChartOverlay />}
      </>
    );
  }

  const palette = PALETTES[visual === "photo" ? "gold" : visual];
  return (
    <svg
      className="modele-landscape"
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sky-${visual}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sky[0]} />
          <stop offset="100%" stopColor={palette.sky[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#sky-${visual})`} />
      <path d="M0 250 L80 210 L160 240 L240 180 L320 230 L400 190 L400 500 L0 500 Z" fill={palette.far} />
      <path d="M0 310 L70 270 L150 300 L230 250 L310 290 L400 255 L400 500 L0 500 Z" fill={palette.mid} />
      <path d="M0 380 L90 340 L180 370 L270 320 L360 360 L400 340 L400 500 L0 500 Z" fill={palette.near} />
      <path d="M0 455 L60 430 L140 450 L220 420 L300 445 L400 415 L400 500 L0 500 Z" fill={palette.ridge} />
    </svg>
  );
}

function BarChartOverlay() {
  return (
    <svg className="modele-chart" viewBox="0 0 320 80" aria-hidden="true">
      {[
        [20, 42],
        [52, 28],
        [84, 50],
        [116, 22],
        [148, 36],
        [180, 18],
        [212, 44],
        [244, 30],
        [276, 14],
      ].map(([x, h]) => (
        <rect
          key={x}
          x={x}
          y={80 - h}
          width="18"
          height={h}
          rx="3"
          fill="rgba(90, 200, 140, 0.55)"
        />
      ))}
    </svg>
  );
}
