import type { PartenairesCopy } from "@/types/partenaires";

/** Copy extraite de Back2Mboa_Section_Partenaires.html. */
export const PARTENAIRES_COPY: PartenairesCopy = {
  eyebrow: "Ils font circuler la prospérité",
  titleBefore: "Les uns entrent. Les autres ",
  titleAccent: "en ressortent transformés",
  body: "D'un côté ceux qui franchissent la porte pour bâtir. De l'autre ceux qui en sortent avec un projet, un contrat, un territoire. La même porte, dans les deux sens.",
  enterTitle: "Bâtisseurs de prospérité",
  exitTitle: "Visionnaires",
  legendEnterTitle: "↗ Ils entrent — les Bâtisseurs de Prospérité",
  legendEnterBody:
    "Ministères, agences et collectivités qui ouvrent les portes : ils apportent le cadre, les autorisations et la caution institutionnelle.",
  legendExitTitle: "↘ Ils sortent — les Visionnaires",
  legendExitBody:
    "Bailleurs, partenaires techniques et financiers, entreprises : ils ressortent avec des projets instruits et des engagements signés.",
  enter: [
    { nom: "MINREX", sous: "Relations extérieures" },
    { nom: "MINDDEVEL", sous: "Développement local" },
    { nom: "FEICOM", sous: "Financement des communes" },
    { nom: "CVUC", sous: "Communes et villes unies" },
    { nom: "APME", sous: "Promotion des PME" },
    { nom: "CARPA", sous: "Partenariats public-privé" },
    { nom: "MINADER", sous: "Agriculture" },
    { nom: "CCIMA", sous: "Chambre de commerce" },
  ],
  exit: [
    { nom: "GIZ", sous: "Coopération allemande" },
    { nom: "AFD", sous: "Agence française de développement" },
    { nom: "UNION EUROPÉENNE", sous: "Délégation au Cameroun" },
    { nom: "PAD", sous: "Port autonome de Douala" },
    { nom: "ANOR", sous: "Normes et qualité" },
    { nom: "MINSANTÉ", sous: "Santé publique" },
    { nom: "MINEE", sous: "Eau et énergie" },
    { nom: "SOLUTIONNEURS", sous: "Initiative" },
  ],
};

export function partenaireInitiales(nom: string) {
  return nom
    .split(/[\s-]+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 3);
}
