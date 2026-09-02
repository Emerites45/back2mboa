'use client';

import React from 'react';
import Image from 'next/image';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

export function ArticlesSection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[520px] md:min-h-[640px] lg:min-h-[758px] overflow-hidden">
      
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/living-land/slide-01-forest.webp"
          alt="African Forest"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Ligne de séparation */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/25 z-20 pointer-events-none" />

      {/* ========== MOITIÉ GAUCHE — PLUS TRANSPARENTE ========== */}
      <div className="absolute inset-y-0 left-0 w-1/2 z-10">
        {/* Overlay cristal plus léger → on voit l’image */}
        <div
          className="absolute inset-0 backdrop-blur-[5px]"
          style={{ background: 'rgba(255, 255, 255, 0.08)' }}  // plus transparent
        />

        <div className="relative h-full flex flex-col justify-between px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
          
          {/* Travel Jorney */}
          <p className={`${bricolage.className} text-white/90 text-lg sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]`}>
            Travel Jorney
          </p>

          {/* Afri + Forest */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
            <h2
              className={`${bricolage.className} text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-right pr-[2%]`}
              style={{
                color: 'transparent',
                backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.75) 0%,
                  rgba(255,255,255,0.4) 50%,
                  rgba(255,255,255,0.18) 100%
                )`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: `
                  0 1px 2px rgba(255,255,255,0.35),
                  0 0 18px rgba(255,255,255,0.12)
                `,
              }}
            >
              Afri
            </h2>

            <h2
              className={`${bricolage.className} text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-right pr-[8%] -mt-4 sm:-mt-6`}
              style={{
                color: 'transparent',
                backgroundImage: `linear-gradient(
                  to bottom,
                  rgba(255,255,255,0.7) 0%,
                  rgba(255,255,255,0.35) 50%,
                  rgba(255,255,255,0.15) 100%
                )`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                textShadow: `
                  0 1px 2px rgba(255,255,255,0.3),
                  0 0 16px rgba(255,255,255,0.1)
                `,
              }}
            >
              Forest
            </h2>
          </div>

          {/* Texte + bouton */}
          <div className="relative z-10 max-w-md space-y-5 mt-auto">
            <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              In essence, an African safari is any journey into the wilderness to observe free-roaming wildlife. This traditional definition of a safari in Africa has expanded over time.
            </p>

            <button
              className={`${bricolage.className} bg-[#F5C518] hover:bg-[#e6b800] text-black font-bold text-sm px-5 py-2.5 rounded-md transition-colors`}
            >
              More Details
            </button>
          </div>
        </div>
      </div>

      {/* ========== MOITIÉ DROITE — NETTE ========== */}
      <div className="absolute inset-y-0 right-0 w-1/2 z-10">
        <div className="absolute top-1/2 left-0 -translate-y-[85%] pointer-events-none">
          <h2
            className={`${bricolage.className} text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-white pl-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]`}
          >
            can
          </h2>
        </div>

        {/* Losanges */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-5">
          <span className="w-3 h-3 rotate-45 border-2 border-white/80 bg-white/20" />
          <span className="w-3 h-3 rotate-45 border-2 border-white/50" />
          <span className="w-3 h-3 rotate-45 border-2 border-white/80 bg-white/20" />
          <span className="w-3 h-3 rotate-45 border-2 border-white/50" />
        </div>
      </div>
    </section>
  );
}

export default ArticlesSection;