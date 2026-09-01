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

/**
 * Galeries locales — photos éditions 2022 / 2023 (chemins ed-* = cache-bust).
 * solutionneurs ← Entrepreneurs Diaspora
 * ecosysteme    ← Régulateurs, PTF
 * ctd           ← CTD
 */
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
        src: "/images/editions-pilotes/solutionneurs/ed-01.jpg",
        alt: "Entrepreneurs diaspora en atelier",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-02.jpg",
        alt: "Session collaborative entrepreneurs",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-03.jpg",
        alt: "Échanges Solutionneurs et partenaires",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-04.jpg",
        alt: "Pitch et co-construction terrain",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-05.jpg",
        alt: "Networking entrepreneurs diaspora",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-06.jpg",
        alt: "Moment d'échange entre entrepreneurs",
        caption: "Solutionneurs",
      },
      {
        src: "/images/editions-pilotes/solutionneurs/ed-07.jpg",
        alt: "Groupe d'entrepreneurs en session",
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
        src: "/images/editions-pilotes/ecosysteme/ed-01.jpg",
        alt: "Régulateurs et partenaires techniques",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-02.jpg",
        alt: "Présentation institutionnelle",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-03.jpg",
        alt: "Panel PTF et investisseurs",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-04.jpg",
        alt: "Échanges avec les médias",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-05.jpg",
        alt: "Table ronde écosystème",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-06.jpg",
        alt: "Partenaires et financeurs",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-07.jpg",
        alt: "Session plénière institutionnelle",
        caption: "Écosystème",
      },
      {
        src: "/images/editions-pilotes/ecosysteme/ed-08.jpg",
        alt: "Moment média et couverture",
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
        src: "/images/editions-pilotes/ctd/ed-01.jpg",
        alt: "Maires et collectivités en session",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-02.jpg",
        alt: "Échanges entre collectivités territoriales",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-03.jpg",
        alt: "Table ronde maires engagés",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-04.jpg",
        alt: "Collectivités et besoins du terrain",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-05.jpg",
        alt: "Mairies championnes en atelier",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-06.jpg",
        alt: "Moment CTD — dialogue territorial",
        caption: "CTD / Maires",
      },
      {
        src: "/images/editions-pilotes/ctd/ed-07.jpg",
        alt: "Élus locaux en collaboration",
        caption: "CTD / Maires",
      },
    ],
  },
];
