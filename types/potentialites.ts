export type RegionId =
  | "centre"
  | "littoral"
  | "ouest"
  | "nord-ouest"
  | "sud-ouest"
  | "sud"
  | "est"
  | "adamaoua"
  | "nord"
  | "extreme-nord";

export type SectorId =
  | "agriculture"
  | "finance"
  | "foncier"
  | "tourisme"
  | "eau-energie"
  | "sante";

export type ResourceRow = {
  name: string;
  caracteristiques: string;
  opportunites: string[];
};

export type Commune = {
  id: string;
  name: string;
  regionId: RegionId;
  mayor?: string;
  created?: string;
  superficie?: string;
  population?: string;
  densite?: string;
  intro: string;
  resources: ResourceRow[];
};

export type Region = {
  id: RegionId;
  name: string;
  capital: string;
  /** SVG path in viewBox 0 0 1100 1513 (calé sur carte_cameroun.png) */
  path: string;
};

export type Sector = {
  id: SectorId;
  label: string;
  keywords: string[];
};
