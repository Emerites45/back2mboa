export type OpenRoadKenBurns = "zoom-in-right" | "zoom-in-left" | "zoom-stars";

export type OpenRoadProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
  image: string;
  alt: string;
  objectPosition: string;
  kenBurns: OpenRoadKenBurns;
};

export type OpenRoadCopy = {
  brand: string;
  watchLabel: string;
  viewAll: string;
  autoplayMs: number;
  programs: [OpenRoadProgram, OpenRoadProgram, OpenRoadProgram];
};
