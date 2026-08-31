'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bricolage_Grotesque } from 'next/font/google';
import {
  Users,
  Landmark,
  Scale,
  Briefcase,
  Megaphone,
  Building2,
} from 'lucide-react';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const ACTORS = [
  {
    id: 1,
    title: 'Bâtisseurs-Solutionneurs locaux et de la Diaspora',
    icon: Users,
  },
  {
    id: 2,
    title: 'Décideurs & intendants territoriaux',
    icon: Landmark,
  },
  {
    id: 3,
    title: 'Régulateurs',
    icon: Scale,
  },
  {
    id: 4,
    title: 'Investisseurs & PTF',
    icon: Briefcase,
  },
  {
    id: 5,
    title: 'Médias d’influence',
    icon: Megaphone,
  },
  {
    id: 6,
    title: 'Entreprises & autres partenaires',
    icon: Building2,
  },
];

export function TerritorySection() {
  return (
    <section className="relative w-full min-h-screen bg-[#0a1f18] text-white px-4 sm:px-6 lg:px-8 xl:px-12 py-16 md:py-24 overflow-hidden">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-10 items-center">
        
        {/* ========== COLONNE GAUCHE (plus large) ========== */}
        <div className="lg:col-span-6 xl:col-span-6 space-y-8">
          
          {/* Coordonnées */}
          <p className="font-mono text-[11px] sm:text-xs text-amber-400/90 tracking-wider">
            05,9500°N 10,2333°E – FUNDONG · 48,8566°N 2,3522°E – PARIS
          </p>

          {/* Titre — exactement 3 lignes */}
          <h2 className={`${bricolage.className} text-3xl sm:text-4xl md:text-[2.65rem] font-extrabold leading-[1.22] tracking-tight max-w-2xl`}>
            Les Territoires ont des besoins
            <br />
            économiques. Les Bâtisseurs-
            <br />
            Solutionneurs ont des réponses concrètes.
          </h2>

          {/* Introduction */}
          <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-xl">
            <span className="text-white font-semibold">BACK2MBOA ASAP</span> est une Plateforme & un Écosystème de Prospérité Territoriale qui réunit :
          </p>

          {/* Liste des acteurs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 pt-2">
            {ACTORS.map((actor, idx) => {
              const Icon = actor.icon;
              return (
                <motion.div
                  key={actor.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-start gap-2.5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-emerald-400" strokeWidth={2} />
                  </div>
                  <p className="text-sm text-white/90 leading-snug">
                    {actor.title}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Texte de bas */}
          <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-xl pt-2">
            Autour d’opportunités d’affaires réelles et qualifiées, portées par les territoires/CTD, pour les transformer en projets rentables et accélérer le développement territorial.
          </p>
        </div>

        {/* ========== COLONNE DROITE (carte plus éloignée) ========== */}
        <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-end pl-4 lg:pl-10 xl:pl-16">
          <div className="relative w-full max-w-[520px]">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/potentialites/carte_cameroun.png"
                alt="Carte Diaspora - Territoire"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TerritorySection;