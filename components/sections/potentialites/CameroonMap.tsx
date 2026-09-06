"use client";

import type { CommuneMarker } from "@/data/potentialites";
import { REGIONS } from "@/data/potentialites/regions";
import type { RegionId } from "@/types/potentialites";
import type { PointerEvent } from "react";
import { useMemo } from "react";

export type MapTooltip = {
  title: string;
  lines?: string[];
  x: number;
  y: number;
};

type PinVariant = "sector" | "region";

type CameroonMapProps = {
  selectedId: RegionId | null;
  hoveredId: RegionId | null;
  /** Régions qui portent au moins une commune du secteur actif. */
  litRegionIds?: RegionId[];
  sectorFilter?: boolean;
  markers?: CommuneMarker[];
  /** `region` = pins rouges + labels ; `sector` = style or existant. */
  pinVariant?: PinVariant;
  showLabels?: boolean;
  /** Si défini avec un secteur actif : pins hors set atténués. */
  sectorCommuneIds?: Set<string> | null;
  selectedCommuneId?: string | null;
  onHover: (id: RegionId | null, tooltip?: MapTooltip | null) => void;
  onSelect: (id: RegionId) => void;
  onDeselect: () => void;
  onSelectCommune?: (id: string) => void;
  onHoverCommune?: (
    marker: CommuneMarker | null,
    tooltip?: MapTooltip | null,
  ) => void;
};

function tooltipFromEvent(svg: SVGSVGElement, clientX: number, clientY: number) {
  const rect = svg.getBoundingClientRect();
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function truncateLabel(text: string, max = 28) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}

type LabelLayout = {
  id: string;
  x: number;
  y: number;
  dy: number;
  hideMayor: boolean;
};

/** Anti-collision simple sur les labels d’une même région (N petit). */
function layoutLabels(markers: CommuneMarker[]): LabelLayout[] {
  const sorted = [...markers].sort((a, b) => a.y - b.y || a.x - b.x);
  const placed: { id: string; x: number; y: number; w: number; h: number }[] = [];
  const out: LabelLayout[] = [];

  for (const m of sorted) {
    const w = Math.min(160, 28 + m.commune.name.length * 5.2);
    const h = m.commune.mayor ? 34 : 18;
    let dy = 22;
    let hideMayor = false;

    for (let attempt = 0; attempt < 6; attempt++) {
      const box = {
        id: m.commune.id,
        x: m.x - w / 2,
        y: m.y + dy,
        w,
        h: hideMayor ? 18 : h,
      };
      const hit = placed.some(
        (p) =>
          box.x < p.x + p.w &&
          box.x + box.w > p.x &&
          box.y < p.y + p.h &&
          box.y + box.h > p.y,
      );
      if (!hit) {
        placed.push(box);
        out.push({ id: m.commune.id, x: m.x, y: m.y, dy, hideMayor });
        break;
      }
      if (attempt === 2) hideMayor = true;
      dy = attempt % 2 === 0 ? -(22 + attempt * 12) : 22 + attempt * 12;
      if (attempt === 5) {
        placed.push(box);
        out.push({ id: m.commune.id, x: m.x, y: m.y, dy, hideMayor: true });
      }
    }
  }

  return out;
}

export function CameroonMap({
  selectedId,
  hoveredId,
  litRegionIds,
  sectorFilter = false,
  markers = [],
  pinVariant = "sector",
  showLabels = false,
  sectorCommuneIds = null,
  selectedCommuneId = null,
  onHover,
  onSelect,
  onDeselect,
  onSelectCommune,
  onHoverCommune,
}: CameroonMapProps) {
  const isRegionPins = pinVariant === "region";
  const labelLayouts = useMemo(
    () => (showLabels && isRegionPins ? layoutLabels(markers) : []),
    [showLabels, isRegionPins, markers],
  );
  const labelById = useMemo(() => {
    const map = new Map<string, LabelLayout>();
    for (const l of labelLayouts) map.set(l.id, l);
    return map;
  }, [labelLayouts]);

  const emitRegionHover = (
    id: RegionId,
    label: string,
    e: PointerEvent<SVGPathElement>,
  ) => {
    if (sectorFilter && !selectedId) {
      onHover(id, null);
      return;
    }
    if (isRegionPins) {
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
    const mayor = marker.commune.mayor?.trim();
    onHoverCommune?.(marker, {
      title: marker.commune.name,
      lines: [
        mayor ? `Mairie : ${mayor}` : `Mairie de ${marker.commune.name}`,
        ...marker.opportunities,
      ],
      ...pos,
    });
  };

  return (
    <div
      className={`potentialites-map-stage${sectorFilter ? " is-filter" : ""}${
        isRegionPins ? " is-region" : ""
      }`}
    >
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
        <g className="potentialites-regions-layer" aria-hidden={false}>
          {REGIONS.map((region) => {
            const selected = selectedId === region.id;
            const hovered =
              !isRegionPins && !sectorFilter && hoveredId === region.id;
            const muted = Boolean(
              sectorFilter &&
                litRegionIds?.length &&
                !litRegionIds.includes(region.id) &&
                !selected,
            );
            const lit = Boolean(
              sectorFilter && litRegionIds?.includes(region.id),
            );
            return (
              <path
                key={`region-${region.id}`}
                className={`map-region potentialites-region${hovered ? " is-hover" : ""}${
                  selected ? " is-selected" : ""
                }${muted ? " is-muted" : ""}${lit && !selected ? " is-lit" : ""}`}
                d={region.path}
                data-region={region.id}
                fillRule="evenodd"
                tabIndex={0}
                role="button"
                aria-label={`${region.name}, capitale ${region.capital}`}
                aria-pressed={selected}
                onPointerEnter={(e) =>
                  emitRegionHover(region.id, region.name, e)
                }
                onPointerMove={(e) =>
                  emitRegionHover(region.id, region.name, e)
                }
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
        </g>

        {/* Couche pins au-dessus des régions (évite filtre CSS qui masque les pastilles). */}
        <g className="potentialites-pins-layer">
          {markers.map((marker, index) => {
            const active = selectedCommuneId === marker.commune.id;
            const layout = labelById.get(marker.commune.id);
            const mayor =
              marker.commune.mayor?.trim() ||
              `Mairie de ${marker.commune.name}`;
            const ariaMayor = marker.commune.mayor?.trim()
              ? marker.commune.mayor.trim()
              : `Mairie de ${marker.commune.name}`;
            const dimmed = Boolean(
              sectorCommuneIds && !sectorCommuneIds.has(marker.commune.id),
            );

            return (
              <g
                key={`pin-${marker.commune.id}`}
                className={`potentialites-pin${isRegionPins ? " is-region" : ""}${
                  active ? " is-active" : ""
                }${dimmed ? " is-dim" : ""}`}
                transform={`translate(${marker.x.toFixed(1)} ${marker.y.toFixed(1)})`}
                style={{ animationDelay: `${index * 26}ms` }}
                tabIndex={0}
                role="button"
                aria-label={`${marker.commune.name}. Mairie : ${ariaMayor}`}
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
                <g
                  className="potentialites-pin-scale"
                  style={{ animationDelay: `${index * 26}ms` }}
                >
                  <circle
                    className="potentialites-pin-halo"
                    r={isRegionPins ? 18 : 12}
                  />
                  <circle
                    className="potentialites-pin-core"
                    r={isRegionPins ? 7.5 : 5.5}
                  />
                </g>

                {showLabels && layout && (
                  <g
                    className="potentialites-label"
                    transform={`translate(0 ${layout.dy})`}
                    style={{ animationDelay: `${index * 26 + 40}ms` }}
                    pointerEvents="none"
                  >
                    <text
                      className="potentialites-label-commune"
                      textAnchor="middle"
                      y="0"
                    >
                      {marker.commune.name}
                    </text>
                    {!layout.hideMayor && (
                      <text
                        className="potentialites-label-mairie"
                        textAnchor="middle"
                        y="14"
                      >
                        {truncateLabel(mayor, 30)}
                      </text>
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
