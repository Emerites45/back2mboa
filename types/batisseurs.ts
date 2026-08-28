export type BatisseursMetric = {
  value: string;
  numeric: number;
  suffix: string;
  label: string;
};

export type BatisseursProfile = {
  id: string;
  name: string;
  role: string;
  href: string;
  bullets: string[];
  image: string;
  imageAlt: string;
};

export type BatisseursCopy = {
  snapTitle: string;
  snapBody: string;
  snapNote: string;
  cardKicker: string;
  cardMeta: string;
  heroValue: string;
  heroUnit: string;
  heroLabel: string;
  metrics: BatisseursMetric[];
  teamEyebrow: string;
  teamTitle: string;
  teamLead: string;
  profiles: [BatisseursProfile, BatisseursProfile];
  quote: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  autoplayMs: number;
};
