/**
 * Grille des cartes secondaires (hors founder).
 * Choisit cols × rows pour minimiser les cases vides
 * et éviter une pile trop haute (préfère large > haut).
 */
export function getSecondaryGrid(count: number): { cols: number; rows: number } {
  if (count <= 0) return { cols: 0, rows: 1 };
  if (count <= 3) return { cols: count, rows: 1 };
  if (count === 4) return { cols: 2, rows: 2 };

  let best = { cols: 2, rows: Math.ceil(count / 2), score: Number.POSITIVE_INFINITY };
  const maxCols = Math.min(count, 5);

  for (let cols = 2; cols <= maxCols; cols++) {
    const rows = Math.ceil(count / cols);
    const empty = cols * rows - count;
    const score =
      empty * 3 +
      Math.abs(rows - cols) +
      (rows > cols ? (rows - cols) * 1.5 : 0) +
      (cols >= 5 ? 0.5 : 0);

    const better =
      score < best.score || (score === best.score && cols > best.cols);
    if (better) best = { cols, rows, score };
  }

  return { cols: best.cols, rows: best.rows };
}

/** Largeur relative de la colonne founder selon le nombre de secondaires. */
export function getFeaturedTrack(secondaryCount: number): string {
  if (secondaryCount === 0) return "minmax(0, 1fr)";
  if (secondaryCount <= 2) return "minmax(0, 1.1fr)";
  if (secondaryCount <= 4) return "minmax(0, 1.2fr)";
  if (secondaryCount <= 6) return "minmax(0, 1.3fr)";
  return "minmax(0, 1.35fr)";
}
