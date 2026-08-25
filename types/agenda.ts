export type AgendaEvent = {
  id: string;
  index: string;
  title: string;
  tabTitle: string;
  date: string;
  location: string;
  body: string;
};

export type AgendaCopy = {
  kicker: string;
  cta: string;
  events: [AgendaEvent, AgendaEvent, AgendaEvent, AgendaEvent];
};
