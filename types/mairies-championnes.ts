export type ChampionVisualTheme =
  | "agri"
  | "city"
  | "savanna"
  | "ocean"
  | "water"
  | "health";

export type ChampionStat = {
  value: string;
  label: string;
};

export type ChampionLegend = {
  value: string;
  label: string;
  accent?: boolean;
};

export type ChampionMairie = {
  id: string;
  nom: string;
  region: string;
  statut: string;
  dot: string;
  secteur: string;
  lead: string;
  stats: [ChampionStat, ChampionStat, ChampionStat];
  storyTitle: string;
  storyBody: string;
  visualKicker: string;
  visualCaption: string;
  theme: ChampionVisualTheme;
  image: string;
};

export type ChampionCopy = {
  kicker: string;
  title: string;
  titleAccent: string;
  subtitle: [string, string];
  ctaPrimary: string;
  ctaSecondary: string;
  autoHint: string;
  legend: ChampionLegend[];
};
