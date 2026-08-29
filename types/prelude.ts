export type PreludeTag = {
  label: string;
  tone: "accent" | "ghost";
};

export type PreludePack = {
  title: string;
  body: string;
};

export type PreludeBlock = {
  id: string;
  index: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  /** image | card order on desktop */
  layout: "media-left" | "media-right";
  variant: "light" | "cta";
  tags: PreludeTag[];
  packs?: PreludePack[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export type PreludeCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ringImage: string;
  ringAlt: string;
  blocks: PreludeBlock[];
  foot: string[];
};
