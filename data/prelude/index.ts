import type { PreludeCopy } from "@/types/prelude";

export const PRELUDE_COPY: PreludeCopy = {
  eyebrow: "Prélude · Double flux 2026",
  title: "Avant Yaoundé : former, capter, signer.",
  subtitle:
    "Masterclass d’octobre pour les mairies, puis mission et salon de la diaspora en décembre ,le premier sens de la flèche : les territoires vont vers la diaspora.",
  ringImage: "/images/prelude/ring.webp",
  ringAlt: "Paysage camerounais",
  blocks: [
    {
      id: "salon",
      index: "01",
      title: "Le Salon de la Diaspora",
      lead: "Une semaine en Europe. Des engagements signés avant Yaoundé.",
      body: "Le Salon se tient le 4 décembre. Autour de lui, Back2Mboa construit une semaine entière, du 1er au 7 décembre. Les délégations territoriales ne viennent pas exposer : elles viennent conclure.",
      points: [
        "Des deals fermés sur place ; les rendez-vous d’affaires sont pré-arrangés, pas improvisés sur un stand.",
        "Des visites d’entreprises et de ports ; vos équipes voient les procédés et les infrastructures qu’elles veulent répliquer.",
        "Une visibilité auprès de la diaspora mobilisable, celle qui investit, pas celle qui commente.",
        "Les mêmes interlocuteurs retrouvés à Yaoundé, dix jours plus tard, la conversation reprend où elle s’est arrêtée.",
      ],
      image: "/images/prelude/salon.webp",
      imageAlt: "Salon de la Diaspora — networking et engagements",
      layout: "media-left",
      variant: "light",
      tags: [
        { label: "Salon le 4 décembre", tone: "ghost" },
        { label: "Visites d’entreprises", tone: "ghost" },
        { label: "Visites de ports", tone: "ghost" },
        { label: "Rendez-vous d’affaires", tone: "ghost" },
        { label: "Délégations territoriales", tone: "ghost" },
      ],
    },
    {
      id: "masterclass",
      index: "02",
      title: "La Masterclass en prélude",
      lead: "Un territoire bien présenté repart avec des rendez-vous.",
      body: "Deux mois avant le Salon, la Masterclass prépare les Décideurs et Intendants territoriaux. L’objectif est simple : arriver en Europe avec un dossier qu’un investisseur peut instruire, pas avec une intention.",
      points: [
        "Un pitch de territoire en trois minutes, chiffres, besoin, retour attendu. Rien d’autre.",
        "Une fiche d’opportunité par commune, le format que les Investisseurs et PTF acceptent de lire.",
        "Un marketing territorial qui tient ce que la commune offre, pas ce qui lui manque.",
        "Des délégations prêtes, celles qui n’ont pas préparé perdent leur semaine en Europe.",
      ],
      image: "/images/prelude/masterclass.webp",
      imageAlt: "Masterclass mairies et équipes CTD",
      layout: "media-right",
      variant: "light",
      tags: [
        { label: "Pitch en 3 minutes", tone: "ghost" },
        { label: "Fiches d’opportunité", tone: "ghost" },
        { label: "Marketing territorial", tone: "ghost" },
        { label: "Préparation des délégations", tone: "ghost" },
      ],
    },
  ],
  contactCta: {
    label: "Contactez-nous",
    href: "mailto:contact@back2mboa.org",
  },
  foot: [
    "Masterclass : octobre 2026",
    "Mission, salon du 1 au 7 déc. (salon 4 déc.)",
    "Back2Mboa du 16 au 18 déc, Musée National, Yaoundé",
  ],
};
