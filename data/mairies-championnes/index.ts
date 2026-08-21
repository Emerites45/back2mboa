import type { ChampionCopy, ChampionMairie } from "@/types/mairies-championnes";

/** Copy SVG maquette + HTML fourni. Ne pas inventer hors de ces sources.
 *  Photos : Wikimedia Commons (Cameroun), hébergées en local.
 *  Babadjou — Ouest Cameroun2.jpg (hauts plateaux)
 *  Douala III — Douala-Vue aérienne (27).jpg (ville + port)
 *  Limbé I — Down Beach Limbe vue aérienne, Ndongere
 *  Guider — Hôpital Général de Yaoundé.jpg (infrastructure de soins)
 */
export const CHAMPION_COPY: ChampionCopy = {
  kicker: "Back2Mboa ASAP™  ·  Édition 2026",
  title: "6 mairies championnes",
  titleAccent: "6 secteurs",
  subtitle: [
    "Chaque territoire porte un Mayor Call™, un cas d'usage et un pipeline de solutions.",
    "Explorez le potentiel économique et les success stories.",
  ],
  ctaPrimary: "Voir le Mayor Call™",
  ctaSecondary: "Je peux répondre",
  autoHint: "Défilement auto · survolez pour pause",
  legend: [
    { value: "500", label: "participants visés" },
    { value: "100", label: "entrepreneurs locaux" },
    { value: "30", label: "médias & influenceurs" },
    { value: "16–17 déc.", label: "Musée National, Yaoundé" },
    { value: "CAP™", label: "Crédible · Accessible · Possible", accent: true },
  ],
};

export const CHAMPION_MAIRIES: ChampionMairie[] = [
  {
    id: "babadjou",
    nom: "Babadjou",
    region: "Ouest",
    statut: "Commune urbaine",
    dot: "#4F8A3C",
    secteur: "Agriculture & Agro-industrie",
    lead: "Cœur productif des hauts plateaux : pommes de terre, maïs, haricots, café et élevage. Le Mayor Call™ vise la transformation locale et la réduction des pertes.",
    stats: [
      { value: "2 Md", label: "FCFA pipeline transform." },
      { value: "~40 %", label: "pertes post-récolte" },
      { value: "Chaîne", label: "froid · collecte · export" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Structurer une unité de transformation (frites, purée, farine) et un corridor logistique diaspora-compatible.",
    visualKicker: "Terroir",
    visualCaption: "Hauts plateaux de l'Ouest",
    theme: "agri",
    image: "/images/mairies-championnes/babadjou.jpg",
  },
  {
    id: "douala3",
    nom: "Douala III",
    region: "Littoral",
    statut: "Commune urbaine",
    dot: "#1F4E79",
    secteur: "Finance, Fiscalité & Paiements",
    lead: "Taxes de marché, permis, services municipaux : peu digitalisés, donc peu traçables et sous-mobilisés. Le Mayor Call™ vise la collecte mobile.",
    stats: [
      { value: "GovTech", label: "paiement & traçabilité" },
      { value: "Marchés", label: "taxes & permis" },
      { value: "Recettes", label: "mobilisation locale" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Établissements financiers, opérateurs de paiement et régulateurs réunis autour d'une solution conforme.",
    visualKicker: "Ville",
    visualCaption: "Douala — port, assiette fiscale, marchés",
    theme: "city",
    image: "/images/mairies-championnes/douala-iii.jpg",
  },
  {
    id: "mbalmayo",
    nom: "Mbalmayo",
    region: "Centre",
    statut: "Commune urbaine",
    dot: "#C66A2B",
    secteur: "Foncier, Immobilier & Construction",
    lead: "Croissance périurbaine, réserve foncière disponible, proximité d'un grand axe économique. Le Mayor Call™ vise l'aménagement et les titres.",
    stats: [
      { value: "300 ha", label: "réserve foncière" },
      { value: "N3", label: "axe économique" },
      { value: "Dossier", label: "études & titres" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Urbanistes, géomètres, promoteurs et banques — avec le MINDCAF, le MINDHU et le FEICOM.",
    visualKicker: "Foncier",
    visualCaption: "Bois tropicaux du corridor",
    theme: "savanna",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Timber_transport_near_Libongo%2C_Cameroon_2014.jpg/1280px-Timber_transport_near_Libongo%2C_Cameroon_2014.jpg",
  },
  {
    id: "limbe1",
    nom: "Limbé I",
    region: "Sud-Ouest",
    statut: "Commune urbaine",
    dot: "#F2B632",
    secteur: "Tourisme, Mobilité & Marketing Territorial",
    lead: "Tourisme côtier, port, pêche, patrimoine naturel. L'attractivité existe — la mise en marché reste à construire.",
    stats: [
      { value: "10 000", label: "visiteurs (déc.)" },
      { value: "× 10", label: "objectif fréquentation" },
      { value: "Côtier", label: "port & patrimoine" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Marketing territorial, hébergement, accès et mobilité : tout est à structurer ensemble.",
    visualKicker: "Côte",
    visualCaption: "Down Beach — pêche et sable volcanique",
    theme: "ocean",
    image: "/images/mairies-championnes/limbe-i.jpg",
  },
  {
    id: "fundong",
    nom: "Fundong",
    region: "Nord-Ouest",
    statut: "Commune urbaine",
    dot: "#168AAD",
    secteur: "Eau & Énergie",
    lead: "Eau productive, énergie pour l'agriculture et la transformation, solutions décentralisées et résilientes. Des forages construits, puis arrêtés.",
    stats: [
      { value: "3", label: "rivières hydro" },
      { value: "Forages", label: "maintenance à relancer" },
      { value: "Mini-réseaux", label: "solaire & gestion" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Solutionneurs de l'adduction d'eau et des mini-réseaux, MINEE, CAMWATER, ARSEL.",
    visualKicker: "Énergie",
    visualCaption: "Hydro des Grassfields — chutes Menchum",
    theme: "water",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Menchum_Falls_NWprovince_Cameroon.jpg/1280px-Menchum_Falls_NWprovince_Cameroon.jpg",
  },
  {
    id: "guider",
    nom: "Guider",
    region: "Nord",
    statut: "Commune urbaine",
    dot: "#D8212E",
    secteur: "Santé, Social & Bien-être",
    lead: "Santé territoriale, accès aux services essentiels, assainissement et résilience sociale. Des médecins prêts. Un territoire à choisir.",
    stats: [
      { value: "Dialyse", label: "centre visé" },
      { value: "Soins", label: "spécialités absentes" },
      { value: "Diaspora", label: "FR · BE · CA" },
    ],
    storyTitle: "Success story en construction.",
    storyBody:
      "Des médecins camerounais exerçant en France, en Belgique et au Canada, autour d'un centre de dialyse et de diagnostic.",
    visualKicker: "Santé",
    visualCaption: "Infrastructure de soins au Cameroun",
    theme: "health",
    image: "/images/mairies-championnes/guider.jpg",
  },
];
