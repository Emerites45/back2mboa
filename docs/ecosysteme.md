# Écosystème — Digital Twin™ & Mayor Calls™

Section landing (`#digital-twin`). Copy issue du brief maquette. Ne pas inventer.

## Arborescence

```
components/sections/ecosysteme/
  EcosystemeSection.tsx
  EcosystemeSection.css
data/ecosysteme/
  index.ts
types/ecosysteme.ts
docs/ecosysteme.md
```

Ne pas modifier Contraste, Potentialités ni Plateforme.

## Layout desktop

- `max-width: 1180px`, `gap: 28px` (24px dès 1280px)
- Grille `1fr 340px 1fr` — téléphone fixe 340px, `border-radius: 36px`

## Orbit (CSS only)

- 10 icônes Lucide, `--i: 0…9`, rayon 96px, disques 42px
- `.orbit` : `48s linear infinite` (GPU, `will-change: transform`)
- `.orbit-face` : même durée en `reverse` → icônes droites
- `.orbit-upright` : `rotate(calc(var(--i) * -36deg))` + hover `scale(1.08)`
- Centre `#0A2B21` 68×68, `border-radius: 18px`, hors de la roue (fixe)
- `prefers-reduced-motion: reduce` → `animation: none`
