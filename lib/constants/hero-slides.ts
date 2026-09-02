export interface HeroSlide {
  id: string;
  imageUrl: string;
  alt: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    imageUrl: "/images/hero/bg-1.webp",
    alt: "Back2Mboa Event venue",
  },
  {
    id: "slide-2",
    imageUrl: "/images/hero/bg-2.webp",
    alt: "African tech innovators meeting",
  },
  {
    id: "slide-3",
    imageUrl: "/images/hero/bg-3.webp",
    alt: "Digital Twin platform presentation",
  },
];