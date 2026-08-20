#!/usr/bin/env python3
"""Calibre les 10 régions GADM ADM1 sur carte_cameroun.png (viewBox 1100×1513).

Source contours : GADM 4.1 (gadm41_CMR_1), CRS WGS84.
LocationIQ n'est pas utilisé (géocodage uniquement, pas de frontières).

Projection :
  1) WGS84 → UTM zone 33N (Cameroun centré ~12–15°E, nord en haut)
  2) affine pixel : x = s * E + ox ; y = -s * N + oy
  3) recherche s, ox, oy (et léger stretch sy) pour maximiser l'IoU
     avec le masque terrestre du PNG (crème + parcs verts, hors océan/voisins).
"""

from __future__ import annotations

import json
import math
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
GEOJSON = ROOT / "data/potentialites/cmr-adm1.geojson"
PNG = ROOT / "public/images/potentialites/carte_cameroun.png"
OUT_TS = ROOT / "data/potentialites/regions.ts"
OVERLAY = ROOT / "scripts/geo_overlay_fit.png"

NAME_TO_ID = {
    "Adamaoua": "adamaoua",
    "Centre": "centre",
    "Est": "est",
    "Extrême-Nord": "extreme-nord",
    "Littoral": "littoral",
    "Nord": "nord",
    "Nord-Ouest": "nord-ouest",
    "Ouest": "ouest",
    "Sud": "sud",
    "Sud-Ouest": "sud-ouest",
}

META = {
    "extreme-nord": ("Extrême-Nord", "Maroua"),
    "nord": ("Nord", "Garoua"),
    "adamaoua": ("Adamaoua", "Ngaoundéré"),
    "est": ("Est", "Bertoua"),
    "nord-ouest": ("Nord-Ouest", "Bamenda"),
    "ouest": ("Ouest", "Bafoussam"),
    "sud-ouest": ("Sud-Ouest", "Buéa"),
    "littoral": ("Littoral", "Douala"),
    "centre": ("Centre", "Yaoundé"),
    "sud": ("Sud", "Ébolowa"),
}

ORDER = [
    "extreme-nord",
    "nord",
    "adamaoua",
    "est",
    "nord-ouest",
    "ouest",
    "sud-ouest",
    "littoral",
    "centre",
    "sud",
]

# Villes de contrôle (lon, lat) — géographie administrative réelle
CONTROL = [
    ("centre", "Yaoundé", 11.5167, 3.8667),
    ("centre", "Mbalmayo", 11.5014, 3.5167),
    ("centre", "Akonolinga", 12.2500, 3.7667),
    ("centre", "Nanga-Eboko", 12.3714, 4.6833),
    ("littoral", "Douala", 9.7043, 4.0511),
    ("littoral", "Edéa", 10.1333, 3.8000),
    ("littoral", "Yabassi", 9.9667, 4.4569),
    ("littoral", "Nkondjock", 10.2542, 4.8736),
    ("littoral", "Mbanga", 9.5678, 4.5014),
    ("ouest", "Bafoussam", 10.4167, 5.4667),
    ("ouest", "Bafang", 10.1800, 5.1572),
    ("ouest", "Baham", 10.3700, 5.3320),
    ("ouest", "Dschang", 10.0539, 5.4442),
    ("nord-ouest", "Bamenda", 10.1590, 5.9631),
    ("nord-ouest", "Fundong", 10.2833, 6.2500),
    ("nord-ouest", "Wum", 10.0667, 6.3833),
    ("sud-ouest", "Buéa", 9.2333, 4.1500),
    ("sud-ouest", "Limbe", 9.2146, 4.0182),
    ("sud-ouest", "Kumba", 9.4450, 4.6363),
    ("sud-ouest", "Mundemba", 8.8726, 4.9476),
    ("sud", "Ébolowa", 11.1500, 2.9167),
    ("sud", "Sangmélima", 11.9833, 2.9333),
    ("sud", "Ambam", 11.2686, 2.3828),
    ("est", "Bertoua", 13.6833, 4.5833),
    ("est", "Batouri", 14.3667, 4.4333),
    ("est", "Yokadouma", 15.0500, 3.5167),
    ("est", "Moloundou", 15.2220, 2.0380),
    ("est", "Abong-Mbang", 13.1833, 3.9833),
    ("adamaoua", "Ngaoundéré", 13.5833, 7.3167),
    ("adamaoua", "Meiganga", 14.3000, 6.5167),
    ("adamaoua", "Banyo", 11.8167, 6.7500),
    ("adamaoua", "Tibati", 12.6286, 6.4667),
    ("adamaoua", "Bankim", 11.4900, 6.0830),
    ("nord", "Garoua", 13.4000, 9.3000),
    ("nord", "Guider", 13.9464, 9.9303),
    ("nord", "Poli", 13.2500, 8.4833),
    ("nord", "Tcholliré", 14.1667, 8.4000),
    ("extreme-nord", "Maroua", 14.3158, 10.5956),
    ("extreme-nord", "Mokolo", 13.8028, 10.7403),
    ("extreme-nord", "Kousseri", 15.0306, 12.0769),
    ("extreme-nord", "Mora", 14.1400, 11.0460),
    ("extreme-nord", "Yagoua", 15.2333, 10.3411),
]


def utm33(lon: float, lat: float) -> tuple[float, float]:
    """WGS84 → UTM 33N (mètres)."""
    a = 6378137.0
    f = 1 / 298.257223563
    e2 = f * (2 - f)
    ep2 = e2 / (1 - e2)
    k0 = 0.9996
    lon0 = math.radians(15.0)
    latr = math.radians(lat)
    lonr = math.radians(lon)
    n = a / math.sqrt(1 - e2 * math.sin(latr) ** 2)
    t = math.tan(latr) ** 2
    c = ep2 * math.cos(latr) ** 2
    aa = math.cos(latr) * (lonr - lon0)
    m = a * (
        (1 - e2 / 4 - 3 * e2**2 / 64 - 5 * e2**3 / 256) * latr
        - (3 * e2 / 8 + 3 * e2**2 / 32 + 45 * e2**3 / 1024) * math.sin(2 * latr)
        + (15 * e2**2 / 256 + 45 * e2**3 / 1024) * math.sin(4 * latr)
        - (35 * e2**3 / 3072) * math.sin(6 * latr)
    )
    x = k0 * n * (
        aa
        + (1 - t + c) * aa**3 / 6
        + (5 - 18 * t + t**2 + 72 * c - 58 * ep2) * aa**5 / 120
    ) + 500000.0
    y = k0 * (
        m
        + n
        * math.tan(latr)
        * (
            aa**2 / 2
            + (5 - t + 9 * c + 4 * c**2) * aa**4 / 24
            + (61 - 58 * t + t**2 + 600 * c - 330 * ep2) * aa**6 / 720
        )
    )
    return x, y


def rings_of(geom: dict) -> list[list[list[float]]]:
    t = geom["type"]
    c = geom["coordinates"]
    if t == "Polygon":
        return [c[0]]
    if t == "MultiPolygon":
        return [poly[0] for poly in c]
    return []


def simplify_ring(pts: list[tuple[float, float]], eps: float) -> list[tuple[float, float]]:
    if len(pts) < 4:
        return pts

    def dperp(p, a, b):
        ax, ay = b[0] - a[0], b[1] - a[1]
        l2 = ax * ax + ay * ay
        if l2 == 0:
            return math.hypot(p[0] - a[0], p[1] - a[1])
        t = max(0.0, min(1.0, ((p[0] - a[0]) * ax + (p[1] - a[1]) * ay) / l2))
        return math.hypot(p[0] - (a[0] + t * ax), p[1] - (a[1] + t * ay))

    def rec(seq):
        if len(seq) < 3:
            return seq
        a, b = seq[0], seq[-1]
        idx, dmax = 0, -1.0
        for i in range(1, len(seq) - 1):
            d = dperp(seq[i], a, b)
            if d > dmax:
                idx, dmax = i, d
        if dmax > eps:
            left = rec(seq[: idx + 1])
            right = rec(seq[idx:])
            return left[:-1] + right
        return [a, b]

    closed = pts[0] == pts[-1]
    core = pts[:-1] if closed else pts
    out = rec(core)
    if closed:
        if out[0] != out[-1]:
            out.append(out[0])
    return out if len(out) >= 4 else pts


def land_mask(rgb: np.ndarray) -> np.ndarray:
    """Silhouette du Cameroun : flood-fill depuis le centre, hors pêche voisins / océan.

    La carte colore chaque région (pastel différent) : un seuil « crème » seul
    rate Nord (teal), Est (lavande), Adamaoua (saumon), etc.
    """
    r, g, b = rgb[:, :, 0].astype(int), rgb[:, :, 1].astype(int), rgb[:, :, 2].astype(int)
    peach = (r > 230) & (g > 175) & (g < 225) & (b < 185) & ((r - g) > 22)
    water = (b > r + 18) & (b > g + 5) & (b > 150)
    walk = ~(peach | water)
    # fermer les micro-ponts (routes / anti-alias) vers légende et pays voisins
    walk = min_filter(walk, 2)

    h, w = walk.shape
    sy, sx = h // 2, w // 2
    if not walk[sy, sx]:
        ys, xs = np.where(walk)
        sy, sx = int(ys[len(ys) // 2]), int(xs[len(xs) // 2])

    out = np.zeros(walk.shape, dtype=bool)
    stack_y = [sy]
    stack_x = [sx]
    out[sy, sx] = True
    while stack_y:
        y = stack_y.pop()
        x = stack_x.pop()
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < h and 0 <= nx < w and walk[ny, nx] and not out[ny, nx]:
                out[ny, nx] = True
                stack_y.append(ny)
                stack_x.append(nx)
    out = max_filter(out, 2)
    # légende / flèche nord / barre d’échelle — hors silhouette
    out[:90, :220] = False
    out[:, -30:] = False
    out[-45:, :] = False
    return out


def min_filter(m: np.ndarray, radius: int) -> np.ndarray:
    h, w = m.shape
    p = np.pad(m.astype(np.uint8), radius, constant_values=0)
    acc = p[radius : radius + h, radius : radius + w]
    for dy in range(2 * radius + 1):
        for dx in range(2 * radius + 1):
            acc = np.minimum(acc, p[dy : dy + h, dx : dx + w])
    return acc.astype(bool)


def max_filter(m: np.ndarray, radius: int) -> np.ndarray:
    h, w = m.shape
    p = np.pad(m.astype(np.uint8), radius, constant_values=0)
    acc = p[radius : radius + h, radius : radius + w]
    for dy in range(2 * radius + 1):
        for dx in range(2 * radius + 1):
            acc = np.maximum(acc, p[dy : dy + h, dx : dx + w])
    return acc.astype(bool)


def rasterize(rings_px: list[list[tuple[float, float]]], size: tuple[int, int], scale: float) -> np.ndarray:
    w, h = int(size[0] * scale), int(size[1] * scale)
    im = Image.new("L", (w, h), 0)
    dr = ImageDraw.Draw(im)
    for ring in rings_px:
        pts = [(p[0] * scale, p[1] * scale) for p in ring]
        if len(pts) >= 3:
            dr.polygon(pts, fill=255)
    return np.array(im) > 0


def iou(a: np.ndarray, b: np.ndarray) -> float:
    inter = np.logical_and(a, b).sum()
    uni = np.logical_or(a, b).sum()
    return float(inter / uni) if uni else 0.0


def path_d(rings: list[list[tuple[float, float]]]) -> str:
    parts = []
    for ring in rings:
        if len(ring) < 3:
            continue
        cmds = [f"M {ring[0][0]:.1f} {ring[0][1]:.1f}"]
        for x, y in ring[1:]:
            cmds.append(f"L {x:.1f} {y:.1f}")
        cmds.append("Z")
        parts.append(" ".join(cmds))
    return " ".join(parts)


def point_in_rings(x: float, y: float, rings: list[list[tuple[float, float]]]) -> bool:
    # even-odd over all outer rings (no holes used)
    inside = False
    for ring in rings:
        n = len(ring)
        j = n - 1
        for i in range(n):
            xi, yi = ring[i]
            xj, yj = ring[j]
            if (yi > y) != (yj > y):
                xints = (xj - xi) * (y - yi) / ((yj - yi) or 1e-12) + xi
                if x < xints:
                    inside = not inside
            j = i
    return inside


def main() -> None:
    geo = json.loads(GEOJSON.read_text())
    im = Image.open(PNG).convert("RGB")
    w, h = im.size
    assert (w, h) == (1100, 1513), (w, h)
    rgb = np.array(im)
    mask = land_mask(rgb)
    Image.fromarray(mask.astype(np.uint8) * 255).save(ROOT / "scripts/cmr_mask.png")
    ys, xs = np.where(mask)
    x0, x1 = int(xs.min()), int(xs.max())
    y0, y1 = int(ys.min()), int(ys.max())
    print(f"PNG {w}x{h} mask bbox x={x0}-{x1} y={y0}-{y1} px={int(mask.sum())}")

    features: dict[str, list[list[list[float]]]] = {}
    all_utm: list[tuple[float, float]] = []
    for f in geo["features"]:
        rid = NAME_TO_ID[f["properties"]["NAME_1"]]
        rings = rings_of(f["geometry"])
        features[rid] = rings
        for ring in rings:
            for lon, lat in ring:
                all_utm.append(utm33(lon, lat))

    ue = np.array([p[0] for p in all_utm])
    un = np.array([p[1] for p in all_utm])
    e0, e1 = float(ue.min()), float(ue.max())
    n0, n1 = float(un.min()), float(un.max())
    print(f"UTM33 E {e0:.0f}-{e1:.0f} N {n0:.0f}-{n1:.0f}")

    # Affine initiale : bbox UTM → bbox masque
    s_x = (x1 - x0) / (e1 - e0)
    s_y = (y1 - y0) / (n1 - n0)
    s0 = (s_x + s_y) / 2

    def project_params(s: float, ox: float, oy: float, sy_mul: float):
        def proj(lon, lat):
            e, n = utm33(lon, lat)
            return (s * e + ox, -s * sy_mul * n + oy)

        return proj

    def ox_oy_for(s: float, sy_mul: float) -> tuple[float, float]:
        # centre UTM → centre masque
        ecx, ncy = (e0 + e1) / 2, (n0 + n1) / 2
        mcx, mcy = (x0 + x1) / 2, (y0 + y1) / 2
        ox = mcx - s * ecx
        oy = mcy + s * sy_mul * ncy
        return ox, oy

    scale_fit = 0.28
    mask_s = np.array(
        Image.fromarray(mask.astype(np.uint8) * 255).resize(
            (int(w * scale_fit), int(h * scale_fit)), Image.NEAREST
        )
    ) > 0

    def score(s, ox, oy, sy_mul):
        proj = project_params(s, ox, oy, sy_mul)
        rings_px = []
        for rid in features:
            for ring in features[rid]:
                rings_px.append([proj(p[0], p[1]) for p in ring[::2]])  # stride 2
        ras = rasterize(rings_px, (w, h), scale_fit)
        return iou(ras, mask_s)

    ox0, oy0 = ox_oy_for(s0, 1.0)
    best = (score(s0, ox0, oy0, 1.0), s0, ox0, oy0, 1.0)
    print("seed IoU", round(best[0], 4), "s", s0)

    # grille coarse
    for s in np.linspace(s0 * 0.92, s0 * 1.08, 9):
        for sy_mul in (0.96, 1.0, 1.04):
            ox, oy = ox_oy_for(s, sy_mul)
            for dx in (-12, 0, 12):
                for dy in (-12, 0, 12):
                    sc = score(s, ox + dx, oy + dy, sy_mul)
                    if sc > best[0]:
                        best = (sc, s, ox + dx, oy + dy, sy_mul)
    print("coarse IoU", round(best[0], 4), best[1:])

    # raffinage
    _, s, ox, oy, sy_mul = best
    for ds in np.linspace(-s * 0.02, s * 0.02, 7):
        for dx in np.linspace(-8, 8, 9):
            for dy in np.linspace(-8, 8, 9):
                for dsy in (-0.015, 0, 0.015):
                    sc = score(s + ds, ox + dx, oy + dy, sy_mul + dsy)
                    if sc > best[0]:
                        best = (sc, s + ds, ox + dx, oy + dy, sy_mul + dsy)
    print("fine IoU", round(best[0], 4), best[1:])

    _, s, ox, oy, sy_mul = best
    proj = project_params(s, ox, oy, sy_mul)

    # overlay debug
    overlay = im.copy()
    dr = ImageDraw.Draw(overlay, "RGBA")
    palette = {
        "extreme-nord": (227, 167, 59, 80),
        "nord": (0, 194, 168, 80),
        "adamaoua": (220, 70, 70, 80),
        "est": (80, 110, 255, 80),
        "centre": (240, 220, 40, 80),
        "sud": (40, 200, 80, 80),
        "littoral": (220, 40, 200, 80),
        "ouest": (40, 140, 255, 80),
        "nord-ouest": (160, 80, 255, 80),
        "sud-ouest": (255, 140, 40, 80),
    }
    projected: dict[str, list[list[tuple[float, float]]]] = {}
    for rid in ORDER:
        rings_px = []
        for ring in features[rid]:
            pts = [proj(p[0], p[1]) for p in ring]
            eps = 0.45 if rid == "extreme-nord" else 0.9
            pts = simplify_ring(pts, eps=eps)
            rings_px.append(pts)
            col = (255, 0, 220, 55)
            dr.polygon(pts, fill=col)
            dr.line(pts + [pts[0]], fill=(255, 0, 80, 255), width=3)
        projected[rid] = rings_px
    overlay.save(OVERLAY)
    print("overlay", OVERLAY)

    print("\n--- Contrôle villes (lon/lat → path) ---")
    ok = 0
    for rid, city, lon, lat in CONTROL:
        px, py = proj(lon, lat)
        hit = point_in_rings(px, py, projected[rid])
        mark = "OK" if hit else "MISS"
        if hit:
            ok += 1
        else:
            # quelle région contient le point ?
            found = "?"
            for other in ORDER:
                if point_in_rings(px, py, projected[other]):
                    found = other
                    break
            print(f"  {mark:4} {city:14} attendu={rid:12} got={found} px=({px:.1f},{py:.1f})")
            continue
        print(f"  {mark:4} {city:14} {rid}")
    print(f"contrôle {ok}/{len(CONTROL)}")

    # régions.ts
    lines = [
        'import type { Region } from "@/types/potentialites";',
        "",
        "/**",
        " * Contours ADM1 GADM 4.1 projetés sur public/images/potentialites/carte_cameroun.png.",
        " * viewBox = 0 0 1100 1513 (pixels natifs du PNG, object-fit: contain).",
        " *",
        " * Calibrage (scripts/calibrate_cmr_map.py) :",
        " * - WGS84 → UTM 33N (nord en haut, adapté au Cameroun)",
        " * - affine : x = s·E + ox ; y = −s·sy·N + oy, calée sur le masque terrestre du PNG",
        f" * - s={s:.10f} ox={ox:.3f} oy={oy:.3f} sy={sy_mul:.5f} IoU≈{best[0]:.3f}",
        " *",
        " * Règles : Moloundou/Yokadouma → est ; Ngaoundéré/Meiganga/Banyo → adamaoua ;",
        " * le Sud s’arrête avant Yokadouma (frontière Est/Sud GADM).",
        " * LocationIQ n’est pas une source de frontières — non utilisé ici.",
        " */",
        "export const REGIONS: Region[] = [",
    ]
    for rid in ORDER:
        name, capital = META[rid]
        d = path_d(projected[rid])
        lines.append("  {")
        lines.append(f'    id: "{rid}",')
        lines.append(f'    name: "{name}",')
        lines.append(f'    capital: "{capital}",')
        lines.append(f'    path: "{d}",')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    OUT_TS.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", OUT_TS, "bytes", OUT_TS.stat().st_size)


if __name__ == "__main__":
    main()
