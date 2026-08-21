export type PlateformeProfileId =
  | "maires"
  | "diaspora"
  | "investisseurs"
  | "minrex"
  | "sponsors";

export type PlateformeCard = {
  today: string;
  withB2m: string;
};

export type PlateformeProfile = {
  id: PlateformeProfileId;
  tab: string;
  title: string;
  body: string;
  cta: string;
  cards: PlateformeCard[];
};

export type PlateformeCopy = {
  kicker: string;
  title: string;
  subtitle: string;
};
