export type ContrasteActor = {
  id: string;
  label: string;
  quote: string;
  sentiments: string[];
  costId: string;
};

export type ContrasteCost = {
  id: string;
  title: string;
  body: string;
};

export type ContrasteCopy = {
  kicker: string;
  titleLines: readonly string[];
  description: string;
  costTitle: string;
  closing: string;
};
