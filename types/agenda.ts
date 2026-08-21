export type AgendaEvent = {
  id: string;
  index: string;
  badge: string;
  title: string;
  titleAccent?: string;
  tabTitle: string;
  date: string;
  location?: string;
  body?: string;
  thumb: "green" | "blue" | "teal" | "red";
};

export type AgendaCopy = {
  kicker: string;
  ctaPrimary: string;
  ctaSecondary: string;
  events: [AgendaEvent, AgendaEvent, AgendaEvent, AgendaEvent];
};
