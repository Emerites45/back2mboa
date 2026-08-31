export interface SlideData {
  id: number;
  subtitle: string;
  titleTop: string;
  titleMain: string;
  quote: string;
  description: string;
  extraText: string;
  videoUrl: string;
  posterUrl: string;
  stats: {
    stat1: string;
    label1: string;
    stat2: string;
    label2: string;
    stat3: string;
    label3: string;
  };
}

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    subtitle: "African Solutions Activating Prosperity (ASAP)",
    titleTop: "LE RETOUR",
    titleMain: "DES BÂTISSEURS-SOLUTIONNEURS",
    quote: "Babadjou — Région de l’Ouest, Cameroun.",
    description: "Le Maire de Babadjou fait face à une réalité : sa commune produit 4 000 tonnes de pommes de terre, mais cette richesse pourrait créer beaucoup plus de valeur si elle était transformée localement.\n\nBACK2MBOA le connecte à un Bâtisseur-Solutionneur camerounais basé en Arizona, aux États-Unis, qui travaille chez Pringles, dans l’industrie des chips de pomme de terre, et peut lui apporter les partenaires, la technicité et les solutions de micro-industrialisation nécessaires.",
    extraText: "BACK2MBOA active également les bailleurs de fonds qui investissent dans l’agriculture et les régulateurs tels que l’ANOR, le MINADER et le PAD, afin de faciliter le transfert des ressources, des compétences, des équipements et des financements vers son territoire.\n\nSIX MOIS PLUS TARD…\n\nBabadjou ne se contente plus de produire des pommes de terre : une dynamique de transformation locale est enclenchée, créant de nouveaux débouchés, de la valeur et des emplois sur le territoire.",
    videoUrl: null,
    posterUrl: "/images/back2mboa-cover.png",
    stats: {
      stat1: "4 000 T",
      label1: "Pommes de terre / an",
      stat2: "1 unité",
      label2: "Transfert d'expertise",
      stat3: "+100",
      label3: "Emplois territoriaux"
    }
  },
  {
    id: 2,
    subtitle: "Fundong - Hauts-Plateaux Du Nord-Ouest",
    titleTop: "LE MATIN OÙ",
    titleMain: "LA DIASPORA EST REVENUE",
    quote: "Fundong — Nord-Ouest, Cameroun.",
    description: "Un Maire Ouvre Sa Boîte Mail. Un Ingénieur Camerounais Installé À Paris A Lu Les Données De Sa Commune - Et Propose De Venir Avec Une Équipe D'ingénieurs.",
    extraText: "Six Mois Plus Tard, L'eau Coule Dans Douze Villages. L'électricité S'allume Dans Les Centres De Santé. Des Emplois Sont Nés. Ce N'est Pas Un Miracle : C'est Un Mécanisme.\n\nCe Mécanisme, C'est Back2Mboa. Il Transforme Une Opportunité Invisible En Dossier Crédible, Puis En Partenariat, Puis En Projet Exécuté.",
    videoUrl: "/videos/waterfall-final2.mp4",
    posterUrl: "/images/waterfall-final2_227.jpeg",
    stats: {
      stat1: "12",
      label1: "Villages alimentés",
      stat2: "6 mois",
      label2: "Du contact au chantier",
      stat3: "38k",
      label3: "Habitants impactés"
    }
  },
  {
    id: 3,
    subtitle: "Kribi - Chutes de la Lobé",
    titleTop: "L'ÉNERGIE ET L'EAU",
    titleMain: "UN IMPACT STRUCTURANT",
    quote: "Kribi — Sud, Cameroun.",
    description: "Développement d'infrastructures durables pour le développement des collectivités locales et valorisation des opportunités.",
    extraText: "Grâce aux synergies créées, nous connectons les compétences locales aux capitaux internationaux.\n\nUne approche pragmatique pour moderniser l'accès aux services essentiels dans toutes les régions du Cameroun.",
    videoUrl: "/videos/field-tree.mp4",
    posterUrl: "/images/field-tree_228.jpeg",
    stats: {
      stat1: "25",
      label1: "Projets validés",
      stat2: "4 mois",
      label2: "Temps d'exécution",
      stat3: "120k",
      label3: "Bénéficiaires directes"
    }
  },
  {
    id: 4,
    subtitle: "Garoua - Grand Nord",
    titleTop: "UN AVENIR PARTAGÉ",
    titleMain: "BÂTIR LE CAMEROUN DE DEMAIN",
    quote: "Garoua — Nord, Cameroun.",
    description: "Partenariats public-privé innovants et accompagnement sur-mesure pour un retour efficace des talents au pays.",
    extraText: "Ensemble, chaque projet concrétisé rapproche les talents de la terre mère.\n\nDécouvrez nos indicateurs d'impact et participez dès aujourd'hui à la dynamique nationale.",
    videoUrl: "/videos/aurora-final.mp4",
    posterUrl: "/images/aurora-final_229.jpeg",
    stats: {
      stat1: "100%",
      label1: "Projets traçables",
      stat2: "15",
      label2: "Secteurs clés",
      stat3: "500+",
      label3: "Experts engagés"
    }
  }
];