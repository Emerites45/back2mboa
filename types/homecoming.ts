export type HomecomingKenBurns =
  | "zoom-suite"
  | "zoom-grill"
  | "zoom-bar";

export type HomecomingProgram = {
  id: string;
  index: string;
  title: string;
  schedule: string;
  image: string;
  alt: string;
  objectPosition: string;
  kenBurns: HomecomingKenBurns;
  duration: string;
};

export type HomecomingCopy = {
  watchLabel: string;
  autoplayMs: number;
  programs: [HomecomingProgram, HomecomingProgram, HomecomingProgram];
};
