export type BilletPackId = "vision" | "prosperity" | "legacy";

export type BilletPack = {
  id: BilletPackId;
  nom: string;
  complet: string;
  prix: string;
  couleur: string;
  texte: string;
  statut: string;
  dispo: boolean;
  europe: string;
  position: string;
  chips?: string[];
  inclus: string[];
  pourqui: string[];
  bottom: string;
};

export const STUB_BG = ["#FFF7CC", "#FDE5E7", "#E0F5F1"] as const;

export const PACKS: BilletPack[] = [
  {
    id: "vision",
    nom: "VISION",
    complet: "VISION PARTNER",
    prix: "9 900 000",
    couleur: "#FFD506",
    texte: "#9A6B08",
    statut: "Dernières places",
    dispo: true,
    europe: "1 personne prise en charge en Europe",
    position: "Propriétaire d'un secteur prioritaire entier.",
    inclus: [
      "<b>Exclusivité</b> sur 1 des 6 secteurs prioritaires",
      "<b>Keynote</b> lors de l'atelier sectoriel de votre secteur",
      "Visibilité dédiée sur l'ensemble du secteur et sa Mairie Championne",
      "<b>Salon de la Diaspora du 1er au 7 décembre — 1 personne, tous frais payés</b>",
      "Visites d'entreprises et de ports pendant la semaine européenne",
      "Rendez-vous d'affaires pré-arrangés en Europe et à Yaoundé",
      "Logo sur les supports de l'événement et les sites des communes",
    ],
    pourqui: [
      "Leaders sectoriels qui veulent verrouiller leur secteur",
      "Groupes cherchant une exposition auprès d'une filière entière",
      "Partenaires visant le deal-flow d'un secteur complet",
    ],
    bottom: "Un secteur entier, une keynote, <em>une place en Europe payée</em>.",
  },
  {
    id: "prosperity",
    nom: "PROSPERITY",
    complet: "PROSPERITY PARTNER",
    prix: "24 900 000",
    couleur: "#D8212E",
    texte: "#D8212E",
    statut: "Disponible",
    dispo: true,
    europe: "2 personnes prises en charge en Europe",
    position: "Sponsor officiel — couverture globale, primeur sur tous les projets.",
    inclus: [
      "<b>Primeur sur toutes les opportunités qualifiées</b>, tous secteurs confondus",
      "Logo sur tous les supports et sur les <b>40 sites de mairies</b>",
      "<b>Allocution officielle</b> à l'ouverture et stand premium de 9 m²",
      "Naming du Village Partenaire",
      "<b>Salon de la Diaspora du 1er au 7 décembre — 2 personnes, tous frais payés</b>",
      "Base de données complète des participants (opt-in)",
      "Rapport d'impact personnalisé et suivi des opportunités générées",
    ],
    pourqui: [
      "Banques et institutions financières de premier plan",
      "Groupes cherchant le statut de sponsor officiel",
      "Marques visant une association durable au projet",
    ],
    bottom: "Tout le pipeline en primeur, <em>deux places en Europe payées</em>.",
  },
  {
    id: "legacy",
    nom: "LEGACY",
    complet: "LEGACY PARTNER",
    prix: "49 900 000",
    couleur: "#45B3A9",
    texte: "#0A2B21",
    statut: "Disponible",
    dispo: true,
    europe: "3 personnes prises en charge en Europe",
    position: "Fondateur — cofédateur de l'écosystème, accès total.",
    inclus: [
      "<b>Fondateur de l'écosystème</b> — tous secteurs, tous projets",
      "<b>Co-locuteur</b> à l'ouverture avec le President de la République",
      "<b>Naming du Salon de la Diaspora</b> et stand double (18 m²)",
      "3 personnes prises en charge en Europe (Salon + Rendez-vous)",
      "Accès privilégié à tous les fondateurs de projets et mairies",
      "<b>1% de royalty sur toutes les transactions facilitées</b> pendant 5 ans",
      "Rapport trimestriel d'impact + conseil stratégique personnalisé",
    ],
    pourqui: [
      "Fondateurs visionnaires souhaitant marquer l'histoire",
      "Groupes cherchant un partenariat structurel à long terme",
      "Institutions voulant co-construire l'écosystème agricole camerounais",
    ],
    bottom: "Leパートenaire fondateur, <em>trois places en Europe payées</em>.",
  },
];
