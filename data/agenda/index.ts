import type { AgendaCopy } from "@/types/agenda";

/** Copy extraite de Back2Mboa section Events SVG Grok 1.png. Pas d’invention hors onglets. */
export const AGENDA_COPY: AgendaCopy = {
  kicker: "Back2Mboa ASAP™ · Agenda 2026",
  ctaPrimary: "Réserver ma place",
  ctaSecondary: "Voir le programme",
  events: [
    {
      id: "masterclass",
      index: "01",
      badge: "Masterclass",
      title: "Masterclass CTD —",
      titleAccent: "Attractivité & IA",
      tabTitle: "Masterclass CTD",
      date: "08 octobre 2026",
      location: "Europe (Paris / Lyon / Bordeaux)",
      body: "Préparer les maires et leurs équipes : marketing territorial, cartes de revenus, pitch investisseur façon Shark Tank, outils numériques prêts à l'emploi pour accroître les recettes.",
      thumb: "green",
    },
    {
      id: "mission",
      index: "02",
      badge: "Mission",
      title: "Mission des Maires",
      tabTitle: "Mission des Maires",
      date: "09 - 18 octobre 2026",
      thumb: "blue",
    },
    {
      id: "webinar",
      index: "03",
      badge: "Webinaire",
      title: "Webinaire Digital Twin™",
      tabTitle: "Webinaire Digital Twin™",
      date: "Novembre 2026",
      thumb: "teal",
    },
    {
      id: "event",
      index: "04",
      badge: "Événement",
      title: "Back2Mboa 2026",
      tabTitle: "Back2Mboa 2026",
      date: "16 - 17 décembre 2026",
      thumb: "red",
    },
  ],
};
