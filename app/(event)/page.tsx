import Link from "next/link";
import { SmoothScroll } from "@/components/SmoothScroll";
import { HeroSection } from "@/components/sections/HeroSection";
import { HeroLandingSection } from "@/components/sections/hero-landing/HeroLandingSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { StoriesSection } from "@/components/sections/StoriesSection";
import { MethodeSection } from "@/components/sections/methode/MethodeSection";
import { ParcoursSection } from "@/components/sections/ParcoursSection";
import { ResultatsSection } from "@/components/sections/ResultatsSection";
import { PreuveChiffresSection as PreuveChiffresImpact } from "@/components/sections/PreuveChiffresSection";
import { PreuvesPilotesSection } from "@/components/sections/preuves-pilotes/PreuvesPilotesSection";
import { EditionsPilotesSection } from "@/components/sections/editions-pilotes/EditionsPilotesSection";
import { BatisseursSection } from "@/components/sections/batisseurs/BatisseursSection";
import { TeamSection } from "@/components/sections/team/TeamSection";
import { LiaisonSection } from "@/components/sections/LiaisonSection";
import { MuseeSection } from "@/components/sections/MuseeSection";
import { TickerSection } from "@/components/sections/TickerSection";
import { ContrasteSection } from "@/components/sections/contraste/ContrasteSection";
import { ComparatifSection } from "@/components/sections/comparatif/ComparatifSection";
import { PourquoiSection } from "@/components/sections/pourquoi/PourquoiSection";
import { ModeleSection } from "@/components/sections/modele/ModeleSection";
import { MairiesChampionnesSection } from "@/components/sections/mairies-championnes/MairiesChampionnesSection";
import { PotentialitesSection } from "@/components/sections/potentialites/PotentialitesSection";
import { EcosystemeSection } from "@/components/sections/ecosysteme/EcosystemeSection";
import { PlateformeSection } from "@/components/sections/plateforme/PlateformeSection";
import { OpenRoadSection } from "@/components/sections/open-road/OpenRoadSection";
import { HomecomingSection } from "@/components/sections/homecoming/HomecomingSection";
import { AgendaSection } from "@/components/sections/agenda/AgendaSection";
import { NecessiteSection } from "@/components/sections/necessite/NecessiteSection";
import { BonnePorteSection } from "@/components/sections/bonne-porte/BonnePorteSection";
import { BoulevardSection } from "@/components/sections/boulevard/BoulevardSection";
import { PreludeSection } from "@/components/sections/prelude/PreludeSection";
import { BeforeDuringAfterSection } from "@/components/sections/before-during-after/BeforeDuringAfterSection";
import { PartenairesSection } from "@/components/sections/partenaires/PartenairesSection";
import {
  BilletsSection,
  BilletsPartenairesSection,
} from "@/components/sections/billets/BilletsSection";
import { RessourcesSection } from "@/components/sections/ressources/RessourcesSection";
import { NewsletterGateSection } from "@/components/sections/newsletter-gate/NewsletterGateSection";
import { FooterRevealZone } from "@/components/sections/footer/FooterRevealZone";
import { Button } from "@/components/ui/button";

/**
 * Assemblage landing — Paul-Alain (haut) × Williams (bas).
 *
 * Haut : parcours Paul-Alain (versions finales).
 * Bas : blocs signature Williams (Preuves, Comparatif, Team, Gate, Footer).
 *
 * Note intégration : Bonne Porte + Écosystème restent dans le parcours haut
 * mais utilisent le code retravaillé Williams (restauré depuis a1edd76).
 */
export default function HomePage() {
  return (
    <>
      <SmoothScroll />

      {/* ═══════════════════════════════════════════════
          PAUL-ALAIN — parcours final (toutes sections)
          ═══════════════════════════════════════════════ */}
      <HeroSection />
      <ContrasteSection />
      <PourquoiSection />
      <OpenRoadSection />
      <MairiesChampionnesSection />
      <ModeleSection />
      <PotentialitesSection />
      <NecessiteSection />
      <PlateformeSection />
      <ImpactSection />
      <BonnePorteSection />
      <BeforeDuringAfterSection />
      <MethodeSection />
      <ParcoursSection />
      <ResultatsSection />
      <PreuveChiffresImpact />
      <BatisseursSection />
      <EditionsPilotesSection />
      <HomecomingSection />
      <PreludeSection />
      <LiaisonSection />
      <MuseeSection />
      <EcosystemeSection />
      <StoriesSection />
      <TickerSection />
      <BoulevardSection />
      <HeroLandingSection />
      <AgendaSection />
      <PartenairesSection />
      <RessourcesSection />
      <BilletsSection />
      <BilletsPartenairesSection />

      {/* ═══════════════════════════════════════════════
          WILLIAMS — sections signature
          ═══════════════════════════════════════════════ */}
      <PreuvesPilotesSection />
      <ComparatifSection />
      <TeamSection />
      <NewsletterGateSection />
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
