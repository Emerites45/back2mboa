'use client';

import React from 'react';

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
    <section className="relative w-full bg-[#0A2B21] text-white overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col gap-10 lg:gap-12">

        {/* ========== HAUT : COORDONNÉES ET TITRE ========== */}
        <div className="max-w-4xl flex flex-col">
          <p className="font-mono text-xs sm:text-sm text-amber-400/90 tracking-wider mb-3 sm:mb-4">
            05,9500°N 10,2333°E – FUNDONG · 48,8566°N 2,3522°E – PARIS
          </p>

          <h2 className="font-[family-name:var(--font-bricolage)] text-[1.6rem] sm:text-[2rem] md:text-[2.3rem] lg:text-[2.6rem] font-extrabold leading-[1.25] tracking-tight text-white">
            Les Territoires ont des besoins économiques.<br className="hidden sm:inline" />
            Les Bâtisseurs-Solutionneurs ont des réponses concrètes.
          </h2>
        </div>

        {/* ========== BAS : CONTENU ET ILLUSTRATION ========== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* COLONNE GAUCHE */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6 lg:space-y-8">
            
            {/* Regroupement de l'intro et des icônes pour resserrer leur espace */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Texte d'introduction */}
              <p className="font-[family-name:var(--font-poppins)] text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed max-w-2xl">
                <strong className="text-white font-semibold">BACK2MBOA ASAP</strong> est
                une Plateforme & un Écosystème de Prospérité Territoriale qui réunit :
              </p>

              {/* Grille des acteurs : Rapprochée du texte ci-dessus */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-5 sm:gap-y-6 pt-1">
                {actors.map((actor) => (
                  <div
                    key={actor.id}
                    className="group flex flex-row items-center gap-3 sm:gap-3.5"
                  >
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15 transition-all duration-300 ease-out group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:border-emerald-400/60 group-hover:bg-emerald-500/25 group-hover:shadow-[0_0_18px_rgba(52,211,153,0.35)]">
                      <img
                        src={actor.icon}
                        alt={actor.title}
                        width={32}
                        height={28}
                        className="object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                    <p className="font-[family-name:var(--font-poppins)] text-sm sm:text-base font-medium text-white/90 leading-snug">
                      {actor.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Texte de conclusion : Maintient sa position en bas grâce à flex flex-col justify-between */}
            <p className="font-[family-name:var(--font-poppins)] text-base sm:text-lg lg:text-xl text-white/95 leading-relaxed max-w-2xl pt-2">
              Autour d’opportunités d’affaires réelles et qualifiées, portées par les
              territoires/CTD, pour les transformer en projets rentables et accélérer
              le développement territorial.
            </p>
          </div>

          {/* COLONNE DROITE */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end h-full">
            <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-full max-w-[560px] xl:max-w-[620px] flex items-center justify-center">
              <img
                src="/images/paris.svg"
                alt="Route Paris ↔ Guider"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TerritorySection;