export type PreuvesPilotesSlide = {
  src: string;
  alt: string;
};

export type PreuvesPilotesColumn = {
  id: string;
  role: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  slides: PreuvesPilotesSlide[];
};

export type PreuvesPilotesCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  lead: string;
  roleKicker: string;
  badge: string;
  foot2022: { year: string; detail: string };
  foot2023: { year: string; detail: string };
  footDate: string;
};
