"use client";

import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  Landmark,
  Lightbulb,
  Palette,
  Radio,
  Scale,
  TrendingUp,
} from "lucide-react";
import { useEffect, useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BONNE_PORTE_BG,
  BONNE_PORTE_COPY,
  BONNE_PORTE_PANELS,
} from "@/data/bonne-porte";
import type { BonnePorteGain, BonnePortePanel, BonnePortePanelId } from "@/types/bonne-porte";
import { cn } from "@/lib/utils";
import "./BonnePorteSection.css";

/**
 * TYPE — tailles de police par zone de la section.
 * Injectées en CSS via `--porte-type-*` dans PORTE_VARS.
 */
const TYPE = {
  kicker: "0.82rem", // amorce sous le titre (pas d’eyebrow caps)
  title: "clamp(1.45rem, 2.8vw + 0.5vh, 2.35rem)",
  sub: "clamp(0.82rem, 1.05vw, 0.95rem)",
  tab: "0.76rem",
  panelTitle: "clamp(1.15rem, 1.8vw, 1.55rem)",
  lead: "clamp(0.82rem, 1.05vw, 0.92rem)",
  btn: "0.84rem",
  gainSituation: "clamp(0.78rem, 0.95vw, 0.86rem)",
  gainPath: "clamp(0.8rem, 1vw, 0.88rem)",
  gainPayoff: "clamp(0.78rem, 0.95vw, 0.86rem)",
  fluxLabel: "0.82rem",
  fluxBody: "0.84rem",
  foot: "0.72rem",
} as const;

/** FLUX — double séquence diaspora / territoires (trait éditorial, pas bloc SaaS). */
const FLUX = {
  gap: "clamp(0.75rem, 2vw, 1.25rem)",
  paddingY: "clamp(0.65rem, 1.2vh, 0.9rem)",
  marginTop: "clamp(0.65rem, 1.4vh, 1rem)",
  marginBottom: "clamp(0.55rem, 1.2vh, 0.85rem)",
  dividerMinWidth: "3rem",
} as const;

/** TABS — largeur au libellé ; scroll horizontal si besoin. */
const TABS = {
  gap: "0.35rem",
  marginBottom: "clamp(0.55rem, 1.2vh, 0.85rem)",
  paddingY: "0.45rem",
  paddingX: "0.85rem",
  radius: "9999px",
} as const;

const SECTION = {
  height: "100svh",
  maxWidth: "85%",
  paddingY: "clamp(1rem, 2.2vh, 1.75rem)",
  paddingX: "clamp(1rem, 3.5vw, 1.75rem)",
  panelGapX: "clamp(1rem, 2.2vw, 2rem)",
  panelSurfacePad: "clamp(1rem, 2vw, 1.35rem)",
  panelSurfaceRadius: "12px",
  footMarginTop: "clamp(0.45rem, 1vh, 0.75rem)",
  footPaddingTop: "0.55rem",
  footGap: "0.35rem 1rem",
} as const;

/** GAIN — liste numérotée (pas de cartes before/after). */
const GAIN = {
  gap: "clamp(0.65rem, 1.4vh, 0.9rem)",
  itemPadTop: "clamp(0.55rem, 1vh, 0.75rem)",
} as const;

const HOVER = {
  tabLift: "-1px",
  btnLift: "-1px",
  panelFadeMs: "320ms",
} as const;

/** Voile lisible — teinte neutre froide, centre plus opaque (pas cream wash). */
const VEIL = {
  rgb: "250, 252, 251",
  top: 0.88,
  at28: 0.72,
  mid: 0.58,
  at78: 0.75,
  bottom: 0.85,
  radialLight: 0.04,
  radialDark: 0.06,
} as const;

const PORTE_VARS = {
  "--porte-height": SECTION.height,
  "--porte-type-kicker": TYPE.kicker,
  "--porte-type-title": TYPE.title,
  "--porte-type-sub": TYPE.sub,
  "--porte-flux-gap": FLUX.gap,
  "--porte-flux-py": FLUX.paddingY,
  "--porte-flux-mt": FLUX.marginTop,
  "--porte-flux-mb": FLUX.marginBottom,
  "--porte-flux-divider-min-w": FLUX.dividerMinWidth,
  "--porte-type-flux-label": TYPE.fluxLabel,
  "--porte-type-flux-body": TYPE.fluxBody,
  "--porte-type-tab": TYPE.tab,
  "--porte-type-panel-title": TYPE.panelTitle,
  "--porte-type-lead": TYPE.lead,
  "--porte-type-btn": TYPE.btn,
  "--porte-type-gain-situation": TYPE.gainSituation,
  "--porte-type-gain-path": TYPE.gainPath,
  "--porte-type-gain-payoff": TYPE.gainPayoff,
  "--porte-type-foot": TYPE.foot,
  "--porte-max-w": SECTION.maxWidth,
  "--porte-py": SECTION.paddingY,
  "--porte-px": SECTION.paddingX,
  "--porte-tabs-gap": TABS.gap,
  "--porte-tabs-mb": TABS.marginBottom,
  "--porte-tab-py": TABS.paddingY,
  "--porte-tab-px": TABS.paddingX,
  "--porte-tab-radius": TABS.radius,
  "--porte-panel-gap-x": SECTION.panelGapX,
  "--porte-panel-surface-pad": SECTION.panelSurfacePad,
  "--porte-panel-surface-radius": SECTION.panelSurfaceRadius,
  "--porte-gain-gap": GAIN.gap,
  "--porte-gain-item-pt": GAIN.itemPadTop,
  "--porte-foot-mt": SECTION.footMarginTop,
  "--porte-foot-pt": SECTION.footPaddingTop,
  "--porte-foot-gap": SECTION.footGap,
  "--porte-hover-tab-lift": HOVER.tabLift,
  "--porte-hover-btn-lift": HOVER.btnLift,
  "--porte-panel-fade": HOVER.panelFadeMs,
  "--porte-veil-rgb": VEIL.rgb,
  "--porte-veil-top": String(VEIL.top),
  "--porte-veil-28": String(VEIL.at28),
  "--porte-veil-mid": String(VEIL.mid),
  "--porte-veil-78": String(VEIL.at78),
  "--porte-veil-bottom": String(VEIL.bottom),
  "--porte-veil-radial-light": String(VEIL.radialLight),
  "--porte-veil-radial-dark": String(VEIL.radialDark),
} as CSSProperties;

function GainList({ gains }: { gains: BonnePorteGain[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    // Les gains changent avec le profil sélectionné.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpenIndex(0);
  }, [gains]);

  return (
    <div className="porte-gains-col">
      <ol
        className="porte-gain-list"
        data-count={gains.length}
        data-compact={gains.length > 1 || undefined}
        aria-label="Gains par profil"
      >
      {gains.map((gain, i) => {
        const open = openIndex === i;
        const num = String(i + 1).padStart(2, "0");
        return (
          <li
            key={i}
            className={`porte-gain-item${open ? " is-open" : " is-collapsed"}`}
            tabIndex={0}
            onMouseEnter={() => setOpenIndex(i)}
            onFocus={() => setOpenIndex(i)}
            onClick={() => setOpenIndex(open ? -1 : i)}
          >
            <div className="porte-gain-trigger">
              <span className="porte-gain-num" aria-hidden="true">
                {num}
              </span>
              <span className="porte-gain-headline">{gain.now}</span>
              <ChevronDown
                className="porte-gain-chevron"
                size={16}
                strokeWidth={2.25}
                aria-hidden="true"
              />
            </div>
            <div className="porte-gain-body" aria-hidden={!open}>
              <div className="porte-gain-body-inner">
                <p className="porte-gain-path">{gain.next}</p>
                <p className="porte-gain-payoff">{gain.impact}</p>
              </div>
            </div>
          </li>
        );
      })}
      </ol>
    </div>
  );
}

function PanelContent({ panel }: { panel: BonnePortePanel }) {
  return (
    <div className="porte-panel-surface">
      <div className="porte-panel-grid">
        <div className="porte-panel-intro">
          <h3>
            {panel.titleLines ? (
              <>
                {panel.titleLines[0]}
                <br />
                {panel.titleLines[1]}
              </>
            ) : (
              panel.title
            )}
          </h3>
          <p className="porte-lead">{panel.lead}</p>
          <Link className="porte-btn" href={panel.ctaHref}>
            {panel.cta}
          </Link>
        </div>
        <GainList gains={panel.gains} />
      </div>
    </div>
  );
}

const PROFILE_ICONS: Record<BonnePortePanelId, typeof Landmark> = {
  ctd: Landmark,
  sol: Lightbulb,
  inv: TrendingUp,
  reg: Scale,
  med: Radio,
  ent: Briefcase,
  mec: Palette,
};

/**
 * Version Mobile (0px à 767px)
 */
function MobileBonnePorteSection({
  uid,
  panelId,
  setPanelId,
  panel,
  copy,
}: {
  uid: string;
  panelId: BonnePortePanelId;
  setPanelId: (id: BonnePortePanelId) => void;
  panel: BonnePortePanel;
  copy: typeof BONNE_PORTE_COPY;
}) {
  const [openGains, setOpenGains] = useState<Record<number, boolean>>({ 0: true });

  useEffect(() => {
    setOpenGains({ 0: true });
  }, [panelId]);

  const toggleGain = (index: number) => {
    setOpenGains((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#f8faf9] via-[#eef2f0] to-[#e4e9e6] px-4 py-8 sm:px-6 md:hidden">
      {/* Texture d'arrière-plan */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-30">
        <Image
          src={BONNE_PORTE_BG}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-lg">
        {/* ── 1. EN-TÊTE ─────────────────────────── */}
        <header className="text-center">
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold uppercase tracking-wider text-emerald-700">
            {copy.eyebrow}
          </span>

          <h2
            id={`${uid}-mobile-title`}
            className="mt-1 font-[family-name:var(--font-bricolage)] text-2xl font-extrabold tracking-tight text-[#0a2b21] sm:text-3xl leading-[1.15]"
          >
            {copy.title}
          </h2>

          <p className="mx-auto mt-1.5 max-w-xs text-xs font-medium leading-relaxed text-[#5a6b60] sm:text-sm">
            <strong className="text-[#0a2b21]">{copy.subtitle}</strong> — Choisissez votre profil ci-dessous pour découvrir vos retombées directes.
          </p>
        </header>

        {/* ── 2. DOUBLE FLUX ──────────────────────── */}
        <div className="mt-3 rounded-2xl border border-emerald-900/10 bg-white/85 p-3.5">
          <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-bold uppercase tracking-wider text-[#0a2b21]">
            {copy.fluxMid} 2026
          </span>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-emerald-800/15 bg-emerald-50/70 p-2.5">
              <span className="text-[11px] font-bold text-emerald-950">
                {copy.fluxLeft.kicker}
              </span>
              <p className="mt-1 text-[11px] leading-snug text-emerald-900/90">
                {copy.fluxLeft.body}
              </p>
            </div>

            <div className="rounded-xl border border-amber-800/15 bg-amber-50/70 p-2.5">
              <span className="text-[11px] font-bold text-amber-950">
                {copy.fluxRight.kicker}
              </span>
              <p className="mt-1 text-[11px] leading-snug text-amber-900/90">
                {copy.fluxRight.body}
              </p>
            </div>
          </div>
        </div>

        {/* ── 3. SÉLECTEUR DE PROFILS ─────────────── */}
        <div className="mt-4">
          <div
            role="tablist"
            aria-label="Choisir votre profil"
            className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {BONNE_PORTE_PANELS.map((p) => {
              const active = panelId === p.id;
              const Icon = PROFILE_ICONS[p.id];
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  id={`${uid}-mob-tab-${p.id}`}
                  aria-controls={`${uid}-mob-panel`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPanelId(p.id)}
                  className={cn(
                    "group flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all snap-start active:scale-95",
                    active
                      ? "bg-[#0a2b21] text-white"
                      : "bg-white/95 text-[#0a2b21] border border-emerald-900/15 hover:bg-emerald-50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5 shrink-0 transition-colors",
                      active ? "text-amber-300" : "text-emerald-700 group-hover:text-emerald-900"
                    )}
                  />
                  <span className="whitespace-nowrap">{p.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 4. PANNEAU DU PROFIL ACTIF ────────── */}
        <div
          className="mt-4 rounded-3xl border border-emerald-950/10 bg-white/95 p-4 sm:p-5 transition-all"
          role="tabpanel"
          id={`${uid}-mob-panel`}
          aria-labelledby={`${uid}-mob-tab-${panel.id}`}
          key={panel.id}
        >
          <div className="border-b border-emerald-900/10 pb-3.5">
            <h3 className="font-[family-name:var(--font-bricolage)] text-xl font-extrabold text-[#0a2b21] leading-snug">
              {panel.titleLines ? panel.titleLines.join(" ") : panel.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm font-medium leading-relaxed text-[#5a6b60]">
              {panel.lead}
            </p>
          </div>

          {/* Gains */}
          <div className="mt-4">
            <div className="flex flex-col gap-2.5">
              {panel.gains.map((gain, i) => {
                const num = String(i + 1).padStart(2, "0");
                const isOpen = openGains[i] ?? (i === 0);
                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-2xl border transition-all overflow-hidden",
                      isOpen
                        ? "border-emerald-900/20 bg-emerald-50/40"
                        : "border-emerald-900/10 bg-white hover:bg-emerald-50/20"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleGain(i)}
                      className="flex w-full items-center justify-between gap-2.5 p-3 text-left font-medium"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={cn(
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold font-[family-name:var(--font-oswald)] tabular-nums",
                            isOpen
                              ? "bg-[#0a2b21] text-white"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {num}
                        </span>
                        <span
                          className={cn(
                            "text-xs leading-tight line-clamp-2",
                            isOpen
                              ? "font-bold text-[#0a2b21]"
                              : "font-semibold text-[#1a1f1c]"
                          )}
                        >
                          {gain.now}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-emerald-700 transition-transform duration-200",
                          isOpen && "rotate-180 text-emerald-900"
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-3 pb-3 pt-0 text-xs space-y-1.5">
                        <p className="text-emerald-950 leading-snug">
                          {gain.next}
                        </p>
                        <p className="font-bold text-[#0a2b21] leading-snug">
                          {gain.impact}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <Link
            href={panel.ctaHref}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0a2b21] py-3.5 px-5 text-center text-sm font-bold text-white transition-transform hover:bg-emerald-900 active:scale-[0.98]"
          >
            <span>{panel.cta}</span>
            <ArrowRight className="h-4 w-4 text-amber-300" />
          </Link>
        </div>

        {/* ── 5. PIED DE SECTION ──────────────────── */}
        <footer className="mt-5 rounded-2xl border border-emerald-900/10 bg-white/80 p-3.5 text-xs text-[#5a6b60] space-y-2">
          <div className="flex flex-col gap-1">
            <p>
              <strong className="text-[#0a2b21] font-bold">
                {copy.footMission.label}
              </strong>
              {copy.footMission.text}
            </p>
            <p>
              <strong className="text-[#0a2b21] font-bold">
                {copy.footEvent.label}
              </strong>
              {copy.footEvent.text}
            </p>
          </div>
          <div className="pt-2 border-t border-emerald-900/10">
            <Link
              href={copy.footProsperityHref}
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 hover:underline"
            >
              <span>{copy.footProsperity}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function BonnePorteSection() {
  const uid = useId();
  const [panelId, setPanelId] = useState<BonnePortePanelId>("ctd");
  const panel = BONNE_PORTE_PANELS.find((p) => p.id === panelId) ?? BONNE_PORTE_PANELS[0];
  const copy = BONNE_PORTE_COPY;

  return (
    <section id="la-bonne-porte" aria-labelledby={`${uid}-title`}>
      {/* ═══════ 1. VERSION MOBILE REPENSÉE DE ZÉRO (< md:) ═══════ */}
      <MobileBonnePorteSection
        uid={uid}
        panelId={panelId}
        setPanelId={setPanelId}
        panel={panel}
        copy={copy}
      />

      {/* ═══════ 2. VERSION DESKTOP 100SVH (>= md:) ═══════ */}
      <div className="b2m-porte hidden md:flex" style={PORTE_VARS}>
        <div className="porte-bg" aria-hidden="true">
          <Image
            src={BONNE_PORTE_BG}
            alt=""
            fill
            sizes="100vw"
            quality={85}
            className="porte-bg-img"
          />
          <div className="porte-bg-veil" />
        </div>

        <div className="porte-inner">
          <header className="porte-head">
            <h2 className="porte-title" id={`${uid}-title`}>
              {copy.title}
            </h2>
            <p className="porte-kicker">{copy.eyebrow}</p>
            <p className="porte-sub">{copy.subtitle}</p>
          </header>

          <div className="porte-flux" role="note">
            <div className="porte-flux-leg">
              <p className="porte-flux-label">{copy.fluxLeft.kicker}</p>
              <p className="porte-flux-body">{copy.fluxLeft.body}</p>
            </div>
            <div className="porte-flux-divider" aria-hidden="true">
              <span>{copy.fluxMid}</span>
            </div>
            <div className="porte-flux-leg">
              <p className="porte-flux-label">{copy.fluxRight.kicker}</p>
              <p className="porte-flux-body">{copy.fluxRight.body}</p>
            </div>
          </div>

          <div className="porte-tabs" role="tablist" aria-label="Choisir votre profil">
            {BONNE_PORTE_PANELS.map((p) => {
              const active = panelId === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  className={`porte-tab${active ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={active}
                  id={`${uid}-tab-${p.id}`}
                  aria-controls={`${uid}-panel`}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setPanelId(p.id)}
                >
                  {p.tabLabel}
                </button>
              );
            })}
          </div>

          <div
            className="porte-panel is-active"
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${panel.id}`}
            key={panel.id}
          >
            <PanelContent panel={panel} />
          </div>

          <footer className="porte-foot">
            <span>
              <strong>{copy.footMission.label}</strong>
              {copy.footMission.text}
            </span>
            <span>
              <strong>{copy.footEvent.label}</strong>
              {copy.footEvent.text}
            </span>
            <Link className="porte-foot-link" href={copy.footProsperityHref}>
              {copy.footProsperity}
            </Link>
          </footer>
        </div>
      </div>
    </section>
  );
}
