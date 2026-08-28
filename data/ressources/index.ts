import type { RessourcesCopy } from "@/types/ressources";

export const RESSOURCES_COPY: RessourcesCopy = {
  eyebrow: "Ressources",
  title: "On te rassure. On te guide.",
  sub: "FAQ, plan d’accès, guide pratique, code de conduite, dossier média et guides acteurs.",
  faqLead:
    "Tout ce que tu dois savoir sur l’organisation, le lieu et les modalités.",
  previewEyebrow: "Aperçu onglets",
  ctaLabel: "Une question ? Écrivez-nous",
  ctaHref: "mailto:contact@back2mboa.org",
  footEvent: "Event 16–17 déc. 2026 · Musée National, Yaoundé",
  footSalon: "Salon 4 déc. · mission 1–7 déc.",
  tabs: [
    { id: "faq", label: "FAQ" },
    { id: "acces", label: "Accès" },
    { id: "guide", label: "Guide pratique" },
    { id: "code", label: "Code de conduite" },
    { id: "media", label: "Dossier média" },
    { id: "guides", label: "Guides acteurs" },
  ],
  faqGroups: [
    {
      id: "org",
      title: "Organisation & concept",
      items: [
        {
          id: "org-0",
          q: "Qu’est-ce que Back2Mboa ?",
          a: "Back2Mboa (African Solutions Accelerating Prosperity) est une plateforme de prospérité territoriale qui identifie, structure, rend visibles et connecte des opportunités économiques réelles avec les personnes capables de les transformer en projets concrets. Ce n’est pas un salon traditionnel ni un forum de discours.",
        },
        {
          id: "org-1",
          q: "Qu’est-ce qui différencie Back2Mboa d’un salon classique ?",
          a: "Matching sur des besoins territoriaux qualifiés (Mayor Calls, méthode CAP), Deal Rooms orientées signature, et continuité après l’événement via la plateforme. On mesure les deals, les PPP et les recettes — pas le nombre de selfies.",
          highlights: [
            "Matching qualifié",
            "Deal Rooms",
            "Continuité plateforme",
            "Deals mesurables",
          ],
        },
        {
          id: "org-2",
          q: "Qu’est-ce qu’un Mayor Call ?",
          a: "Un appel structuré d’une mairie sur un besoin territorial précis (secteur, enjeu, critères). Il sert de base au matching avec les Solutionneurs et à la qualification CAP avant les Deal Rooms.",
        },
        {
          id: "org-3",
          q: "C’est quoi le double flux ?",
          a: "1–7 décembre : les territoires vont vers la diaspora (mission + salon le 4 décembre). 16–17 décembre : la diaspora vient aux territoires (Back2Mboa, Musée National, Yaoundé). Prospérité à double sens.",
        },
      ],
    },
    {
      id: "dates",
      title: "Dates, lieu & participation",
      items: [
        {
          id: "dates-0",
          q: "Quand et où ?",
          a: "16–17 décembre 2026 · Musée National du Cameroun, Yaoundé (Boulevard du 20 Mai). Objectif : ~500 participants, 30 médias & influenceurs, 100 entrepreneurs locaux.",
          highlights: ["16–17 déc. 2026", "Musée National, Yaoundé"],
        },
        {
          id: "dates-1",
          q: "Qui peut participer ?",
          a: "CTD / mairies, Solutionneurs locaux et diaspora, investisseurs & PTF, régulateurs, médias, entreprises, mécènes culturels & touristiques. Chaque profil a une « bonne porte » sur le site.",
          highlights: ["CTD", "Solutionneurs", "PTF", "médias", "entreprises"],
        },
        {
          id: "dates-2",
          q: "Comment s’inscrire ?",
          a: "Via le bouton d’inscription du site selon votre profil (territoire, Solutionneur, investisseur, partenaire, presse). Les places sont limitées pour garantir la qualité des Deal Rooms.",
        },
      ],
    },
  ],
  previewCards: [
    {
      id: "acces",
      label: "Accès",
      title: "Musée National",
      tone: "forest",
      lines: [
        "Boulevard du 20 Mai · Yaoundé",
        "Taxi · Voiture · Navettes",
        "Présidence · Hôtel de Ville · ambassades",
      ],
    },
    {
      id: "guide",
      label: "Guide pratique",
      title: "Prépare ton terrain",
      tone: "default",
      lines: [
        "Hébergement & badges",
        "Langues FR / EN",
        "Wi-Fi, powerbank, newsletters",
      ],
    },
    {
      id: "code",
      label: "Code de conduite",
      title: "Les règles du jeu",
      tone: "alert",
      lines: [
        "Respect · Intégrité · Inclusivité",
        "Deal Rooms : honnêteté & ponctualité",
        "Zéro harcèlement — signalement sur site",
      ],
    },
    {
      id: "media",
      label: "Dossier média",
      title: "Assets presse",
      tone: "default",
      lines: [
        "Kit presse · logos · photos",
        "Faits clés (89 % CTD · 97 % entrepreneurs)",
        "presse@back2mboa.org",
        "Masterclass oct. · salon 4 déc. · event 16–17 déc.",
      ],
    },
    {
      id: "guides",
      label: "Guides acteurs",
      title: "6 guides opérationnels",
      tone: "default",
      lines: [
        "Mairie — publier un Mayor Call",
        "Solutionneur — répondre à un Call",
        "Investisseur / PTF · Sponsor",
        "Attractivité territoriale · Double flux",
      ],
    },
  ],
  autoplayFaqMs: 4200,
  autoplayTabMs: 5600,
};
