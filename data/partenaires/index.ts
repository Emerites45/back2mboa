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
    { nom: "MINREX", sous: "Relations extérieures", icon: "/images/institutions/minrex.webp" },
    { nom: "MINDDEVEL", sous: "Développement local", icon: "/images/institutions/minddevel.webp" },
    { nom: "FEICOM", sous: "Financement des communes", icon: "/images/institutions/feicom.webp" },
    { nom: "CVUC", sous: "Communes et villes unies", icon: "/images/institutions/cvuc.webp" },
    { nom: "APME", sous: "Promotion des PME", icon: "/images/institutions/apme.webp" },
    { nom: "CARPA", sous: "Partenariats public-privé", icon: "/images/institutions/carpa.webp" },
    { nom: "CCIMA", sous: "Chambre de commerce", icon: "/images/institutions/ccima.webp" },
  ],
  exit: [
    { nom: "GIZ", sous: "Coopération allemande", icon: "/images/institutions/giz.webp" },
    { nom: "AFD", sous: "Agence française de développement", icon: "/images/institutions/afd.webp" },
    { nom: "UNION EUROPÉENNE", sous: "Délégation au Cameroun", icon: "/images/institutions/ue.webp" },
    { nom: "SOLUTIONNEURS", sous: "Initiative", icon: "/images/institutions/solutionneurs.webp" },
    { nom: "MEET AFRICA", sous: "Événement", icon: "/images/institutions/meetafrica.webp" },
  ],
};

export function partenaireInitiales(nom: string) {
  return nom
    .split(/[\s-]+/)
    .map((word) => word[0] ?? "")
    .join("")
    .slice(0, 3);
}
