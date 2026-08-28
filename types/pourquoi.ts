export type PourquoiStars = 0 | 1 | 2 | 3 | 4 | 5;

export type PourquoiRow = {
  id: string;
  title: string;
  question: string;
  salons: PourquoiStars;
  forums: PourquoiStars;
  note: string;
};

export type PourquoiCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  headers: {
    criterion: string;
    salons: string;
    forums: string;
  };
  badge: string;
  footer: string;
  rows: PourquoiRow[];
};
