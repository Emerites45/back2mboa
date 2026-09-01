'use client';

import React, { useState, useEffect, useId } from 'react';

import { Noto_Sans_Symbols, Montserrat } from 'next/font/google';
import HeroBackgroundSlider from '@/components/hero/HeroBackgroundSlider';
import { SLIDES_DATA, SlideData } from '@/data/slides';

const fontNotoSymbols = Noto_Sans_Symbols({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 122, hours: 15, minutes: 40, seconds: 21 });
  const timerId = useId();

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="grid grid-cols-4 divide-x divide-white/15 text-center" key={timerId}>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.days}</div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">JOURS</div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.hours}</div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">HEURES</div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.minutes}</div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">MIN</div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.seconds}</div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">SEC</div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides: SlideData[] = SLIDES_DATA || [];
  const currentSlide = slides[activeSlideIndex] || slides[0] || {};

  const titleTop = currentSlide.titleTop || "LE RETOUR";
  const titleMain = currentSlide.titleMain || "DES BÂTISSEURS-SOLUTIONNEURS";
  const subtitle = currentSlide.subtitle || "African Solutions Activating Prosperity (ASAP)";
  const locationOrange = currentSlide.quote || "Babadjou — Région de l’Ouest, Cameroun.";
  const descriptionText = currentSlide.description || "";
  const extraTextContent = currentSlide.extraText || "";

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      
      <HeroBackgroundSlider onSlideChange={(index) => setActiveSlideIndex(index)} />

      <main className="relative z-20 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-28 sm:pt-32 md:pt-36 pb-0 flex flex-col justify-between min-h-screen w-full pointer-events-none">
        
        {/* TITRES */}
        <div className="text-center w-full max-w-7xl mx-auto pointer-events-none mt-2 mb-8 sm:mb-12 px-2">
          <p className={`${fontNotoSymbols.className} tracking-[0.28em] text-xs sm:text-sm md:text-base uppercase mb-3 font-bold text-white/90 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]`}>
            {titleTop}
          </p>
          <h1
            className="mx-auto max-w-[min(100%,22ch)] tracking-[0.04em] uppercase leading-[0.95] text-[clamp(1.15rem,4.2vw,3.75rem)] font-bold text-white select-none drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] sm:max-w-none sm:whitespace-nowrap"
          >
            {titleMain}
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg font-medium tracking-wide select-none">
            {subtitle.split('').map((char, index) => (
              <span
                key={index}
                className="inline-block text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.08) 100%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  textShadow: `0 1px 1px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.3)`,
                  filter: 'brightness(1.1)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </p>
        </div>

        {/* GRILLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-0 my-auto relative w-full pointer-events-none">
          
          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-3 space-y-5 text-left pointer-events-auto w-full lg:mr-auto">
            <div className="space-y-3">
              {locationOrange && (
                <h2 className="text-orange-400 font-black text-base sm:text-lg tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {locationOrange}
                </h2>
              )}
              {descriptionText.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx} className={`${fontMontserrat.className} text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CARTE GAUCHE */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] backdrop-blur-2xl border border-white/20 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] w-full">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <CountdownTimer targetDate="2026-12-16T09:00:00" />
            </div>
          </div>

          {/* COLONNE CENTRE */}
          <div className="lg:col-span-6 flex flex-col justify-end items-center relative pointer-events-none min-h-[320px] lg:min-h-[400px]">
          </div>

          {/* COLONNE DROITE */}
          <div className="lg:col-span-3 space-y-5 text-left pointer-events-auto w-full lg:ml-auto">
            {extraTextContent && (
              <div className="space-y-3">
                {extraTextContent.split('\n\n').map((paragraph: string, idx: number) => {
                  const isTitleMarker =
                    paragraph.includes("SIX MOIS PLUS TARD") ||
                    paragraph.trim() === "Back2Mboa";
                  return (
                    <p 
                      key={idx} 
                      className={`${fontMontserrat.className} ${
                        isTitleMarker 
                          ? 'text-orange-400 font-extrabold text-xs sm:text-sm tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] my-2' 
                          : 'text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium'
                      }`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            )}

            {/* CARTE DROITE */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] backdrop-blur-2xl border border-white/20 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] w-full">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <div className="grid grid-cols-4 divide-x divide-white/15 text-center relative z-10">
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow">122</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">Emplois</div>
                </div>
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow">2</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">Mrds C.A.</div>
                </div>
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow">40</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">Recettes fiscales</div>
                </div>
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow">20</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">Tonnes exportées</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* BANDEAU */}
      <div
        className="relative z-30 overflow-hidden whitespace-nowrap border-t border-emerald-900/15 bg-[#F5F0E6] py-4 text-[#0a1f18] pointer-events-auto"
      >
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee 28s linear infinite;
          }
        `}</style>
        <div className="animate-marquee-infinite flex" aria-hidden="true">
          {[0, 1].map((dup) => (
            <div
              key={dup}
              className="flex shrink-0 items-center gap-x-5 px-2 text-[0.95rem] font-bold uppercase leading-none tracking-[0.14em] sm:gap-x-7 sm:text-[1.05rem] md:text-[1.125rem]"
            >
              {(
                [
                  "Identifier",
                  "Qualifier",
                  "Connecter",
                  "Accompagner",
                  "40 Mairies",
                  "10 Régions",
                ] as const
              ).flatMap((label, i) => [
                <span key={`${dup}-${label}`}>{label}</span>,
                <span
                  key={`${dup}-dot-${i}`}
                  className="inline-block text-[0.65em] text-orange-500"
                  aria-hidden
                >
                  •
                </span>,
              ])}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}