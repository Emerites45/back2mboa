export type PreludeTag = {
  label: string;
  tone: "accent" | "ghost";
};

export type PreludePack = {
  title: string;
  body: string;
};

export type PreludeCta = {
  label: string;
  href: string;
};

export type PreludeBlock = {
  id: string;
  index: string;
  title: string;
  /** Accroche sous le titre */
  lead?: string;
  body: string;
  /** Points avec coche */
  points?: string[];
  image?: string;
  imageAlt?: string;
  /** image | card order on desktop */
  layout: "media-left" | "media-right";
  variant: "light" | "cta";
  tags: PreludeTag[];
  packs?: PreludePack[];
  primaryCta?: PreludeCta;
  secondaryCta?: PreludeCta;
};

export type PreludeCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ringImage: string;
  ringAlt: string;
  blocks: PreludeBlock[];
  contactCta: PreludeCta;
  foot: string[];
};
