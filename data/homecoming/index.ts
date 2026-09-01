import type { HomecomingCopy } from "@/types/homecoming";

/** Diaporama Homecoming — 01 Ariel Mbita, 02 Édouard Tamba, 03 Jakub Dziubak. */
export const HOMECOMING_COPY: HomecomingCopy = {
  watchLabel: "Watch trailer",
  autoplayMs: 8000,
  programs: [
    {
      id: "soft-landings",
      index: "01",
      title: "Soft Landings",
      schedule: "Every Thursday | 8PM",
      /* ariel-nathan-ada-mbita-MPQ__ty5PD0-unsplash */
      image: "/images/horizons/slide-01.webp",
      alt: "Suite hôtel chaleureuse, accueil au retour",
      objectPosition: "center 40%",
      kenBurns: "zoom-suite",
      duration: "5.5 min",
    },
    {
      id: "flavors-of-home",
      index: "02",
      title: "Flavors of Home",
      schedule: "Every Saturday | 7PM",
      /* edouard-tamba-4jRyugKbQdw-unsplash */
      image: "/images/horizons/slide-02.webp",
      alt: "Grillades et plantains sur braises, rue camerounaise",
      objectPosition: "center 45%",
      kenBurns: "zoom-grill",
      duration: "5.5 min",
    },
    {
      id: "after-dark",
      index: "03",
      title: "After Dark",
      schedule: "Dec 16 | 10PM",
      /* jakub-dziubak-gj7BLlSzIFs-unsplash */
      image: "/images/horizons/slide-03.webp",
      alt: "Cocktail amber sur comptoir de bar, lumière dorée",
      objectPosition: "center 35%",
      kenBurns: "zoom-bar",
      duration: "5.5 min",
    },
  ],
};
