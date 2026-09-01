import {
  communesForSector,
  parsePopulation,
} from "@/data/potentialites";
import { SECTEURS } from "@/data/boulevard";
import type { ModeleCard, ModeleCopy } from "@/types/modele";
import type { SectorId } from "@/types/potentialites";

/** Ordre aligné sur MODELE_CARDS et SECTEURS (Boulevard). */
const SECTOR_IDS: SectorId[] = [
  "agriculture",
  "finance",
  "foncier",
  "tourisme",
  "eau-energie",
  "sante",
];

/** Couleurs filières — source Boulevard (`BoulevardSection.css`). */
export const SECTOR_ACCENT: Record<SectorId, string> = {
  agriculture: "#119d63",
  finance: "#2e6be6",
  foncier: "#ae3c3a",
  tourisme: "#d9a21b",
  "eau-energie": "#00a896",
  sante: "#d8212e",
};

/** Sous-domaines / maillons de chaîne de valeur par secteur. */
export function maillonsForSector(id: SectorId): string[] {
  const index = SECTOR_IDS.indexOf(id);
  return index >= 0 ? [...SECTEURS[index].maillons] : [];
}

export const MODELE_COPY: ModeleCopy = {
  kicker: "Le modèle",
  titleLead: "6 secteurs et",
  titleAccent: "216 opportunités d'affaires.",
  subtitle:
    "Chaque secteur est décliné en 6 étapes de cycle de vie et 6 maillons de chaîne de valeur. Survolez une carte pour voir les sous-domaines.",
};

/** Copy UI maquette. Photos = `image secteur/` → `public/images/modele/secteurs/`. */
export const MODELE_CARDS: ModeleCard[] = [
  {
    id: "agriculture",
    index: "01",
    category: "Agro-transformation",
    title: "Agriculture & Agro-transformation",
    description:
      "Transformer davantage localement, réduire les pertes, augmenter les revenus des producteurs.",
    visual: "photo",
    image: "/images/modele/secteurs/agriculture.webp",
    imagePosition: "50% 32%",
  },
  {
    id: "finance",
    index: "02",
    category: "Finance & digital",
    title: "Finance, Fiscalité & Paiements",
    description: "Moderniser les transactions et le capital.",
    visual: "photo",
    image: "/images/modele/secteurs/finance.webp",
    imagePosition: "50% 28%",
  },
  {
    id: "foncier",
    index: "03",
    category: "Foncier & habitat",
    title: "Foncier, Immobilier & Construction",
    description: "Sécuriser le foncier, bâtir les actifs du futur.",
    visual: "photo",
    image: "/images/modele/secteurs/foncier.webp",
    imagePosition: "50% 26%",
  },
  {
    id: "tourisme",
    index: "04",
    category: "Tourisme & mobilité",
    title: "Tourisme, Mobilité & Marketing Territorial",
    description: "Valoriser les destinations et relier les territoires.",
    visual: "photo",
    image: "/images/modele/secteurs/tourisme.webp",
    imagePosition: "50% 40%",
  },
  {
    id: "eau-energie",
    index: "05",
    category: "Eau & énergie",
    title: "Eau & Énergie",
    description: "Sécuriser l'accès à l'eau et aux énergies durables.",
    visual: "photo",
    image: "/images/modele/secteurs/eau-energie.webp",
    imagePosition: "50% 35%",
  },
  {
    id: "sante",
    index: "06",
    category: "Santé & social",
    title: "Santé, Social & Bien-être",
    description: "Renforcer l'offre de soins et le tissu social local.",
    visual: "photo",
    image: "/images/modele/secteurs/sante.webp",
    imagePosition: "48% 30%",
  },
];

export type SectorMetrics = {
  communeCount: number;
  communeLabel: string;
  habitantsValue: string;
};

/** Somme des populations Word des communes du secteur — pas de totaux inventés. */
export function metricsForSector(sectorId: SectorId): SectorMetrics {
  const list = communesForSector(sectorId);
  let population = 0;
  let hasPop = false;
  for (const commune of list) {
    const n = parsePopulation(commune.population);
    if (n == null) continue;
    population += n;
    hasPop = true;
  }
  return {
    communeCount: list.length,
    communeLabel: list.length > 1 ? "communes" : "commune",
    habitantsValue: hasPop ? formatCompactPopulation(population) : "—",
  };
}

function formatCompactPopulation(total: number): string {
  if (total >= 1_000_000) {
    const millions = total / 1_000_000;
    return `${millions.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} M`;
  }
  if (total >= 10_000) {
    return `${Math.round(total / 1_000).toLocaleString("fr-FR")} K`;
  }
  return total.toLocaleString("fr-FR");
}
