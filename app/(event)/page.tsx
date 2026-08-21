import { SmoothScroll } from '@/components/SmoothScroll';
import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactSection } from '@/components/sections/ImpactSection';
import { StoriesSection } from '@/components/sections/StoriesSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { ResultatsSection } from '@/components/sections/ResultatsSection';
import { PreuveChiffresSection } from '@/components/sections/PreuveChiffresSection';
import { LiaisonSection } from '@/components/sections/LiaisonSection';
import { MuseeSection } from '@/components/sections/MuseeSection';
import { TickerSection } from '@/components/sections/TickerSection';

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <HeroSection />
      <div className="bg-brand-paper text-brand-ink [font-family:var(--font-roboto),ui-sans-serif,sans-serif]">
        <ImpactSection />
        <StoriesSection />
        <ParcoursSection />
        <ResultatsSection />
        <PreuveChiffresSection />
        <LiaisonSection />
        <MuseeSection />
        <TickerSection />
      </div>
    </>
  );
}
