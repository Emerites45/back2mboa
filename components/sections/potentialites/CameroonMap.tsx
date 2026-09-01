"use client";

import type { CommuneMarker } from "@/data/potentialites";
import { REGIONS } from "@/data/potentialites/regions";
import type { RegionId } from "@/types/potentialites";
import type { PointerEvent } from "react";

export type MapTooltip = {
  title: string;
  lines?: string[];
  x: number;
  y: number;
};

type CameroonMapProps = {
  selectedId: RegionId | null;
  hoveredId: RegionId | null;
  /** Régions qui portent au moins une commune du secteur actif. */
  litRegionIds?: RegionId[];
  sectorFilter?: boolean;
  markers?: CommuneMarker[];
  selectedCommuneId?: string | null;
  onHover: (id: RegionId | null, tooltip?: MapTooltip | null) => void;
  onSelect: (id: RegionId) => void;
  onDeselect: () => void;
  onSelectCommune?: (id: string) => void;
  onHoverCommune?: (marker: CommuneMarker | null, tooltip?: MapTooltip | null) => void;
};

function tooltipFromEvent(svg: SVGSVGElement, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

export function CameroonMap({
  selectedId,
  hoveredId,
  litRegionIds,
  sectorFilter = false,
  markers = [],
  selectedCommuneId = null,
  onHover,
  onSelect,
  onDeselect,
  onSelectCommune,
  onHoverCommune,
}: CameroonMapProps) {
  const emitRegionHover = (
    id: RegionId,
    label: string,
    e: PointerEvent<SVGPathElement>,
  ) => {
    if (sectorFilter) {
      onHover(id, null);
      return;
    }
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const pos = tooltipFromEvent(svg, e.clientX, e.clientY);
    onHover(id, { title: label, ...pos });
  };

  const emitPinHover = (marker: CommuneMarker, e: PointerEvent<SVGGElement>) => {
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const pos = tooltipFromEvent(svg, e.clientX, e.clientY);
    onHoverCommune?.(marker, {
      title: marker.commune.name,
      lines: marker.opportunities,
      ...pos,
    });
  };

  return (
    <div className={`potentialites-map-stage${sectorFilter ? " is-filter" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/potentialites/carte_cameroun.webp"
        alt="Carte du Cameroun — 10 régions"
      />
      <svg
        className="potentialites-map-svg"
        viewBox="0 0 1100 1513"
        preserveAspectRatio="xMidYMid meet"
        role="group"
        aria-label="Régions du Cameroun, zones cliquables"
      >
        <rect
          width="1100"
          height="1513"
          fill="transparent"
          aria-hidden="true"
          onClick={onDeselect}
        />
        {REGIONS.map((region) => {
          const selected = selectedId === region.id;
          const hovered = !sectorFilter && hoveredId === region.id;
          const muted =
            Boolean(sectorFilter && litRegionIds?.length && !litRegionIds.includes(region.id));
          const lit = Boolean(sectorFilter && litRegionIds?.includes(region.id));
          return (
            <path
              key={region.id}
              className={`map-region potentialites-region${hovered ? " is-hover" : ""}${selected && !sectorFilter ? " is-selected" : ""}${muted ? " is-muted" : ""}${lit ? " is-lit" : ""}`}
              d={region.path}
              data-region={region.id}
              fillRule="evenodd"
              tabIndex={sectorFilter ? -1 : 0}
              role="button"
              aria-label={`${region.name}, capitale ${region.capital}`}
              aria-pressed={selected}
              onPointerEnter={(e) => emitRegionHover(region.id, region.name, e)}
              onPointerMove={(e) => emitRegionHover(region.id, region.name, e)}
              onPointerLeave={() => onHover(null, null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelect(region.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(region.id);
                }
              }}
            />
          );
        })}

        {sectorFilter &&
          markers.map((marker, index) => {
            const active = selectedCommuneId === marker.commune.id;
            return (
              <g
                key={marker.commune.id}
                className={`potentialites-pin${active ? " is-active" : ""}`}
                transform={`translate(${marker.x.toFixed(1)} ${marker.y.toFixed(1)})`}
                style={{ animationDelay: `${index * 28}ms` }}
                tabIndex={0}
                role="button"
                aria-label={`${marker.commune.name}. ${marker.opportunities.join(". ")}`}
                aria-pressed={active}
                onPointerEnter={(e) => emitPinHover(marker, e)}
                onPointerMove={(e) => emitPinHover(marker, e)}
                onPointerLeave={() => onHoverCommune?.(null, null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCommune?.(marker.commune.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectCommune?.(marker.commune.id);
                  }
                }}
              >
                {/* Groupe interne : le CSS scale ne doit pas écraser le translate SVG */}
                <g
                  className="potentialites-pin-scale"
                  style={{ animationDelay: `${index * 28}ms` }}
                >
                  <circle className="potentialites-pin-halo" r="12" />
                  <circle className="potentialites-pin-core" r="5.5" />
                </g>
              </g>
            );
          })}
      </svg>
    </div>
  );
}
