# Rapport Master d'Intégration Frontend & Design System

**Reproduction au pixel près — section Le Contraste**

| | |
|---|---|
| **Cible** | IA de génération de code (Cursor) |
| **Stack** | React (TypeScript) + CSS |
| **Objectif** | Reproduction 100 % maquette : glassmorphism + overlay léger |
| **Viewport de référence** | ≥ 1200px |
| **Image** | `public/images/contraste/homme.jpeg` (`center 20%`, `cover`) |

## Mapping spec → repo Back2Mboa

| Spec originale | Fichier / classe réelle |
|---|---|
| `:root` | `app/globals.css` |
| `HeroSection.tsx` | `components/sections/contraste/ContrasteSection.tsx` |
| `HeroSection.css` | `components/sections/contraste/ContrasteSection.css` |
| `./homme.jpeg` | `/images/contraste/homme.jpeg` |
| `.hero-section` | `.contraste-section` |
| `.hero-bg-image` | `.contraste-bg-image` |
| `.hero-overlay` | `.contraste-overlay` |
| `.hero-content` | `.contraste-content` |
| `.sur-titre` | `.contraste-kicker` |
| `.cards-grid` | `.contraste-cards` |
| `.card` | `.contraste-card` |
| `.card-title` | `.contraste-card-title` |
| `.card-quote` | `.contraste-card-quote` |
| `.card-tags` | `.contraste-card-tags` |
| Montage page | `app/(event)/page.tsx` → `<ContrasteSection />` |
| Copy / cartes | `data/contraste.ts` |

**Ne pas coder :** bordure cyan autour du H1, texte « Beau Mountain 2 » (artefacts Figma).

---

## 1. Variables globales (Design System)

À la racine CSS (`:root`) pour la cohérence colorimétrique.

```css
:root {
  --font-primary: var(--font-inter), "Inter", sans-serif;

  --color-text-white: #ffffff;
  --color-text-gray: #f3f4f6;
  --color-accent-red: #d94545;
  --color-card-text: #2d3748;

  --overlay-bg: rgba(70, 85, 80, 0.25); /* overlay très léger, gris-vert */
  --bg-card-glass: rgba(245, 245, 245, 0.75); /* dépoli clair */
  --border-card: rgba(255, 255, 255, 0.5);
}
```

| Token | Valeur | Usage |
|---|---|---|
| `--font-primary` | Inter, antialiased | Toute la section |
| `--color-text-white` | `#ffffff` | Titre |
| `--color-text-gray` | `#f3f4f6` | Paragraphe |
| `--color-accent-red` | `#d94545` | Surtitre, titres cartes, tags |
| `--color-card-text` | `#2d3748` | Citations |
| `--overlay-bg` | `rgba(70, 85, 80, 0.25)` | Voile sur la photo |
| `--bg-card-glass` | `rgba(245, 245, 245, 0.75)` | Fond cartes |
| `--border-card` | `rgba(255, 255, 255, 0.5)` | Bordure cartes |
| Fond secours | `#0b1a17` | Sous l’image |

---

## 2. Spécifications spatiales (viewport ≥ 1200px)

### Couches

| Couche | z-index | Rôle |
|---|---|---|
| `.contraste-bg-image` | 1 | Photo plein écran, `cover`, `center 20%` |
| `.contraste-overlay` | 2 | `--overlay-bg` |
| `.contraste-content` | 3 | Titre + grille |

### Conteneur `.contraste-content`

| Propriété | Valeur |
|---|---|
| Position | `relative` |
| Padding | `80px 0 0 80px` (top 80, left 80) |
| Max-width | `1200px` |

### Typographie

| Élément | Size | Weight | LH | Color | Box |
|---|---|---|---|---|---|
| Surtitre | 12px | 700 | — | `--color-accent-red` | mb **16px** |
| Titre | 46px | 800 | 1.15 | `#ffffff` | max-w **600px**, mb **24px** |
| Paragraphe | 16px | 400 | 1.5 | `#f3f4f6` | max-w **520px**, mb **56px** |

**Sauts de ligne titre :**

```
Avant Back2Mboa :
5 acteurs, la même
impasse.
```

**Sauts de ligne paragraphe :**

```
Ce que vivent aujourd'hui les maires, la
diaspora, les investisseurs, la jeunesse locale et
les institutions, avant qu'un chemin ne s'ouvre.
```

### Grille glassmorphism

| Propriété | Valeur |
|---|---|
| Layout | `display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;` |
| Carte | min-height **260px**, padding **20px**, radius **16px** |
| Intérieur | `flex-direction: column` — tags `margin-top: auto` |
| Titre carte | 11px / 700 / mb 16px / rouge |
| Citation | 14px / italic / `#2d3748` / lh 1.4 |
| Tags | 10px / 600 / rouge / lh 1.4 |
| Glass | `backdrop-filter: blur(8px)` + `-webkit-backdrop-filter` |
| Bordure | `1px solid var(--border-card)` |

### Contenu des 5 cartes

1. **Le Contraste** — « On manque de moyens. Les investisseurs ne connaissent pas notre territoire. » — Frustration · Impuissance · Espoir Contenu
2. **L'Entrepreneur Diaspora** — « Je veux investir au Mboa, mais je ne sais pas où, ni comment. Les circuits sont opaques. » — Méfiance · Désir D'impact · Peur Du Nième Échec
3. **L'Investisseur** — « Où sont les projets crédibles ? Donnez-moi des chiffres, pas des promesses. » — Doute · Prudence · Opportunisme Mesuré
4. **Le Jeune Local** — « Il n'y a pas d'issue dans ce pays. On nous oublie. La diaspora a les moyens, pas nous. » — Désespoir · Impatience · Colère Contenue
5. **L'Institution** — « Nous avons des dispositifs, mais ils sont sous-utilisés. Comment mobiliser la diaspora efficacement ? » — Volonté · Lourdeur Administrative

---

## 3. Structure TypeScript (React / Next.js)

Implémentation réelle : `ContrasteSection.tsx` (données via `data/contraste.ts`). Équivalent spec :

```tsx
<section className="contraste-section">
  <div className="contraste-bg-image">{/* next/image homme.jpeg */}</div>
  <div className="contraste-overlay" />
  <div className="contraste-content">
    <span className="contraste-kicker">Le Contraste</span>
    <h2>
      Avant Back2Mboa :<br />
      5 acteurs, la même<br />
      impasse.
    </h2>
    <p>
      Ce que vivent aujourd'hui les maires, la<br />
      diaspora, les investisseurs, la jeunesse locale et<br />
      les institutions, avant qu'un chemin ne s'ouvre.
    </p>
    <div className="contraste-cards">
      {/* 5 × article.contraste-card : title + quote + tags */}
    </div>
  </div>
</section>
```

---

## 4. Feuille de styles définitive

Fichier : `components/sections/contraste/ContrasteSection.css`

```css
.contraste-section {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  font-family: var(--font-primary);
  background-color: #0b1a17;
}

.contraste-bg-image {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.contraste-bg-image img {
  object-fit: cover;
  object-position: center 20%;
}

.contraste-overlay {
  position: absolute;
  inset: 0;
  background-color: var(--overlay-bg);
  z-index: 2;
}

.contraste-content {
  position: relative;
  z-index: 3;
  padding: 80px 0 0 80px;
  max-width: 1200px;
}

.contraste-kicker {
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-accent-red);
  margin-bottom: 16px;
}

.contraste-title {
  font-size: 46px;
  font-weight: 800;
  color: var(--color-text-white);
  line-height: 1.15;
  max-width: 600px;
  margin: 0 0 24px;
}

.contraste-lead {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text-gray);
  line-height: 1.5;
  max-width: 520px;
  margin: 0 0 56px;
}

.contraste-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  width: 100%;
}

.contraste-card {
  background: var(--bg-card-glass);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 20px;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.contraste-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.9);
}

.contraste-card-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-accent-red);
  margin-bottom: 16px;
}

.contraste-card-quote {
  font-size: 14px;
  font-style: italic;
  color: var(--color-card-text);
  line-height: 1.4;
}

.contraste-card-tags {
  margin-top: auto;
  font-size: 10px;
  font-weight: 600;
  color: var(--color-accent-red);
  line-height: 1.4;
}
```

---

## 5. Motion (complément)

| Événement | Effet |
|---|---|
| Load | `opacity: 0; translateY(20px)` → état normal, stagger **100ms**, `cubic-bezier(0.25, 0.8, 0.25, 1)` |
| Hover carte | `translateY(-4px)`, fond `rgba(255,255,255,0.9)`, 300ms |
| `prefers-reduced-motion` | animations / translate hover désactivés |

---

## 6. Responsive (hors spec 1200px)

| Breakpoint | Comportement |
|---|---|
| &lt; 1200px | padding 72/24, titre 32px, grille 2 colonnes |
| &lt; 640px | scroll horizontal, carte 170px, snap |

---

## 7. Checklist

- [x] Tokens `:root`
- [x] Overlay 0.25 (léger)
- [x] Padding `80px 0 0 80px`, max-width 1200px
- [x] Titre 46/800, 3 lignes, **sans** bordure cyan
- [x] 5 cartes glass, 260px, radius 16, gap 16
- [x] Tags en bas (`margin-top: auto`)
- [x] Hover + stagger
- [x] Image `homme.jpeg`, `center 20%`
