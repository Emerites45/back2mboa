export type BonnePortePanelId =
  | "ctd"
  | "sol"
  | "inv"
  | "reg"
  | "med"
  | "ent"
  | "mec";

export type BonnePorteGain = {
  now: string;
  next: string;
  impact: string;
};

export type BonnePortePanel = {
  id: BonnePortePanelId;
  tabLabel: string;
  title: string;
  titleLines?: [string, string];
  lead: string;
  ctaHref: string;
  cta: string;
  gains: BonnePorteGain[];
};

export type BonnePorteFluxLeg = {
  kicker: string;
  body: string;
};

export type BonnePorteCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  fluxLeft: BonnePorteFluxLeg;
  fluxRight: BonnePorteFluxLeg;
  fluxMid: string;
  footMission: { label: string; text: string };
  footEvent: { label: string; text: string };
  footProsperity: string;
  footProsperityHref: string;
};
