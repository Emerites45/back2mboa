"use client";

import { useState, type ReactNode } from "react";
import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  CalendarDays,
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
  Lightbulb,
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
import "./RessourcesSection.css";

type PanelId = "faq" | "acces" | "guide" | "code" | "media" | "guides";

const TABS: { id: PanelId; label: string; Icon: LucideIcon }[] = [
  { id: "faq", label: "FAQ", Icon: CircleQuestionMark },
  { id: "acces", label: "Accès", Icon: MapPinned },
  { id: "guide", label: "Guide pratique", Icon: Briefcase },
  { id: "code", label: "Code de conduite", Icon: Scale },
  { id: "media", label: "Dossier média", Icon: Camera },
  { id: "guides", label: "Guides acteurs", Icon: BookOpen },
];

type FaqItem = { id: string; q: string; a: ReactNode };

const FAQ_GROUPS: { id: string; title: string; Icon: LucideIcon; items: FaqItem[] }[] = [
  {
    id: "org",
    title: "Organisation & concept",
    Icon: Lightbulb,
    items: [
      {
        id: "org-0",
        q: "Qu’est-ce que Back2Mboa ?",
        a: (
          <>
            Back2Mboa (African Solutions Accelerating Prosperity) est une{" "}
            <strong>plateforme de prospérité territoriale</strong> qui identifie,
            structure, rend visibles et connecte des opportunités économiques
            réelles avec les personnes capables de les transformer en projets
            concrets. Ce n’est{" "}
            <strong>pas un salon traditionnel ni un forum de discours</strong>.
          </>
        ),
      },
      {
        id: "org-1",
        q: "Qu’est-ce qui différencie Back2Mboa d’un salon classique ?",
        a: (
          <>
            Matching sur des <strong>besoins territoriaux qualifiés</strong>{" "}
            (Mayor Calls, méthode CAP), Deal Rooms orientées signature, et{" "}
            <strong>continuité après l’événement</strong> via la plateforme. On
            mesure les deals, les PPP et les recettes — pas le nombre de selfies.
          </>
        ),
      },
      {
        id: "org-2",
        q: "Qu’est-ce qu’un Mayor Call ?",
        a: (
          <>
            Un <strong>appel structuré d’une mairie</strong> sur un besoin
            territorial précis (secteur, enjeu, critères). Il sert de base au
            matching avec les Solutionneurs et à la qualification CAP avant les
            Deal Rooms.
          </>
        ),
      },
      {
        id: "org-3",
        q: "C’est quoi le double flux ?",
        a: (
          <>
            <strong>1–7 décembre</strong> : les territoires vont vers la diaspora
            (mission + <strong>salon le 4 décembre</strong>).{" "}
            <strong>16–17 décembre</strong> : la diaspora vient aux territoires
            (Back2Mboa, Musée National, Yaoundé). Prospérité à double sens.
          </>
        ),
      },
    ],
  },
  {
    id: "dates",
    title: "Dates, lieu & participation",
    Icon: CalendarDays,
    items: [
      {
        id: "dates-0",
        q: "Quand et où a lieu Back2Mboa 2026 ?",
        a: (
          <>
            <strong>16 et 17 décembre 2026</strong>,{" "}
            <strong>Musée National du Cameroun</strong>, Yaoundé (Boulevard du 20
            Mai, centre-ville). Objectif : environ <strong>500 participants</strong>
            , 30 médias & influenceurs, 100 entrepreneurs locaux.
          </>
        ),
      },
      {
        id: "dates-1",
        q: "Qui peut participer ?",
        a: (
          <>
            <strong>Mairies / CTD</strong>, Solutionneurs locaux et diaspora,
            investisseurs & PTF, régulateurs, médias, entreprises, mécènes
            culturels & touristiques. Chaque profil a une « bonne porte » sur le
            site.
          </>
        ),
      },
      {
        id: "dates-2",
        q: "Comment s’inscrire ?",
        a: (
          <>
            Via le bouton d’inscription du site selon votre profil (territoire,
            Solutionneur, investisseur, partenaire, presse). Les places sont
            limitées pour garantir la qualité des Deal Rooms.
          </>
        ),
      },
      {
        id: "dates-3",
        q: "Qu’est-ce que la Masterclass CTD d’octobre ?",
        a: (
          <>
            Formation pratique pour maires et équipes : attractivité territoriale,
            mobilisation diaspora / investisseurs, outils numériques et IA pour
            les recettes, pitch investisseur. Préparation au salon et à Back2Mboa.
          </>
        ),
      },
    ],
  },
  {
    id: "part",
    title: "Partenaires & sponsors",
    Icon: Handshake,
    items: [
      {
        id: "part-0",
        q: "Comment les sponsors accèdent-ils au salon de la diaspora ?",
        a: (
          <>
            Inclus dans les packs : <strong>Prosperity Partner</strong> — prise en
            charge de <strong>2 personnes</strong>, tous frais payés ;{" "}
            <strong>Vision Partner</strong> — prise en charge d’
            <strong>1 personne</strong>, tous frais payés (salon + activités
            mission 1–7 déc.).
          </>
        ),
      },
      {
        id: "part-1",
        q: "Quels sont les 6 secteurs et mairies championnes ?",
        a: (
          <>
            <strong>Babadjou</strong> — Agriculture · <strong>Douala III</strong> —
            Finance / digital · <strong>Mbalmayo</strong> — Foncier / habitat ·{" "}
            <strong>Limbé I</strong> — Tourisme / mobilité ·{" "}
            <strong>Fundong</strong> — Eau & énergie · <strong>Guider</strong> —
            Santé / environnement.
          </>
        ),
      },
    ],
  },
];

const FIRST_FAQ = FAQ_GROUPS[0].items[0].id;

function Ico({ children }: { children: ReactNode }) {
  return (
    <i
      aria-hidden="true"
      style={{ fontStyle: "normal", display: "inline-flex", alignItems: "center" }}
    >
      {children}
    </i>
  );
}

export function RessourcesSection() {
  const [panel, setPanel] = useState<PanelId>("faq");
  const [openFaq, setOpenFaq] = useState<string | null>(FIRST_FAQ);

  function toggleFaq(id: string) {
    setOpenFaq((cur) => (cur === id ? null : id));
  }

  return (
    <div className="b2m-res">
      <section className="res" id="ressources">
        <div className="res-eyebrow">Ressources</div>
        <h2 className="res-title">On te rassure. On te guide.</h2>
        <p className="res-sub">
          FAQ, plan d’accès, guide pratique, code de conduite, dossier média et
          guides acteurs — tout ce qu’il faut pour arriver prêt et jouer le jeu
          Back2Mboa.
        </p>

        <div className="tabs" role="tablist">
          {TABS.map(({ id, label, Icon }) => {
            const active = panel === id;
            return (
              <button
                key={id}
                type="button"
                className={`tab${active ? " active" : ""}`}
                data-panel={id}
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${id}`}
                id={`tab-${id}`}
                onClick={() => setPanel(id)}
              >
                <Ico>
                  <Icon size={14} strokeWidth={2} />
                </Ico>{" "}
                {label}
              </button>
            );
          })}
        </div>

        <div
          className={`panel${panel === "faq" ? " active" : ""}`}
          id="panel-faq"
          role="tabpanel"
          aria-labelledby="tab-faq"
        >
          <p className="section-lead">
            Tout ce que tu dois savoir sur l’organisation, le lieu et les
            modalités. Une question absente ? Écris-nous.
          </p>

          {FAQ_GROUPS.map((group) => (
            <div className="faq-group" key={group.id}>
              <h3 className="faq-group-title">
                <Ico>
                  <group.Icon size={16} strokeWidth={2} />
                </Ico>{" "}
                {group.title}
              </h3>
              <div className="faq-list">
                {group.items.map((item) => {
                  const open = openFaq === item.id;
                  return (
                    <div className={`faq-item${open ? " open" : ""}`} key={item.id}>
                      <button
                        type="button"
                        className="faq-q"
                        aria-expanded={open}
                        onClick={() => toggleFaq(item.id)}
                      >
                        {item.q}{" "}
                        <Ico>
                          <Plus size={16} strokeWidth={2} />
                        </Ico>
                      </button>
                      <div className="faq-a">{item.a}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div
          className={`panel${panel === "acces" ? " active" : ""}`}
          id="panel-acces"
          role="tabpanel"
          aria-labelledby="tab-acces"
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
          <h3 className="faq-group-title" style={{ marginBottom: 14 }}>
            <Ico>
              <Route size={16} strokeWidth={2} />
            </Ico>{" "}
            Modes de transport
          </h3>
          <div className="grid-2">
            <div className="info-card">
              <div className="label">Taxi / VTC</div>
              <h3>Le plus simple en ville</h3>
              <p>
                Indiquez « Musée National, Boulevard du 20 Mai ». Temps de trajet
                variable selon le trafic (comptez 20–45 min depuis la plupart des
                quartiers hôteliers).
              </p>
            </div>
            <div className="info-card">
              <div className="label">Voiture personnelle</div>
              <h3>Stationnement</h3>
              <p>
                Parkings à proximité du musée et des axes du centre-ville.
                Arrivez en avance les matins d’événement. Un plan de circulation
                pourra être communiqué aux inscrits.
              </p>
            </div>
            <div className="info-card">
              <div className="label">Navettes Back2Mboa</div>
              <h3>Depuis les hôtels partenaires</h3>
              <p>
                Des navettes seront organisées aux heures de pointe depuis les
                hôtels partenaires. Horaires précisés dans le mail de
                confirmation d’inscription.
              </p>
            </div>
            <div className="info-card">
              <div className="label">Aéroport · Nsimalen</div>
              <h3>Arrivée internationale</h3>
              <p>
                Aéroport international de Yaoundé-Nsimalen. Taxi ou transfert
                hôtel recommandé. Prévoir le trafic entre Nsimalen et le
                centre-ville.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`panel${panel === "guide" ? " active" : ""}`}
          id="panel-guide"
          role="tabpanel"
          aria-labelledby="tab-guide"
        >
          <p className="section-lead">
            Tout ce qu’il faut savoir pour arriver au Musée National, se loger et
            profiter pleinement des deux jours Back2Mboa.
          </p>
          <div className="venue-banner">
            <div className="addr">Yaoundé · Centre-ville · Cameroun</div>
            <h3>Musée National du Cameroun</h3>
            <p>
              Facilement accessible en taxi, en bus ou en voiture. Des navettes
              seront organisées depuis les hôtels partenaires aux heures de
              pointe.
            </p>
          </div>
          <div className="grid-2">
            {[
              {
                Icon: Hotel,
                title: "Hébergement",
                body: "Privilégiez le centre-ville ou les hôtels partenaires pour bénéficier des navettes. Une liste indicative sera partagée aux inscrits (pas d’obligation de réservation via Back2Mboa).",
              },
              {
                Icon: IdCard,
                title: "Accueil & badges",
                body: "Présentez-vous à l’accueil avec votre confirmation. Badges nominatifs pour accéder aux salles, Deal Rooms et zones partenaires.",
              },
              {
                Icon: Shirt,
                title: "Tenue",
                body: "Business casual ou tenue professionnelle. L’événement mêle institutions, investisseurs et entrepreneurs : visez le sérieux sans rigidité inutile.",
              },
              {
                Icon: Languages,
                title: "Langues",
                body: "Français et anglais. Interventions et supports prévus dans les deux langues officielles du Cameroun autant que possible.",
              },
              {
                Icon: Wifi,
                title: "Connexion & outils",
                body: "Wi-Fi sur site (selon disponibilité). Prévoyez powerbank et version hors-ligne de vos pitchs / fiches CAP.",
              },
              {
                Icon: HeartHandshake,
                title: "Accessibilité",
                body: "Signalez tout besoin spécifique (mobilité, interprétation, autre) à l’inscription : l’équipe fera son possible pour vous accueillir correctement.",
              },
            ].map(({ Icon, title, body }) => (
              <div className="info-card" key={title}>
                <div className="icon-box">
                  <Ico>
                    <Icon size={18} strokeWidth={2} />
                  </Ico>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`panel${panel === "code" ? " active" : ""}`}
          id="panel-code"
          role="tabpanel"
          aria-labelledby="tab-code"
        >
          <p className="section-lead">
            Back2Mboa est un espace de confiance. Ce code définit les valeurs et
            les comportements attendus de tous les participants, sans exception.
          </p>
          <h3 className="faq-group-title" style={{ marginBottom: 14 }}>
            Nos valeurs
          </h3>
          <div className="grid-3" style={{ marginBottom: 24 }}>
            <div className="value-card">
              <div className="icon-box">
                <Ico>
                  <Heart size={18} strokeWidth={2} />
                </Ico>
              </div>
              <h3>Respect</h3>
              <p>
                Le respect mutuel est non négociable. Chaque participant, quelle
                que soit sa fonction ou son origine, est traité avec dignité et
                considération.
              </p>
            </div>
            <div className="value-card">
              <div className="icon-box">
                <Ico>
                  <Handshake size={18} strokeWidth={2} />
                </Ico>
              </div>
              <h3>Intégrité</h3>
              <p>
                Les engagements pris pendant l’événement doivent être tenus. Les
                informations présentées doivent être véridiques et vérifiables.
              </p>
            </div>
            <div className="value-card">
              <div className="icon-box">
                <Ico>
                  <Users size={18} strokeWidth={2} />
                </Ico>
              </div>
              <h3>Inclusivité</h3>
              <p>
                Back2Mboa est ouvert à toutes les générations, genres, origines
                et niveaux d’expérience. La diversité est une force, pas un
                obstacle.
              </p>
            </div>
          </div>
          <h3 className="faq-group-title" style={{ marginBottom: 8 }}>
            Comportements attendus
          </h3>
          <div className="info-card">
            <ul className="rules-list">
              {[
                "Présenter des projets et chiffres honnêtes — pas de survente trompeuse en Deal Room.",
                "Respecter le temps des autres (ponctualité, tours de parole, créneaux de matching).",
                "Zéro harcèlement, discrimination ou comportement abusif — physique, verbal ou en ligne.",
                "Ne pas détourner les données ou contacts obtenus via la plateforme à des fins non autorisées.",
                "Signaler tout incident à l’équipe d’organisation : un référent sera identifié sur site.",
                "Tout manquement grave peut entraîner l’exclusion immédiate de l’événement et de la plateforme.",
              ].map((rule) => (
                <li key={rule}>
                  <Ico>
                    <Check size={16} strokeWidth={2.5} />
                  </Ico>{" "}
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`panel${panel === "media" ? " active" : ""}`}
          id="panel-media"
          role="tabpanel"
          aria-labelledby="tab-media"
        >
          <p className="section-lead">
            Assets presse, faits clés et contacts pour couvrir la masterclass, le
            salon diaspora et Back2Mboa.
          </p>
          <div className="grid-3">
            {[
              {
                Icon: FileText,
                title: "Kit presse PDF",
                body: "Communiqué type, chiffres 2022–2023, angles, calendrier, contacts.",
                href: "#download-kit",
                label: "Télécharger",
              },
              {
                Icon: ImageIcon,
                title: "Logos & charte",
                body: "Logo, variantes, palette forest / jaune, règles d’usage.",
                href: "#download-brand",
                label: "Télécharger",
              },
              {
                Icon: Camera,
                title: "Photos & visuels",
                body: "Sélection éditions pilotes MEET, lieux, portraits (droits presse).",
                href: "#download-photos",
                label: "Télécharger",
              },
              {
                Icon: Quote,
                title: "Faits & citations",
                body: "89 % satisfaction CTD · 97 % entrepreneurs · 60 000+ portée 2023.",
                href: "#download-facts",
                label: "Télécharger",
              },
              {
                Icon: CalendarDays,
                title: "Calendrier médias",
                body: "Masterclass octobre · mission 1–7 déc. (salon 4) · event 16–17 déc.",
                href: "#download-calendar",
                label: "Télécharger",
              },
            ].map(({ Icon, title, body, href, label }) => (
              <div className="media-card" key={title}>
                <div className="icon-box">
                  <Ico>
                    <Icon size={18} strokeWidth={2} />
                  </Ico>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href={href}>
                  {label}{" "}
                  <Ico>
                    <Download size={14} strokeWidth={2} />
                  </Ico>
                </a>
              </div>
            ))}
            <div className="media-card">
              <div className="icon-box">
                <Ico>
                  <Mail size={18} strokeWidth={2} />
                </Ico>
              </div>
              <h3>Contact presse</h3>
              <p>Accréditations, interviews, demandes exclusives.</p>
              <a href="mailto:presse@back2mboa.org">
                presse@back2mboa.org{" "}
                <Ico>
                  <ExternalLink size={14} strokeWidth={2} />
                </Ico>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`panel${panel === "guides" ? " active" : ""}`}
          id="panel-guides"
          role="tabpanel"
          aria-labelledby="tab-guides"
        >
          <p className="section-lead">
            Guides opérationnels par profil : mairie, Solutionneur, investisseur,
            sponsor, attractivité, double flux.
          </p>
          <div className="grid-2">
            {[
              {
                href: "#guide-maire",
                Icon: Landmark,
                title: "Guide mairie — Publier un Mayor Call",
                body: "Structurer le besoin, critères CAP, modèles de fiche, validation avant mise en ligne.",
              },
              {
                href: "#guide-sol",
                Icon: Rocket,
                title: "Guide Solutionneur — Répondre à un Call",
                body: "Éligibilité, dossier type, matching, préparation Deal Room et suite post-événement.",
              },
              {
                href: "#guide-inv",
                Icon: Briefcase,
                title: "Guide investisseur / PTF",
                body: "Lire un pipeline CAP, due diligence légère, accès Deal Rooms, indicateurs de suivi.",
              },
              {
                href: "#guide-sponsor",
                Icon: Handshake,
                title: "Guide partenaire / sponsor",
                body: "Packs Vision & Prosperity, inclusion salon 1–7 déc., visibilité, ROI par secteur.",
              },
              {
                href: "#guide-attract",
                Icon: MapPinned,
                title: "Guide attractivité territoriale",
                body: "Outils masterclass : site diaspora-friendly, cartes de revenus, pitch investisseur.",
              },
              {
                href: "#guide-flux",
                Icon: ArrowLeftRight,
                title: "Guide double flux (mission ↔ event)",
                body: "Enchaîner 1–7 décembre et 16–17 décembre pour maximiser les deals.",
              },
            ].map(({ href, Icon, title, body }) => (
              <div className="guide" key={href}>
                <div className="icon-box dark">
                  <Ico>
                    <Icon size={18} strokeWidth={2} />
                  </Ico>
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <a href={href}>Ouvrir le guide →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="res-foot">
          <a className="btn-jaune" href="mailto:contact@back2mboa.org">
            <Ico>
              <Mail size={16} strokeWidth={2} />
            </Ico>{" "}
            Une question ? Écrivez-nous
          </a>
          <span>
            <strong>Event</strong> 16–17 déc. 2026 · Musée National, Yaoundé
          </span>
          <span>
            <strong>Salon</strong> 4 déc. · mission 1–7 déc.
          </span>
        </div>
      </section>
    </div>
  );
}
