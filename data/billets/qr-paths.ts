import type { BilletPackId } from "./packs";

const QR = (id: string) =>
  `<svg class="qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
    <rect width="120" height="120" fill="#fff" rx="8"/>
    <text x="60" y="66" text-anchor="middle" font-family="monospace" font-size="11" fill="#333">${id.toUpperCase()}</text>
  </svg>`;

export const BILLET_QR_PATHS: Record<BilletPackId, string> = {
  vision: QR("vision"),
  prosperity: QR("prosperity"),
};
