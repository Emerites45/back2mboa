import type { PreludeCopy } from "@/types/prelude";

export const PRELUDE_COPY: PreludeCopy = {
  eyebrow: "Prélude , Double flux 2026",
  title: "Avant Yaoundé : former, capter, signer.",
  subtitle:
    "Masterclass d’octobre pour les mairies, puis mission et salon de la diaspora en décembre , le premier sens de la flèche : les territoires vont vers la diaspora.",
  ringImage: "/images/prelude/ring.webp",
  ringAlt: "Paysage camerounais",
  blocks: [
    {
      id: "salon",
      index: "01",
      title: "Salon de la Diaspora & mission",
      body: "Du 1er au 7 décembre 2026, les territoires rencontrent la diaspora et les partenaires en Europe. Point d’ordre : le salon du  4 décembre, visibilité, deals, visites d’entreprises et d’infrastructures.",
      image: "/images/prelude/salon.webp",
      imageAlt: "Salon et networking diaspora",
      layout: "media-left",
      variant: "light",
      tags: [
        { label: "1–7 décembre", tone: "accent" },
        { label: "Salon — 4 déc.", tone: "ghost" },
        { label: "Visites entreprises", tone: "ghost" },
        { label: "B2B — Deals", tone: "ghost" },
      ],
    },
    {
      id: "masterclass",
      index: "02",
      title: "Masterclass CTD — octobre",
      body: "Masterclass pratique pour les maires et leurs équipes : attractivité territoriale, mobilisation diaspora / investisseurs, outils numériques pour augmenter les recettes, cartes d’opportunités, pitch investisseur.",
      image: "/images/prelude/masterclass.webp",
      imageAlt: "Masterclass mairies et équipes CTD",
      layout: "media-right",
      variant: "light",
      tags: [
        { label: "Octobre 2026", tone: "accent" },
        { label: "Attractivité", tone: "ghost" },
        { label: "Recettes CTD", tone: "ghost" },
        { label: "Pitch investisseur", tone: "ghost" },
      ],
    },
    {
      id: "partenaires",
      index: "03",
      title: "Partenaires : rejoignez le salon",
      body: "L’accès au salon de la diaspora et à la mission est inclus dans les packs sponsors. Visibilité, networking décideurs, démonstration terrain , prise en charge selon le niveau.",
      image: "/images/prelude/partenaires.webp",
      imageAlt: "Partenaires et sponsors Back2Mboa",
      layout: "media-left",
      variant: "cta",
      tags: [],
      packs: [
        {
          title: "Prosperity Partner",
          body: "Prise en charge de 2 personnes, tous frais payés  salon plus  activités mission.",
        },
        {
          title: "Vision Partner",
          body: "Prise en charge d’1 personne, tous frais payés — salon + activités mission.",
        },
      ],
      primaryCta: { label: "Voir les packs partenaires", href: "#billets" },
      secondaryCta: { label: "Nous contacter", href: "#partenaires" },
    },
  ],
  foot: [
    "Masterclass · octobre 2026",
    "Mission / salon · 1–7 déc. (salon 4 déc.)",
    "Back2Mboa · 16–18 déc. · Musée National, Yaoundé",
  ],
};
