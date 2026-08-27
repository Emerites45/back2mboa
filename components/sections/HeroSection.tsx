'use client';

import React, { useState, useEffect, useId } from 'react';
import Link from 'next/link';
import { ArrowRight, CircleDot } from 'lucide-react';
import { Bricolage_Grotesque, Anton, Montserrat } from 'next/font/google';
import HeroBackgroundSlider from '@/components/hero/HeroBackgroundSlider';
import { SLIDES_DATA, SlideData } from '@/data/slides';
import { bricolage, anton, montserrat } from '@/lib/fonts';
const fontBricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const fontAnton = Anton({
  subsets: ['latin'],
  weight: ['400'],
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
    <div className="grid grid-cols-4 gap-2 text-center" key={timerId}>
      <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 p-2 rounded-xl shadow-inner">
        <span className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.days}</span>
        <span className="block text-[8px] text-amber-300 font-extrabold uppercase mt-0.5 tracking-wider">JOURS</span>
      </div>
      <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 p-2 rounded-xl shadow-inner">
        <span className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.hours}</span>
        <span className="block text-[8px] text-amber-300 font-extrabold uppercase mt-0.5 tracking-wider">HEURES</span>
      </div>
      <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 p-2 rounded-xl shadow-inner">
        <span className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.minutes}</span>
        <span className="block text-[8px] text-amber-300 font-extrabold uppercase mt-0.5 tracking-wider">MIN</span>
      </div>
      <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 p-2 rounded-xl shadow-inner">
        <span className="text-xl sm:text-2xl font-black text-white drop-shadow">{timeLeft.seconds}</span>
        <span className="block text-[8px] text-amber-300 font-extrabold uppercase mt-0.5 tracking-wider">SEC</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const slides: SlideData[] = SLIDES_DATA || [];
  const currentSlide = slides[activeSlideIndex] || slides[0] || {};

  // Normalisation des textes de la slide active
  const titleTop = currentSlide.titleTop || "LE RETOUR";
  const titleMain = currentSlide.titleMain || "DES BÂTISSEURS-SOLUTIONNEURS";
  const subtitle = currentSlide.subtitle || "African Solutions Activating Prosperity (ASAP)";
  const locationOrange = currentSlide.quote || currentSlide.subtitle || "Babadjou — Région de l’Ouest, Cameroun.";
  const descriptionText = currentSlide.description || "";
  const extraTextContent = currentSlide.extraText || "";

  const stats = currentSlide.stats || {
    stat1: "4 000 T",
    label1: "Pommes de terre / an",
    stat2: "USA ➔ CMR",
    label2: "Transfert d'expertise",
    stat3: "+100",
    label3: "Emplois territoriaux"
  };

  return (

    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-between">
      {/* 1. FOND VIDÉO ET PORTAIL INTERACTIF */}
      <HeroBackgroundSlider onSlideChange={(index) => setActiveSlideIndex(index)} />

      {}
      {/* 2. CONTENU DE LA HERO SECTION (DÉCALÉ EN BAS POUR LA NAVBAR - POINTER EVENTS NONE SUR LE MAIN POUR LAISSER CLIQUER LE PORTAIL DERRIÈRE) */}
      <main className="relative z-20 max-w-[1800px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pt-28 sm:pt-32 md:pt-36 pb-12 flex flex-col justify-between min-h-screen w-full pointer-events-none">
        
        {/* TITRE PRINCIPAL EN LETTRES CRISTAL LIQUID GLASS */}
        <div className="text-center w-full max-w-6xl mx-auto pointer-events-none mt-2 mb-8 sm:mb-12">
        {/* SUR-TITRE — verre transparent + police Huninn + plus grand */}
{/* SUR-TITRE — lettres en verre transparent + brillance subtile (même style) */}
<p
  className={`${fontBricolage.className} tracking-[0.25em] text-xs sm:text-sm md:text-base uppercase mb-3 font-extrabold select-none`}
>
  {titleTop.split('').map((char, index) => (
    <span
      key={index}
      className="inline-block text-transparent bg-clip-text"
      style={{
        // Verre transparent teinté orange/ambre
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(251,146,60,0.55) 0%,
          rgba(253,186,116,0.32) 45%,
          rgba(251,146,60,0.12) 100%
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',

        // Brillance légère
        textShadow: `
          0 1px 1px rgba(255,220,150,0.4),
          0 0 10px rgba(251,146,60,0.2),
          0 2px 6px rgba(0,0,0,0.3)
        `,
        filter: 'brightness(1.08)',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))}
</p>
          
  {/* TITRE — verre transparent + brillance subtile */}
<h1
  className={`${fontAnton.className} tracking-wider uppercase leading-none whitespace-nowrap text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl select-none`}
>
  {titleMain.split('').map((char, index) => (
    <span
      key={index}
      className="inline-block text-transparent bg-clip-text"
      style={{
        // Verre transparent (niveau que tu as validé)
        backgroundImage: `linear-gradient(
          to bottom,
          rgba(255,255,255,0.28) 0%,
          rgba(255,255,255,0.12) 45%,
          rgba(255,255,255,0.05) 100%
        )`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',

        // Brillance légère + profondeur
        textShadow: `
          0 1px 1px rgba(255,255,255,0.45),
          0 0 10px rgba(255,255,255,0.15),
          0 2px 6px rgba(0,0,0,0.25)
        `,
        filter: 'brightness(1.08)',
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))}
</h1>
          <p className="text-white/70 text-xs sm:text-sm font-medium tracking-wide mt-4 drop-shadow">
            {subtitle}
          </p>
        </div>

        {/* GRILLE HARMONIEUSE ÉLARGIE : GAUCHE POUSSÉ À GAUCHE - CENTRE (PORTAIL DEGAGÉ & CLIQUABLE) - DROITE POUSSÉE À DROITE */}

        {/* GRILLE DÉGAGÉE AU MAXIMUM : 3 COLONNES GAUCHE - 6 COLONNES CENTRE DÉGAGÉES (PORTAIL 3D) - 3 COLONNES DROITE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center my-auto relative w-full pointer-events-none">
          
          {/* COLONNE GAUCHE : POUSSÉE AU MAXIMUM SUR LE BORD GAUCHE */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-6 text-left pointer-events-auto max-w-xs sm:max-w-sm w-full lg:mr-auto lg:ml-0">
            
            {/* TEXTE EXPLICATIF DE GAUCHE (SANS CARD, AVEC DROP-SHADOW MANUEL) */}
            <div className="space-y-3">
              {locationOrange && (
                <h2 className="text-orange-400 font-black text-base sm:text-lg md:text-xl tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  {locationOrange}
                </h2>
              )}

              {descriptionText.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx} className={`${fontMontserrat.className} text-white/90 text-xs sm:text-sm leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-medium`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* CARTE LIQUID GLASS COUNTDOWN (OUVERTURE DANS) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] backdrop-blur-2xl border border-white/20 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] group hover:border-white/35 transition-all duration-300">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <p className="relative z-10 text-[10px] text-orange-400 tracking-widest font-black uppercase mb-2 drop-shadow">
                OUVERTURE DANS
              </p>

              <div className="relative z-10 mb-3">
                <CountdownTimer targetDate="2026-12-16T09:00:00" />
              </div>

              <div className="relative z-10 flex items-center gap-2 text-[10px] text-white/90 font-medium pt-2 border-t border-white/10">
                <CircleDot className="w-3 h-3 text-orange-400 animate-pulse flex-shrink-0" />
                <span>Musée National, Yaoundé · 300 places</span>
              </div>
            </div>
          </div>

          {/* COLONNE CENTRALE : 6 COLONNES ENTIÈREMENT DÉGAGÉES POUR LE PORTAIL 3D */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-end items-center relative my-6 lg:my-0 pointer-events-none min-h-[340px] lg:min-h-[440px]">
            <div className="absolute bottom-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/25 text-xs font-black tracking-widest text-white shadow-xl pointer-events-auto hover:bg-white/15 transition-all">
              <span className="text-orange-400">0{activeSlideIndex + 1}</span>
              <span className="text-white/40">/0{slides.length || 1}</span>
            </div>
          </div>

          {/* COLONNE DROITE : POUSSÉE AU MAXIMUM SUR LE BORD DROIT */}
          <div className="lg:col-span-3 xl:col-span-3 space-y-6 text-left pointer-events-auto max-w-xs sm:max-w-sm w-full lg:ml-auto lg:mr-0">
            
            {/* TEXTE EXPLICATIF DE DROITE (SANS CARD, AVEC DROP-SHADOW MANUEL) */}
            {extraTextContent && (
              <div className="space-y-3">
                {extraTextContent.split('\n\n').map((paragraph: string, idx: number) => {
                  const isTitleMarker = paragraph.includes('SIX MOIS PLUS TARD');
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

            {/* CARTE LIQUID GLASS STATISTIQUES (4 000 T) */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-white/[0.05] backdrop-blur-2xl border border-white/20 p-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] group hover:border-white/35 transition-all duration-300">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

              <div className="grid grid-cols-3 divide-x divide-white/15 text-center relative z-10">
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{stats.stat1}</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">{stats.label1}</div>
                </div>
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{stats.stat2}</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">{stats.label2}</div>
                </div>
                <div className="px-1">
                  <div className="text-xl sm:text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{stats.stat3}</div>
                  <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">{stats.label3}</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 4. BANDEAU DÉFILANT CONTINU (MARQUEE) EN BAS */}
      <div className="relative z-30 bg-[#1b3d2f]/95 text-white py-2.5 border-t border-emerald-500/30 text-xs font-extrabold uppercase tracking-widest whitespace-nowrap overflow-hidden pointer-events-auto">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-infinite {
            display: flex;
            width: max-content;
            animation: marquee 25s linear infinite;
          }
        `}</style>
        <div className="animate-marquee-infinite flex gap-8">
          <div className="flex items-center gap-6 shrink-0">
            <span>Identifier</span><span className="text-orange-400">•</span>
            <span>Qualifier</span><span className="text-orange-400">•</span>
            <span>Connecter</span><span className="text-orange-400">•</span>
            <span>Accompagner</span><span className="text-orange-400">•</span>
            <span>40 Mairies</span><span className="text-orange-400">•</span>
            <span>10 Régions</span><span className="text-orange-400">•</span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span>Identifier</span><span className="text-orange-400">•</span>
            <span>Qualifier</span><span className="text-orange-400">•</span>
            <span>Connecter</span><span className="text-orange-400">•</span>
            <span>Accompagner</span><span className="text-orange-400">•</span>
            <span>40 Mairies</span><span className="text-orange-400">•</span>
            <span>10 Régions</span><span className="text-orange-400">•</span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span>Identifier</span><span className="text-orange-400">•</span>
            <span>Qualifier</span><span className="text-orange-400">•</span>
            <span>Connecter</span><span className="text-orange-400">•</span>
            <span>Accompagner</span><span className="text-orange-400">•</span>
            <span>40 Mairies</span><span className="text-orange-400">•</span>
            <span>10 Régions</span><span className="text-orange-400">•</span>
          </div>
        </div>
      </div>

      {/* 5. BOUTON D'ACTION FLOTTANT (S'INSCRIRE) */}
      <div className="fixed bottom-12 right-6 z-50">
        <Link
          href="/inscription"
          className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-black font-black text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-[0_10px_30px_rgba(251,146,60,0.4)] hover:scale-105 transition-all"
        >
          <span>S&apos;inscrire</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}