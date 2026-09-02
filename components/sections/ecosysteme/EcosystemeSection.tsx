import { ECOSYSTEME_COPY } from "@/data/ecosysteme";
import { EcosystemeHubDial } from "@/components/sections/ecosysteme/EcosystemeHubDial";
import { cn } from "@/lib/utils";

const SECTION = {
  /** Même cadre éditorial que Éditions pilotes */
  frame:
    "mx-auto flex w-full max-w-[min(100%,92rem)] flex-col gap-6 px-[clamp(1.35rem,5.5vw,4.75rem)]",
  paddingY: "py-[clamp(2.5rem,5vh,3.75rem)]",
} as const;

const TYPE = {
  titleFont: "var(--font-fraunces)",
  titleSize: "text-[clamp(2rem,4.2vw,3rem)]",
  bodyFont: "var(--font-inter)",
  bodySize: "text-[1.0625rem] lg:text-[1.125rem]",
} as const;

function EcosystemeCta({
  children,
  variant = "dark",
}: {
  children: string;
  variant?: "dark" | "light";
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-full border-[1.5px] px-5 py-2.5 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-[3px]",
        variant === "dark" &&
          "border-[#0a2b21] text-[#0a2b21] hover:bg-[#0a2b21] hover:text-white focus-visible:outline-[#0a2b21]",
        variant === "light" &&
          "border-white/90 text-white hover:bg-white hover:text-[#0a2b21] focus-visible:outline-white",
      )}
    >
      {children}
    </button>
  );
}

export function EcosystemeSection() {
  const copy = ECOSYSTEME_COPY;

  return (
    <section
      id="digital-twin"
      className={cn("bg-[#fbf7ef] text-[#0a2b21]", SECTION.paddingY)}
      aria-labelledby="ecosysteme-title"
      style={{ fontFamily: TYPE.bodyFont }}
    >
      <div className={SECTION.frame}>
        <h2
          id="ecosysteme-title"
          className="max-w-[min(100%,42rem)] text-[clamp(1.25rem,calc(2.6vw+0.85rem),3rem)] leading-[1.08] font-bold tracking-[-0.03em]"
          style={{ fontFamily: TYPE.titleFont }}
        >
          <span className="block md:whitespace-nowrap">
            {copy.titleBefore}
            {"\u00A0"}
            <span className="text-[#DCB700]">{copy.highlight}</span>
          </span>
          <span className="block md:whitespace-nowrap">{copy.titleAfter}</span>
        </h2>

        <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <div className="flex min-w-0 flex-col gap-6 lg:min-h-0">
            <div className={cn("space-y-4 leading-[1.65] text-[#5a6b63]", TYPE.bodySize)}>
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <article
              className="mt-auto rounded-[24px] bg-[#f0ebe1] p-5 lg:p-6"
              aria-labelledby="mayor-title"
            >
              <ul className="mb-4 flex flex-wrap gap-2 list-none p-0">
                {copy.mayorBullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-full border border-[#e3a73b]/50 bg-white/70 px-3 py-1 text-[0.75rem] font-medium leading-snug text-[#0a2b21]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
              <h3
                id="mayor-title"
                className="mb-2 text-base font-bold uppercase tracking-[0.06em]"
              >
                {copy.mayorTitle}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-[#5a6b63]">{copy.mayorBody}</p>
              <EcosystemeCta>{copy.mayorCta}</EcosystemeCta>
            </article>
          </div>

          <article
            className="flex w-full flex-col rounded-[28px] bg-[#DCB700] px-5 py-6 shadow-[0_20px_40px_-14px_rgba(10,43,33,0.28)]"
            aria-labelledby="twin-title"
          >
            <EcosystemeHubDial compact />
            <h3 id="twin-title" className="mb-2 text-base font-bold uppercase tracking-[0.08em]">
              {copy.twinTitle}
            </h3>
            <p className="mb-4 text-sm leading-snug text-[#0a2b21]/90">{copy.twinBody}</p>
            <EcosystemeCta>{copy.twinCta}</EcosystemeCta>
          </article>
        </div>
      </div>
    </section>
  );
}
