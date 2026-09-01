import type { EditionColumn, EditionsPilotesCopy } from "@/types/editions-pilotes";

/** Copy figée maquette — Preuve par l'action. */
export const EDITIONS_PILOTES_COPY: EditionsPilotesCopy = {
  kicker: "Back2Mboa ASAP · Preuve par l'action",
  title: "Les éditions pilotes ont prouvé le modèle.",
  subtitle:
    "MEET Administrations 2022 (Douala) et MEET Écosystème 2023 (Musée National, Yaoundé).",
  hoverHint:
    "Survolez chaque colonne pour comprendre le rôle de ces acteurs dans Back2Mboa.",
  badge: "Preuve · pas promesse",
  foot2022: "2022 : 90 acteurs · 60+ mises en relation",
  foot2023: "2023 : 400+ participants, SG MINREX, FEICOM",
  footDate: "16 au 17 décembre 2023 : Musée National, Yaoundé",
};

/** Locaux + Unsplash (images.unsplash.com déjà autorisé dans next.config). */
export const EDITIONS_PILOTES_COLUMNS: EditionColumn[] = [
  {
    id: "solutionneurs",
    role: "Ils apportent expertise, technologies et modèles d'affaires. Répondant aux Mayor Calls, co-construisent les Opportunity Cards.",
    title: "Entrepreneurs & diaspora qui construisent",
    body: "35 (2022) puis 70 (2023) entrepreneurs et Solutionneurs diaspora : agro, finance, tech, énergie, habitat. 97 % de satisfaction.",
    linkLabel: "Voir les profils",
    href: "#histoires",
    slides: [
      {
        src: "/images/editions-pilotes/solutionneurs/01.webp",
        alt: "Solutionneurs en atelier collaboratif",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/02.webp",
        alt: "Workshop entrepreneurs diaspora",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/03.webp",
        alt: "Agro-transformation locale",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/04.webp",
        alt: "Finance et paiements digitaux",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/05.webp",
        alt: "Mise en relation diaspora",
        caption: "Solutionneurs",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        alt: "Équipe startup en collaboration",
        caption: "Solutionneurs",
      },
      {
        src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
        alt: "Networking entrepreneurs",
        caption: "Solutionneurs",
      },
      {
        src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
        alt: "Atelier co-construction",
        caption: "Solutionneurs",
      },
    ],
  },
  {
    id: "ecosysteme",
    role: "Régulateurs / PTF sécurisent le cadre ; investisseurs et médias amplifient. Team Back2Mboa orchestre matching et suivi.",
    title: "Régulateurs, PTF, investisseurs & médias",
    body: "MINREX, MINDDEVEL, FEICOM, AFD, UE, GIZ, APME, CCIMA, CARPA… + influenceurs (80 000+ de portée) et Team Back2Mboa.",
    linkLabel: "Voir les partenaires",
    href: "#partenaires",
    slides: [
      {
        src: "/images/editions-pilotes/ecosysteme/01.webp",
        alt: "Interview média institutionnelle",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/02.webp",
        alt: "Présentation résultats et preuve",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/03.webp",
        alt: "Financement et partenaires",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/04.webp",
        alt: "Acteur institutionnel",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/05.webp",
        alt: "Structuration de l'écosystème",
        caption: "Écosystème",
      },
      {
        src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
        alt: "Conférence institutionnelle",
        caption: "Écosystème",
      },
      {
        src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80",
        alt: "Conférence de presse et médias",
        caption: "Écosystème",
      },
      {
        src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
        alt: "Partenariat investisseurs",
        caption: "Écosystème",
      },
    ],
  },
  {
    id: "ctd",
    role: "Ils portent les besoins du terrain, publient les Mayor Calls, accueillent les Solutionneurs et pilotent la mise en œuvre.",
    title: "Maires & collectivités engagées",
    body: "40 mairies (10 régions) en 2022, 20 mairies (6 régions) en 2023. 89 % de satisfaction. 10 recommandations portées par les maires.",
    linkLabel: "Voir les territoires",
    href: "#mairies-championnes",
    slides: [
      {
        src: "/images/editions-pilotes/ctd/01.webp",
        alt: "Réunion mairie et collectivités",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/02.webp",
        alt: "Mairie championne Douala III",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/03.webp",
        alt: "Mairie championne Limbé I",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/04.webp",
        alt: "Mairie championne Babadjou",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/05.webp",
        alt: "Mairie championne Guider",
        caption: "CTD / Maires",
      },
      {
        src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
        alt: "Réunion territoriale",
        caption: "CTD / Maires",
      },
      {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
        alt: "Table ronde élus locaux",
        caption: "CTD / Maires",
      },
      {
        src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80",
        alt: "Collectivité et terrain communal",
        caption: "CTD / Maires",
      },
    ],
  },
];
