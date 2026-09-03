import Link from "next/link";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { TerritorySection } from "@/components/sections/territory-section";
import { EditionsPilotesSection } from "@/components/sections/editions-pilotes/EditionsPilotesSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ContrasteSection } from "@/components/sections/contraste/ContrasteSection";
import { PourquoiSection } from "@/components/sections/pourquoi/PourquoiSection";
import { BatisseursSection } from "@/components/sections/batisseurs/BatisseursSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { BonnePorteSection } from "@/components/sections/bonne-porte/BonnePorteSection";
import { OpenRoadSection } from "@/components/sections/open-road/OpenRoadSection";
import { MethodeSection } from "@/components/sections/methode/MethodeSection";
import { MairiesChampionnesSection } from "@/components/sections/mairies-championnes/MairiesChampionnesSection";
import { ModeleSection } from "@/components/sections/modele/ModeleSection";
import { PotentialitesSection } from "@/components/sections/potentialites/PotentialitesSection";
import { HomecomingSection } from "@/components/sections/homecoming/HomecomingSection";
import { ParcoursSection } from "@/components/sections/ParcoursSection";
import { ResultatsSection } from "@/components/sections/ResultatsSection";
import { EcosystemeSection } from "@/components/sections/ecosysteme/EcosystemeSection";
import { PreludeSection } from "@/components/sections/prelude/PreludeSection";
import { LiaisonSection } from "@/components/sections/LiaisonSection";
import { PassageSection } from "@/components/sections/passage/PassageSection";
import { BoulevardSection } from "@/components/sections/boulevard/BoulevardSection";
import { TickerSection } from "@/components/sections/TickerSection";
import { HeroLandingSection } from "@/components/sections/hero-landing/HeroLandingSection";
import { MuseeSection } from "@/components/sections/MuseeSection";
import { PartenairesSection } from "@/components/sections/partenaires/PartenairesSection";
import { BeforeDuringAfterSection } from "@/components/sections/before-during-after/BeforeDuringAfterSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { AgendaSection } from "@/components/sections/agenda/AgendaSection";
import { RessourcesSection } from "@/components/sections/ressources/RessourcesSection";
import {
  BilletsPartenairesSection,
} from "@/components/sections/billets/BilletsSection";
import { ArticlesSection } from '@/components/sections/ArticlesSection';
import { NewsletterGateSection } from "@/components/sections/newsletter-gate/NewsletterGateSection";
import { FooterSection } from "@/components/sections/footer/FooterSection";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

/**
 * Landing — architecture produit (slots 1→30 + pauses + footer).
 * Ordre = brief produit Back2Mboa (affichage = ordre JSX ci-dessous).
 */
export default function HomePage() {
  return (
    <>
      <SmoothScroll />

      {/* ── 1. Hero ─────────────────────────────────────── */}
      <HeroSection />

      {/* ── 2. Territoires / Paris ↔ Guider ─────────────── */}
      <TerritorySection />

      {/* ── 3. Les éditions pilotes ont prouvé le modèle ─ */}
      <EditionsPilotesSection />

      {/* ── 4. Chiffres principaux (montagnes) ─────────── */}
      <ImpactSection />

      {/* ── 5. Avant Back2Mboa : 5 acteurs ─────────────── */}
      <ContrasteSection />

      {/* ── 6. Tableau — pas un salon de plus ──────────── */}
      <PourquoiSection />

      {/* ── 7. Chiffres Mme Olivia / Bâtisseurs ────────── */}
      <BatisseursSection />

      {/* ── 8. Présentation de l’équipe ────────────────── */}
      <TeamSection />

      {/* ── 9. Qui êtes-vous ? (Bonne porte) ───────────── */}
      <BonnePorteSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── */}
      <OpenRoadSection />

      {/* ── 10. Méthode CAP™ ───────────────────────────── */}
      <MethodeSection />

      {/* ── 11. 6 mairies championnes ──────────────────── */}
      <MairiesChampionnesSection />

      {/* ── 12. 6 secteurs (cartes) ────────────────────── */}
      <ModeleSection />

      {/* ── 13. Carte interactive Cameroun ─────────────── */}
      <PotentialitesSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── */}
      <HomecomingSection />

      {/* ── 14. 7 étapes jusqu’au résultat ─────────────── */}
      <ParcoursSection />

      {/* ── 15. Résultats des éditions pilotes ─────────── */}
      <ResultatsSection />

      {/* ── 16. Digital Twin & Mayor Calls ─────────────── */}
      <EcosystemeSection />

      {/* ── 17. Salon Diaspora PARIS — MINREX ──────────── */}
      {/* ── 18. Masterclass — Demo Day MINREX ──────────── */}
      <PreludeSection />

      {/* ── 19. La Prospérité à Double Sens ────────────── */}
      <LiaisonSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── */}
      <PassageSection />

      {/* ── 20. Boulevard d’opportunités ───────────────── */}
      <BoulevardSection />
      <TickerSection />

      {/* ── 21. Introduction édition B2M 2026 ──────────── */}
      <HeroLandingSection />

      {/* ── 22. Musée National ─────────────────────────── */}
      <MuseeSection />

      {/* ── 23. Édition 2026 & Partenaires ─────────────── */}
      {/* Slot 23 : contenu dédié à brancher (Franck / combo). */}

      {/* ── 24. Partenaires ───────────────────────────── */}
      <PartenairesSection />

      {/* ── 25. Before · During · After ────────────────── */}
      <BeforeDuringAfterSection />

      {/* ── 26. Real stories ───────────────────────────── */}
      <StoriesSection />

      {/* ── 27. Events ─────────────────────────────────── */}
      <AgendaSection />

      {/* ── 28. FAQ · Dossier média · Guides ───────────── */}
      <RessourcesSection />

      {/* ── Billets partenaires (hors slots 1–30) ─────── */}
      <BilletsPartenairesSection />

      {/* ── 29. Carousel Articles ──────────────────────── */}
      {/* Slot 29 : carousel presse / blog à brancher (Franck). */}
      <ArticlesSection/>
      {/* ── 30. Inscription Newsletter ─────────────────── */}
      <NewsletterGateSection />

      {/* ── FOOTER ──────────────────────────── */}
      <FooterSection />

      <ChatbotWidget />
    </>
  );
}
