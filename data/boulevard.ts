export type BoulevardSecteur = {
  nom: string;
  court: string;
  v: string;
  ico: string;
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
    ico: '<path d="M12 21V9"/><path d="M12 12c-4 0-6-2-6-6 4 0 6 2 6 6z"/><path d="M12 14c4 0 6-2 6-6-4 0-6 2-6 6z"/>',
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
    ico: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
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
    ico: '<path d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V13h6v9"/>',
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
    ico: '<path d="M3 19l6-8 4 5 3-4 5 7z"/><circle cx="8" cy="6" r="2"/>',
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
    ico: '<path d="M12 3s6 6.4 6 10.4A6 6 0 016 13.4C6 9.4 12 3 12 3z"/>',
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
    nom: "Santé, Environnement & Social",
    court: "Santé & Social",
    v: "--s-san",
    ico: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8"/><path d="M8 12h8"/>',
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
