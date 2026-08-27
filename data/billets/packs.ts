export type BilletPackId = "growth" | "impact" | "vision" | "prosperity";

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

export const STUB_BG = ["#EAF5EC", "#FCF3E2", "#FFF7CC", "#FDE5E7"] as const;

export const PACKS: BilletPack[] = [
  {
    id: "growth",
    nom: "GROWTH",
    complet: "GROWTH PARTNER",
    prix: "900 000",
    couleur: "#119D63",
    texte: "#0D7A4C",
    statut: "Disponible",
    dispo: true,
    europe: "Salon de la Diaspora en option",
    position: "Partenaire d'un maillon spécifique de la chaîne de valeur.",
    inclus: [
      "<b>1 maillon</b> de chaîne de valeur au choix, parmi les 216",
      "Rencontres ciblées avec les <b>communes concernées</b> par ce maillon",
      "Leads qualifiés sur votre maillon pendant les deux jours",
      "Logo sur les supports de l'atelier sectoriel correspondant",
      "Accès aux Deal Rooms sur créneau dédié",
    ],
    pourqui: [
      "PME et cabinets spécialisés sur une expertise précise",
      "Entreprises qui testent Back2Mboa avant un engagement plus large",
      "Fournisseurs d'équipements ou de services sur un segment",
    ],
    bottom: "Un maillon, des communes ciblées, <em>des leads qualifiés</em>.",
  },
  {
    id: "impact",
    nom: "IMPACT",
    complet: "IMPACT PARTNER",
    prix: "4 900 000",
    couleur: "#C97B34",
    texte: "#A2611F",
    statut: "Disponible",
    dispo: true,
    europe: "Salon de la Diaspora en option",
    position: "Acteur clé d'un cycle de vie complet.",
    inclus: [
      "<b>1 cycle de vie complet</b> — les 6 maillons d'un même parcours",
      "<b>Atelier sectoriel co-animé</b> avec les équipes Back2Mboa",
      "Leads qualifiés sur l'ensemble du cycle, pas sur un seul segment",
      "Logo sur les supports du secteur et sur le site de l'événement",
      "Accès prioritaire aux Deal Rooms",
      "Mention dans le rapport d'impact publié après l'événement",
    ],
    pourqui: [
      "Entreprises intégrées présentes sur plusieurs maillons",
      "Bureaux d'études et ensembliers",
      "Institutions financières ciblant une filière entière",
    ],
    bottom: "Six maillons d'un coup, <em>un atelier que vous co-animez</em>.",
  },
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
];
