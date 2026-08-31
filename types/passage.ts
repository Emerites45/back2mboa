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
};

export type PassageCopy = {
  brand: string;
  watchLabel: string;
  autoplayMs: number;
  programs: [PassageProgram, PassageProgram, PassageProgram];
};
