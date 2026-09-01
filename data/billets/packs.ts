export type BilletPackId = "early" | "standard" | "vip";

export type BilletPack = {
  id: BilletPackId;
  nom: string;
  complet: string;
  prix: string;
  couleur: string;
  texte: string;
  statut: string;
  dispo: boolean;
  extra: string;
  position: string;
  chips?: string[];
  inclus: string[];
  pourqui: string[];
  bottom: string;
};

export const STUB_BG = ["#EAF5EC", "#E8EEEB", "#FBF3D4"] as const;

export const PACKS: BilletPack[] = [
  {
    id: "early",
    nom: "EARLY BIRD",
    complet: "EARLY BIRD",
    prix: "49",
    couleur: "#119D63",
    texte: "#0D7A4C",
    statut: "Ouvert",
    dispo: true,
    extra: "Jusqu'au 30 sept. 2026",
    position: "Tarif préférentiel — accès complet aux 2 jours.",
    chips: ["2 jours", "Deal Rooms", "Networking", "500 décideurs"],
    inclus: [
      "<b>Accès complet</b> aux 2 jours (16 & 17 décembre)",
      "Sessions plénières et <b>ateliers sectoriels</b>",
      "Networking ouvert avec mairies, diaspora et financeurs",
      "Deal Rooms en accès libre (selon places)",
      "Kit participant + <b>badge QR</b> check-in",
      "Accès plateforme (profil + matching de base)",
      "Tarif verrouillé — économie vs tarif plein",
    ],
    pourqui: [
      "Solutionneurs et entrepreneurs de la diaspora",
      "Cadres et porteurs de projets qui s'inscrivent tôt",
      "Toute personne qui veut maximiser le ROI du ticket",
    ],
    bottom: "Le même accès que le Standard, <em>à prix réduit</em> si vous réservez avant le 30 septembre.",
  },
  {
    id: "standard",
    nom: "STANDARD",
    complet: "STANDARD",
    prix: "99",
    couleur: "#0A2B21",
    texte: "#0A2B21",
    statut: "Disponible",
    dispo: true,
    extra: "Tarif plein",
    position: "Accès aux sessions, networking et Deal Rooms ouverts.",
    chips: ["2 jours", "Speed-meeting", "Mayor Calls", "Annuaire"],
    inclus: [
      "Tout le contenu <b>Early Bird</b>",
      "Accès <b>prioritaire</b> aux files Deal Rooms",
      "1 créneau de <b>speed-meeting</b> solutionneur / maire",
      "Comptes-rendus sectoriels post-événement",
      "Listing dans l'annuaire participants (optionnel)",
      "Support check-in prioritaire le matin",
    ],
    pourqui: [
      "Participants qui rejoignent après la fin de l'Early Bird",
      "Ceux qui veulent un créneau de rencontre qualifié",
      "Professionnels qui valorisent le suivi post-événement",
    ],
    bottom: "L'accès solide : <em>priorité files + 1 speed-meeting</em> inclus.",
  },
  {
    id: "vip",
    nom: "VIP",
    complet: "VIP",
    prix: "199",
    couleur: "#C9A227",
    texte: "#8A6E12",
    statut: "Places limitées",
    dispo: true,
    extra: "Accueil 08:00 · Deal Rooms fermés",
    position: "Accès prioritaire, dîner décideurs et suivi 90 jours.",
    chips: ["Deal Rooms+", "Dîner", "RDV pré-booké", "Suivi 90 j"],
    inclus: [
      "Tout le contenu <b>Standard</b>",
      "Accès aux <b>Deal Rooms fermés</b> (tables décideurs)",
      "<b>Dîner décideurs</b> (soirée 16 ou 17 décembre)",
      "Seat réservé en plénière + accueil dès 08:00",
      "1 rendez-vous qualifié <b>pré-booké</b> (maire ou financeur)",
      "Suivi post-événement <b>90 jours</b> (relances matching)",
      "Badge VIP + canal WhatsApp dédié pendant l'événement",
    ],
    pourqui: [
      "Investisseurs et décideurs qui maximisent chaque créneau",
      "Solutionneurs en phase de closing",
      "Ceux qui veulent un suivi structuré après Yaoundé",
    ],
    bottom: "Le ticket qui ouvre les portes fermées : <em>dîner, RDV pré-booké, suivi 90 j</em>.",
  },
];
