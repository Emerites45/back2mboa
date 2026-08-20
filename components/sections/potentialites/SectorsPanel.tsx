"use client";

import { communesCountForSector } from "@/data/potentialites";
import { SECTORS } from "@/data/potentialites/sectors";
import type { RegionId, SectorId } from "@/types/potentialites";

type SectorsPanelProps = {
  sectorId: SectorId | null;
  regionId: RegionId | null;
  onSelect: (id: SectorId) => void;
  className?: string;
};

export function SectorsPanel({
  sectorId,
  regionId,
  onSelect,
  className = "",
}: SectorsPanelProps) {
  return (
    <aside className={`potentialites-panel ${className}`.trim()} aria-label="Secteurs prioritaires">
      <div className="potentialites-panel-head">
        <p>Priorités</p>
        <h2>Secteurs prioritaires</h2>
      </div>
      <div className="potentialites-panel-body">
        {SECTORS.map((sector, index) => {
          const count = communesCountForSector(sector.id, regionId ?? undefined);
          const active = sectorId === sector.id;
          return (
            <button
              key={sector.id}
              type="button"
              className={`potentialites-sector${active ? " is-active" : ""}`}
              onClick={() => onSelect(sector.id)}
              aria-pressed={active}
            >
              <span>
                <strong>
                  {index + 1}. {sector.label}
                </strong>
                <em>
                  {count} commune{count > 1 ? "s" : ""}
                </em>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
