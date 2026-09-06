import { COMMUNES } from "@/data/potentialites/communes";
import { communeMapPoint } from "@/data/potentialites/geo";
import { SECTORS } from "@/data/potentialites/sectors";
import type { Commune, RegionId, SectorId } from "@/types/potentialites";

export function communesOfRegion(regionId: string) {
  return COMMUNES.filter((c) => c.regionId === regionId);
}

export function findCommune(id: string) {
  return COMMUNES.find((c) => c.id === id);
}

export function opportunityMatchesSector(text: string, sectorId: SectorId) {
  const sector = SECTORS.find((s) => s.id === sectorId);
  if (!sector) return false;
  const hay = text.toLowerCase();
  return sector.keywords.some((k) => hay.includes(k));
}

export function communeHasSector(communeId: string, sectorId: SectorId) {
  const commune = findCommune(communeId);
  if (!commune) return false;
  return commune.resources.some((row) =>
    row.opportunites.some((op) => opportunityMatchesSector(op, sectorId)),
  );
}

/** Opportunités d’une commune qui matchent le secteur (dédupliquées, max 2 pour tooltip). */
export function sectorOpportunities(commune: Commune, sectorId: SectorId, limit = 2) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const row of commune.resources) {
    for (const op of row.opportunites) {
      const clean = op.replace(/\s+/g, " ").trim();
      const key = clean.toLowerCase();
      if (!opportunityMatchesSector(clean, sectorId) || seen.has(key)) continue;
      seen.add(key);
      out.push(clean);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

export function communesForSector(sectorId: SectorId, regionId?: RegionId | null) {
  const pool = regionId ? communesOfRegion(regionId) : COMMUNES;
  return pool.filter((c) => communeHasSector(c.id, sectorId));
}

export function communesCountForSector(sectorId: SectorId, regionId?: string) {
  return communesForSector(sectorId, regionId as RegionId | undefined).length;
}

export function regionIdsForSector(sectorId: SectorId): RegionId[] {
  const ids = new Set<RegionId>();
  for (const c of communesForSector(sectorId)) ids.add(c.regionId);
  return [...ids];
}

export type CommuneMarker = {
  commune: Commune;
  x: number;
  y: number;
  opportunities: string[];
};

export function markersForSector(sectorId: SectorId): CommuneMarker[] {
  return communesForSector(sectorId)
    .map((commune) => {
      const pt = communeMapPoint(commune.id);
      if (!pt) return null;
      return {
        commune,
        x: pt.x,
        y: pt.y,
        opportunities: sectorOpportunities(commune, sectorId, 2),
      };
    })
    .filter((m): m is CommuneMarker => m !== null);
}

/** Pastilles de toutes les communes documentées d’une région (sélection carte). */
export function markersForRegion(regionId: RegionId): CommuneMarker[] {
  return communesOfRegion(regionId)
    .map((commune) => {
      const pt = communeMapPoint(commune.id);
      if (!pt) return null;
      return {
        commune,
        x: pt.x,
        y: pt.y,
        opportunities: [],
      };
    })
    .filter((m): m is CommuneMarker => m !== null);
}

/** Secteurs présents dans la région (au moins 1 commune matchée). */
export function sectorsForRegion(regionId: RegionId) {
  return SECTORS.filter((s) => communesCountForSector(s.id, regionId) > 0);
}

/** "47 561" | "120.232" (séparateur milliers FR) → entier. */
export function parsePopulation(raw?: string): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const compact = trimmed.replace(/\s/g, "");
  const thousandsDot = compact.match(/^(\d+)\.(\d{3})$/);
  const n = thousandsDot
    ? Number(`${thousandsDot[1]}${thousandsDot[2]}`)
    : Number(compact.replace(/[^\d]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function formatPopulationEstimate(total: number): string {
  const rounded = total >= 10_000 ? Math.round(total / 1_000) * 1_000 : total;
  return `Population environ ${rounded.toLocaleString("fr-FR")} habitants`;
}

export type RegionStats = {
  communeCount: number;
  population: number | null;
  populationLabel: string | null;
};

/** Agrégats du corpus Word uniquement — pas de totaux administratifs inventés. */
export function statsForRegion(regionId: RegionId): RegionStats {
  const list = communesOfRegion(regionId);
  let population = 0;
  let hasPop = false;
  for (const commune of list) {
    const n = parsePopulation(commune.population);
    if (n == null) continue;
    population += n;
    hasPop = true;
  }
  return {
    communeCount: list.length,
    population: hasPop ? population : null,
    populationLabel: hasPop ? formatPopulationEstimate(population) : null,
  };
}
