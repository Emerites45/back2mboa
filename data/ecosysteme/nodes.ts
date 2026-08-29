import type { LucideIcon } from "lucide-react";
import { Home } from "lucide-react";

const ECO_ICON = "/images/ecosysteme";

/** Un nœud = une icône sur le cadran. `iconSrc` null → Lucide Home (urbanisme). */
export type EcosystemeNode = {
  id: string;
  label: string;
  iconSrc: string | null;
  LucideIcon?: LucideIcon;
};

/** Sens horaire depuis le sommet — 10 points du cadran écosystème. */
export const ECOSYSTEME_NODES: EcosystemeNode[] = [
  { id: "maires", label: "Maires & CTD", iconSrc: `${ECO_ICON}/maire.svg` },
  { id: "diaspora", label: "Diaspora", iconSrc: `${ECO_ICON}/diaspora.svg` },
  { id: "investisseurs", label: "Investisseurs", iconSrc: `${ECO_ICON}/investisseur.svg` },
  { id: "agro", label: "Agro & filières", iconSrc: `${ECO_ICON}/agro_et_filiaire.svg` },
  { id: "eau", label: "Eau & assainissement", iconSrc: `${ECO_ICON}/eau.svg` },
  { id: "energie", label: "Énergie", iconSrc: `${ECO_ICON}/energie.svg` },
  { id: "urbanisme", label: "Urbanisme", iconSrc: null, LucideIcon: Home },
  { id: "habitat", label: "Habitat", iconSrc: `${ECO_ICON}/habitat.svg` },
  { id: "tourisme", label: "Tourisme & culture", iconSrc: `${ECO_ICON}/tourisme.svg` },
  { id: "regulateurs", label: "Régulateurs & PTF", iconSrc: `${ECO_ICON}/regulateur.svg` },
];
