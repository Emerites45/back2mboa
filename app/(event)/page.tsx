import Link from 'next/link';
import { SmoothScroll } from '@/components/SmoothScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { StoriesSection } from '@/components/sections/StoriesSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { ResultatsSection } from '@/components/sections/ResultatsSection';
import { PreuveChiffresSection as PreuveChiffresImpact } from '@/components/sections/PreuveChiffresSection';
import { LiaisonSection } from '@/components/sections/LiaisonSection';
import { MuseeSection } from '@/components/sections/MuseeSection';
import { TickerSection } from '@/components/sections/TickerSection';
import { ContrasteSection } from '@/components/sections/contraste/ContrasteSection';
import { ModeleSection } from '@/components/sections/modele/ModeleSection';
import { MairiesChampionnesSection } from '@/components/sections/mairies-championnes/MairiesChampionnesSection';
import { PotentialitesSection } from '@/components/sections/potentialites/PotentialitesSection';
import { EcosystemeSection } from '@/components/sections/ecosysteme/EcosystemeSection';
import { PlateformeSection } from '@/components/sections/plateforme/PlateformeSection';
import { OpenRoadSection } from '@/components/sections/open-road/OpenRoadSection';
import { PreuveChiffresSection } from '@/components/sections/preuve-chiffres/PreuveChiffresSection';
import { AgendaSection } from '@/components/sections/agenda/AgendaSection';
import { NecessiteSection } from '@/components/sections/necessite/NecessiteSection';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <ContrasteSection />
      <OpenRoadSection />
      <MairiesChampionnesSection />
      <ModeleSection />
      <PotentialitesSection />
      <NecessiteSection />
      <PlateformeSection />
      <OpenRoadSection />
      <ParcoursSection />
      <ImpactSection />
      <ResultatsSection />
      <PreuveChiffresImpact />
      <EcosystemeSection />
      <div className="bg-brand-paper text-brand-ink [font-family:var(--font-roboto),ui-sans-serif,sans-serif]">
        <StoriesSection />
        {/* <LiaisonSection />
        <MuseeSection /> */}
        <TickerSection />
      </div>
      {/* <PreuveChiffresSection /> */}
      <LiaisonSection />
      <MuseeSection />
      <AgendaSection />
      

      <div className="fixed bottom-12 right-6 z-50">
        <Button
          asChild
          className="bg-amber-400 hover:bg-amber-500 text-black font-extrabold shadow-2xl px-6 py-6 rounded-xl uppercase text-xs tracking-wider"
        >
          <Link href="/inscription">S'INSCRIRE →</Link>
        </Button>
      </div>
    </>
  );
}
