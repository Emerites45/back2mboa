'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import HeroBackgroundSlider from '@/components/hero/HeroBackgroundSlider';
import { CountdownTimer } from '@/components/hero/CountdownTimer';
import { SLIDES_DATA } from '@/data/slides';

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const currentSlide = SLIDES_DATA[activeSlideIndex];

  return (
    <div className="relative w-full bg-black text-white overflow-x-hidden font-sans">
      <section className="relative w-screen h-screen overflow-hidden flex flex-col justify-between p-6 md:p-12 pt-24 md:pt-28 pb-14">
        <HeroBackgroundSlider onSlideChange={(index) => setActiveSlideIndex(index)} />

        <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-[2px]">
          <Link href="/" className="flex items-center text-2xl md:text-3xl font-black tracking-wider group">
            <span className="text-emerald-500">BACK</span>
            <span className="text-amber-400 text-3xl md:text-4xl mx-0.5 group-hover:scale-110 transition-transform">2</span>
            <span className="text-emerald-500">MBOA</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide">
            <Link href="#" className="text-white border-b-2 border-white pb-0.5">Home</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Package</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Ticket</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">About Us</Link>
            <Link href="#" className="text-gray-300 hover:text-white transition">Contact Us</Link>
          </nav>

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 hover:bg-neutral-800 backdrop-blur-md rounded-lg text-xs md:text-sm font-bold border border-white/10 transition shadow-lg"
          >
            <svg className="w-4 h-4 fill-red-500" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Youtube</span>
          </a>
        </header>

        <div className="relative z-20 text-center w-full pointer-events-none mt-2">
          <p className="text-amber-400 font-bold tracking-[0.25em] text-xs sm:text-sm uppercase mb-1 drop-shadow">
            Musée National du Cameroun · Yaoundé
          </p>
          <h1 className="font-[family-name:var(--font-oswald)] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl">
            BACK<span className="text-amber-400">2</span>MBOA
          </h1>
        </div>

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center pointer-events-none">
          <div className="md:col-span-5 space-y-4 text-left pointer-events-auto">
            <div className="space-y-1">
              <p className="text-amber-400 font-bold tracking-wider text-xs uppercase">{currentSlide.subtitle}</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{currentSlide.titleMain}</h2>
            </div>

            <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-md drop-shadow">
              {currentSlide.description}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-5 rounded-md shadow-lg">
                <Link href="/inscription">JE M&apos;INSCRIS</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 text-white bg-black/20 hover:bg-white/10 backdrop-blur-sm px-6 py-5 rounded-md">
                <Link href="#plateforme">EXPLORER LA PLATEFORME</Link>
              </Button>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-9 space-y-3 text-left pointer-events-auto">
            <p className="italic text-gray-200 text-xs sm:text-sm leading-relaxed font-medium border-l-2 border-amber-400 pl-3 drop-shadow">
              {currentSlide.quote}
            </p>
            <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed whitespace-pre-line font-normal drop-shadow">
              {currentSlide.extraText}
            </p>
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-4 items-end pointer-events-none">
          <div className="md:col-span-4 pointer-events-auto bg-black/50 backdrop-blur-xl border border-white/10 p-4 rounded-2xl max-w-xs space-y-2 shadow-2xl">
            <p className="text-[10px] text-amber-400 tracking-widest font-extrabold uppercase">
              OUVERTURE DANS — 16 · 17 · 18 DÉCEMBRE 2026
            </p>
            <CountdownTimer targetDate="2026-12-16T09:00:00" />
          </div>

          <div className="md:col-span-5 md:col-start-8 pointer-events-auto flex justify-around items-center bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl text-center shadow-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{currentSlide.stats.stat1}</div>
              <div className="text-[10px] text-gray-300 uppercase font-bold">{currentSlide.stats.label1}</div>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{currentSlide.stats.stat2}</div>
              <div className="text-[10px] text-gray-300 uppercase font-bold">{currentSlide.stats.label2}</div>
            </div>
            <div className="w-[1px] h-8 bg-white/20" />
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{currentSlide.stats.stat3}</div>
              <div className="text-[10px] text-gray-300 uppercase font-bold">{currentSlide.stats.label3}</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-30 bg-[#1b3d2f]/95 text-white py-2 px-4 border-t border-emerald-500/30 text-xs font-extrabold uppercase tracking-widest whitespace-nowrap overflow-hidden">
          <div className="flex justify-around items-center gap-6 opacity-90">
            <span>Identifier</span><span className="text-amber-400">•</span>
            <span>Qualifier</span><span className="text-amber-400">•</span>
            <span>Connecter</span><span className="text-amber-400">•</span>
            <span>Accompagner</span><span className="text-amber-400">•</span>
            <span>40 Mairies</span><span className="text-amber-400">•</span>
            <span>10 Régions</span>
          </div>
        </div>
      </section>

      <div className="fixed bottom-12 right-6 z-50">
        <Button
          asChild
          className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold shadow-2xl px-6 py-6 rounded-xl uppercase text-xs tracking-wider"
        >
          <Link href="/inscription">S&apos;INSCRIRE →</Link>
        </Button>
      </div>
    </div>
  );
}
