import { HeroSection } from '@/components/sections/HeroSection';
import { ParcoursSection } from '@/components/sections/ParcoursSection';
import { LiaisonSection } from '@/components/sections/LiaisonSection';
import { MuseeSection } from '@/components/sections/MuseeSection';
import { TickerSection } from '@/components/sections/TickerSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="bg-brand-paper text-brand-ink [font-family:var(--font-roboto),ui-sans-serif,sans-serif]">
        <ParcoursSection />
        <LiaisonSection />
        <MuseeSection />
        <TickerSection />
      </div>
    </>
  );
}
