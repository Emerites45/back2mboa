import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/** Typo section — taille, graisse, police. */
const TYPE = {
  titleFont: "var(--font-bricolage)",
  titleSize: "clamp(1.75rem, 4.4vw, 3.75rem)",
  titleWeight: 700,
  /** Style Figma Subtitle → Roboto (corps page). */
  subtitleFont: "var(--font-roboto)",
  subtitleSize: "1rem",
  subtitleWeight: 400,
  labelSize: "0.8125rem",
  labelWeight: 400,
  valueSize: "0.9375rem",
  valueWeight: 400,
} as const;

const STATS = [
  {
    label: "Mairies/CTD",
    value: "40 couvrant les 10 régions & 20 de 6 régions",
  },
  { label: "Entrepreneurs diaspora", value: "35 & 70" },
  { label: "Satisfaction CTD", value: "89 %" },
  { label: "Satisfaction entrepreneurs", value: "97 %" },
  { label: "Renforcement de capacité", value: "91 %" },
  { label: "Mises en relation", value: "60+" },
  { label: "Portée numérique", value: "60 000+" },
] as const;

function ResultatImage({
  src,
  alt,
  className,
  sizes,
  objectPosition = "center center",
}: {
  src: string;
  alt: string;
  className: string;
  sizes: string;
  objectPosition?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[#2a2a2a]", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={90}
        priority
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}

export function ResultatsSection() {
  return (
    <section
      id="resultats"
      className="relative z-10 h-dvh overflow-hidden rounded-t-[30px] bg-black"
      aria-labelledby="resultats-heading"
    >
      <Reveal className="grid h-full gap-2.5 p-2.5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <ResultatImage
          src="/images/resultat_1.webp"
          alt="Lauréat Meet Africa et partenaire collaborant sur un laptop lors d’une édition pilote"
          sizes="(min-width: 1024px) 52vw, 100vw"
          objectPosition="center 22%"
          className="h-full min-h-0 rounded-[30px]"
        />

        <div className="relative flex min-h-0 flex-col px-5 pt-6 pb-0 text-white sm:px-8 sm:pt-8 lg:px-10 lg:pt-10">
          <h2
            id="resultats-heading"
            className="tracking-[-0.03em] text-balance"
            style={{
              fontFamily: TYPE.titleFont,
              fontSize: TYPE.titleSize,
              fontWeight: TYPE.titleWeight,
            }}
          >
            Résultats Des Éditions Pilotes
          </h2>
          <p
            className="mt-3 text-pretty text-white/65"
            style={{
              fontFamily: TYPE.subtitleFont,
              fontSize: TYPE.subtitleSize,
              fontWeight: TYPE.subtitleWeight,
            }}
          >
            La preuve par les chiffres (2022 &amp; 2023)
          </p>

          <dl className="mt-8 flex max-w-[28rem] flex-col gap-4 lg:mt-10">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt
                  className="leading-snug text-white/55"
                  style={{
                    fontFamily: TYPE.subtitleFont,
                    fontSize: TYPE.labelSize,
                    fontWeight: TYPE.labelWeight,
                  }}
                >
                  {stat.label}
                </dt>
                <dd
                  className="mt-0.5 leading-snug text-pretty tabular-nums"
                  style={{
                    fontFamily: TYPE.subtitleFont,
                    fontSize: TYPE.valueSize,
                    fontWeight: TYPE.valueWeight,
                  }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="pointer-events-none absolute right-5 bottom-5 hidden sm:right-8 lg:right-10 lg:grid lg:w-[min(24rem,55%)] grid-cols-5 gap-4">
            {[
              { src: "/images/institutions/minrex.svg", alt: "MINREX" },
              { src: "/images/institutions/minddevel.svg", alt: "MINDDEVEL" },
              { src: "/images/institutions/apme.svg", alt: "APME" },
              { src: "/images/institutions/feicom.svg", alt: "FEICOM" },
              { src: "/images/institutions/carpa.svg", alt: "CARPA" },
              { src: "/images/institutions/cvuc.svg", alt: "CVUC" },
              { src: "/images/institutions/giz.svg", alt: "GIZ" },
              { src: "/images/institutions/afd.svg", alt: "AFD" },
              { src: "/images/institutions/ue.svg", alt: "UE" },
              { src: "/images/institutions/ccima.svg", alt: "CCIMA" },
            ].map((logo) => (
              <div
                key={logo.alt}
                className="flex h-10 items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={40}
                  className="h-7 w-auto max-w-full object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
