import type { PreuvesPilotesColumn, PreuvesPilotesCopy } from "@/types/preuves-pilotes";

export const PREUVES_PILOTES_COPY: PreuvesPilotesCopy = {
  kicker: "Back2Mboa ASAP™ · Preuve par l'action",
  title: "Les éditions pilotes ont prouvé le modèle.",
  subtitle:
    "MEET Administrations 2022 (Douala) et MEET Écosystème 2023 (Musée National, Yaoundé).",
  lead: "Survolez chaque colonne pour comprendre le rôle de ces acteurs dans Back2Mboa.",
  roleKicker: "Rôle dans Back2Mboa",
  badge: "Preuve · pas promesse",
  foot2022: { year: "2022", detail: "90 acteurs · 60+ mises en relation" },
  foot2023: { year: "2023", detail: "400+ participants · SG MINREX · FEICOM" },
  footDate: "16 · 17 décembre 2026 — Musée National, Yaoundé",
};

/** Slides Unsplash — inchangées (voir PreuvesPilotesSection). */
export const PREUVES_PILOTES_COLUMNS: PreuvesPilotesColumn[] = [
  {
    id: "solutionneurs",
    role:
      "Les Bâtisseurs-Solutionneurs™ apportent l'expertise, les technologies et les modèles d'affaires. Ils répondent aux Mayor Calls™, co-construisent les Opportunity Cards™ et entrent en Deal Room™ avec les territoires.",
    title: "Entrepreneurs & diaspora qui construisent",
    body: "35 (2022) puis 70 (2023) entrepreneurs et Solutionneurs diaspora : agro, finance, tech, énergie, habitat. 97 % de satisfaction.",
    linkLabel: "Voir les profils",
    href: "#salon",
    slides: [
      { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85", alt: "Équipe entrepreneurs" },
      { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85", alt: "Networking entrepreneurs" },
      { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85", alt: "Collaboration" },
      { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=85", alt: "Atelier diaspora" },
      { src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85", alt: "Pitch solution" },
    ],
  },
  {
    id: "ecosysteme",
    role:
      "Régulateurs et PTF sécurisent le cadre ; investisseurs et entreprises financent et déploient ; médias d'influence amplifient ; Team Back2Mboa orchestre matching, qualification CAP™ et suivi jusqu'à la mise en œuvre.",
    title: "Régulateurs, PTF, investisseurs & médias",
    body: "MINREX, MINDDEVEL, FEICOM, AFD, UE, GIZ, APME, CCIMA, CARPA… + influenceurs (60 000+ de portée) et Team Back2Mboa.",
    linkLabel: "Voir les partenaires",
    href: "#partenaires",
    slides: [
      { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85", alt: "Conférence institutionnelle" },
      { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85", alt: "Panel investisseurs" },
      { src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=85", alt: "Médias" },
      { src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&q=85", alt: "Partenariat" },
      { src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=85", alt: "Équipe projet" },
    ],
  },
  {
    id: "ctd",
    role:
      "Les intendants territoriaux (maires & CTD) portent les besoins du terrain, publient les Mayor Calls™, accueillent les Solutionneurs et pilotent la mise en œuvre locale — du diagnostic CAP™ jusqu'aux recettes et services aux citoyens.",
    title: "Maires & collectivités engagées",
    body: "40 mairies (10 régions) en 2022, 20 mairies (6 régions) en 2023. 89 % de satisfaction. 10 recommandations portées par les maires.",
    linkLabel: "Voir les territoires",
    href: "#mairies-championnes",
    slides: [
      { src: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&q=85", alt: "Réunion territoriale" },
      { src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=85", alt: "Élus CTD" },
      { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85", alt: "Table ronde" },
      { src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=85", alt: "Terrain communal" },
      { src: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&q=85", alt: "Assemblée locale" },
    ],
  },
];
