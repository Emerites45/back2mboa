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
  /** Libellé court dans la bande de navigation (ex. « Douala 2 »). */
  nomPill?: string;
  region: string;
  /** Région affichée dans la bande (ex. « Sud » pour Sud-Ouest). */
  regionPill?: string;
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
  /** Fond vidéo plein écran (loop, muet) — poster = `image`. */
  video?: string;
  /** Photo dédiée à la carte visuelle droite (ex. terroir Pexels). */
  visualImage?: string;
  /** Recadrage `object-position` de la carte visuelle. */
  visualPosition?: string;
  /** `contain` pour voir l'image entière dans la carte. */
  visualFit?: "cover" | "contain";
};

export type ChampionCopy = {
  kicker: string;
  title: string;
  titleAccent: string;
  subtitle: [string, string];
  ctaPrimary: string;
  ctaSecondary: string;
  autoHint: string;
  /** Durée d'affichage de chaque mairie avant transition auto (ms). */
  autoplayMs: number;
  legend: ChampionLegend[];
};
