import type { ContrasteActor, ContrasteCopy, ContrasteCost } from "@/types/contraste";

/** Copy figée — Le contraste.png */
export const CONTRASTE_COPY: ContrasteCopy = {
  kicker: "Le Contraste",
  titleLines: ["Avant Back2Mboa : 5 acteurs, la même", "impasse."],
  description:
    "Ce que vivent aujourd'hui les maires, la diaspora, les investisseurs, la jeunesse locale et les institutions, avant qu'un chemin ne s'ouvre.",
  costTitle: "Le coût de l'inaction",
  closing: "Back2Mboa n'est pas un luxe. C'est une nécessité.",
};

export const CONTRASTE_ACTORS: ContrasteActor[] = [
  {
    id: "maire",
    label: "Le Maire",
    quote:
      "Mon territoire regorge d'opportunités, mais beaucoup restent inexploitées faute de visibilité, de partenaires de mise en oeuvre et de financements.",
    sentiments: ["Frustration", "Impuissance", "Espoir Contenu"],
    costId: "territoires",
  },
  {
    id: "entrepreneur-diaspora",
    label: "L'Entrepreneur Diaspora",
    quote:
      "J'ai une expertise, des solutions, que je peux mettre au service du pays. Mais où sont les opportunités sérieuses et les bons interlocuteurs ?",
    sentiments: ["Méfiance", "Désir D'impact", "Peur Du Nième Échec"],
    costId: "capitaux",
  },
  {
    id: "investisseur",
    label: "L'Investisseur / PTF",
    quote:
      "Je dispose de capitaux à investir, mais je trouve difficilement des opportunités crédibles, suffisamment qualifiées et prêtes à être financées.",
    sentiments: ["Doute", "Prudence", "Opportunisme Mesuré"],
    costId: "capitaux",
  },
  {
    id: "jeune-local",
    label: "Le Jeune Local",
    quote:
      "J'ai des compétences et des ambitions. Mais où sont les opportunités qui me permettent de travailler, d'entreprendre et de construire mon avenir ici ?",
    sentiments: ["Désespoir", "Impatience", "Colère Contenue"],
    costId: "competences",
  },
  {
    id: "institution",
    label: "L'Institution",
    quote:
      "Nous avons des dispositifs, mais ils sont sous-utilisés. Comment mobiliser la diaspora efficacement ?",
    sentiments: ["Volonté", "Lourdeur Administrative"],
    costId: "decentralisation",
  },
];

export const CONTRASTE_COSTS: ContrasteCost[] = [
  {
    id: "territoires",
    title: "Le Potentiel Des Territoires Reste Invisible",
    body: "Des milliards de FCFA de recettes fiscales non perçues, des réserves foncières dormantes, des filières sans transformation locale.",
  },
  {
    id: "capitaux",
    title: "Les Capitaux De La Diaspora Restent Bloqués",
    body: "L'épargne dort dans des comptes européens et nord-américains, faute de projets crédibles et d'interlocuteurs fiables.",
  },
  {
    id: "competences",
    title: "Les Compétences Ne Sont Pas Transférées",
    body: "Ingénieurs, médecins, financiers, industriels : une génération entière de savoir-faire reste sans point d'atterrissage.",
  },
  {
    id: "decentralisation",
    title: "La Décentralisation Peine À Se Concrétiser",
    body: "Un retard dans l'atteinte des objectifs de la SND30, des jeunes qui quittent les villages, un potentiel de croissance inexploité.",
  },
];
