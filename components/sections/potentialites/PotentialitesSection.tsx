"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  communesCountForSector,
  findCommune,
  markersForRegion,
  markersForSector,
  regionIdsForSector,
  statsForRegion,
} from "@/data/potentialites";
import { REGIONS } from "@/data/potentialites/regions";
import type { RegionId, SectorId } from "@/types/potentialites";
import { CameroonMap, type MapTooltip } from "./CameroonMap";
import { DetailsPanel } from "./DetailsPanel";
import { RegionStatsCard } from "./RegionStatsCard";
import { SectorsPanel } from "./SectorsPanel";
import "./PotentialitesSection.css";

type MobilePane = "carte" | "details" | "secteurs";

export function PotentialitesSection() {
  const [regionId, setRegionId] = useState<RegionId | null>(null);
  const [communeId, setCommuneId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<RegionId | null>(null);
  const [sectorId, setSectorId] = useState<SectorId | null>(null);
  const [tooltip, setTooltip] = useState<MapTooltip | null>(null);
  const [mobilePane, setMobilePane] = useState<MobilePane>("carte");

  const selectedRegion = REGIONS.find((r) => r.id === regionId);

  /** Secteur hors région active → clear (filtre strict). */
  useEffect(() => {
    if (!regionId || !sectorId) return;
    if (communesCountForSector(sectorId, regionId) === 0) {
      setSectorId(null);
    }
  }, [regionId, sectorId]);

  const markers = useMemo(() => {
    /* Région active → toujours toutes les communes de la région (pins rouges). */
    if (regionId) return markersForRegion(regionId);
    if (sectorId) return markersForSector(sectorId);
    return [];
  }, [sectorId, regionId]);

  /** Communes du secteur (pour atténuer les pins hors-secteur dans la région). */
  const sectorCommuneIds = useMemo(() => {
    if (!sectorId) return null;
    return new Set(markersForSector(sectorId).map((m) => m.commune.id));
  }, [sectorId]);

  const pinVariant = regionId ? "region" : "sector";
  const showLabels = Boolean(regionId);

  const litRegionIds = useMemo(
    () => (sectorId ? regionIdsForSector(sectorId) : undefined),
    [sectorId],
  );

  const onHover = useCallback((id: RegionId | null, next?: MapTooltip | null) => {
    setHoveredId(id);
    setTooltip(next ?? null);
  }, []);

  const onSelectRegion = useCallback((id: RegionId) => {
    setRegionId(id);
    setCommuneId(null);
    setTooltip(null);
    /* Rester sur la carte : pins + labels visibles immédiatement */
    setMobilePane("carte");
  }, []);

  const onSelectCommune = useCallback((id: string) => {
    const commune = findCommune(id);
    if (commune) setRegionId(commune.regionId);
    setCommuneId(id);
    setMobilePane("details");
  }, []);

  const onSelectSector = useCallback((id: SectorId) => {
    setSectorId((prev) => (prev === id ? null : id));
    setCommuneId(null);
    setTooltip(null);
  }, []);

  const clearFocus = useCallback(() => {
    setRegionId(null);
    setCommuneId(null);
    setTooltip(null);
  }, []);

  const clearAll = useCallback(() => {
    clearFocus();
    setSectorId(null);
  }, [clearFocus]);

  const headerHint = selectedRegion
    ? `Région / ${selectedRegion.name}${
        markers.length
          ? ` · ${markers.length} commune${markers.length > 1 ? "s" : ""}`
          : ""
      }`
    : "Région / Commune — sélectionnez sur la carte";

  return (
    <section
      id="potentialites"
      className="potentialites"
      aria-labelledby="potentialites-title"
      onKeyDown={(e) => {
        if (e.key !== "Escape") return;
        if (communeId) {
          setCommuneId(null);
          return;
        }
        if (sectorId) {
          setSectorId(null);
          setTooltip(null);
          return;
        }
        clearAll();
      }}
    >
      <header className="potentialites-header">
        <div className="potentialites-brand">
          <strong id="potentialites-title">Back2Mboa ASAP™</strong>
          <span>Potentialités communales</span>
        </div>
        <p className="potentialites-filter">{headerHint}</p>
      </header>

      <div className="potentialites-tabs" role="tablist">
        {(
          [
            ["carte", "Carte"],
            ["details", "Détails"],
            ["secteurs", "Secteurs"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={mobilePane === id ? "is-active" : ""}
            onClick={() => setMobilePane(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="potentialites-board">
        <DetailsPanel
          className={mobilePane === "details" ? "is-mobile-on" : ""}
          regionId={regionId}
          communeId={communeId}
          sectorId={sectorId}
          onSelectRegion={onSelectRegion}
          onSelectCommune={onSelectCommune}
          onClear={clearAll}
        />

        <div
          className={`potentialites-panel potentialites-map${
            mobilePane === "carte" ? " is-mobile-on" : ""
          }`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (sectorId) clearFocus();
              else clearAll();
            }
          }}
        >
          {selectedRegion && (
            <RegionStatsCard
              key={`stats-${selectedRegion.id}`}
              name={selectedRegion.name}
              stats={statsForRegion(selectedRegion.id)}
            />
          )}
          <CameroonMap
            key={`map-${regionId ?? "none"}-${sectorId ?? "none"}`}
            selectedId={regionId}
            hoveredId={hoveredId}
            litRegionIds={litRegionIds}
            sectorFilter={Boolean(sectorId)}
            markers={markers}
            pinVariant={pinVariant}
            showLabels={showLabels}
            sectorCommuneIds={sectorCommuneIds}
            selectedCommuneId={communeId}
            onHover={onHover}
            onSelect={onSelectRegion}
            onDeselect={sectorId ? clearFocus : clearAll}
            onSelectCommune={onSelectCommune}
            onHoverCommune={(_marker, next) => setTooltip(next ?? null)}
          />
          {tooltip && (
            <div
              className={`potentialites-tooltip${
                tooltip.lines?.length ? " is-rich" : ""
              }`}
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              <strong>{tooltip.title}</strong>
              {tooltip.lines?.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          )}
        </div>

        <SectorsPanel
          className={mobilePane === "secteurs" ? "is-mobile-on" : ""}
          sectorId={sectorId}
          regionId={regionId}
          onSelect={onSelectSector}
        />
      </div>
    </section>
  );
}
