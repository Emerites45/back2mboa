"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  Briefcase,
  Camera,
  Check,
  CircleQuestionMark,
  Download,
  ExternalLink,
  FileText,
  Handshake,
  Heart,
  HeartHandshake,
  Hotel,
  IdCard,
  Image as ImageIcon,
  Landmark,
  Languages,
  Mail,
  MapPinned,
  Plus,
  Quote,
  Rocket,
  Route,
  Scale,
  Shirt,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { RESSOURCES_COPY } from "@/data/ressources";
import type { RessourcesPanelId } from "@/types/ressources";
import "./RessourcesSection.css";

const TAB_ICONS: Record<RessourcesPanelId, LucideIcon> = {
  faq: CircleQuestionMark,
  acces: MapPinned,
  guide: Briefcase,
  code: Scale,
  media: Camera,
  guides: BookOpen,
};

const ALL_FAQ_IDS = RESSOURCES_COPY.faqGroups.flatMap((g) =>
  g.items.map((i) => i.id),
);

export function RessourcesSection() {
  const copy = RESSOURCES_COPY;
  const rootRef = useRef<HTMLElement | null>(null);
  const [panel, setPanel] = useState<RessourcesPanelId>("faq");
  const [openFaq, setOpenFaq] = useState<string | null>(ALL_FAQ_IDS[0] ?? null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [featuredPreview, setFeaturedPreview] = useState(0);

  const faqIndex = useMemo(
    () => Math.max(0, ALL_FAQ_IDS.indexOf(openFaq ?? "")),
    [openFaq],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.22 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* FAQ accordion autoplay */
  useEffect(() => {
    if (!inView || paused || reduce || panel !== "faq") return;
    const id = window.setInterval(() => {
      setOpenFaq((cur) => {
        const i = ALL_FAQ_IDS.indexOf(cur ?? "");
        const next = (i + 1) % ALL_FAQ_IDS.length;
        return ALL_FAQ_IDS[next] ?? ALL_FAQ_IDS[0] ?? null;
      });
    }, copy.autoplayFaqMs);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, panel, copy.autoplayFaqMs]);

  /* Preview cards highlight cycle (FAQ view) */
  useEffect(() => {
    if (!inView || paused || reduce || panel !== "faq") return;
    const id = window.setInterval(() => {
      setFeaturedPreview((i) => (i + 1) % copy.previewCards.length);
    }, copy.autoplayTabMs);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, panel, copy.autoplayTabMs, copy.previewCards.length]);

  const goPanel = useCallback((id: RessourcesPanelId) => {
    setPanel(id);
    setPaused(true);
    if (id !== "faq") {
      const idx = copy.previewCards.findIndex((c) => c.id === id);
      if (idx >= 0) setFeaturedPreview(idx);
    }
  }, [copy.previewCards]);

  const toggleFaq = useCallback((id: string) => {
    setPaused(true);
    setOpenFaq((cur) => (cur === id ? null : id));
  }, []);

  return (
    <section
      ref={rootRef}
      className="b2m-res"
      id="ressources"
      aria-labelledby="res-title"
      onMouseLeave={() => setPaused(false)}
    >
      <div className="res-bg" aria-hidden="true">
        <Image
          src="/images/ressources/vector-5.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="res-bg-img"
        />
        <div className="res-bg-wash" />
        <div className="res-bg-veil" />
      </div>

      <div className="res">
        <p className="res-eyebrow">{copy.eyebrow}</p>
        <h2 id="res-title" className="res-title">
          {copy.title}
        </h2>
        <p className="res-sub">{copy.sub}</p>

        <div className="tabs" role="tablist" aria-label="Ressources">
          {copy.tabs.map(({ id, label }) => {
            const active = panel === id;
            const Icon = TAB_ICONS[id];
            return (
              <button
                key={id}
                type="button"
                className={`tab${active ? " is-active" : ""}`}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => goPanel(id)}
              >
                <Icon size={14} strokeWidth={2} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>

        {/* —— FAQ —— */}
        <div
          className={`panel${panel === "faq" ? " is-active" : ""}`}
          id="panel-faq"
          role="tabpanel"
          aria-labelledby="tab-faq"
          hidden={panel !== "faq"}
          onMouseEnter={() => setPaused(true)}
        >
          <p className="section-lead">{copy.faqLead}</p>

          <div className="faq-progress" aria-hidden="true">
            <span
              className="faq-progress-bar"
              style={{
                width: `${((faqIndex + 1) / Math.max(1, ALL_FAQ_IDS.length)) * 100}%`,
              }}
            />
          </div>

          {copy.faqGroups.map((group) => (
            <div className="faq-group" key={group.id}>
              <h3 className="faq-group-title">{group.title}</h3>
              <div className="faq-list">
                {group.items.map((item) => {
                  const open = openFaq === item.id;
                  return (
                    <div
                      className={`faq-item${open ? " is-open" : ""}`}
                      key={item.id}
                    >
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={open}
                        onClick={() => toggleFaq(item.id)}
                      >
                        <span>{item.q}</span>
                        <Plus size={16} strokeWidth={2.25} aria-hidden="true" />
                      </button>
                      <div className="faq-a" hidden={!open}>
                        <p>{item.a}</p>
                        {item.highlights && item.highlights.length > 0 ? (
                          <ul className="faq-chips">
                            {item.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="res-preview">
            <p className="res-preview-eyebrow">{copy.previewEyebrow}</p>
            <div className="preview-grid">
              {copy.previewCards.map((card, i) => {
                const featured = i === featuredPreview;
                return (
                  <button
                    key={card.id}
                    type="button"
                    className={`preview-card tone-${card.tone}${featured ? " is-featured" : ""}`}
                    onClick={() => goPanel(card.id)}
                  >
                    <span className="preview-label">{card.label}</span>
                    <span className="preview-title">{card.title}</span>
                    <ul>
                      {card.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* —— Accès —— */}
        <div
          className={`panel${panel === "acces" ? " is-active" : ""}`}
          id="panel-acces"
          role="tabpanel"
          aria-labelledby="tab-acces"
          hidden={panel !== "acces"}
        >
          <p className="section-lead">
            Comment se rendre au Musée National de Yaoundé : transport,
            stationnement et navettes Back2Mboa.
          </p>
          <div className="venue-banner">
            <div className="addr">Boulevard du 20 Mai · Yaoundé · Cameroun</div>
            <h3>Musée National du Cameroun</h3>
            <p>
              Situé en plein cœur de la capitale, à proximité de la Présidence,
              de l’Hôtel de Ville et des principales ambassades.
            </p>
          </div>
          <h3 className="faq-group-title">
            <Route size={16} strokeWidth={2} aria-hidden="true" /> Modes de
            transport
          </h3>
          <div className="grid-2">
            {[
              {
                label: "Taxi / VTC",
                title: "Le plus simple en ville",
                body: "Indiquez « Musée National, Boulevard du 20 Mai ». Comptez 20–45 min depuis la plupart des quartiers hôteliers.",
              },
              {
                label: "Voiture personnelle",
                title: "Stationnement",
                body: "Parkings à proximité. Arrivez en avance les matins d’événement. Un plan de circulation pourra être communiqué aux inscrits.",
              },
              {
                label: "Navettes Back2Mboa",
                title: "Depuis les hôtels partenaires",
                body: "Navettes aux heures de pointe. Horaires précisés dans le mail de confirmation d’inscription.",
              },
              {
                label: "Aéroport · Nsimalen",
                title: "Arrivée internationale",
                body: "Taxi ou transfert hôtel recommandé. Prévoir le trafic entre Nsimalen et le centre-ville.",
              },
            ].map((c) => (
              <div className="info-card" key={c.title}>
                <div className="label">{c.label}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* —— Guide —— */}
        <div
          className={`panel${panel === "guide" ? " is-active" : ""}`}
          id="panel-guide"
          role="tabpanel"
          aria-labelledby="tab-guide"
          hidden={panel !== "guide"}
        >
          <p className="section-lead">
            Tout ce qu’il faut savoir pour arriver prêt et profiter pleinement
            des deux jours Back2Mboa.
          </p>
          <div className="grid-2">
            {(
              [
                [Hotel, "Hébergement", "Centre-ville ou hôtels partenaires pour les navettes. Liste indicative partagée aux inscrits."],
                [IdCard, "Accueil & badges", "Confirmation + badges nominatifs pour salles, Deal Rooms et zones partenaires."],
                [Shirt, "Tenue", "Business casual ou tenue professionnelle — institutions et entrepreneurs réunis."],
                [Languages, "Langues", "Français et anglais. Supports bilingues autant que possible."],
                [Wifi, "Connexion & outils", "Wi-Fi sur site selon dispo. Powerbank + pitchs / fiches CAP hors-ligne."],
                [HeartHandshake, "Accessibilité", "Signalez tout besoin à l’inscription : l’équipe s’adapte."],
              ] as const
            ).map(([Icon, title, body]) => (
              <div className="info-card" key={title}>
                <div className="icon-box">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* —— Code —— */}
        <div
          className={`panel${panel === "code" ? " is-active" : ""}`}
          id="panel-code"
          role="tabpanel"
          aria-labelledby="tab-code"
          hidden={panel !== "code"}
        >
          <p className="section-lead">
            Back2Mboa est un espace de confiance. Valeurs et comportements
            attendus de tous les participants.
          </p>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            {(
              [
                [Heart, "Respect", "Dignité et considération pour chaque participant, sans exception."],
                [Handshake, "Intégrité", "Engagements tenus, informations véridiques et vérifiables."],
                [Users, "Inclusivité", "Ouvert à toutes générations, genres, origines et niveaux."],
              ] as const
            ).map(([Icon, title, body]) => (
              <div className="value-card" key={title}>
                <div className="icon-box">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <div className="info-card">
            <ul className="rules-list">
              {[
                "Présenter des projets et chiffres honnêtes — pas de survente trompeuse en Deal Room.",
                "Respecter le temps des autres (ponctualité, tours de parole, créneaux de matching).",
                "Zéro harcèlement, discrimination ou comportement abusif.",
                "Ne pas détourner les données ou contacts de la plateforme.",
                "Signaler tout incident à l’équipe d’organisation sur site.",
                "Manquement grave = exclusion de l’événement et de la plateforme.",
              ].map((rule) => (
                <li key={rule}>
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* —— Média —— */}
        <div
          className={`panel${panel === "media" ? " is-active" : ""}`}
          id="panel-media"
          role="tabpanel"
          aria-labelledby="tab-media"
          hidden={panel !== "media"}
        >
          <p className="section-lead">
            Assets presse, faits clés et contacts pour couvrir Back2Mboa.
          </p>
          <div className="grid-3">
            {(
              [
                [FileText, "Kit presse PDF", "Communiqué type, chiffres, angles, calendrier.", "#download-kit"],
                [ImageIcon, "Logos & charte", "Logo, variantes, palette forest / jaune.", "#download-brand"],
                [Camera, "Photos & visuels", "Éditions pilotes MEET, lieux, portraits.", "#download-photos"],
                [Quote, "Faits & citations", "89 % CTD · 97 % entrepreneurs · 60 000+ portée.", "#download-facts"],
                [Mail, "Contact presse", "presse@back2mboa.org", "mailto:presse@back2mboa.org"],
              ] as const
            ).map(([Icon, title, body, href]) => (
              <div className="media-card" key={title}>
                <div className="icon-box">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href={href}>
                  {href.startsWith("mailto:") ? "Écrire" : "Télécharger"}{" "}
                  {href.startsWith("mailto:") ? (
                    <ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
                  ) : (
                    <Download size={14} strokeWidth={2} aria-hidden="true" />
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* —— Guides —— */}
        <div
          className={`panel${panel === "guides" ? " is-active" : ""}`}
          id="panel-guides"
          role="tabpanel"
          aria-labelledby="tab-guides"
          hidden={panel !== "guides"}
        >
          <p className="section-lead">
            Guides opérationnels par profil : mairie, Solutionneur, investisseur,
            sponsor, attractivité, double flux.
          </p>
          <div className="grid-2">
            {(
              [
                [Landmark, "Guide mairie — Publier un Mayor Call", "Besoin, critères CAP, fiche type.", "#guide-maire"],
                [Rocket, "Guide Solutionneur — Répondre à un Call", "Éligibilité, matching, Deal Room.", "#guide-sol"],
                [Briefcase, "Guide investisseur / PTF", "Pipeline CAP, due diligence légère.", "#guide-inv"],
                [Handshake, "Guide partenaire / sponsor", "Packs Vision & Prosperity, ROI.", "#guide-sponsor"],
                [MapPinned, "Guide attractivité territoriale", "Site diaspora-friendly, pitch investisseur.", "#guide-attract"],
                [Route, "Guide double flux", "Enchaîner 1–7 déc. et 16–17 déc.", "#guide-flux"],
              ] as const
            ).map(([Icon, title, body, href]) => (
              <a className="guide" key={href} href={href}>
                <div className="icon-box dark">
                  <Icon size={18} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="guide-link">Ouvrir le guide →</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="res-foot">
          <a className="btn-jaune" href={copy.ctaHref}>
            <Mail size={16} strokeWidth={2} aria-hidden="true" />
            {copy.ctaLabel}
          </a>
          <span>
            <strong>Event</strong> {copy.footEvent.replace(/^Event\s+/i, "")}
          </span>
          <span>
            <strong>Salon</strong> {copy.footSalon.replace(/^Salon\s+/i, "")}
          </span>
        </div>
      </div>
    </section>
  );
}
