import type { SlideSponsor } from "@/components/sections/respiration/SponsorPopup";

export type PassageKenBurns =
  | "zoom-river"
  | "zoom-herd"
  | "zoom-koki";

export type PassageProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
  image: string;
  alt: string;
  objectPosition: string;
  kenBurns: PassageKenBurns;
  duration: string;
  sponsor?: SlideSponsor;
};

export type PassageCopy = {
  watchLabel: string;
  autoplayMs: number;
  programs: [PassageProgram, PassageProgram, PassageProgram];
};
