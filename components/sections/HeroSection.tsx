"use client";

import React, { useState, useEffect, useId } from "react";
import HeroBackgroundSlider from "@/components/hero/HeroBackgroundSlider";
import { SLIDES_DATA, SlideData } from "@/data/slides";

const APFEL =
  "var(--font-apfel-grotezk), 'Apfel Grotezk', system-ui, sans-serif";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 122,
    hours: 15,
    minutes: 40,
    seconds: 21,
  });
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
    <div
      className="grid grid-cols-4 divide-x divide-white/15 text-center"
      key={timerId}
      style={{ fontFamily: APFEL }}
    >
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-bold text-white drop-shadow">
          {timeLeft.days}
        </div>
        <div className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-white/85">
          JOURS
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-bold text-white drop-shadow">
          {timeLeft.hours}
        </div>
        <div className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-white/85">
          HEURES
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-bold text-white drop-shadow">
          {timeLeft.minutes}
        </div>
        <div className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-white/85">
          MIN
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-bold text-white drop-shadow">
          {timeLeft.seconds}
        </div>
        <div className="mt-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-white/85">
          SEC
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides: SlideData[] = SLIDES_DATA || [];
  const currentSlide = slides[activeSlideIndex] || slides[0] || {};

  const titleTop = currentSlide.titleTop || "LE RETOUR";
  const titleMain =
    currentSlide.titleMain || "DES BÂTISSEURS-SOLUTIONNEURS";
  const subtitle =
    currentSlide.subtitle || "African Solutions Activating Prosperity (ASAP)";
  const locationOrange =
    currentSlide.quote || "Babadjou — Région de l’Ouest, Cameroun.";
  const descriptionText = currentSlide.description || "";
  const extraTextContent = currentSlide.extraText || "";

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black"
      style={{ fontFamily: APFEL }}
    >
      <HeroBackgroundSlider
        onSlideChange={(index) => setActiveSlideIndex(index)}
      />

      <main className="pointer-events-none relative z-20 mx-auto flex min-h-screen w-full max-w-[1800px] flex-col justify-between px-4 pb-0 pt-28 sm:px-6 sm:pt-32 md:px-10 md:pt-36 lg:px-12 xl:px-16">
        {/* TITRES — flottent dans le ciel, clairance optique au-dessus du portail */}
        <div className="pointer-events-none mx-auto mb-10 mt-0 w-full max-w-7xl -translate-y-3 px-2 text-center sm:mb-14 sm:-translate-y-5 md:-translate-y-7 lg:-translate-y-9 xl:-translate-y-10">
          <p className="mb-2.5 select-none text-sm font-bold uppercase tracking-[0.28em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] sm:mb-3 sm:text-base md:text-lg">
            {titleTop}
          </p>
          <h1 className="mx-auto max-w-[min(100%,22ch)] select-none text-[clamp(1.25rem,4.2vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-[0.04em] text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.7)] sm:max-w-none sm:whitespace-nowrap">
            {titleMain}
          </h1>

          <p className="mt-3.5 select-none text-base font-medium tracking-wide sm:mt-4 sm:text-lg md:text-xl">
            {subtitle.split("").map((char, index) => (
              <span
                key={index}
                className="inline-block bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.08) 100%)`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  textShadow: `0 1px 1px rgba(255,255,255,0.4), 0 0 12px rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.3)`,
                  filter: "brightness(1.1)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </p>
        </div>

        <div className="pointer-events-none relative mt-2 mb-0 flex w-full flex-1 flex-col justify-start lg:mt-3 lg:mb-0">
          <div className="grid h-full w-full grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
            {/* COLONNE GAUCHE — Mairie (remontée au niveau du portail) */}
            <div className="pointer-events-auto flex w-full flex-col gap-4 text-left lg:col-span-3 lg:mr-auto lg:min-h-[20rem]">
              <div className="space-y-3">
                {locationOrange ? (
                  <h2 className="text-base font-bold uppercase tracking-widest text-orange-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-lg">
                    {locationOrange}
                  </h2>
                ) : null}
                {descriptionText.split("\n\n").map((paragraph: string, idx: number) => (
                  <p
                    key={idx}
                    className="text-sm font-medium leading-relaxed text-white/92 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="relative mt-auto w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <CountdownTimer targetDate="2026-12-16T09:00:00" />
              </div>
            </div>

            <div
              className="pointer-events-none relative hidden min-h-0 lg:col-span-6 lg:block"
              aria-hidden="true"
            />

            {/* COLONNE DROITE — Back2Mboa (remontée au même niveau que Mairie) */}
            <div className="pointer-events-auto flex w-full flex-col gap-4 text-left lg:col-span-3 lg:ml-auto lg:min-h-[20rem]">
              {extraTextContent ? (
                <div className="space-y-3">
                  {extraTextContent.split("\n\n").map((paragraph: string, idx: number) => {
                    const isTitleMarker =
                      paragraph.includes("SIX MOIS PLUS TARD") ||
                      paragraph.trim() === "Back2Mboa";
                    return (
                      <p
                        key={idx}
                        className={
                          isTitleMarker
                            ? "text-base font-bold uppercase tracking-widest text-orange-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-lg"
                            : "text-sm font-medium leading-relaxed text-white/92 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-base"
                        }
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              ) : null}

              <div className="relative mt-auto w-full overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="relative z-10 grid grid-cols-4 divide-x divide-white/15 text-center">
                  <div className="px-1">
                    <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
                      122
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
                      Emplois
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
                      2
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
                      Mrds C.A.
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
                      40
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
                      Recettes fiscales
                    </div>
                  </div>
                  <div className="px-1">
                    <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
                      20
                    </div>
                    <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
                      Tonnes exportées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BANDEAU */}
      <div className="pointer-events-auto relative z-30 overflow-hidden whitespace-nowrap border-t border-emerald-900/15 bg-[#F5F0E6] py-4 text-[#0a1f18]">
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
              className="flex shrink-0 items-center gap-x-5 px-2 text-[1rem] font-bold uppercase leading-none tracking-[0.14em] sm:gap-x-7 sm:text-[1.125rem] md:text-[1.2rem]"
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
