import type { SectorId } from "@/types/potentialites";

export type ModeleVisual = "photo" | "gold" | "teal" | "blue" | "green";

export type ModeleCard = {
  id: SectorId;
  index: string;
  category: string;
  title: string;
  description: string;
  visual: ModeleVisual;
  image?: string;
  /** object-position CSS pour cadrage carte 4:5 */
  imagePosition?: string;
};

export type ModeleCopy = {
  kicker: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
};
