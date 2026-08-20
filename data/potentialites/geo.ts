/**
 * Projection WGS84 → viewBox 1100×1513, identique à scripts/calibrate_cmr_map.py.
 * Sert uniquement à placer les pastilles communales (pas du géocodage API).
 */
const UTM_S = 0.001111906750947921;
const UTM_OX = 332.1180289825785;
const UTM_OY = 1608.6312804108297;
const UTM_SY = 0.975;

function utm33(lon: number, lat: number): [number, number] {
  const a = 6378137.0;
  const f = 1 / 298.257223563;
  const e2 = f * (2 - f);
  const ep2 = e2 / (1 - e2);
  const k0 = 0.9996;
  const lon0 = (15 * Math.PI) / 180;
  const latr = (lat * Math.PI) / 180;
  const lonr = (lon * Math.PI) / 180;
  const n = a / Math.sqrt(1 - e2 * Math.sin(latr) ** 2);
  const t = Math.tan(latr) ** 2;
  const c = ep2 * Math.cos(latr) ** 2;
  const aa = Math.cos(latr) * (lonr - lon0);
  const m =
    a *
    ((1 - e2 / 4 - (3 * e2 ** 2) / 64 - (5 * e2 ** 3) / 256) * latr -
      ((3 * e2) / 8 + (3 * e2 ** 2) / 32 + (45 * e2 ** 3) / 1024) * Math.sin(2 * latr) +
      ((15 * e2 ** 2) / 256 + (45 * e2 ** 3) / 1024) * Math.sin(4 * latr) -
      ((35 * e2 ** 3) / 3072) * Math.sin(6 * latr));
  const x =
    k0 *
      n *
      (aa +
        ((1 - t + c) * aa ** 3) / 6 +
        ((5 - 18 * t + t ** 2 + 72 * c - 58 * ep2) * aa ** 5) / 120) +
    500000;
  const y =
    k0 *
    (m +
      n *
        Math.tan(latr) *
        (aa ** 2 / 2 +
          ((5 - t + 9 * c + 4 * c ** 2) * aa ** 4) / 24 +
          ((61 - 58 * t + t ** 2 + 600 * c - 330 * ep2) * aa ** 6) / 720));
  return [x, y];
}

export function lonLatToMap(lon: number, lat: number): { x: number; y: number } {
  const [e, n] = utm33(lon, lat);
  return { x: UTM_S * e + UTM_OX, y: -UTM_S * UTM_SY * n + UTM_OY };
}

/**
 * Coordonnées WGS84 des 29 communes du corpus (chefs-lieux / arrondissements).
 * Garoua 1/2/3 sont légèrement décalées pour éviter la superposition des pastilles.
 */
export const COMMUNE_LONLAT: Record<string, { lon: number; lat: number }> = {
  akonolinga: { lon: 12.2506, lat: 3.7694 },
  bafang: { lon: 10.177, lat: 5.157 },
  baham: { lon: 10.37, lat: 5.333 },
  banyo: { lon: 11.8167, lat: 6.75 },
  "bare-bakem": { lon: 9.9, lat: 4.75 },
  belo: { lon: 10.25, lat: 6.1667 },
  "biwong-bulu": { lon: 11.05, lat: 2.8 },
  "garoua-1er": { lon: 13.4, lat: 9.3 },
  "garoua-2eme": { lon: 13.46, lat: 9.27 },
  "garoua-3eme": { lon: 13.34, lat: 9.33 },
  ebebda: { lon: 11.275, lat: 4.36 },
  ebone: { lon: 9.933, lat: 4.8 },
  eseka: { lon: 10.7667, lat: 3.65 },
  eyumodjock: { lon: 8.9833, lat: 5.75 },
  fundong: { lon: 10.2833, lat: 6.25 },
  "gari-gombo": { lon: 15.133, lat: 4.017 },
  gaschiga: { lon: 13.5, lat: 9.35 },
  guider: { lon: 13.9464, lat: 9.9333 },
  "maroua-1er": { lon: 14.3158, lat: 10.5956 },
  massok: { lon: 10.4, lat: 4.05 },
  mbalmayo: { lon: 11.5014, lat: 3.5167 },
  mbanga: { lon: 9.5678, lat: 4.5014 },
  messondo: { lon: 10.6167, lat: 3.5167 },
  "nanga-eboko": { lon: 12.3714, lat: 4.6833 },
  nkondjock: { lon: 10.2542, lat: 4.8736 },
  sangmelima: { lon: 11.9833, lat: 2.9333 },
  yabassi: { lon: 9.9667, lat: 4.4569 },
  yingui: { lon: 10.0833, lat: 4.5 },
  yoko: { lon: 12.3167, lat: 5.5333 },
};

export function communeMapPoint(communeId: string): { x: number; y: number } | null {
  const ll = COMMUNE_LONLAT[communeId];
  if (!ll) return null;
  return lonLatToMap(ll.lon, ll.lat);
}
