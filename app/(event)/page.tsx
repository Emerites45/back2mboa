import Link from "next/link";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ContrasteSection } from "@/components/sections/contraste/ContrasteSection";
import { PourquoiSection } from "@/components/sections/pourquoi/PourquoiSection";
import { EditionsPilotesSection } from "@/components/sections/editions-pilotes/EditionsPilotesSection";
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
import { PreuveChiffresSection as PreuveChiffresImpact } from "@/components/sections/PreuveChiffresSection";
import { EcosystemeSection } from "@/components/sections/ecosysteme/EcosystemeSection";
import { PreludeSection } from "@/components/sections/prelude/PreludeSection";
import { LiaisonSection } from "@/components/sections/LiaisonSection";
import { PassageSection } from "@/components/sections/passage/PassageSection";
import { BoulevardSection } from "@/components/sections/boulevard/BoulevardSection";
import { HeroLandingSection } from "@/components/sections/hero-landing/HeroLandingSection";
import { MuseeSection } from "@/components/sections/MuseeSection";
import { PartenairesSection } from "@/components/sections/partenaires/PartenairesSection";
import { BeforeDuringAfterSection } from "@/components/sections/before-during-after/BeforeDuringAfterSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { AgendaSection } from "@/components/sections/agenda/AgendaSection";
import { NecessiteSection } from "@/components/sections/necessite/NecessiteSection";
import { PlateformeSection } from "@/components/sections/plateforme/PlateformeSection";
import { TickerSection } from "@/components/sections/TickerSection";
import { RessourcesSection } from "@/components/sections/ressources/RessourcesSection";
import {
  BilletsSection,
  BilletsPartenairesSection,
} from "@/components/sections/billets/BilletsSection";
import { NewsletterGateSection } from "@/components/sections/newsletter-gate/NewsletterGateSection";
import { FooterRevealZone } from "@/components/sections/footer/FooterRevealZone";
import { Button } from "@/components/ui/button";

/**
 * Landing — architecture produit (slots 1→30 + pauses + footer).
 *
 * ● Paul-Alain / Williams : sections câblées ci-dessous.
 * ● Franck : slots manquants marqués en commentaires JSX FRANCK.
 */
export default function HomePage() {
  return (
    <>
      <SmoothScroll />

      {/* ── 1. Hero ─────────────────────────────────────── Paul */}
      <HeroSection />

      {/* ── 2. Brief B2M — territoires / Bâtisseurs ─────── FRANCK */}
      {/* FRANCK — Section 2 : « Les territoires ont des besoins.
          Les Bâtisseurs-Solutionneurs ont des réponses. » */}

      {/* ── 3. Éditions pilotes ont prouvé le modèle ───── Paul */}
      <EditionsPilotesSection />

      {/* ── 4. Chiffres principaux (montagnes) ─────────── Paul */}
      <ImpactSection />

      {/* ── 5. Avant Back2Mboa : 5 acteurs ─────────────── Paul */}
      <ContrasteSection />

      {/* ── 6. Tableau deals (pas un salon de plus) ────── Paul */}
      <PourquoiSection />

      {/* ── 7. Chiffres / preuves Bâtisseurs (Olivia) ──── Paul */}
      <BatisseursSection />

      {/* ── 8. Présentation équipe ─────────────────────── Williams */}
      <TeamSection />

      {/* ── 9. Qui êtes-vous ? Bonne porte ─────────────── Williams (rework) */}
      <BonnePorteSection />
      <PlateformeSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── Paul */}
      <OpenRoadSection />

      {/* ── 10. Méthode CAP™ ───────────────────────────── Paul */}
      <MethodeSection />

      {/* ── 11. 6 mairies championnes ──────────────────── Paul */}
      <MairiesChampionnesSection />

      {/* ── 12. 6 secteurs (cartes) ────────────────────── Paul */}
      <ModeleSection />

      {/* ── 13. Carte interactive Cameroun ─────────────── Paul */}
      <PotentialitesSection />
      <NecessiteSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── Paul */}
      <HomecomingSection />

      {/* ── 14. 7 étapes jusqu’au résultat ─────────────── Paul */}
      <ParcoursSection />

      {/* ── 15. Résultats des éditions pilotes ─────────── Paul */}
      <ResultatsSection />
      <PreuveChiffresImpact />

      {/* ── 16. Digital Twin & Mayor Calls ─────────────── Williams (rework) */}
      <EcosystemeSection />

      {/* ── 17–18. Salon Diaspora + Masterclass (Prélude) ─ Paul */}
      <PreludeSection />

      {/* ── 19. La Prospérité à Double Sens ────────────── Paul */}
      <LiaisonSection />

      {/* ── PAUSE — diapo images / pop-up ──────────────── FRANCK */}
      <PassageSection />

      {/* ── 20. Boulevard d’opportunités ───────────────── Paul */}
      <BoulevardSection />
      <TickerSection />

      {/* ── 21. Introduction édition B2M 2026 ──────────── Paul */}
      <HeroLandingSection />

      {/* ── 22. Musée National ─────────────────────────── Paul */}
      <MuseeSection />

      {/* ── 23. Édition 2026 & Partenaires (combo) ─────── FRANCK / partiel */}
      {/* FRANCK — Section 23 dédiée si besoin ; Partenaires = slot 24 */}

      {/* ── 24. Partenaires ───────────────────────────── Paul */}
      <PartenairesSection />

      {/* ── 25. Before · During · After ────────────────── Paul */}
      <BeforeDuringAfterSection />

      {/* ── 26. Real stories ───────────────────────────── Paul */}
      <StoriesSection />

      {/* ── 27. Events (Agenda) ────────────────────────── Paul */}
      <AgendaSection />

      {/* ── 28. FAQ · Dossier média · Guides ───────────── Paul */}
      <RessourcesSection />

      {/* ── Billets ─────────────────────────────────────── Paul */}
      <BilletsSection />
      <BilletsPartenairesSection />

      {/* ── 29. Carousel Articles ──────────────────────── FRANCK */}
      {/* FRANCK — Section 29 : carousel articles presse / blog */}

      {/* ── 30. Newsletter ────────────────────────────── Williams */}
      <NewsletterGateSection />

      {/* ── FOOTER ─────────────────────────────────────── Williams */}
      <FooterRevealZone />

      <div className="fixed bottom-12 right-6 z-50">
        <Button
          asChild
          className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold shadow-2xl px-6 py-6 rounded-xl uppercase text-xs tracking-wider"
        >
          <Link href="/inscription">S&apos;INSCRIRE →</Link>
        </Button>
      </div>
    </>
  );
}
