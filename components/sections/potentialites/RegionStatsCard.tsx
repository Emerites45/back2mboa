import type { RegionStats } from "@/data/potentialites";

type RegionStatsCardProps = {
  name: string;
  stats: RegionStats;
};

/** Overlay régional — 3 lignes : nom, communes, population. */
export function RegionStatsCard({ name, stats }: RegionStatsCardProps) {
  const communeLabel = `${stats.communeCount} commune${stats.communeCount > 1 ? "s" : ""}`;

  return (
    <div
      className="potentialites-region-card"
      role="status"
      aria-live="polite"
      aria-label={`${name}. ${communeLabel}${stats.populationLabel ? `. ${stats.populationLabel}` : ""}`}
    >
      <strong>{name}</strong>
      <p>{communeLabel}</p>
      {stats.populationLabel && <p>{stats.populationLabel}</p>}
    </div>
  );
}
