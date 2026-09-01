import type { SlideSponsor } from "@/components/sections/respiration/SponsorPopup";

export type OpenRoadKenBurns =
  | "zoom-tea"
  | "zoom-forest"
  | "zoom-summit";

export type OpenRoadProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
  image: string;
  alt: string;
  objectPosition: string;
  kenBurns: OpenRoadKenBurns;
  duration: string;
  sponsor?: SlideSponsor;
};

export type OpenRoadCopy = {
  watchLabel: string;
  autoplayMs: number;
  programs: [OpenRoadProgram, OpenRoadProgram, OpenRoadProgram];
};
