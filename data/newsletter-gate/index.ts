import type { NewsletterGateCopy } from "@/types/newsletter-gate";

export const NEWSLETTER_GATE_COPY: NewsletterGateCopy = {
  title: "Recevez les actus Back2Mboa",
  subtitle:
    "Mayor Calls, dates clés et ouvertures de Deal Rooms : une mail quand il y a du concret.",
  firstNamePlaceholder: "Prénom",
  lastNamePlaceholder: "Nom",
  emailPlaceholder: "Votre email",
  submitLabel: "S'inscrire",
  submitDone: "Inscription confirmée !",
  consentLabel:
    "J'accepte de recevoir les communications Back2Mboa. Désinscription à tout moment.",
};

/** WebP générés par scripts/optimize-images.mjs */
export const NEWSLETTER_GATE_IMAGE = {
  src: "/images/gate_orange-640.webp",
  width: 640,
  height: 665,
  srcSet:
    "/images/gate_orange-480.webp 480w, /images/gate_orange-640.webp 640w, /images/gate_orange-795.webp 795w",
} as const;
