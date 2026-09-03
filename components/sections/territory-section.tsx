'use client';

import React from 'react';
import Image from 'next/image';

const actors = [
  {
    id: 1,
    title: 'Bâtisseurs-Solutionneurs locaux et de la Diaspora',
    icon: '/images/icons/1.webp',
  },
  {
    id: 2,
    title: 'Décideurs & intendants territoriaux',
    icon: '/images/icons/4.webp',
  },
  {
    id: 3,
    title: 'Régulateurs',
    icon: '/images/icons/3.webp',
  },
  {
    id: 4,
    title: 'Investisseurs & PTF',
    icon: '/images/icons/2.webp',
  },
  {
    id: 5,
    title: 'Médias d’influence',
    icon: '/images/icons/5.webp',
  },
  {
    id: 6,
    title: 'Entreprises & autres partenaires',
    icon: '/images/icons/6.webp',
  },
];

export function TerritorySection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0A2B21] text-white overflow-hidden">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-10 px-0 py-16 sm:px-4 lg:grid-cols-12 lg:gap-12 lg:px-6 xl:gap-16 xl:px-8">

        {/* ========== GAUCHE — TEXTE + ICÔNES ========== */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-10 pl-5 sm:pl-6 lg:pl-0 lg:pr-4">
          
          {/* Coordonnées */}
          <p className="font-mono text-[11px] sm:text-xs text-amber-400/90 tracking-wider">
            05,9500°N 10,2333°E – FUNDONG · 48,8566°N 2,3522°E – PARIS
          </p>

          {/* Titre */}
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.65rem] max-w-2xl">
            Les Territoires ont des besoins économiques.
            <br />
            Les Bâtisseurs-Solutionneurs ont des réponses concrètes.
          </h2>

          {/* Intro */}
          <p className="text-sm text-white/75 sm:text-base leading-relaxed max-w-xl">
            <strong className="text-white font-semibold">BACK2MBOA ASAP</strong> est
            une Plateforme & un Écosystème de Prospérité Territoriale qui réunit :
          </p>

          {/* Liste acteurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 pt-4">
            {actors.map((actor) => (
              <div
                key={actor.id}
                className="group flex flex-col items-start gap-3.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-1 group-hover:border-emerald-400/60 group-hover:bg-emerald-500/25 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.4)]">
                  <Image
                    src={actor.icon}
                    alt={actor.title}
                    width={32}
                    height={28}
                    className="object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>
                <p className="text-sm sm:text-[15px] text-white/90 leading-snug max-w-[260px]">
                  {actor.title}
                </p>
              </div>
            ))}
          </div>

          {/* Texte bas */}
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xl pt-4">
            Autour d’opportunités d’affaires réelles et qualifiées, portées par les
            territoires/CTD, pour les transformer en projets rentables et accélérer
            le développement territorial.
          </p>
        </div>

        {/* ========== DROITE — CARTE ========== */}
        <div className="relative lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[520px] xl:max-w-[580px] aspect-square">
            <img
              src="/images/paris.svg"
              alt="Route Paris ↔ Guider"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerritorySection;