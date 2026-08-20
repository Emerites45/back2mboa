"use client";

import {
  communesForSector,
  communesOfRegion,
  findCommune,
  opportunityMatchesSector,
} from "@/data/potentialites";
import { REGIONS } from "@/data/potentialites/regions";
import { SECTORS } from "@/data/potentialites/sectors";
import type { RegionId, SectorId } from "@/types/potentialites";

type DetailsPanelProps = {
  regionId: RegionId | null;
  communeId: string | null;
  sectorId: SectorId | null;
  onSelectRegion: (id: RegionId) => void;
  onSelectCommune: (id: string) => void;
  onClear?: () => void;
  className?: string;
};

export function DetailsPanel({
  regionId,
  communeId,
  sectorId,
  onSelectRegion,
  onSelectCommune,
  onClear,
  className = "",
}: DetailsPanelProps) {
  const region = REGIONS.find((r) => r.id === regionId);
  const sector = SECTORS.find((s) => s.id === sectorId);
  const commune = communeId ? findCommune(communeId) : undefined;
  const list = sectorId
    ? communesForSector(sectorId, regionId)
    : regionId
      ? communesOfRegion(regionId)
      : [];

  const title = commune
    ? commune.name
    : sector && !region
      ? sector.label
      : region
        ? region.name
        : "Détails";

  return (
    <aside className={`potentialites-panel ${className}`.trim()} aria-label="Détails">
      <div className="potentialites-panel-head">
        <p>Session détails</p>
        <h2>{title}</h2>
      </div>
      <div className="potentialites-panel-body">
        {!regionId && !sectorId && (
          <>
            <p className="potentialites-empty">
              Sélectionnez une région sur la carte, une commune, ou un secteur prioritaire à droite.
            </p>
            {REGIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="potentialites-commune-btn"
                onClick={() => onSelectRegion(item.id)}
              >
                <strong>{item.name}</strong>
                <span>Capitale {item.capital}</span>
              </button>
            ))}
          </>
        )}

        {!commune && (regionId || sectorId) && (
          <>
            {onClear && (
              <button type="button" className="potentialites-back" onClick={onClear}>
                Réinitialiser
              </button>
            )}
            {sector && list.length === 0 && (
              <p className="potentialites-empty">
                Aucune fiche du corpus n’associe d’opportunité à « {sector.label} ». Le dossier Word
                ne renseigne pas ce champ pour ces communes.
              </p>
            )}
            {sector && list.length > 0 && region && (
              <p className="potentialites-maire">{region.name}.</p>
            )}
            {!sector && region && (
              <p className="potentialites-maire">
                Capitale régionale : {region.capital}. {list.length} commune
                {list.length > 1 ? "s" : ""} documentée{list.length > 1 ? "s" : ""} dans le corpus fourni.
              </p>
            )}
            {!sector && list.length === 0 && (
              <p className="potentialites-empty">
                Aucune fiche commune de ce corpus n’est rattachée à cette région.
              </p>
            )}
            {list.map((item) => (
              <button
                key={item.id}
                type="button"
                className="potentialites-commune-btn"
                onClick={() => onSelectCommune(item.id)}
              >
                <strong>{item.name}</strong>
                <span>{item.mayor ?? "Maire non renseigné dans le fichier Excel"}</span>
              </button>
            ))}
          </>
        )}

        {commune && (
          <article>
            {onClear && (
              <button type="button" className="potentialites-back" onClick={onClear}>
                Réinitialiser
              </button>
            )}
            <p className="potentialites-fiche-kicker">{region?.name}</p>
            <h3 className="potentialites-fiche-title">{commune.name}</h3>
            {commune.mayor && (
              <p className="potentialites-maire">Maire : {commune.mayor}</p>
            )}
            <div className="potentialites-stats">
              {commune.created && (
                <div>
                  <span>Création</span>
                  <strong>{commune.created}</strong>
                </div>
              )}
              {commune.superficie && (
                <div>
                  <span>Superficie</span>
                  <strong>{commune.superficie}</strong>
                </div>
              )}
              {commune.population && (
                <div>
                  <span>Population</span>
                  <strong>{commune.population}</strong>
                </div>
              )}
              {commune.densite && (
                <div>
                  <span>Densité</span>
                  <strong>{commune.densite}</strong>
                </div>
              )}
            </div>
            <p className="potentialites-maire">{commune.intro}</p>
            <table className="potentialites-table">
              <thead>
                <tr>
                  <th>Ressource</th>
                  <th>Caractéristiques</th>
                  <th>Opportunités</th>
                </tr>
              </thead>
              <tbody>
                {commune.resources.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.caracteristiques}</td>
                    <td>
                      {row.opportunites.map((op) => {
                        const active = sectorId
                          ? opportunityMatchesSector(op, sectorId)
                          : false;
                        return (
                          <span
                            key={op}
                            className={`potentialites-tag${active ? " is-active" : ""}`}
                          >
                            {op}
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        )}
      </div>
    </aside>
  );
}
