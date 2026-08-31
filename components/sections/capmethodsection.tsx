'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bricolage_Grotesque } from 'next/font/google';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  display: 'swap',
});

const CAP_ITEMS = [
  {
    id: 1,
    label: "C'EST CRÉDIBLE !",
    description:
      'Compréhensible, documentée, portée par des acteurs identifiés et reliée à des données, des responsabilités et des résultats attendus.',
    image: '/images/cap-images/cap-credible.svg',
  },
  {
    id: 2,
    label: "C'EST ACCESSIBLE !",
    description:
      'Découverte, comprise et rejointe par les acteurs pertinents. Accès au décideur, au régulateur, au financement, au marché.',
    image: '/images/cap-images/cap-accessible.svg',
  },
  {
    id: 3,
    label: "C'EST POSSIBLE !",
    description:
      "Un chemin crédible vers l'exécution : de l'idée au partenariat, du financement à l'impact durable.",
    image: '/images/cap-images/cap-possible.svg',
  },
];

export function CapMethodSection() {
  return (
    <section className="relative w-full bg-[#01140e] text-white px-4 sm:px-8 lg:px-14 py-20 md:py-28 overflow-hidden">
      <div className="relative z-10 max-w-[1200px] mx-auto w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${bricolage.className} text-3xl md:text-5xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto uppercase text-[#d946ef]`}
        >
          CAP™ : LA PROSPÉRITÉ CIRCULE DÉJÀ.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 text-xs md:text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed opacity-90"
        >
          Back2Mboa n'est pas un catalogue de projets. C'est un filtre : chaque
          opportunité doit franchir trois points de contrôle avant d'atteindre
          un décideur, un régulateur ou un financeur.
        </motion.p>

        <div className="relative mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-left items-stretch">
          {CAP_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative z-10 w-full h-full rounded-[32px] shadow-2xl flex flex-col overflow-hidden bg-white"
            >
              {/* ZONE IMAGE */}
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] shrink-0 overflow-hidden">
                <div
                  role="img"
                  aria-label={item.label}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>

              {/* ZONE TEXTE — fond transparent (= blanc de la carte),
                  donc texte en couleurs foncées pour rester lisible. */}
              <div className="p-6 flex-1 flex flex-col justify-start">
                <h3 className="text-xs md:text-sm font-extrabold tracking-wider mb-2 uppercase text-gray-600">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CapMethodSection;