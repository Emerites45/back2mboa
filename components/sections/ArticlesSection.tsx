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
    <section className="relative w-full min-h-[min(100svh,36rem)] h-auto md:h-[70vh] md:min-h-[640px] lg:min-h-[758px] overflow-hidden">
      
      {/* Image de fond */}
      <div className="absolute inset-0">
        <Image
          src="/images/living-land/slide-01-forest.webp"
          alt="African Forest"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* Ligne de séparation — desktop only */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/25 z-20 pointer-events-none hidden md:block" />

      {/* Layout : stack mobile, 50/50 ≥md */}
      <div className="relative z-10 flex min-h-[min(100svh,36rem)] flex-col md:absolute md:inset-0 md:min-h-0 md:flex-row">
        {/* ========== GAUCHE ========== */}
        <div className="relative flex min-h-[50%] w-full flex-1 flex-col md:w-1/2">
          <div
            className="absolute inset-0 backdrop-blur-[5px]"
            style={{ background: 'rgba(255, 255, 255, 0.08)' }}
          />

          <div className="relative flex h-full flex-col justify-between px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-14">
            <p className={`${bricolage.className} text-white/90 text-lg sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]`}>
              Travel Jorney
            </p>

            <div className="pointer-events-none my-6 md:absolute md:top-1/2 md:left-0 md:right-0 md:my-0 md:-translate-y-1/2">
              <h2
                className={`${bricolage.className} text-[clamp(2.75rem,12vw,4.5rem)] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-right pr-[2%]`}
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
                }}
              >
                Afri
              </h2>

              <h2
                className={`${bricolage.className} text-[clamp(2.75rem,12vw,4.5rem)] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-right pr-[8%] -mt-2 sm:-mt-4 md:-mt-6`}
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
                }}
              >
                Forest
              </h2>
            </div>

            <div className="relative z-10 mt-auto max-w-md space-y-5">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                In essence, an African safari is any journey into the wilderness to observe free-roaming wildlife. This traditional definition of a safari in Africa has expanded over time.
              </p>

              <button
                type="button"
                className={`${bricolage.className} min-h-11 bg-[#F5C518] hover:bg-[#e6b800] text-black font-bold text-sm px-5 py-2.5 rounded-md transition-colors`}
              >
                More Details
              </button>
            </div>
          </div>
        </div>

        {/* ========== DROITE ========== */}
        <div className="relative hidden min-h-[40%] w-full flex-1 md:block md:w-1/2">
          <div className="absolute top-1/2 left-0 -translate-y-[85%] pointer-events-none">
            <h2
              className={`${bricolage.className} text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] font-extrabold leading-none text-white pl-1 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]`}
            >
              can
            </h2>
          </div>

          <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3" aria-hidden="true">
            <span className="flex h-11 w-11 items-center justify-center">
              <span className="w-3 h-3 rotate-45 border-2 border-white/80 bg-white/20" />
            </span>
            <span className="flex h-11 w-11 items-center justify-center">
              <span className="w-3 h-3 rotate-45 border-2 border-white/50" />
            </span>
            <span className="flex h-11 w-11 items-center justify-center">
              <span className="w-3 h-3 rotate-45 border-2 border-white/80 bg-white/20" />
            </span>
            <span className="flex h-11 w-11 items-center justify-center">
              <span className="w-3 h-3 rotate-45 border-2 border-white/50" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticlesSection;
