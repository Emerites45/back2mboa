# Potentialités communales

Tableau de bord 3 panneaux (Détails / Carte / Secteurs). Données exclusivement issues de :
- `Sollicitation_Potentialités_Communes_Louise_TEKAPSO.docx` (29 fiches)
- `Sollicitation_Noms_Maires_Louise_TEKAPSO.xlsx` (maires)
- `carte_cameroun.png`

## Arborescence

```
components/sections/potentialites/
  PotentialitesSection.tsx
  PotentialitesSection.css
  CameroonMap.tsx
  DetailsPanel.tsx
  SectorsPanel.tsx
  RegionStatsCard.tsx
data/potentialites/
  communes.ts
  regions.ts          # 10 paths SVG viewBox 1100×1513
  geo.ts              # lon/lat → pastilles (même affine que la carte)
  sectors.ts          # mots-clés Opportunités
  index.ts
types/potentialites.ts
public/images/potentialites/carte_cameroun.png
app/potentialites/page.tsx
```

## URLs
- Landing : `/#potentialites`
- Plein écran : `/potentialites`

## Carte
Overlay SVG ADM1 (GADM 4.1 → UTM 33N → affine calée sur le PNG), `object-fit: contain`.
Hover or `#E3A73B`, sélection aqua `#00C2A8`.  
Est = Moloundou / Yokadouma. Adamaoua = Ngaoundéré / Meiganga / Banyo. Sud sans Yokadouma.

Calibrage reproductible : `python3 scripts/calibrate_cmr_map.py` (source `data/potentialites/cmr-adm1.geojson`). LocationIQ n’est pas utilisé pour les frontières.

### Checklist validation hit-testing
- [x] Hover chaque région → polygone sur les frontières du PNG
- [x] Moloundou / Yokadouma → Est
- [x] Ngaoundéré / Meiganga / Banyo → Adamaoua
- [x] Sud n’englobe pas Yokadouma / Moloundou
- [x] Pas de chevauchement (contours ADM1 partagés)
- [x] Escape / clic hors polygone → désélection

Aucune donnée inventée : les communes sans fiche Word n’apparaissent pas dans le panneau Détails.

## Filtrage par secteur
Clic d’un secteur (panneau droit) → pastilles or sur la carte. Aucun bandeau ni compteur. Reclic du secteur → mode régions.

## Indicateur régional
Clic région → carte overlay : nom, nombre de communes **du corpus**, somme des populations renseignées (`≈`). Disparaît à la désélection.
