import type { PourquoiCopy } from "@/types/pourquoi";

/** Copy figée — maquette POURQUOI BACK2MBOA (tableau étoiles). */
export const POURQUOI_COPY: PourquoiCopy = {
  kicker: "Pourquoi Back2Mboa",
  title: "Pas un salon de plus. Un système qui produit des deals.",
  subtitle:
    "Les étoiles mesurent la capacité à transformer une rencontre en contrat, projet financé, recettes territoriales.",
  headers: {
    criterion: "Critère",
    salons: "Salons classiques",
    forums: "Forums diaspora",
  },
  badge: "Recommandé",
  footer: "16 - 17 décembre 2026 — Musée National, Yaoundé · 500 participants",
  rows: [
    {
      id: "matching",
      title: "Matching structuré",
      question: "Qui est mis en face de qui ?",
      salons: 2,
      forums: 2,
      note: "Chaque Solutionneur est relié à un besoin territorial déjà qualifié (Mayor Call). Moins de « networking vague », plus de rendez-vous qui peuvent devenir des contrats.",
    },
    {
      id: "opportunites",
      title: "Opportunités investissables",
      question: "Le projet est-il crédible, chiffré, finançable ?",
      salons: 2,
      forums: 2,
      note: "Méthode CAP — les opportunités sont qualifiées avant l'événement. Un investisseur lit un dossier, pas un slogan. Décision plus rapide, tickets plus sérieux.",
    },
    {
      id: "ancrage",
      title: "Ancrage territorial (CTD)",
      question: "Le maire et la commune sont-ils au centre ?",
      salons: 1,
      forums: 2,
      note: "6 mairies championnes = 6 secteurs. Le territoire publie le besoin, reçoit les offres, garde la main sur la mise en œuvre — et sur les recettes futures.",
    },
    {
      id: "continuite",
      title: "Continuité après l'événement",
      question: "Que se passe-t-il le lundi suivant ?",
      salons: 1,
      forums: 2,
      note: "La plateforme et les Deal Rooms restent ouvertes. Les dossiers avancent, les contrats se négocient — pas une carte de visite oubliée dans un tote bag.",
    },
    {
      id: "acte",
      title: "Passage à l'acte",
      question: "Chemin clair vers signature et financement ?",
      salons: 1,
      forums: 2,
      note: "Objectif = deals. Deal Rooms, offtakers, financeurs et mairies autour de la même table. Lettres d'intention, PPP, tickets — pas des selfies.",
    },
    {
      id: "double-flux",
      title: "Double flux diaspora ↔ territoire",
      question: "Les deux côtés gagnent-ils concrètement ?",
      salons: 2,
      forums: 3,
      note: "La diaspora trouve des projets bancables ; le territoire trouve compétences et capitaux. Emplois, recettes municipales, actifs — pas seulement des transferts.",
    },
    {
      id: "mesure",
      title: "Mesure des résultats",
      question: "Impact prouvable à 6–12 mois ?",
      salons: 1,
      forums: 2,
      note: "Indicateurs suivis (mises en relation, dossiers CAP, deals). Les pilotes 2022–2023 ont livré des chiffres. Preuves, pas promesses.",
    },
  ],
};
