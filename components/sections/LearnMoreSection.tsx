'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Bricolage_Grotesque, Inter } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

/* ---------- scènes SVG ---------- */
function rng(s: number) {
  let seed = s % 2147483647;
  if (seed <= 0) seed += 2147483646;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const PAL: Record<string, { sky: string[]; ridge: string[]; glow: string }> = {
  verdant: {
    sky: ['#D6EFD2', '#93CFA0', '#3F8B63', '#1C4A36'],
    ridge: ['#5B9E70', '#3E7C57', '#2A5B40', '#173A2A'],
    glow: '#A8E0A4',
  },
  ocean: {
    sky: ['#BDEDE8', '#63CBC6', '#1E8891', '#0A3A46'],
    ridge: ['#3FA3A6', '#25787F', '#155259', '#08303A'],
    glow: '#7FE2DA',
  },
  dawn: {
    sky: ['#FFC79A', '#FB8F63', '#B4526E', '#3B2B54'],
    ridge: ['#8B5F79', '#6B4566', '#4A3054', '#2C1D3C'],
    glow: '#FF9A6B',
  },
  nocturne: {
    sky: ['#4B5FC4', '#2E3277', '#181B47', '#080A1E'],
    ridge: ['#2C3160', '#242A5E', '#181C42', '#0C0E26'],
    glow: '#5C6BD8',
  },
  savanna: {
    sky: ['#FFE9B8', '#F7C069', '#C98246', '#6B4028'],
    ridge: ['#B27C4C', '#8E5F3B', '#65422A', '#3E281A'],
    glow: '#F5B45E',
  },
  emerald: {
    sky: ['#C9F0DC', '#6FC7A0', '#2C8A6A', '#10402F'],
    ridge: ['#4FA37E', '#347E62', '#215C47', '#10402F'],
    glow: '#8FDCBB',
  },
};

function Scene({
  pal,
  fg,
  seed,
}: {
  pal: string;
  fg: string;
  seed: number;
}) {
  const p = PAL[pal] || PAL.verdant;
  const rand = rng(seed);
  const w = 800;
  const h = 620;
  const id = `s${seed}`;

  const ridges = Array.from({ length: 4 }, (_, i) => {
    const t = i / 3;
    const baseY = h * (0.42 + t * 0.34);
    const amp = h * (0.12 - t * 0.045);
    let d = `M-30 ${h + 30} L-30 ${baseY.toFixed(1)}`;
    for (let k = 0; k <= 6; k++) {
      const x = (w / 6) * k;
      const y =
        baseY +
        Math.sin(k * 1.1 + i * 2.3) * amp * (0.5 + rand() * 0.7) -
        rand() * amp * 0.4;
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    d += ` L${w + 30} ${baseY.toFixed(1)} L${w + 30} ${h + 30} Z`;
    return (
      <path
        key={i}
        d={d}
        fill={p.ridge[Math.min(i, 3)]}
        fillOpacity={0.74 + t * 0.26}
      />
    );
  });

  const fc = p.ridge[3];
  let fgEl: React.ReactNode = null;

  if (fg === 'crops') {
    fgEl = Array.from({ length: 20 }, (_, i) => {
      const x = -10 + i * (w / 19);
      return (
        <path
          key={i}
          d={`M${x} ${h} L${x} ${h - 56} M${x} ${h - 30} l-10 -12 M${x} ${h - 30} l10 -12`}
          stroke={fc}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />
      );
    });
  } else if (fg === 'city') {
    const rects = [];
    let x = -20;
    let i = 0;
    while (x < w + 20) {
      const bw = 28 + rand() * 48;
      const bh = h * (0.12 + rand() * 0.28);
      rects.push(
        <rect
          key={i++}
          x={x}
          y={h - bh}
          width={bw}
          height={bh + 30}
          fill={fc}
        />
      );
      x += bw + 8;
    }
    fgEl = rects;
  } else if (fg === 'village') {
    fgEl = Array.from({ length: 6 }, (_, i) => {
      const x = w * 0.05 + rand() * w * 0.82;
      const bw = w * 0.06 + rand() * w * 0.04;
      const bh = h * 0.06 + rand() * h * 0.04;
      return (
        <path
          key={i}
          d={`M${x} ${h} L${x} ${h - bh} L${x + bw / 2} ${h - bh - h * 0.035} L${x + bw} ${h - bh} L${x + bw} ${h} Z`}
          fill={fc}
        />
      );
    });
  } else if (fg === 'museum') {
    const cx = w * 0.5;
    const bw = w * 0.36;
    const bh = h * 0.28;
    const bx = cx - bw / 2;
    const by = h - bh;
    fgEl = (
      <>
        <path
          d={`M${bx - 22} ${by} L${cx} ${by - h * 0.1} L${bx + bw + 22} ${by} Z`}
          fill={fc}
        />
        <rect x={bx} y={by} width={bw} height={bh + 30} fill={fc} />
        {Array.from({ length: 6 }, (_, i) => {
          const cxx = bx + bw * 0.09 + i * ((bw * 0.82) / 5);
          return (
            <rect
              key={i}
              x={cxx}
              y={by + h * 0.04}
              width={bw * 0.05}
              height={bh - h * 0.04}
              fill={p.ridge[1]}
              opacity={0.5}
            />
          );
        })}
      </>
    );
  } else if (fg === 'solar') {
    fgEl = Array.from({ length: 4 }, (_, i) => {
      const x = w * 0.08 + i * (w / 4.4);
      const yy = h - h * 0.12;
      return (
        <g key={i}>
          <g transform={`translate(${x} ${yy}) skewY(-13)`}>
            <rect width={w * 0.08} height={h * 0.06} fill={fc} />
          </g>
          <rect
            x={x + w * 0.037}
            y={yy + h * 0.055}
            width={5}
            height={h * 0.075}
            fill={fc}
          />
        </g>
      );
    });
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMax slice"
      className="w-full h-full block transition-transform duration-[1.1s] group-hover:scale-105"
      aria-hidden
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="34%" stopColor={p.sky[1]} />
          <stop offset="68%" stopColor={p.sky[2]} />
          <stop offset="100%" stopColor={p.sky[3]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0%" stopColor={p.glow} stopOpacity={0.76} />
          <stop offset="60%" stopColor={p.glow} stopOpacity={0.2} />
          <stop offset="100%" stopColor={p.glow} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={w} height={h} fill={`url(#sky-${id})`} />
      <circle
        cx={w * (0.2 + rand() * 0.6)}
        cy={h * 0.22}
        r={h * 0.5}
        fill={`url(#glow-${id})`}
      />
      {ridges}
      {fgEl}
    </svg>
  );
}

/* ---------- articles ---------- */
const ARTICLES = [
  {
    cat: 'Actualité',
    tag: 'Salon de la Diaspora',
    acc: '#119D63',
    titre:
      "Le Salon de la Diaspora se tiendra le 4 décembre, au cœur d'une semaine européenne",
    pal: 'nocturne',
    fg: 'city',
    seed: 11,
  },
  {
    cat: 'Territoire',
    tag: 'Agriculture',
    acc: '#119D63',
    titre: 'Babadjou : 4 000 tonnes de pommes de terre en quête de leur industrie',
    pal: 'verdant',
    fg: 'crops',
    seed: 12,
  },
  {
    cat: 'Preuve',
    tag: 'Éditions pilotes',
    acc: '#AE3C3A',
    titre:
      '97 % de satisfaction : ce que les deux éditions pilotes ont réellement prouvé',
    pal: 'dawn',
    fg: 'museum',
    seed: 13,
  },
  {
    cat: 'Méthode',
    tag: 'Qualification',
    acc: '#D8212E',
    titre: 'Crédible, Accessible, Possible : les trois filtres avant tout financeur',
    pal: 'savanna',
    fg: 'village',
    seed: 14,
  },
  {
    cat: 'Territoire',
    tag: 'Eau & Énergie',
    acc: '#00C2A8',
    titre: 'Fundong : des forages construits, puis arrêtés faute de modèle de gestion',
    pal: 'ocean',
    fg: 'solar',
    seed: 15,
  },
  {
    cat: 'Analyse',
    tag: 'Décentralisation',
    acc: '#AE3C3A',
    titre: 'Les dix recommandations des maires : où en est-on quatre ans après ?',
    pal: 'emerald',
    fg: 'village',
    seed: 16,
  },
  {
    cat: 'Territoire',
    tag: 'Tourisme',
    acc: '#FFD506',
    titre: 'Limbé reçoit 10 000 visiteurs en décembre et vise dix fois plus',
    pal: 'ocean',
    fg: 'village',
    seed: 17,
  },
  {
    cat: 'Partenariat',
    tag: 'Offres',
    acc: '#D8212E',
    titre: 'Le voyage en Europe est désormais inclus dans les deux paliers hauts',
    pal: 'dawn',
    fg: 'city',
    seed: 18,
  },
];

export function LearnMoreSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const pageWidth = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return 0;
    const card = rail.querySelector('.learn-card') as HTMLElement | null;
    if (!card) return rail.clientWidth;
    const gap = parseFloat(getComputedStyle(rail).gap) || 20;
    const per = Math.max(1, Math.round(rail.clientWidth / (card.offsetWidth + gap)));
    return per * (card.offsetWidth + gap);
  }, []);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const pw = pageWidth();
    const cur = Math.round(rail.scrollLeft / Math.max(pw, 1));
    setCurrentPage(cur);
    setCanPrev(rail.scrollLeft > 8);
    setCanNext(rail.scrollLeft < rail.scrollWidth - rail.clientWidth - 8);

    const reste = rail.scrollWidth - rail.clientWidth;
    const n = reste <= 2 ? 1 : Math.ceil(reste / Math.max(pw, 1)) + 1;
    setPageCount(n);
  }, [pageWidth]);

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;

    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(sync, 90);
    };
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(sync, 180);
    };

    rail.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    return () => {
      rail.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [sync]);

  const goTo = (page: number) => {
    railRef.current?.scrollTo({ left: page * pageWidth(), behavior: 'smooth' });
  };

  const prev = () => {
    railRef.current?.scrollBy({ left: -pageWidth(), behavior: 'smooth' });
  };

  const next = () => {
    railRef.current?.scrollBy({ left: pageWidth(), behavior: 'smooth' });
  };

  return (
    <section className={`${inter.className} py-[clamp(54px,7vw,112px)] pb-[clamp(50px,6vw,96px)] bg-[#FBF7EF]`}>
      <div className="max-w-[1400px] mx-auto px-[clamp(20px,3.4vw,44px)]">
        
        {/* Titre */}
        <h2
          className={`${bricolage.className} text-[clamp(2.3rem,5.6vw,4.4rem)] text-[#5A6B60] font-normal tracking-[-0.03em] mb-[clamp(34px,4.6vw,72px)] leading-[1.06]`}
        >
          En savoir plus
        </h2>

        {/* Contrôles */}
        <div className="flex items-center gap-4 mb-[clamp(20px,2.6vw,34px)]">
          <div className="flex gap-[9px]" role="tablist" aria-label="Pages d'articles">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                role="tab"
                aria-label={`Page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-[9px] rounded-full transition-all duration-300 p-0 ${
                  i === currentPage
                    ? 'bg-[#0A2B21] w-[26px]'
                    : 'bg-[#E6DCC7] w-[9px]'
                }`}
              />
            ))}
          </div>

          <div className="ml-auto flex gap-2.5">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Articles précédents"
              className="w-[46px] h-[46px] rounded-[14px] bg-[#F3ECDD] grid place-items-center text-[#0A2B21] text-lg transition-all duration-300 hover:enabled:bg-[#119D63] hover:enabled:text-white disabled:opacity-35 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Articles suivants"
              className="w-[46px] h-[46px] rounded-[14px] bg-[#F3ECDD] grid place-items-center text-[#0A2B21] text-lg transition-all duration-300 hover:enabled:bg-[#119D63] hover:enabled:text-white disabled:opacity-35 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>

        {/* Rail */}
        <div
          ref={railRef}
          className="flex gap-[clamp(16px,1.8vw,26px)] overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1.5 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {ARTICLES.map((a) => (
            <article
              key={a.seed}
              className="learn-card group flex-none snap-start grid grid-cols-1 sm:grid-cols-[1fr_274px] w-[min(88vw,620px)] rounded-[20px] overflow-hidden bg-[#F3ECDD] transition-all duration-450 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_-26px_rgba(10,43,33,0.42)]"
            >
              <div className="p-[clamp(20px,2.2vw,28px)] flex flex-col min-h-[clamp(240px,26vw,300px)]">
                <div className="flex justify-between gap-3.5 mb-[clamp(16px,2vw,26px)]">
                  <span className="text-[0.88rem] text-[#5A6B60]">{a.cat}</span>
                  <span
                    className="text-[0.88rem] font-medium"
                    style={{ color: a.acc }}
                  >
                    {a.tag}
                  </span>
                </div>

                <h3
                  className={`${bricolage.className} text-[clamp(1.12rem,1.75vw,1.42rem)] text-[#5A6B60] font-normal tracking-[-0.02em] leading-[1.28] transition-colors duration-300 group-hover:text-[#0A2B21]`}
                >
                  {a.titre}
                </h3>

                <button
                  aria-label={`Lire : ${a.titre}`}
                  className="mt-auto w-[74px] h-11 rounded-xl bg-[rgba(17,157,99,0.14)] grid place-items-center text-[#119D63] text-lg transition-all duration-300 group-hover:bg-[#119D63] group-hover:text-white group-hover:w-[88px]"
                >
                  →
                </button>
              </div>

              <div className="relative overflow-hidden min-h-[190px] bg-[#0A2B21]">
                <Scene pal={a.pal} fg={a.fg} seed={a.seed} />
                <span className="absolute inset-0 bg-gradient-to-t from-[rgba(6,26,20,0.34)] to-transparent to-55% pointer-events-none" />
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

export default LearnMoreSection;