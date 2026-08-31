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
    titleMain: "Des BÂTISSEURS-SOLUTIONNEURS",
    quote: "Le Maire de Babadjou :",
    description: "Ma commune produit 4.000 tonnes de pommes de terre par an, mais 40% pourrissent sur place, le petit commerce n’arrive pas à absorber ce stock, les agriculteurs ne s’en sortent pas et quelle gâchis pour les recettes communales!",
    extraText: "Back2Mboa\n\nLe connecte à un Bâtisseur-Solutionneur Camerounais qui travaille chez Pringles (industrie de chips de pomme de terre Arizona, USA), qui apporte partenaires, technicité et solutions de micro-industrialisation.\n\nLes investisseurs & PTF, les régulateurs et le PAK, s’embarquent, les chips s’exportent.",
    videoUrl: "/videos/Back2Mboa_Covers_hero.mp4",
    posterUrl: "/images/canyon-final_225.jpeg",
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
    id: 2,
    subtitle: "Kribi - Chutes de la Lobé",
    titleTop: "L'ÉNERGIE ET L'EAU",
    titleMain: "UN IMPACT STRUCTURANT",
    quote: "« Grâce aux synergies créées, nous connectons les compétences locales aux capitaux internationaux. »",
    description: "Développement d'infrastructures durables pour le développement des collectivités locales.",
    extraText: "Une approche pragmatique pour moderniser l'accès aux services essentiels dans toutes les régions du Cameroun.",
    videoUrl: "/videos/waterfall-final2.mp4",
    posterUrl: "/images/waterfall-final2_227.jpeg",
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
    id: 3,
    subtitle: "Bafoussam - Ouest Cameroun",
    titleTop: "DES PROJETS CONCRETS",
    titleMain: "LE RETOUR DES COMPÉTENCES",
    quote: "« Le transfert de technologie et de savoir-faire au service de nos territoires et municipalités. »",
    description: "Autonomisation économique et transformation numérique des collectivités décentralisées.",
    extraText: "Mise en œuvre accélérée de projets d'aménagement et d'équipements publics structurants.",
    videoUrl: "/videos/field-tree.mp4",
    posterUrl: "/images/field-tree_228.jpeg",
    stats: {
      stat1: "40",
      label1: "Mairies partenaires",
      stat2: "10",
      label2: "Régions couvertes",
      stat3: "216",
      label3: "Maillons actifs"
    }
  },
  {
    id: 4,
    subtitle: "Garoua - Grand Nord",
    titleTop: "UN AVENIR PARTAGÉ",
    titleMain: "BÂTIR LE CAMEROUN DE DEMAIN",
    quote: "« Ensemble, chaque projet concrétisé rapproche les talents de la terre mère. »",
    description: "Partenariats public-privé innovants et accompagnement sur-mesure.",
    extraText: "Découvrez nos indicateurs d'impact et participez dès aujourd'hui à la dynamique nationale.",
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