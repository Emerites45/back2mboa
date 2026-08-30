import type { BonnePorteCopy, BonnePortePanel } from "@/types/bonne-porte";

export const BONNE_PORTE_BG = "/images/bonne-porte/vector-2.webp";

/** Copy — Figma + HTML (contenu panels) */
export const BONNE_PORTE_COPY: BonnePorteCopy = {
  eyebrow: "La bonne porte",
  title: "La Bonne Porte, Le Bon Gain.",
  subtitle: "Qui êtes-vous ?",
  fluxLeft: {
    kicker: "1 → Diaspora (1–7 déc.)",
    body: "Les territoires vont vers la diaspora : salon le 4 déc., visites d’entreprises, ports, deals. Mission 1–7 décembre.",
  },
  fluxRight: {
    kicker: "2 → Territoires (16–17 déc.)",
    body: "La diaspora vient aux territoires : Musée National, Yaoundé. Mayor Calls, Deal Rooms, signatures.",
  },
  fluxMid: "Double flux",
  footMission: {
    label: "Mission / salon diaspora",
    text: " : 1–7 décembre 2026 (salon le 4)",
  },
  footEvent: {
    label: "Back2Mboa",
    text: " : 16–17 décembre 2026 — Musée National, Yaoundé",
  },
  footProsperity: "Prospérité à double sens : Territoires ↔ Diaspora",
  footProsperityHref: "#impact",
};

export const BONNE_PORTE_PANELS: BonnePortePanel[] = [
  {
    id: "ctd",
    tabLabel: "Décideurs & CTD",
    title: "Décideurs & Intendants territoriaux",
    lead: "Vous portez un territoire plein de potentiel — sans mécanisme clair pour le révéler, le structurer et le connecter aux bons partenaires.",
    ctaHref: "/inscription",
    cta: "Je publie mon territoire",
    gains: [
      {
        now: "Opportunités invisibles, pas d’investisseurs sérieux",
        next: "Fiches CAP, pitchs, mission 1–7 + évent. 10–17 déc.",
        impact:
          "Gain : projets financés et recettes municipales (fiscalité, PPP, services).",
      },
      {
        now: "Fiscalité locale sous-optimale, contribuables mal mappés",
        next: "Cartographie des revenus, collecte digitale",
        impact: "Gain : plus de cash en caisse sans attendre une réforme nationale.",
      },
      {
        now: "Peu de visibilité auprès de la diaspora et des PTF",
        next: "Site diaspora-friendly, marketing territorial, mission + salon",
        impact:
          "Gain : territoire « choisissable » — les bons partenaires viennent à vous.",
      },
    ],
  },
  {
    id: "sol",
    tabLabel: "Solutionneurs",
    title: "Bâtisseurs-Solutionneurs",
    titleLines: ["Bâtisseurs-Solutionneurs", "locaux & diaspora"],
    lead: "Vous avez l’expertise, la techno ou le capital — mais pas toujours la porte d’entrée crédible vers un maire, un dossier bancable et un closing.",
    ctaHref: "/inscription",
    cta: "Je propose une solution",
    gains: [
      {
        now: "Réseau opaque, rendez-vous sans suite, projets non cadrés",
        next: "Matching sur Mayor Calls qualifiés + Deal Rooms",
        impact: "Gain : des contrats et des mandats — pas seulement des contacts LinkedIn.",
      },
      {
        now: "Difficile de prouver la traction territoriale à un financeur",
        next: "Opportunity Cards, offtake local, cadre CAP",
        impact: "Gain : dossier finançable → ticket d’investissement ou PPP plus rapide.",
      },
      {
        now: "La mission diaspora / event se limitent souvent au discours",
        next: "1–7 déc. (visites, salon 4 déc.) puis 16–17 déc. (closing)",
        impact:
          "Gain : un pipeline réel Europe → Cameroun, avec des dates et des interlocuteurs.",
      },
    ],
  },
  {
    id: "inv",
    tabLabel: "Investisseurs & PTF",
    title: "Investisseurs & PTF",
    lead: "Vous cherchez du deal-flow africain crédible — pas des pitchs marketing. Le risque, c’est le manque de structuration et de contreparties territoriales.",
    ctaHref: "/inscription",
    cta: "Accéder au deal-flow",
    gains: [
      {
        now: "Projets peu documentés, due diligence coûteuse",
        next: "Pipeline CAP pré-qualifié, mairies engagées, Deal Rooms",
        impact:
          "Gain : moins de temps perdu, plus de tickets déployables sur des dossiers prêts.",
      },
      {
        now: "Peu d’ancrage politique / local pour sécuriser l’exécution",
        next: "6 mairies championnes, cadre institutionnel, suivi post-event",
        impact:
          "Gain : risque d’exécution réduit — le territoire est co-porteur, pas spectateur.",
      },
      {
        now: "Visibilité limitée sur les allers-retours diaspora",
        next: "Mission 1–7 déc. + event 16–17 déc. : deux portes d’entrée",
        impact: "Gain : double fenêtre pour sourcer, rencontrer, signer.",
      },
    ],
  },
  {
    id: "reg",
    tabLabel: "Régulateurs",
    title: "Régulateurs",
    lead: "MINREX, tutelles, administrations : vous devez orienter la diaspora et les investissements sans créer un énième guichet opaque.",
    ctaHref: "/inscription",
    cta: "S’aligner sur le cadre",
    gains: [
      {
        now: "Initiatives dispersées, faible traçabilité des retombées",
        next: "Plateforme unique, indicateurs, lien mission + event national",
        impact: "Gain : pilotage visible — qui investit où, avec quels résultats.",
      },
      {
        now: "La diaspora peinait à trouver « la bonne porte » étatique",
        next: "Porte claire : territoires + cadre MINREX / partenaires",
        impact: "Gain : crédibilité de l’État comme facilitateur, pas comme frein.",
      },
      {
        now: "Missions et salons peu reliés aux deals territoriaux",
        next: "1–7 déc. (salon 4 déc.) branché sur 16–17 déc. Yaoundé",
        impact:
          "Gain : une séquence diplomatique et économique cohérente, mesurable.",
      },
    ],
  },
  {
    id: "med",
    tabLabel: "Médias",
    title: "Médias d’influence",
    lead: "Vous cherchez des histoires fortes — deals, territoires, diaspora — pas un énième communiqué sans images ni chiffres.",
    ctaHref: "/inscription",
    cta: "Demander un accès presse",
    gains: [
      {
        now: "Sujets diaspora souvent émotionnels, peu de preuves économiques",
        next: "Angles deals, mairies, mission 1–7 déc., signatures 16–17 déc.",
        impact:
          "Gain : contenus différenciants, audience engagée, partenaires médias valorisés.",
      },
      {
        now: "Accès limité aux décideurs et aux dossiers sensibles",
        next: "Accréditations, interviews maires / Solutionneurs / PTF",
        impact:
          "Gain : exclusivités et récits « avant / après » sur la prospérité territoriale.",
      },
      {
        now: "Monétisation difficile hors pub générique",
        next: "Packs visibilité, brand content, couverture double séquence",
        impact:
          "Gain : revenus média + positionnement sur un sujet d’agenda national.",
      },
    ],
  },
  {
    id: "ent",
    tabLabel: "Entreprises",
    title: "Entreprises & Autres partenaires",
    lead: "Banques, telcos, énergie, agro, transport : vous voulez du volume utile — clients, deals, image — pas un logo perdu sur un kakemono.",
    ctaHref: "#partenaires",
    cta: "Voir les packs partenaires",
    gains: [
      {
        now: "Sponsoring événementiel à faible ROI mesurable",
        next: "Visibilité mission 1–7 déc. + event 16–17 déc. + plateforme",
        impact:
          "Gain : leads qualifiés, image « bâtisseur », accès décideurs CTD et diaspora.",
      },
      {
        now: "Peu d’occasions de montrer usines, ports, solutions sur le terrain",
        next: "Visites d’entreprises / infrastructures pendant la mission élargie",
        impact:
          "Gain : démonstration produit réelle devant maires, investisseurs, diaspora.",
      },
      {
        now: "Partenariats CTD lents et peu standardisés",
        next: "Deal Rooms, cadres PPP, 6 secteurs prioritaires",
        impact:
          "Gain : cycles de vente raccourcis vers des contrats publics / semi-publics.",
      },
    ],
  },
  {
    id: "mec",
    tabLabel: "Mécénat culturel",
    title: "Mécénat culturel & touristique",
    lead: "Fondations, marques, hôtellerie, culture et institutions : vous cherchez un impact visible sur le patrimoine, l’attractivité et l’économie locale — pas un logo sur un programme de salle.",
    ctaHref: "#partenaires",
    cta: "Devenir mécène",
    gains: [
      {
        now: "Mécénat dispersé, peu relié aux territoires et aux flux touristiques",
        next: "Ancrage Limbé I (tourisme) + mission 1–7 déc. + event 16–17 déc.",
        impact:
          "Gain : visibilité premium + retombées mesurables (visiteurs, nuitées, recettes locales).",
      },
      {
        now: "Peu de pont entre culture, tourisme et investisseurs diaspora",
        next: "Packages homecoming, expériences, sites bookables, points focaux",
        impact:
          "Gain : la diaspora dépense sur place (séjours, culture, artisanat) au lieu de seulement transférer.",
      },
      {
        now: "Projets culturels sous-financés, tourismes peu structurés",
        next: "Mayor Calls tourisme / culture, Deal Rooms, co-financement privé",
        impact:
          "Gain : projets patrimoniaux et touristiques portés à l’investissement — mécénat qui ouvre des deals.",
      },
      {
        now: "Image de marque peu associée au développement territorial africain",
        next: "Naming, parcours visiteurs, contenus, invitations VIP mission + salon 4 déc.",
        impact:
          "Gain : positionnement « bâtisseur » auprès des décideurs, de la diaspora et des médias d’influence.",
      },
    ],
  },
];
