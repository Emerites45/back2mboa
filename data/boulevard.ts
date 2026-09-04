export type BoulevardSecteur = {
  nom: string;
  court: string;
  v: string;
  iconSrc: string;
  maillons: string[];
};

export type BoulevardCarte = {
  s: BoulevardSecteur;
  e: string;
  n: number;
};

export const ETAPES = [
  "Émergence",
  "Faisabilité",
  "Structuration",
  "Financement",
  "Réalisation",
  "Exploitation",
] as const;

export const SECTEURS: BoulevardSecteur[] = [
  {
    nom: "Agriculture & Agro-industrie",
    court: "Agriculture",
    v: "--s-agri",
    iconSrc: "/images/ecosysteme/agro_et_filiaire.svg",
    maillons: [
      "Planification & intrants",
      "Production",
      "Collecte & stockage",
      "Transformation",
      "Distribution & export",
      "Valorisation circulaire",
    ],
  },
  {
    nom: "Finance, Fiscalité & Digital",
    court: "Finance & Digital",
    v: "--s-fin",
    iconSrc: "/images/ecosysteme/investisseur.svg",
    maillons: [
      "Mobilisation de l'épargne",
      "Crédit & financement",
      "Paiements & monétique",
      "Fiscalité & recettes locales",
      "Infrastructure numérique",
      "Données & conformité",
    ],
  },
  {
    nom: "Foncier, Habitat & Construction",
    court: "Foncier & Habitat",
    v: "--s-fon",
    iconSrc: "/images/ecosysteme/habitat.svg",
    maillons: [
      "Identification & cadastre",
      "Sécurisation juridique",
      "Aménagement & viabilisation",
      "Construction",
      "Second œuvre & finition",
      "Gestion & commercialisation",
    ],
  },
  {
    nom: "Tourisme, Mobilité & Territoire",
    court: "Tourisme & Mobilité",
    v: "--s-tou",
    iconSrc: "/images/ecosysteme/tourisme.svg",
    maillons: [
      "Attractivité & marque territoriale",
      "Accès & transport",
      "Hébergement",
      "Expérience & animation",
      "Distribution & réservation",
      "Fidélisation & données",
    ],
  },
  {
    nom: "Eau & Énergie",
    court: "Eau & Énergie",
    v: "--s-eau",
    iconSrc: "/images/ecosysteme/eau.svg",
    maillons: [
      "Ressource & captage",
      "Production & traitement",
      "Transport & distribution",
      "Stockage & décentralisé",
      "Maintenance & gestion déléguée",
      "Efficacité & résilience",
    ],
  },
  {
    nom: "Environnement et santé",
    court: "Environnement & santé",
    v: "--s-san",
    iconSrc: "/images/ecosysteme/regulateur.svg",
    maillons: [
      "Prévention & santé publique",
      "Diagnostic & plateau technique",
      "Soins spécialisés",
      "Pharmacie & approvisionnement",
      "Assainissement & environnement",
      "Protection sociale",
    ],
  },
];

export const CARTES: BoulevardCarte[] = SECTEURS.flatMap((s, si) =>
  ETAPES.map((e, ei) => ({ s, e, n: si * 6 + ei + 1 })),
);
