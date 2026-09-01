import type { BdaCopy } from "@/types/before-during-after";

/** Photos locales — ordre Before → During → After. */
export const BDA_COPY: BdaCopy = {
  eyebrow: "Approche Back2Mboa",
  title: "Before , During , After.",
  subtitle:
    "Pas un événement isolé : un parcours qui qualifie, connecte et accompagne jusqu’à l’impact. Le détail défile automatiquement  survolez pour explorer.",
  foot: "Before prépare , During convertit  ,After livre l’impact  et  Back2Mboa accompagne jusqu’à la prospérité.",
  autoplayMs: 4_000,
  phases: [
    {
      id: "before",
      phase: "Before",
      title: "Qualifier & préparer",
      items: [
        "Masterclass CTD (octobre) : attractivité, recettes, pitch",
        "Mayor Calls et fiches CAP structurées",
        "Mission & salon diaspora (1–7 déc., salon 4 déc.)",
      ],
      tool: "Outil : plateforme de pré-sélection",
      date: "Avant : Octobre ,début décembre",
      caption: "Before , Qualifier & préparer",
      image: "/images/before-during-after/before.jpg",
      imageAlt:
        "Observation terrain en savane — qualifier le territoire avant l’événement",
      aria: "Before — Qualifier et préparer",
    },
    {
      id: "during",
      phase: "During",
      title: "Connecter & closer",
      items: [
        "Musée National, Yaoundé — Deal Rooms & pitchs",
        "Matching mairies × Solutionneurs × financeurs",
        "Signatures, LOI et mandats sur table",
      ],
      tool: "Outil : match-up table , mise en relation",
      date: "Pendant : Du 16 au 17 décembre 2026",
      caption: "During , Connecter & closer",
      image: "/images/before-during-after/During.jpeg",
      imageAlt:
        "Atelier collaboratif — connecter les acteurs pendant Back2Mboa",
      aria: "During — Connecter et closer",
    },
    {
      id: "after",
      phase: "After",
      title: "Accompagner jusqu’à l’impact",
      items: [
        "Suivi des pipelines CAP post-event",
        "Mise en œuvre avec les CTD",
        "Preuves chiffrées, emplois, recettes",
      ],
      tool: "Outil : plateforme de suivi d’impact",
      date: "Après : 2027 et au-delà",
      caption: "After , Accompagner & mesurer",
      image: "/images/before-during-after/after.jpg",
      imageAlt:
        "Équipe terrain casques et plans — accompagner jusqu’à l’impact",
      aria: "After — Accompagner et mesurer",
    },
  ],
};
