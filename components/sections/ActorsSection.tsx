"use client";

import { useState } from "react";
import Image from "next/image";
import { ACTORS_DATA } from "@/lib/constants/actors";

export function ActorsSection() {
  const [activeTab, setActiveTab] = useState<string>("solutionneur");
  const currentActor = ACTORS_DATA[activeTab];

  return (
    <section id="acteurs" className="relative py-24 px-6 lg:px-16 overflow-hidden">
      {/* 
        1. IMAGE DE FOND EN FILIGRANE CLAIR
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/bg-2.jpg" // Ou ton image de filigrane préférée
          alt="Filigrane d'arrière-plan"
          fill
          className="object-cover object-center grayscale opacity-15"
        />
        {/* Voile blanc semi-translucide */}
        <div className="absolute inset-0 bg-slate-50/90 backdrop-blur-[2px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        {/* En-tête de section */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            DANS LA TÊTE DE NOS ACTEURS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
            CE QU’ILS PENSENT,<br />
            <span className="text-amber-500">RESSENTENT, VIVENT.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Avant Back2Mboa, trois acteurs portaient les mêmes frustrations. Voici leurs histoires — peut-être la tienne.
          </p>
        </div>

        {/* 2. BARRE D'ONGLETS (TABS) */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.values(ACTORS_DATA).map((actor) => {
            const isActive = activeTab === actor.id;
            return (
              <button
                key={actor.id}
                onClick={() => setActiveTab(actor.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-sm ${
                  isActive
                    ? actor.id === "solutionneur"
                      ? "bg-emerald-600 text-white shadow-emerald-200"
                      : actor.id === "maire"
                      ? "bg-blue-600 text-white shadow-blue-200"
                      : "bg-amber-500 text-black shadow-amber-200"
                    : "bg-white text-slate-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span>{actor.icon}</span>
                <span>{actor.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. EN-TÊTE DE L'ACTEUR SÉLECTIONNÉ */}
        <div className="text-center space-y-1 mb-10">
          <div className="text-4xl mb-2">{currentActor.icon}</div>
          <h3
            className={`text-2xl sm:text-3xl font-black uppercase ${
              currentActor.id === "solutionneur"
                ? "text-emerald-600"
                : currentActor.id === "maire"
                ? "text-blue-600"
                : "text-amber-600"
            }`}
          >
            {currentActor.roleTitle}
          </h3>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {currentActor.subTitle}
          </p>
        </div>

        {/* 4. GRILLE DES 4 CARTES D'ÉTAT (PENSE, RESSENT, DIT, FAIT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Card: IL PENSE */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💭</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                IL PENSE
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
              {currentActor.thinks.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: IL RESSENT */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">❤️</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                IL RESSENT
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
              {currentActor.feels.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: IL DIT */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🗣️</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                IL DIT
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium italic">
              {currentActor.says.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold font-normal">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card: IL FAIT */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">⚡</span>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-600">
                IL FAIT
              </h4>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-700 font-medium">
              {currentActor.does.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. BLOCS DU BAS : DOULEUR VS SOLUTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Box Douleur */}
          <div className="bg-rose-50/80 p-6 sm:p-8 rounded-2xl border border-rose-200/60 flex items-start gap-4">
            <span className="text-2xl sm:text-3xl">😤</span>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-rose-600 mb-1">
                SA DOULEUR RÉELLE
              </h5>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {currentActor.painPoint}
              </p>
            </div>
          </div>

          {/* Box Solution Back2Mboa */}
          <div className="bg-emerald-50/80 p-6 sm:p-8 rounded-2xl border border-emerald-200/60 flex items-start gap-4">
            <span className="text-2xl sm:text-3xl">🚀</span>
            <div>
              <h5 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-1">
                CE QUE BACK2MBOA LUI APPORTE
              </h5>
              <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
                {currentActor.solution}
              </p>
            </div>
          </div>
        </div>

        {/* 6. CALL TO ACTION BAS DE SECTION */}
        <div className="text-center space-y-3 pt-6 border-t border-gray-200/60">
          <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Tu te reconnais dans l’une de ces histoires ?
          </h4>
          <p className="text-xs sm:text-sm text-gray-600">
            C’est exactement pour toi que Back2Mboa existe. Et maintenant — la plateforme qui change tout.
          </p>
          <div className="w-12 h-1 bg-amber-400 mx-auto rounded-full mt-4" />
        </div>
      </div>
    </section>
  );
}
