import type { PassageCopy } from "@/types/passage";

/** Diaporama Passage (PAUSE #3) — 01 bateau, 02 elephant, 03 koki. */
export const PASSAGE_COPY: PassageCopy = {
  brand: "BACK 2 MBOA",
  watchLabel: "Watch trailer",
  autoplayMs: 8000,
  programs: [
    {
      id: "river-crossing",
      index: "01",
      title: "River Crossing",
      schedule: "Every Friday | 6PM",
      image: "/images/passage/slide-01-bateau.webp",
      alt: "Pirogue sur une rivière tropicale, deux hommes en gilets orange",
      /* Pirogue au centre, au-dessus du footer verre */
      objectPosition: "50% 46%",
      kenBurns: "zoom-river",
      duration: "5.5 min",
    },
    {
      id: "water-giants",
      index: "02",
      title: "Water Giants",
      schedule: "Every Sunday | 8PM",
      image: "/images/passage/slide-02-elephant.webp",
      alt: "Éléphants se baignant et éclaboussant dans l’eau",
      /* Troupeau dans le tiers bas — garder têtes + splash visibles */
      objectPosition: "42% 62%",
      kenBurns: "zoom-herd",
      duration: "5.5 min",
    },
    {
      id: "koki-leaves",
      index: "03",
      title: "Koki Leaves",
      schedule: "Dec 17 | 9PM",
      image: "/images/passage/slide-03-koki.webp",
      alt: "Koki jaune dans des feuilles vertes, vue plongeante",
      /* Pâte jaune un peu bas-droite, feuilles en cadre */
      objectPosition: "54% 52%",
      kenBurns: "zoom-koki",
      duration: "5.5 min",
    },
  ],
};
