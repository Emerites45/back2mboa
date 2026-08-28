export type RessourcesPanelId =
  | "faq"
  | "acces"
  | "guide"
  | "code"
  | "media"
  | "guides";

export type RessourcesTab = {
  id: RessourcesPanelId;
  label: string;
};

export type RessourcesFaqItem = {
  id: string;
  q: string;
  a: string;
  highlights?: string[];
};

export type RessourcesFaqGroup = {
  id: string;
  title: string;
  items: RessourcesFaqItem[];
};

export type RessourcesPreviewCard = {
  id: Exclude<RessourcesPanelId, "faq">;
  label: string;
  title: string;
  tone: "forest" | "default" | "alert";
  lines: string[];
};

export type RessourcesCopy = {
  eyebrow: string;
  title: string;
  sub: string;
  faqLead: string;
  previewEyebrow: string;
  ctaLabel: string;
  ctaHref: string;
  footEvent: string;
  footSalon: string;
  tabs: RessourcesTab[];
  faqGroups: RessourcesFaqGroup[];
  previewCards: RessourcesPreviewCard[];
  autoplayFaqMs: number;
  autoplayTabMs: number;
};
