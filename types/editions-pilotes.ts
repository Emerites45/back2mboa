export type EditionSlide = {
  src: string;
  alt: string;
  caption: string;
};

export type EditionColumn = {
  id: string;
  role: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
  slides: EditionSlide[];
};

export type EditionsPilotesCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  hoverHint: string;
  badge: string;
  foot2022: string;
  foot2023: string;
  footDate: string;
};
