import type { BilletPackId } from "./packs";

/**
 * QR codes SVG statiques — visuellement réalistes (finder patterns + data modules).
 * Chaque pack a son propre motif de data pour les différencier visuellement.
 */

const FINDER_TL = `
  <rect x="4" y="4" width="28" height="28" fill="#0A2B21"/>
  <rect x="8" y="8" width="20" height="20" fill="#fff"/>
  <rect x="12" y="12" width="12" height="12" fill="#0A2B21"/>
`;

const FINDER_TR = `
  <rect x="88" y="4" width="28" height="28" fill="#0A2B21"/>
  <rect x="92" y="8" width="20" height="20" fill="#fff"/>
  <rect x="96" y="12" width="12" height="12" fill="#0A2B21"/>
`;

const FINDER_BL = `
  <rect x="4" y="88" width="28" height="28" fill="#0A2B21"/>
  <rect x="8" y="92" width="20" height="20" fill="#fff"/>
  <rect x="12" y="96" width="12" height="12" fill="#0A2B21"/>
`;

const TIMING = `
  <rect x="36" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="8" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="36" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="8" y="76" width="4" height="4" fill="#0A2B21"/>
`;

// Motifs de data spécifiques à chaque pack (grille 5x5 dans la zone centrale 40-80)
const DATA_EARLY = `
  <rect x="40" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="80" width="4" height="4" fill="#0A2B21"/>
`;

const DATA_STANDARD = `
  <rect x="44" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="80" width="4" height="4" fill="#0A2B21"/>
`;

const DATA_VIP = `
  <rect x="40" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="40" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="44" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="48" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="52" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="56" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="60" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="64" width="4" height="4" fill="#0A2B21"/>
  <rect x="44" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="60" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="76" y="68" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="52" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="64" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="72" width="4" height="4" fill="#0A2B21"/>
  <rect x="48" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="72" y="76" width="4" height="4" fill="#0A2B21"/>
  <rect x="40" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="56" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="68" y="80" width="4" height="4" fill="#0A2B21"/>
  <rect x="80" y="80" width="4" height="4" fill="#0A2B21"/>
`;

// Modules de alignment pattern (petit carré en bas à droite)
const ALIGNMENT = `
  <rect x="88" y="88" width="8" height="8" fill="#0A2B21"/>
  <rect x="90" y="90" width="4" height="4" fill="#fff"/>
`;

const buildQR = (dataModules: string) =>
  `<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" aria-hidden="true">
    <rect width="120" height="120" fill="#fff" rx="4"/>
    ${FINDER_TL}${FINDER_TR}${FINDER_BL}${TIMING}${ALIGNMENT}${dataModules}
  </svg>`;

export const BILLET_QR_PATHS: Record<BilletPackId, string> = {
  early: buildQR(DATA_EARLY),
  standard: buildQR(DATA_STANDARD),
  vip: buildQR(DATA_VIP),
};
