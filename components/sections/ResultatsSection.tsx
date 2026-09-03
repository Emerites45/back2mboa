import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const TYPE = {
  titleFont: "var(--font-bricolage)",
  titleSize: "clamp(1.5rem, 4.4vw, 3.75rem)",
  titleWeight: 700,
  titleLineHeight: 1.1,
  subtitleFont: "var(--font-roboto)",
  subtitleSize: "clamp(0.875rem, 1.5vw, 1rem)",
  subtitleWeight: 400,
  labelSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
  labelWeight: 400,
  valueSize: "clamp(0.875rem, 1.4vw, 1.0125rem)",
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

const PARTNER_LOGOS = [
  { src: "/images/institutions/minrex.webp", alt: "MINREX" },
  { src: "/images/institutions/minddevel.webp", alt: "MINDDEVEL" },
  { src: "/images/institutions/apme.webp", alt: "APME" },
  { src: "/images/institutions/feicom.webp", alt: "FEICOM" },
  { src: "/images/institutions/carpa.webp", alt: "CARPA" },
  { src: "/images/institutions/cvuc.webp", alt: "CVUC" },
  { src: "/images/institutions/ccima.webp", alt: "CCIMA" },
  { src: "/images/institutions/giz.webp", alt: "GIZ" },
  { src: "/images/institutions/afd.webp", alt: "AFD" },
  { src: "/images/institutions/ue.webp", alt: "UE" },
  { src: "/images/institutions/meetafrica.webp", alt: "MEET Africa" },
  { src: "/images/institutions/solutionneurs.webp", alt: "Solutionneurs" },
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
      className="relative z-10 h-auto overflow-hidden rounded-t-[30px] bg-black lg:h-dvh"
      aria-labelledby="resultats-heading"
    >
      <Reveal className="flex h-full flex-col gap-2.5 p-2.5 sm:p-3 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <ResultatImage
          src="/images/resultat_1.webp"
          alt="Lauréat Meet Africa et partenaire collaborant sur un laptop lors d'une édition pilote"
          sizes="(min-width: 1024px) 52vw, 100vw"
          objectPosition="center 22%"
          className="h-52 min-h-0 rounded-[20px] sm:h-64 lg:h-full lg:rounded-[30px]"
        />

        <div className="relative flex min-h-0 flex-col overflow-y-auto px-4 pt-5 pb-5 text-white sm:px-6 sm:pt-6 sm:pb-6 lg:px-10 lg:pt-10 lg:pb-8">
          <h2
            id="resultats-heading"
            className="text-balance tracking-[-0.03em]"
            style={{
              fontFamily: TYPE.titleFont,
              fontSize: TYPE.titleSize,
              fontWeight: TYPE.titleWeight,
              lineHeight: TYPE.titleLineHeight,
            }}
          >
            Résultats Des Éditions Pilotes
          </h2>
          <p
            className="mt-2 text-pretty text-white/65 sm:mt-3"
            style={{
              fontFamily: TYPE.subtitleFont,
              fontSize: TYPE.subtitleSize,
              fontWeight: TYPE.subtitleWeight,
            }}
          >
            La preuve par les chiffres (2022 &amp; 2023)
          </p>

          <dl className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3.5 sm:mt-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4 lg:mt-8">
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

          <div className="mt-auto pt-5 sm:pt-6">
            <p
              className="mb-2.5 text-white/40 sm:mb-3"
              style={{
                fontFamily: TYPE.subtitleFont,
                fontSize: "0.6875rem",
                fontWeight: TYPE.labelWeight,
              }}
            >
              Partenaires institutionnels
            </p>
            <div className="grid grid-cols-4 gap-x-3 gap-y-2.5 sm:grid-cols-6 sm:gap-x-4 sm:gap-y-3">
              {PARTNER_LOGOS.map((logo) => (
                <div
                  key={logo.alt}
                  className="group relative flex h-9 items-center justify-center sm:h-11"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={86}
                    height={43}
                    className="h-7 w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-110 sm:h-9"
                  />
                  <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs text-black opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
                    {logo.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
