/**
 * Conversion devise — taux fixes configurable.
 *
 * XAF (FCFA CEMAC) est arrimé à l'EUR : 1 EUR = 655,957 XAF (taux fixe).
 * Le taux USD/XAF fluctue — mettre à jour périodiquement dans RATES.
 */

const RATES = {
  /** 1 EUR = ? XAF — taux arrimé CEMAC */
  EUR_XAF: 655.957,
  /** 1 USD = ? XAF — taux marché (à jour mai 2025, approx) */
  USD_XAF: 610,
} as const;

function round(v: number): number {
  return Math.round(v);
}

/** XAF → EUR (arrondi entier) */
export function xafToEur(xaf: number): number {
  return round(xaf / RATES.EUR_XAF);
}

/** XAF → USD (arrondi entier) */
export function xafToUsd(xaf: number): number {
  return round(xaf / RATES.USD_XAF);
}

/** Formate un montant XAF : "32 142 F" */
export function fmtXaf(v: number): string {
  return `${v.toLocaleString("fr-FR")} F`;
}

/** Formate un montant EUR : "49 €" */
export function fmtEur(v: number): string {
  return `${v} €`;
}

/** Formate un montant USD : "$53" */
export function fmtUsd(v: number): string {
  return `$${v}`;
}

/** Retourne les 3 montants formatés à partir d'un prix XAF */
export function prices(xaf: number) {
  return {
    xaf: fmtXaf(xaf),
    eur: fmtEur(xafToEur(xaf)),
    usd: fmtUsd(xafToUsd(xaf)),
  };
}
