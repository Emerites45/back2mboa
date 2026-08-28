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
import { LiaisonSection } from "@/components/sections/LiaisonSection";
import { MuseeSection } from "@/components/sections/MuseeSection";
import { TickerSection } from "@/components/sections/TickerSection";
import { ContrasteSection } from "@/components/sections/contraste/ContrasteSection";
import { ComparatifSection } from "@/components/sections/comparatif/ComparatifSection";
import { ModeleSection } from "@/components/sections/modele/ModeleSection";
import { MairiesChampionnesSection } from "@/components/sections/mairies-championnes/MairiesChampionnesSection";
import { PotentialitesSection } from "@/components/sections/potentialites/PotentialitesSection";
import { EcosystemeSection } from "@/components/sections/ecosysteme/EcosystemeSection";
import { PlateformeSection } from "@/components/sections/plateforme/PlateformeSection";
import { OpenRoadSection } from "@/components/sections/open-road/OpenRoadSection";
import { AgendaSection } from "@/components/sections/agenda/AgendaSection";
import { NecessiteSection } from "@/components/sections/necessite/NecessiteSection";
import { BonnePorteSection } from "@/components/sections/bonne-porte/BonnePorteSection";
import { BoulevardSection } from "@/components/sections/boulevard/BoulevardSection";
import { BeforeDuringAfterSection } from "@/components/sections/before-during-after/BeforeDuringAfterSection";
import { PreludeSection } from "@/components/sections/prelude/PreludeSection";
import { SalonDiasporaSection } from "@/components/sections/salon-diaspora/SalonDiasporaSection";
import { PreuvesPilotesSection } from "@/components/sections/preuves-pilotes/PreuvesPilotesSection";
import { BatisseursSection } from "@/components/sections/batisseurs/BatisseursSection";
import { PartenairesSection } from "@/components/sections/partenaires/PartenairesSection";
import { TerritorySection  } from "@/components/sections/territory-section";
import { BilletsSection, BilletsPartenairesSection } from "@/components/sections/billets/BilletsSection";
import { RessourcesSection } from "@/components/sections/ressources/RessourcesSection";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <HeroLandingSection />
      <TerritorySection />
    
      <BoulevardSection />
      <PotentialitesSection />
      <NecessiteSection />
      <PlateformeSection />
      <OpenRoadSection />
      <PreludeSection />
      {/* <ContrasteSection /> */}
      {/* <ComparatifSection /> */}
      <ImpactSection />
      {/* <BonnePorteSection /> */}
      {/* <MairiesChampionnesSection /> */}
      {/* <ModeleSection /> */}
      {/* <PotentialitesSection /> */} 
      {/* <NecessiteSection /> */}
      {/* <PlateformeSection /> */}
      {/* <OpenRoadSection /> */}
      <MethodeSection />
      <ParcoursSection />
      {/* <BeforeDuringAfterSection /> */}
      {/* <SalonDiasporaSection /> */}
      <ResultatsSection />
      <PreuveChiffresImpact />
      {/* <ImpactSection /> */}
      <PreludeSection />
      <LiaisonSection />
      <MuseeSection />
      {/* <PreuvesPilotesSection /> */}
      {/* <BatisseursSection /> */}
      {/* <EcosystemeSection /> */}
      <StoriesSection />
      <TickerSection />
      {/* <PartenairesSection /> */}
      <BoulevardSection />
      <HeroLandingSection />
      <AgendaSection />
      <BilletsSection />
      <BilletsPartenairesSection />
      {/* <RessourcesSection /> */}


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
