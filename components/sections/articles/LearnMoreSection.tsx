'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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

/* ---------- articles ---------- */
const ARTICLES = [
  {
    cat: 'Actualité',
    tag: 'Salon de la Diaspora',
    acc: '#119D63',
    titre:
      "Le Salon de la Diaspora se tiendra le 4 decembre, au coeur d'une semaine europeenne",
    image: '/images/learn-more/salon.webp',
    imageAlt: 'Salon de la Diaspora',
  },
  {
    cat: 'Territoire',
    tag: 'Agriculture',
    acc: '#119D63',
    titre: 'Babadjou : 4 000 tonnes de pommes de terre en quete de leur industrie',
    image: '/images/learn-more/pomme.webp',
    imageAlt: 'Pommes de terre — Babadjou',
  },
  {
    cat: 'Preuve',
    tag: 'Editions pilotes',
    acc: '#AE3C3A',
    titre:
      '97 % de satisfaction : ce que les deux editions pilotes ont reellement prouve',
    image: '/images/learn-more/after.webp',
    imageAlt: 'Éditions pilotes — après',
  },
  {
    cat: 'Methode',
    tag: 'Qualification',
    acc: '#D8212E',
    titre: 'Credible, Accessible, Possible : les trois filtres avant tout financeur',
    image: '/images/learn-more/credibilite.webp',
    imageAlt: 'Qualification CAP — crédible, accessible, possible',
  },
  {
    cat: 'Territoire',
    tag: 'Eau & Energie',
    acc: '#00C2A8',
    titre: 'Fundong : des forages construits, puis arretes faute de modele de gestion',
    image: '/images/learn-more/forage.webp',
    imageAlt: 'Forage — Fundong, eau & énergie',
  },
  {
    cat: 'Analyse',
    tag: 'Decentralisation',
    acc: '#AE3C3A',
    titre: 'Les dix recommandations des maires : ou en est-on quatre ans apres ?',
    image: '/images/learn-more/dix.webp',
    imageAlt: 'Dix recommandations des maires',
  },
  {
    cat: 'Territoire',
    tag: 'Tourisme',
    acc: '#FFD506',
    titre: 'Limbe recoit 10 000 visiteurs en decembre et vise dix fois plus',
    image: '/images/learn-more/plage.webp',
    imageAlt: 'Plage — tourisme Limbé',
  },
  {
    cat: 'Partenariat',
    tag: 'Offres',
    acc: '#D8212E',
    titre: 'Le voyage en Europe est desormais inclus dans les deux paliers hauts',
    image: '/images/learn-more/route-air.webp',
    imageAlt: 'Voyage Europe — route aérienne',
  },
];

const AUTOPLAY_MS = 6000;

export function LearnMoreSection() {
  const railRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);

  const pageWidth = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return 0;
    const card = rail.querySelector('.learn-card') as HTMLElement | null;
    if (!card) return rail.clientWidth;
    const gap = parseFloat(getComputedStyle(rail).gap) || 20;
    const per = Math.max(
      1,
      Math.round(rail.clientWidth / (card.offsetWidth + gap))
    );
    return per * (card.offsetWidth + gap);
  }, []);

  const cardStep = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return 0;
    const card = rail.querySelector('.learn-card') as HTMLElement | null;
    if (!card) return rail.clientWidth;
    const gap = parseFloat(getComputedStyle(rail).gap) || 20;
    return card.offsetWidth + gap;
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
    railRef.current?.scrollBy({ left: -cardStep(), behavior: 'smooth' });
  };

  const next = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const step = cardStep();
    const atEnd = rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 8;
    if (atEnd) {
      rail.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    rail.scrollBy({ left: step, behavior: 'smooth' });
  }, [cardStep]);

  /* Autoplay 6 s — pause au survol / focus / reduced-motion */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || paused) return;

    const id = window.setInterval(() => {
      next();
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [next, paused]);

  return (
    <section
      className={`${inter.className} bg-[#FBF7EF] py-[clamp(3.5rem,6.5vw,6.5rem)]`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mx-auto w-full max-w-[min(100%,92rem)] px-[clamp(1.35rem,5.5vw,4.75rem)]">
        <h2
          className={`${bricolage.className} mb-[clamp(1.75rem,3.2vw,2.75rem)] text-[clamp(2rem,4.8vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#5A6B60]`}
        >
          En savoir plus
        </h2>

        <div className="mb-[clamp(1.25rem,2.2vw,1.75rem)] flex items-center gap-3">
          <div className="flex gap-2" role="tablist" aria-label="Pages d articles">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Page ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full p-0 transition-all duration-300 ${
                  i === currentPage ? 'w-6 bg-[#0A2B21]' : 'w-2 bg-[#E6DCC7]'
                }`}
              />
            ))}
          </div>

          <div className="ml-auto flex gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={!canPrev}
              aria-label="Articles precedents"
              className="grid h-11 w-11 place-items-center rounded-xl bg-[#F3ECDD] text-lg text-[#0A2B21] transition-all duration-300 hover:enabled:bg-[#119D63] hover:enabled:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canNext}
              aria-label="Articles suivants"
              className="grid h-11 w-11 place-items-center rounded-xl bg-[#F3ECDD] text-lg text-[#0A2B21] transition-all duration-300 hover:enabled:bg-[#119D63] hover:enabled:text-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-[clamp(0.9rem,1.6vw,1.4rem)] overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ARTICLES.map((a, i) => (
            <article
              key={`${a.cat}-${a.tag}-${i}`}
              className="learn-card group grid w-[min(86vw,540px)] flex-none snap-start grid-cols-1 overflow-hidden rounded-2xl bg-[#F3ECDD] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-22px_rgba(10,43,33,0.38)] sm:grid-cols-[1fr_240px] md:grid-cols-[1fr_260px]"
            >
              <div className="flex min-h-[220px] flex-col p-[clamp(1.15rem,2vw,1.5rem)] sm:min-h-[260px]">
                <div className="mb-4 flex justify-between gap-3">
                  <span className="text-[0.82rem] text-[#5A6B60]">{a.cat}</span>
                  <span
                    className="text-[0.82rem] font-medium"
                    style={{ color: a.acc }}
                  >
                    {a.tag}
                  </span>
                </div>

                <h3
                  className={`${bricolage.className} text-[clamp(1.05rem,1.55vw,1.28rem)] font-normal leading-[1.3] tracking-[-0.02em] text-[#5A6B60] transition-colors duration-300 group-hover:text-[#0A2B21]`}
                >
                  {a.titre}
                </h3>

                <button
                  type="button"
                  aria-label={`Lire : ${a.titre}`}
                  className="mt-auto grid h-10 w-16 place-items-center rounded-xl bg-[rgba(17,157,99,0.14)] text-lg text-[#119D63] transition-all duration-300 group-hover:w-20 group-hover:bg-[#119D63] group-hover:text-white"
                >
                  →
                </button>
              </div>

              <div className="relative min-h-[170px] overflow-hidden bg-[#E8E0D2] sm:min-h-0">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 640px) 86vw, 260px"
                    className="object-cover object-center"
                    quality={82}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-[#0A2B21]/12"
                    aria-hidden="true"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LearnMoreSection;
