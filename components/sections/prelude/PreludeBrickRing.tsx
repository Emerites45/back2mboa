/**
 * Anneau de briques en voussoirs — géométrie d’arc maçonné.
 * Texture terre cuite réelle + joints mortier.
 * (Pas de filtre turbulence : évite le « carré » autour du SVG.)
 */
const BRICK_TEX = "/images/prelude/brick.webp";
const CX = 100;
const CY = 100;

const R_OUT = 98;
const R_MID = 88.5;
const R_IN = 79;

const MORTAR_DEG = 1.35;
const OUTER_COUNT = 24;
const INNER_COUNT = 20;

function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(a),
    y: cy + r * Math.sin(a),
  };
}

function voussoirPath(
  rInner: number,
  rOuter: number,
  startDeg: number,
  endDeg: number,
) {
  const large = endDeg - startDeg > 180 ? 1 : 0;
  const p0 = polar(CX, CY, rOuter, startDeg);
  const p1 = polar(CX, CY, rOuter, endDeg);
  const p2 = polar(CX, CY, rInner, endDeg);
  const p3 = polar(CX, CY, rInner, startDeg);
  return [
    `M ${p0.x.toFixed(3)} ${p0.y.toFixed(3)}`,
    `A ${rOuter} ${rOuter} 0 ${large} 1 ${p1.x.toFixed(3)} ${p1.y.toFixed(3)}`,
    `L ${p2.x.toFixed(3)} ${p2.y.toFixed(3)}`,
    `A ${rInner} ${rInner} 0 ${large} 0 ${p3.x.toFixed(3)} ${p3.y.toFixed(3)}`,
    "Z",
  ].join(" ");
}

function buildCourse(
  count: number,
  rInner: number,
  rOuter: number,
  phaseDeg: number,
) {
  const step = 360 / count;
  const bricks: { d: string; key: string }[] = [];
  for (let i = 0; i < count; i++) {
    const start = phaseDeg + i * step + MORTAR_DEG / 2;
    const end = phaseDeg + (i + 1) * step - MORTAR_DEG / 2;
    if (end <= start) continue;
    bricks.push({
      d: voussoirPath(rInner, rOuter, start, end),
      key: `${rInner}-${i}`,
    });
  }
  return bricks;
}

const OUTER = buildCourse(OUTER_COUNT, R_MID + 0.55, R_OUT, 0);
const INNER = buildCourse(INNER_COUNT, R_IN, R_MID - 0.55, 360 / INNER_COUNT / 2);

export function PreludeBrickRing() {
  return (
    <svg
      className="prelude-ring-brick"
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id="prelude-brick-tex"
          patternUnits="userSpaceOnUse"
          width="48"
          height="48"
        >
          <image
            href={BRICK_TEX}
            width="48"
            height="48"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>

        <radialGradient id="prelude-brick-shade" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor="rgba(255,220,180,0.16)" />
          <stop offset="55%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(40,12,6,0.26)" />
        </radialGradient>

        {/* Clip strictement circulaire — rien hors de l’anneau */}
        <clipPath id="prelude-brick-clip">
          <circle cx={CX} cy={CY} r={R_OUT + 0.5} />
        </clipPath>
      </defs>

      <g clipPath="url(#prelude-brick-clip)">
        <circle
          cx={CX}
          cy={CY}
          r={(R_OUT + R_IN) / 2}
          fill="none"
          stroke="#3a2218"
          strokeWidth={R_OUT - R_IN + 1.2}
          opacity="0.92"
        />

        {OUTER.map((b) => (
          <path
            key={b.key}
            d={b.d}
            fill="url(#prelude-brick-tex)"
            stroke="rgba(42, 18, 10, 0.55)"
            strokeWidth="0.35"
          />
        ))}
        {INNER.map((b) => (
          <path
            key={b.key}
            d={b.d}
            fill="url(#prelude-brick-tex)"
            stroke="rgba(42, 18, 10, 0.5)"
            strokeWidth="0.3"
            opacity="0.97"
          />
        ))}

        <circle
          cx={CX}
          cy={CY}
          r={R_MID}
          fill="none"
          stroke="#2c1810"
          strokeWidth="1.15"
          opacity="0.85"
        />

        <circle
          cx={CX}
          cy={CY}
          r={(R_OUT + R_IN) / 2}
          fill="none"
          stroke="url(#prelude-brick-shade)"
          strokeWidth={R_OUT - R_IN}
          opacity="0.85"
        />

        <circle
          cx={CX}
          cy={CY}
          r={R_IN - 0.4}
          fill="none"
          stroke="rgba(255, 230, 210, 0.22)"
          strokeWidth="0.7"
        />
        <circle
          cx={CX}
          cy={CY}
          r={R_IN}
          fill="none"
          stroke="rgba(30, 12, 8, 0.45)"
          strokeWidth="0.85"
        />
      </g>
    </svg>
  );
}
