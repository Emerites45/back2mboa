"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  Award,
  Briefcase,
  ChartColumn,
  Coins,
  DoorOpen,
  Drama,
  Factory,
  FilePen,
  Handshake,
  Landmark,
  LineChart,
  Link2,
  MapPinned,
  Mic,
  Newspaper,
  Plane,
  PlaneTakeoff,
  RadioTower,
  RefreshCw,
  Rocket,
  ShieldHalf,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "./BonnePorteSection.css";

type PanelId = "ctd" | "sol" | "inv" | "reg" | "med" | "ent" | "mec";

type Gain = {
  now: string;
  next: string;
  Impact: LucideIcon;
  impact: string;
};

type Panel = {
  id: PanelId;
  tab: string;
  title: ReactNode;
  lead: string;
  ctaHref: string;
  CtaIcon: LucideIcon;
  cta: string;
  gains: Gain[];
};

const TABS: { id: PanelId; label: string }[] = [
  { id: "ctd", label: "Décideurs & Intendants territoriaux" },
  { id: "sol", label: "Bâtisseurs-Solutionneurs" },
  { id: "inv", label: "Investisseurs & PTF" },
  { id: "reg", label: "Régulateurs" },
  { id: "med", label: "Médias d’influence" },
  { id: "ent", label: "Entreprises & Partenaires" },
  { id: "mec", label: "Mécénat culturel & touristique" },
];

const PANELS: Panel[] = [
  {
    id: "ctd",
    tab: "ctd",
    title: "Décideurs & Intendants territoriaux",
    lead: "Vous portez un territoire plein de potentiel — sans mécanisme clair pour le révéler, le structurer et le connecter aux bons partenaires.",
    ctaHref: "/inscription",
    CtaIcon: MapPinned,
    cta: "Je publie mon territoire",
    gains: [
      {
        now: "Opportunités invisibles, peu d’investisseurs sérieux",
        next: "Fiches CAP, pitchs, mission 1–7 déc. + event 16–17 déc.",
        Impact: Coins,
        impact: "Gain : projets financés et recettes municipales (fiscalité, PPP, services) qui rentrent enfin.",
      },
      {
        now: "Fiscalité locale sous-optimale, contribuables mal mappés",
        next: "Cartographie des revenus, collecte digitale, outils prêts à l’emploi",
        Impact: Coins,
        impact: "Gain : plus de cash en caisse sans attendre une réforme nationale.",
      },
      {
        now: "Peu de visibilité auprès de la diaspora et des PTF",
        next: "Site diaspora-friendly, marketing territorial, présence mission + salon",
        Impact: LineChart,
        impact: "Gain : territoire « choisissable » — les bons partenaires viennent à vous.",
      },
    ],
  },
  {
    id: "sol",
    tab: "sol",
    title: (
      <>
        Bâtisseurs-Solutionneurs
        <br />
        locaux &amp; diaspora
      </>
    ),
    lead: "Vous avez l’expertise, la techno ou le capital — mais pas toujours la porte d’entrée crédible vers un maire, un dossier bancable et un closing.",
    ctaHref: "/inscription",
    CtaIcon: Rocket,
    cta: "Je propose une solution",
    gains: [
      {
        now: "Réseau opaque, rendez-vous sans suite, projets non cadrés",
        next: "Matching sur Mayor Calls qualifiés + Deal Rooms",
        Impact: FilePen,
        impact: "Gain : des contrats et des mandats — pas seulement des contacts LinkedIn.",
      },
      {
        now: "Difficile de prouver la traction territoriale à un financeur",
        next: "Opportunity Cards, offtake local, cadre CAP",
        Impact: Coins,
        impact: "Gain : dossier finançable → ticket d’investissement ou PPP plus rapide.",
      },
      {
        now: "La mission diaspora / event se limitent souvent au discours",
        next: "1–7 déc. (visites, salon 4 déc.) puis 16–17 déc. (closing)",
        Impact: Plane,
        impact: "Gain : un pipeline réel Europe → Cameroun, avec des dates et des interlocuteurs.",
      },
    ],
  },
  {
    id: "inv",
    tab: "inv",
    title: "Investisseurs & PTF",
    lead: "Vous cherchez du deal-flow africain crédible — pas des pitchs marketing. Le risque, c’est le manque de structuration et de contreparties territoriales.",
    ctaHref: "/inscription",
    CtaIcon: Briefcase,
    cta: "Accéder au deal-flow",
    gains: [
      {
        now: "Projets peu documentés, due diligence coûteuse",
        next: "Pipeline CAP pré-qualifié, mairies engagées, Deal Rooms",
        Impact: Coins,
        impact: "Gain : moins de temps perdu, plus de tickets déployables sur des dossiers prêts.",
      },
      {
        now: "Peu d’ancrage politique / local pour sécuriser l’exécution",
        next: "6 mairies championnes, cadre institutionnel, suivi post-event",
        Impact: ShieldHalf,
        impact: "Gain : risque d’exécution réduit — le territoire est co-porteur, pas spectateur.",
      },
      {
        now: "Visibilité limitée sur les allers-retours diaspora",
        next: "Mission 1–7 déc. + event 16–17 déc. : deux portes d’entrée",
        Impact: RefreshCw,
        impact: "Gain : double fenêtre pour sourcer, rencontrer, signer.",
      },
    ],
  },
  {
    id: "reg",
    tab: "reg",
    title: "Régulateurs",
    lead: "MINREX, tutelles, administrations : vous devez orienter la diaspora et les investissements sans créer un énième guichet opaque.",
    ctaHref: "/inscription",
    CtaIcon: Landmark,
    cta: "S’aligner sur le cadre",
    gains: [
      {
        now: "Initiatives dispersées, faible traçabilité des retombées",
        next: "Plateforme unique, indicateurs, lien mission + event national",
        Impact: ChartColumn,
        impact: "Gain : pilotage visible — qui investit où, avec quels résultats.",
      },
      {
        now: "La diaspora peinait à trouver « la bonne porte » étatique",
        next: "Porte claire : territoires + cadre MINREX / partenaires",
        Impact: DoorOpen,
        impact: "Gain : crédibilité de l’État comme facilitateur, pas comme frein.",
      },
      {
        now: "Missions et salons peu reliés aux deals territoriaux",
        next: "1–7 déc. (salon 4 déc.) branché sur 16–17 déc. Yaoundé",
        Impact: Link2,
        impact: "Gain : une séquence diplomatique et économique cohérente, mesurable.",
      },
    ],
  },
  {
    id: "med",
    tab: "med",
    title: "Médias d’influence",
    lead: "Vous cherchez des histoires fortes — deals, territoires, diaspora — pas un énième communiqué sans images ni chiffres.",
    ctaHref: "/inscription",
    CtaIcon: RadioTower,
    cta: "Demander un accès presse",
    gains: [
      {
        now: "Sujets diaspora souvent émotionnels, peu de preuves économiques",
        next: "Angles deals, mairies, mission 1–7 déc., signatures 16–17 déc.",
        Impact: Newspaper,
        impact: "Gain : contenus différenciants, audience engagée, partenaires médias valorisés.",
      },
      {
        now: "Accès limité aux décideurs et aux dossiers sensibles",
        next: "Accréditations, interviews maires / Solutionneurs / PTF",
        Impact: Mic,
        impact: "Gain : exclusivités et récits « avant / après » sur la prospérité territoriale.",
      },
      {
        now: "Monétisation difficile hors pub générique",
        next: "Packs visibilité, brand content, couverture double séquence",
        Impact: Coins,
        impact: "Gain : revenus média + positionnement sur un sujet d’agenda national.",
      },
    ],
  },
  {
    id: "ent",
    tab: "ent",
    title: "Entreprises & Autres partenaires",
    lead: "Banques, telcos, énergie, agro, transport : vous voulez du volume utile — clients, deals, image — pas un logo perdu sur un kakemono.",
    ctaHref: "#partenaires",
    CtaIcon: Handshake,
    cta: "Voir les packs partenaires",
    gains: [
      {
        now: "Sponsoring événementiel à faible ROI mesurable",
        next: "Visibilité mission 1–7 déc. + event 16–17 déc. + plateforme",
        Impact: Coins,
        impact: "Gain : leads qualifiés, image « bâtisseur », accès décideurs CTD et diaspora.",
      },
      {
        now: "Peu d’occasions de montrer usines, ports, solutions sur le terrain",
        next: "Visites d’entreprises / infrastructures pendant la mission élargie",
        Impact: Factory,
        impact: "Gain : démonstration produit réelle devant maires, investisseurs, diaspora.",
      },
      {
        now: "Partenariats CTD lents et peu standardisés",
        next: "Deal Rooms, cadres PPP, 6 secteurs prioritaires",
        Impact: FilePen,
        impact: "Gain : cycles de vente raccourcis vers des contrats publics / semi-publics.",
      },
    ],
  },
  {
    id: "mec",
    tab: "mec",
    title: "Mécénat culturel & touristique",
    lead: "Fondations, marques, hôtellerie, culture et institutions : vous cherchez un impact visible sur le patrimoine, l’attractivité et l’économie locale — pas un logo sur un programme de salle.",
    ctaHref: "#partenaires",
    CtaIcon: Drama,
    cta: "Devenir mécène",
    gains: [
      {
        now: "Mécénat dispersé, peu relié aux territoires et aux flux touristiques",
        next: "Ancrage Limbé I (tourisme) + mission 1–7 déc. + event 16–17 déc.",
        Impact: Coins,
        impact: "Gain : visibilité premium + retombées mesurables (visiteurs, nuitées, recettes locales).",
      },
      {
        now: "Peu de pont entre culture, tourisme et investisseurs diaspora",
        next: "Packages homecoming, expériences, sites bookables, points focaux",
        Impact: PlaneTakeoff,
        impact: "Gain : la diaspora dépense sur place (séjours, culture, artisanat) au lieu de seulement transférer.",
      },
      {
        now: "Projets culturels sous-financés, tourismes peu structurés",
        next: "Mayor Calls tourisme / culture, Deal Rooms, co-financement privé",
        Impact: Handshake,
        impact: "Gain : projets patrimoniaux et touristiques portés à l’investissement — mécénat qui ouvre des deals.",
      },
      {
        now: "Image de marque peu associée au développement territorial africain",
        next: "Naming, parcours visiteurs, contenus, invitations VIP mission + salon 4 déc.",
        Impact: Award,
        impact: "Gain : positionnement « bâtisseur » auprès des décideurs, de la diaspora et des médias d’influence.",
      },
    ],
  },
];

function Ico({ children }: { children: ReactNode }) {
  return (
    <i aria-hidden="true" style={{ fontStyle: "normal", display: "inline-flex", alignItems: "center" }}>
      {children}
    </i>
  );
}

export function BonnePorteSection() {
  const [panel, setPanel] = useState<PanelId>("ctd");

  return (
    <div className="b2m-porte">
      <section className="porte" id="la-bonne-porte">
        <div className="porte-eyebrow">La bonne porte</div>
        <h1 className="porte-title">La Bonne Porte, Le Bon Gain.</h1>
        <p className="porte-sub">
          Six profils, six réalités. Pour chacun : le gain d’abord — puis comment
          Back2Mboa le débloque. Prospérité à double sens entre territoires et
          diaspora.
        </p>

        <div className="flux-banner" role="note">
          <div className="flux-leg">
            <strong>1 → Diaspora (1–7 déc.)</strong>
            Les territoires vont vers la diaspora : salon le 4 déc., visites
            d’entreprises, ports, deals. Mission élargie Back2Mboa du 1er au 7
            décembre.
          </div>
          <div className="flux-mid">
            <Ico>
              <ArrowLeftRight size={16} strokeWidth={2} />
            </Ico>
            <span>Double flux</span>
          </div>
          <div className="flux-leg">
            <strong>2 → Territoires (16–17 déc.)</strong>
            La diaspora vient aux territoires : Back2Mboa au Musée National,
            Yaoundé. Mayor Calls, Deal Rooms, signatures.
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Choisir votre profil">
          {TABS.map((t) => {
            const active = panel === t.id;
            return (
              <button
                key={t.id}
                type="button"
                className={`tab${active ? " active" : ""}`}
                role="tab"
                aria-selected={active}
                data-panel={t.id}
                id={`tab-${t.id}`}
                aria-controls={`panel-${t.id}`}
                onClick={() => setPanel(t.id)}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {PANELS.map((p) => {
          const active = panel === p.id;
          return (
            <div
              key={p.id}
              className={`panel${active ? " active" : ""}`}
              id={`panel-${p.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${p.id}`}
            >
              <div className="panel-grid">
                <div className="panel-left">
                  <h3>{p.title}</h3>
                  <p className="lead">{p.lead}</p>
                  <Link className="btn-dark" href={p.ctaHref}>
                    <Ico>
                      <p.CtaIcon size={16} strokeWidth={2} />
                    </Ico>{" "}
                    {p.cta}
                  </Link>
                </div>
                <div className="gains">
                  {p.gains.map((g) => (
                    <div className="gain" key={g.now}>
                      <div className="gain-now">
                        <label>Aujourd’hui</label>
                        <p>{g.now}</p>
                      </div>
                      <div className="gain-next">
                        <label>Avec Back2Mboa</label>
                        <p>
                          <span className="arrow">→</span> {g.next}
                        </p>
                      </div>
                      <div className="gain-impact">
                        <Ico>
                          <g.Impact size={14} strokeWidth={2} />
                        </Ico>{" "}
                        {g.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        <div className="porte-foot">
          <span>
            <strong>Mission / salon diaspora</strong> : 1–7 décembre 2026 (salon
            le 4)
          </span>
          <span>
            <strong>Back2Mboa</strong> : 16–17 décembre 2026 — Musée National,
            Yaoundé
          </span>
          <span>Prospérité à double sens · Territoires ⇄ Diaspora</span>
        </div>
      </section>
    </div>
  );
}
