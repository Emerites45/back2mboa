export type MethodePillar = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  versoTitle: string;
  versoSubtitle: string;
  versoText: string;
  versoBottom: string;
};

export type MethodeCopy = {
  eyebrow: string;
  watermark: string;
  title: string;
  lead: string;
  pillars: MethodePillar[];
};
