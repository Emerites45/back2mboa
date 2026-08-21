import Link from 'next/link';
import { SmoothScroll } from '@/components/SmoothScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { LiaisonSection } from '@/components/sections/LiaisonSection';
import { MuseeSection } from '@/components/sections/MuseeSection';
import { TickerSection } from '@/components/sections/TickerSection';
import { ContrasteSection } from '@/components/sections/contraste/ContrasteSection';
import { ModeleSection } from '@/components/sections/modele/ModeleSection';
import { PotentialitesSection } from '@/components/sections/potentialites/PotentialitesSection';
import { EcosystemeSection } from '@/components/sections/ecosysteme/EcosystemeSection';
import { PlateformeSection } from '@/components/sections/plateforme/PlateformeSection';
import { OpenRoadSection } from '@/components/sections/open-road/OpenRoadSection';
import { NecessiteSection } from '@/components/sections/necessite/NecessiteSection';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <div className="bg-brand-paper text-brand-ink [font-family:var(--font-roboto),ui-sans-serif,sans-serif]">
        <ParcoursSection />
        <LiaisonSection />
        <MuseeSection />
        <TickerSection />
      </div>
      <ContrasteSection />
      <ModeleSection />
      <PotentialitesSection />
      <EcosystemeSection />
      <PlateformeSection />
      <OpenRoadSection />
      <NecessiteSection />

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
