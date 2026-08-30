import type { BdaCopy } from "@/types/before-during-after";

/** Images Unsplash thématiques (images.unsplash.com autorisé dans next.config). */
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
      /* Savane / observation — qualifier le territoire */
      image:
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Savane africaine — observation et qualification du territoire",
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
      date: "Pendant : Du 16 au 18 décembre 2026",
      caption: "During , Connecter & closer",
      /* Salon / networking — connecter */
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Salon professionnel — networking et mises en relation",
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
      /* Chantier / casques — livrer l’impact */
      image:
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
      imageAlt: "Équipe terrain casques blancs — suivi et impact",
      aria: "After — Accompagner et mesurer",
    },
  ],
};
