export type AgendaEvent = {
  id: string;
  index: string;
  tag: string;
  titleLead: string;
  titleAccent: string;
  tabTitle: string;
  date: string;
  location: string;
  body: string;
  /** Couleur pastille onglet */
  accent: string;
};

export type AgendaCopy = {
  kicker: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  autoplayMs: number;
  events: [AgendaEvent, AgendaEvent, AgendaEvent, AgendaEvent];
};
