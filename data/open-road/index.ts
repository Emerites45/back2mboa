import type { OpenRoadCopy } from "@/types/open-road";

/** Diaporama Open Road — slide 01 = Pexels thé, puis forêt, puis sommets. */
export const OPEN_ROAD_COPY: OpenRoadCopy = {
  watchLabel: "Watch trailer",
  autoplayMs: 8000,
  programs: [
    {
      id: "open-road",
      index: "01",
      title: "The Open Road",
      schedule: "Every Tuesday | 5PM",
      /* pexels-burcin-sahin-1241783210-32115684 */
      image: "/images/open-road/slide-01-tea.webp",
      alt: "Plantations de thé Cameron Valley au soleil levant",
      objectPosition: "center 42%",
      kenBurns: "zoom-tea",
      duration: "6.0 min",
    },
    {
      id: "rainforest",
      index: "02",
      title: "A Journey Into The Rainforest",
      schedule: "Every Wednesday | 7PM",
      image: "/images/open-road/slide-02-rainforest.webp",
      alt: "Rivière en forêt tropicale, Cameroun",
      objectPosition: "center 48%",
      kenBurns: "zoom-forest",
      duration: "6.0 min",
    },
    {
      id: "summit",
      index: "03",
      title: "Summit Seekers",
      schedule: "July 21 | 9PM",
      image: "/images/open-road/slide-03-summit.webp",
      alt: "Paysage de sommets et relief africain",
      objectPosition: "center 35%",
      kenBurns: "zoom-summit",
      duration: "6.0 min",
    },
  ],
};
