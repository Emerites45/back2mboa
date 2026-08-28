import type { FooterCopy } from "@/types/footer";

export const FOOTER_COPY: FooterCopy = {
  logoAlt: "Back2Mboa",
  tagline: "Pas de panique on vous aide à y voir clair.",
  emailPlaceholder: "Votre email",
  submitLabel: "S'inscrire à la newsletter",
  columns: [
    {
      title: "À propos",
      links: [
        { label: "La bonne porte", href: "#la-bonne-porte" },
        { label: "Méthode", href: "#methode" },
        { label: "Résultats", href: "#resultats" },
        { label: "Équipe", href: "#team" },
      ],
    },
    {
      title: "Solutions",
      links: [
        { label: "Bâtisseurs", href: "#batisseurs" },
        { label: "Mairies championnes", href: "#mairies-championnes" },
        { label: "Modèle", href: "#modele" },
        { label: "Ressources", href: "#ressources" },
      ],
    },
    {
      title: "Parcours",
      links: [
        { label: "Parcours", href: "#parcours" },
        { label: "Agenda", href: "#agenda" },
        { label: "Écosystème", href: "#digital-twin" },
        { label: "Inscription", href: "/inscription" },
      ],
    },
    {
      title: "Social",
      links: [
        {
          label: "Instagram",
          href: "https://www.instagram.com/back2mboa",
          external: true,
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/back2mboa",
          external: true,
        },
        { label: "Newsletter", href: "#newsletter" },
        { label: "Partenaires", href: "#partenaires" },
      ],
    },
  ],
};

/** Asset logo v1 — actif dans le footer. */
export const FOOTER_LOGO = {
  src: "/images/back2mboa-logo-footer-200.webp",
  width: 200,
  height: 71,
  srcSet: "/images/back2mboa-logo-footer-200.webp 200w",
} as const;

/**
 * Asset logo v2 — petites tailles (footer logo si besoin).
 * Bannière pleine largeur : `data/footer-banner` → `FOOTER_BANNER_IMAGE`.
 */
export const FOOTER_LOGO_V2 = {
  src: "/images/back2mboa-logo-footer-v2-280.webp",
  width: 280,
  height: 101,
  srcSet:
    "/images/back2mboa-logo-footer-v2-200.webp 200w, /images/back2mboa-logo-footer-v2-280.webp 280w, /images/back2mboa-logo-footer-v2-400.webp 400w",
} as const;
