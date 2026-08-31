export type BdaPhaseId = "before" | "during" | "after";

export type BdaPhase = {
  id: BdaPhaseId;
  phase: string;
  title: string;
  items: string[];
  tool: string;
  date: string;
  caption: string;
  image: string;
  imageAlt: string;
  aria: string;
};

export type BdaCopy = {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  foot: string;
  autoplayMs: number;
  phases: [BdaPhase, BdaPhase, BdaPhase];
};
