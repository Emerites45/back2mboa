export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterCopy = {
  logoAlt: string;
  tagline: string;
  emailPlaceholder: string;
  submitLabel: string;
  columns: FooterColumn[];
};
