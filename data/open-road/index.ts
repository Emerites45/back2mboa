import type { OpenRoadCopy } from "@/types/open-road";

/** Diaporama Open Road — 3 slides photo + Ken Burns. */
export const OPEN_ROAD_COPY: OpenRoadCopy = {
  brand: "BACK 2 MBOA",
  watchLabel: "Watch trailer",
  viewAll: "View all",
  autoplayMs: 9000,
  programs: [
    {
      id: "open-road",
      index: "01",
      title: "The Open Road",
      schedule: "Every Tuesday | 6PM",
      image: "/images/open-road/monument.jpg",
      alt: "Monument de la Réunification, Yaoundé",
      objectPosition: "center 40%",
      kenBurns: "zoom-in-right",
    },
    {
      id: "rainforest",
      index: "02",
      title: "A Journey Into The Rainforest",
      schedule: "Every Friday | 8PM",
      image: "/images/open-road/rainforest.jpg",
      alt: "Forêt tropicale baignée de lumière",
      objectPosition: "center 48%",
      kenBurns: "zoom-in-left",
    },
    {
      id: "summit",
      index: "03",
      title: "Summit Seekers",
      schedule: "July 21 | 6PM",
      image: "/images/open-road/summit.jpg",
      alt: "Voie lactée au-dessus de sommets enneigés",
      objectPosition: "center 18%",
      kenBurns: "zoom-stars",
    },
  ],
};
