import type { ContrasteActor } from "@/types/contraste";

export const CONTRASTE_COPY = {
  kicker: "Le Contraste",
  titleLines: [
    "Avant Back2Mboa :",
    "5 acteurs, la même",
    "impasse.",
  ],
  descriptionLines: [
    "Ce que vivent aujourd'hui les maires, la",
    "diaspora, les investisseurs, la jeunesse locale et",
    "les institutions, avant qu'un chemin ne s'ouvre.",
  ],
} as const;

export const CONTRASTE_ACTORS: ContrasteActor[] = [
  {
    id: "maire",
    label: "Le Contraste",
    quote:
      "On manque de moyens. Les investisseurs ne connaissent pas notre territoire.",
    sentiments: ["Frustration", "Impuissance", "Espoir Contenu"],
  },
  {
    id: "entrepreneur-diaspora",
    label: "L'Entrepreneur Diaspora",
    quote:
      "Je veux investir au Mboa, mais je ne sais pas où, ni comment. Les circuits sont opaques.",
    sentiments: ["Méfiance", "Désir D'impact", "Peur Du Nième Échec"],
  },
  {
    id: "investisseur",
    label: "L'Investisseur",
    quote:
      "Où sont les projets crédibles ? Donnez-moi des chiffres, pas des promesses.",
    sentiments: ["Doute", "Prudence", "Opportunisme Mesuré"],
  },
  {
    id: "jeune-local",
    label: "Le Jeune Local",
    quote:
      "Il n'y a pas d'issue dans ce pays. On nous oublie. La diaspora a les moyens, pas nous.",
    sentiments: ["Désespoir", "Impatience", "Colère Contenue"],
  },
  {
    id: "institution",
    label: "L'Institution",
    quote:
      "Nous avons des dispositifs, mais ils sont sous-utilisés. Comment mobiliser la diaspora efficacement ?",
    sentiments: ["Volonté", "Lourdeur Administrative"],
  },
];
