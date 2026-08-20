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
};

export type ModeleCopy = {
  kicker: string;
  titleLead: string;
  titleAccent: string;
  subtitle: string;
};
