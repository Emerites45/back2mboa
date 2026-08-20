import type { PlateformeCopy, PlateformeProfile } from "@/types/plateforme";

export const PLATEFORME_COPY: PlateformeCopy = {
  kicker: "Qui êtes-vous ?",
  title: "La Bonne Porte, Le Bon Gain.",
  subtitle:
    "Cinq profils, cinq réalités différentes ; et pour chacun, un chemin clair de ce qui bloque aujourd'hui vers ce que Back2Mboa débloque.",
};

/** Contenu maquette : seul le profil Maires est fourni — les autres onglets n’inventent aucune fiche. */
export const PLATEFORME_PROFILES: PlateformeProfile[] = [
  {
    id: "maires",
    tab: "Maires & Collectivités",
    title: "Intendants territoriaux",
    body: "Vous portez un territoire plein de potentiel — mais sans mécanisme pour le révéler, le structurer et le connecter aux bons partenaires.",
    cta: "Je publie mon territoire",
    cards: [
      {
        today: "Manque de visibilité de vos opportunités",
        withB2m: "Site « diaspora friendly » & marketing territorial",
      },
      {
        today: "Difficulté à attirer des investisseurs",
        withB2m: "Fiches CAP, pitchs structurés, mission économique",
      },
      {
        today: "Fiscalité locale sous-optimale",
        withB2m: "Cartographie des revenus, collecte digitale",
      },
      {
        today: "Exode rural des jeunes",
        withB2m: "Dashboard de l’emploi, formation, réseau de points focaux",
      },
      {
        today: "Tourisme sous-exploité",
        withB2m: "Booking 360°, conciergerie, notoriété",
      },
    ],
  },
  {
    id: "diaspora",
    tab: "Solutionneurs Diaspora",
    title: "",
    body: "",
    cta: "",
    cards: [],
  },
  {
    id: "investisseurs",
    tab: "Investisseurs",
    title: "",
    body: "",
    cta: "",
    cards: [],
  },
  {
    id: "minrex",
    tab: "MINREX & État",
    title: "",
    body: "",
    cta: "",
    cards: [],
  },
  {
    id: "sponsors",
    tab: "Sponsors & Partenaires",
    title: "",
    body: "",
    cta: "",
    cards: [],
  },
];
