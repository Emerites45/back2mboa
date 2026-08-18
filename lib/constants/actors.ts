export interface ActorTab {
  id: string;
  label: string;
  icon: string;
  roleTitle: string;
  subTitle: string;
  color: string; // Ex: 'emerald' pour le Solutionneur, 'amber', 'blue'
  thinks: string[];
  feels: string[];
  says: string[];
  does: string[];
  painPoint: string;
  solution: string;
}

export const ACTORS_DATA: Record<string, ActorTab> = {
  maire: {
    id: "maire",
    label: "LE MAIRE",
    icon: "🏛️",
    roleTitle: "LE MAIRE",
    subTitle: "CHEF DE TERRITOIRE & DÉCIDEUR LOCAL",
    color: "blue",
    thinks: [
      "Mon territoire a du potentiel mais manque d'investissements ciblés.",
      "Comment attirer des compétences crédibles sans intermédiaire douteux ?",
      "Il faut accélérer la création d'emplois locaux."
    ],
    feels: [
      "Frustration face aux lourdeurs administratives et promesses sans suite.",
      "Urgence de répondre aux attentes des populations.",
      "Enthousiasme à l'idée d'accueillir des projets innovants."
    ],
    says: [
      "\"J'ai le foncier, le besoin, mais où sont les porteurs de solutions ?\"",
      "\"Nous avons besoin de partenaires sérieux et engagés sur le long terme.\"",
      "\"Présentez-moi un projet bancable et nous ouvrirons les portes.\""
    ],
    does: [
      "Cherche à moderniser sa commune avec des moyens limités.",
      "Multiplie les réunions sans toujours trouver d'offres concrètes.",
      "Attend une plateforme centralisée pour exprimer ses besoins territoriaux."
    ],
    painPoint: "Des besoins locaux urgents sans canal structuré pour rencontrer des investisseurs ou techniciens qualifiés.",
    solution: "Une vitrine digitale où exposer ses besoins territoriaux devant des décideurs, banques et financeurs prêts à signer."
  },
  solutionneur: {
    id: "solutionneur",
    label: "LE SOLUTIONNEUR",
    icon: "🌍",
    roleTitle: "LE SOLUTIONNEUR",
    subTitle: "BÂTISSEUR DE LA DIASPORA",
    color: "emerald",
    thinks: [
      "J'ai les compétences, les réseaux, le capital. Mais où atterrir ?",
      "Le Cameroun m'attire, mais je ne connais pas les bons contacts.",
      "Comment investir sans me faire avoir ?"
    ],
    feels: [
      "Nostalgie du pays, envie de construire quelque chose là-bas.",
      "Méfiance face aux opportunités mal structurées.",
      "Impatience — j'ai une solution qui peut changer une commune."
    ],
    says: [
      "\"Je maîtrise les procédés, les équipements, le marché.\"",
      "\"J'ai besoin d'un territoire engagé, pas d'une promesse.\"",
      "\"Si l'opportunité est crédible, je viens.\""
    ],
    does: [
      "Explore des forums sans trouver de projets qualifiés.",
      "Hésite à investir faute d'interlocuteurs fiables.",
      "Attend une plateforme qui structure vraiment les deals."
    ],
    painPoint: "Des compétences et du capital prêts à l'emploi, sans point d'atterrissage structuré.",
    solution: "Un projet qualifié, un maire engagé, et une table réunissant la banque, le régulateur et l'acheteur."
  },
  investisseur: {
    id: "investisseur",
    label: "L'INVESTISSEUR",
    icon: "💼",
    roleTitle: "L'INVESTISSEUR",
    subTitle: "FINANCEUR & BAILLEUR DE FONDS",
    color: "amber",
    thinks: [
      "L'Afrique offre des rendements exceptionnels, mais le risque perçu est trop élevé.",
      "Comment vérifier la viabilité réelle d'un projet local ?",
      "Où trouver des projets déjà pré-qualifiés ?"
    ],
    feels: [
      "Prudence face à l'asymétrie d'information.",
      "Désir d'impact social mesurable en plus de la rentabilité.",
      "Frustration devant le manque d'archivage et de transparence des données."
    ],
    says: [
      "\"Nous avons la liquidité, apportez-nous de la sécurité et des données réelles.\"",
      "\"Je veux voir l'implication des autorités locales avant d'engager un franc.\"",
      "\"Montrez-moi le jumeau numérique et le modèle de revenus.\""
    ],
    does: [
      "Filtre rigoureusement les dossiers de candidature.",
      "Exige des garanties et des tableaux de bord prédictifs.",
      "Recherche des partenariats public-privé (PPP) solides."
    ],
    painPoint: "Des capitaux disponibles mais bloqués par l'absence de données fiables et de projets structurés.",
    solution: "Accès au Digital Twin™, aux états financiers prédictifs et à des garanties institutionnelles réunies au même endroit."
  }
};