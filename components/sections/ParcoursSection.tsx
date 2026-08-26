import Image from "next/image";
import { Wordmark } from "@/components/parcours/Wordmark";
import { Reveal } from "@/components/Reveal";
import { StepsCarousel } from "@/components/parcours/StepsCarousel";
import { cn } from "@/lib/utils";

export function ParcoursSection() {
  return (
    <section id="parcours" className="relative overflow-hidden bg-grad-section px-[var(--page-gutter)] pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pt-16 lg:min-h-[140vh] lg:pt-20 lg:pb-5">
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <Reveal
          as="span"
          delay={0}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-play bg-white px-3 py-1.5 text-[0.75rem] font-medium text-brand-play sm:text-[0.8125rem]"
        >
          <span className="grid size-5 place-items-center rounded-full bg-brand-play text-white">
            <span className="ml-px size-0 border-y-[3.5px] border-l-[6px] border-y-transparent border-l-white" />
          </span>
          Le parcours Back2Mboa
        </Reveal>

        <div className="mt-6 flex flex-col items-start gap-4 sm:mt-7 sm:flex-row sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <h2
              className={cn(
                "font-sans font-bold tracking-[-0.25px] text-balance wrap-break-word",
                "text-[clamp(1.65rem,7.2vw,2.25rem)] leading-[1.15] md:text-display-large md:leading-[4rem]",
              )}
            >
              <Reveal as="span" delay={0.08} className="title-ink block">
                7 étapes.
              </Reveal>
              <Reveal as="span" delay={0.16} className="text-grad-result block">
                Jusqu&apos;au résultat.
              </Reveal>
              <Reveal as="span" delay={0.24} className="title-ink block">
                Pas jusqu&apos;à la poignée de main.
              </Reveal>
            </h2>

            <Reveal
              delay={0.32}
              className="mt-4 max-w-[38rem] text-pretty text-[0.875rem] leading-[1.65] text-brand-copy sm:mt-5 sm:text-[0.9375rem]"
              as="p"
            >
              Pendant que la plupart des initiatives s&apos;arrêtent à «
              Rencontrer », Back2Mboa accompagne chaque opportunité retenue
              jusqu&apos;à la structuration, au financement, à l&apos;exécution et au
              transfert.
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Wordmark className="hidden h-12 w-auto shrink-0 sm:block sm:h-[5.5rem] md:h-[7.5rem]" />
          </Reveal>
        </div>

        <div className="relative mt-8 md:mt-10 lg:mt-12 lg:pt-14">
          <StepsCarousel />

          <Reveal
            delay={0.72}
            className="pointer-events-none absolute top-[92%] left-[28.6%] hidden lg:block"
          >
            <Image
              src="/images/plane_icon.webp"
              width={137}
              height={171}
              alt=""
              className="h-[62px] w-auto rotate-[0deg] object-contain"
              aria-hidden="true"
            />
          </Reveal>

          <Reveal
            delay={0.88}
            x={-16}
            y={0}
            className="pointer-events-none absolute top-0 left-[40%] hidden h-[5.75rem] w-[24%] text-brand-yellow lg:block"
          >
            <svg
              viewBox="0 0 595 224"
              fill="none"
              className="size-full overflow-visible"
              aria-hidden="true"
            >
              <path
                d="M168 221C151.5 215 95.3 199 69 185C42.7 171 21.2 149.8 10 137C-1.2 124.2 1.2 118 2 108C2.8 98 2.3 89.2 15 77C27.7 64.8 54 45.7 78 35C102 24.3 125.8 18.7 159 13C192.2 7.3 231.3 1.8 277 1C322.7.2 381.5 2.3 433 8C484.5 13.7 560.5 30.5 586 35"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="18 10"
              />
            </svg>
          </Reveal>
          <Reveal
            delay={1.08}
            x={-20}
            y={8}
            duration={0.55}
            className="pointer-events-none absolute top-[12px] left-[61.5%] hidden lg:block"
          >
            <Image
              src="/images/fly_yellow.webp"
              width={77}
              height={64}
              alt=""
              className="h-[18px] w-auto rotate-[-5deg] object-contain"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </div>

      <Reveal
        delay={0.95}
        x={12}
        y={8}
        className="pointer-events-none absolute right-[3.5%] bottom-[10%] hidden text-[#155259] lg:block"
      >
        <svg
          viewBox="0 0 404 314"
          width={404}
          height={314}
          fill="none"
          className="h-[120px] w-auto overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M37.2 129C31.9 142.1 10.2 184 5.2 207.7C.2 231.4 4.8 257.6 7 271.1C9.2 284.6 10.3 282.6 18.3 288.9C26.4 295.2 35.1 306.9 55.3 308.9C75.5 310.9 112.7 308.4 139.5 300.7C166.3 293 189.8 280.6 216 262.5C242.2 244.4 273.1 218.3 296.8 192C320.5 165.8 341.1 135.9 358.2 105C375.3 74.1 392.6 22.9 399.5 6.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="12 9"
          />
        </svg>
      </Reveal>
      <Reveal
        delay={1.12}
        x={-10}
        y={6}
        className="pointer-events-none absolute right-[2.7%] bottom-[22.3%] hidden lg:block"
      >
        <Image
          src="/images/fly.webp"
          width={70}
          height={81}
          alt=""
          className="h-[22px] w-auto rotate-[5deg] object-contain"
          aria-hidden="true"
        />
      </Reveal>
    </section>
  );
}
