export type Partenaire = [nom: string, sous: string];
export type AfricaPoint = [x: number, y: number];

/** Polygone Afrique en % (viewBox 1600×900). */
export const AFRICA: AfricaPoint[] = [
  [52, 12],
  [57, 17],
  [60, 26],
  [62, 38],
  [59, 46],
  [57, 55],
  [53, 62],
  [48, 70],
  [44, 79],
  [38, 88],
  [31, 93],
  [24, 90],
  [20, 82],
  [17, 72],
  [14, 62],
  [11, 52],
  [9, 42],
  [12, 33],
  [18, 26],
  [26, 20],
  [34, 15],
  [43, 11],
];

export const ENTRENT: Partenaire[] = [
  ["MINREX", "Relations extérieures"],
  ["MINDDEVEL", "Développement local"],
  ["FEICOM", "Financement communes"],
  ["CVUC", "Communes & villes unies"],
  ["APME", "Promotion des PME"],
  ["CARPA", "PPP"],
  ["MINADER", "Agriculture"],
  ["CCIMA", "Chambre de commerce"],
];

export const SORTENT: Partenaire[] = [
  ["GIZ", "Coopération allemande"],
  ["AFD", "Agence française de développement"],
  ["UNION EUROPÉENNE", "Délégation Cameroun"],
  ["PAD", "Port autonome de Douala"],
  ["ANOR", "Normes & qualité"],
  ["MINSANTÉ", "Santé publique"],
  ["MINEE", "Eau & énergie"],
  ["SOLUTIONNEURS", "Initiative"],
];

export function initiales(nom: string): string {
  return nom
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 3);
}

export function inPoly(x: number, y: number, poly: AfricaPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0];
    const yi = poly[i][1];
    const xj = poly[j][0];
    const yj = poly[j][1];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}
