import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

const COLORS = {
  forest: "#0A2B21",
  jaune: "#FFD506",
  aqua: "#00C2A8",
} as const;

/** Typo — ajuster ici. */
const TYPE = {
  eyebrowSize: "0.68rem",
  eyebrowWeight: 600,
  titleSize: "clamp(1.9rem, 3.9vw, 3rem)",
  titleWeight: 700,
  titleFont: "var(--font-bricolage)",
  subtitleSize: "1.02rem",
  subtitleWeight: 400,
  subtitleFont: "var(--font-roboto)",
  statSize: "clamp(1.9rem, 4vw, 3rem)",
  statWeight: 700,
  statLabelSize: "0.78rem",
  statLabelWeight: 400,
  tableHeadSize: "0.75rem",
  tableHeadWeight: 700,
  yearSize: "1.28rem",
  yearWeight: 700,
  rowLabelSize: "0.8rem",
  rowLabelWeight: 400,
  cellSize: "0.92rem",
  cellWeight: 400,
  valSize: "1.02rem",
  valWeight: 700,
  punchSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
  punchWeight: 700,
} as const;

/** Carte tableau — position, arrondi, taille. */
const TABLE_CARD = {
  maxWidth: "100%",
  borderRadius: "18px",
  offsetX: "0px",
  offsetY: "0px",
} as const;

const HERO_STATS = [
  { value: "97 %", label: "Satisfaction entrepreneurs" },
  { value: "89 %", label: "Satisfaction CTD" },
  { value: "60 000+", label: "Personnes touchées" },
  { value: "60+", label: "Mises en relation" },
] as const;

const INST_2022 = [
  "MINREX",
  "MINDDEVEL",
  "APME",
  "FEICOM",
  "CARPA",
  "CVUC",
  "GIZ",
] as const;

const INST_2023 = [
  "MINREX",
  "MINDDEVEL",
  "FEICOM",
  "AFD",
  "UE",
  "GIZ",
  "APME",
  "CCIMA",
] as const;

type Cell =
  | { kind: "text"; strong: string; rest?: string; tone?: "aqua" | "jaune" }
  | { kind: "na" }
  | { kind: "tags"; tags: readonly string[] };

const ROWS: { label: string; y22: Cell; y23: Cell }[] = [
  {
    label: "Mairies / CTD",
    y22: { kind: "text", strong: "40", rest: " couvrant les 10 régions" },
    y23: { kind: "text", strong: "20", rest: " de 6 régions" },
  },
  {
    label: "Entrepreneurs diaspora",
    y22: { kind: "text", strong: "35" },
    y23: { kind: "text", strong: "70", tone: "jaune" },
  },
  {
    label: "Satisfaction CTD",
    y22: { kind: "text", strong: "89 %", tone: "aqua" },
    y23: { kind: "na" },
  },
  {
    label: "Satisfaction entrepreneurs",
    y22: { kind: "text", strong: "97 %", tone: "aqua" },
    y23: { kind: "na" },
  },
  {
    label: "Renforcement de capacité",
    y22: { kind: "text", strong: "91 %", tone: "aqua" },
    y23: { kind: "na" },
  },
  {
    label: "Mises en relation",
    y22: { kind: "text", strong: "60+" },
    y23: { kind: "na" },
  },
  {
    label: "Portée numérique",
    y22: { kind: "na" },
    y23: { kind: "text", strong: "60 000+", tone: "jaune" },
  },
  {
    label: "Institutions",
    y22: { kind: "tags", tags: INST_2022 },
    y23: { kind: "tags", tags: INST_2023 },
  },
];

function Val({
  strong,
  rest,
  tone,
}: {
  strong: string;
  rest?: string;
  tone?: "aqua" | "jaune";
}) {
  const color =
    tone === "aqua" ? COLORS.aqua : tone === "jaune" ? COLORS.jaune : "#fff";
  return (
    <>
      <span
        className="font-[family-name:var(--font-bricolage)]"
        style={{
          fontSize: TYPE.valSize,
          fontWeight: TYPE.valWeight,
          color,
        }}
      >
        {strong}
      </span>
      {rest ? (
        <span style={{ fontSize: TYPE.cellSize, fontWeight: TYPE.cellWeight }}>
          {rest}
        </span>
      ) : null}
    </>
  );
}

function CellContent({ cell }: { cell: Cell }) {
  if (cell.kind === "na") {
    return <span className="text-white/30">—</span>;
  }
  if (cell.kind === "tags") {
    return (
      <div className="flex flex-wrap gap-1.5">
        {cell.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-[family-name:var(--font-ibm-plex-mono)] text-[0.68rem] whitespace-nowrap text-white/80"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }
  return <Val strong={cell.strong} rest={cell.rest} tone={cell.tone} />;
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td
      className="border-b border-white/12 px-[18px] py-[15px] align-top text-white/80"
      style={{ fontSize: TYPE.cellSize, fontWeight: TYPE.cellWeight }}
    >
      {children}
    </td>
  );
}

export function PreuveChiffresSection() {
  return (
    <section
      id="preuve-chiffres"
      className="px-[var(--page-gutter)] py-[clamp(3.5rem,7vw,6.875rem)] text-white/85"
      style={{ backgroundColor: COLORS.forest }}
      aria-labelledby="preuve-chiffres-heading"
    >
      <div className="mx-auto max-w-[1240px]">
        <header className="mb-[clamp(2rem,4vw,3.25rem)] max-w-[760px]">
          <Reveal as="span" className="mb-4 inline-flex items-center gap-2.5">
            <span
              className="inline-flex items-center gap-2.5 font-[family-name:var(--font-ibm-plex-mono)] tracking-[0.18em] uppercase"
              style={{
                fontSize: TYPE.eyebrowSize,
                fontWeight: TYPE.eyebrowWeight,
                color: COLORS.jaune,
              }}
            >
              <span
                className="inline-block h-[1.5px] w-[26px] bg-current"
                aria-hidden
              />
              2.6 — Les résultats des éditions pilotes
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              id="preuve-chiffres-heading"
              className="mb-3.5 tracking-[-0.03em] text-balance text-white"
              style={{
                fontFamily: TYPE.titleFont,
                fontSize: TYPE.titleSize,
                fontWeight: TYPE.titleWeight,
                lineHeight: 1.07,
              }}
            >
              La preuve{" "}
              <em className="not-italic" style={{ color: COLORS.jaune }}>
                par les chiffres
              </em>
              .
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="max-w-[62ch] text-pretty text-white/70"
              style={{
                fontFamily: TYPE.subtitleFont,
                fontSize: TYPE.subtitleSize,
                fontWeight: TYPE.subtitleWeight,
              }}
            >
              Deux éditions pilotes, en 2022 à Douala et en 2023 au Musée
              National de Yaoundé. Voici ce qu&apos;elles ont produit — mesuré,
              pas estimé.
            </p>
          </Reveal>
        </header>

        <Reveal
          delay={0.1}
          className="mb-[clamp(1.875rem,3.6vw,2.875rem)] grid grid-cols-2 gap-[clamp(0.875rem,2vw,1.625rem)] md:grid-cols-4"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="border-t-2 border-white/20 pt-[18px]"
            >
              <p
                className="font-[family-name:var(--font-bricolage)] leading-none tracking-[-0.04em] tabular-nums"
                style={{
                  fontSize: TYPE.statSize,
                  fontWeight: TYPE.statWeight,
                  color: COLORS.jaune,
                }}
              >
                {stat.value}
              </p>
              <p
                className="mt-2.5 uppercase tracking-[0.06em] text-white/60"
                style={{
                  fontSize: TYPE.statLabelSize,
                  fontWeight: TYPE.statLabelWeight,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.16}>
          <div
            className="overflow-x-auto border border-white/15 bg-white/[0.04]"
            style={
              {
                maxWidth: TABLE_CARD.maxWidth,
                borderRadius: TABLE_CARD.borderRadius,
                transform: `translate(${TABLE_CARD.offsetX}, ${TABLE_CARD.offsetY})`,
              } as CSSProperties
            }
          >
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead>
                <tr className="bg-white/[0.07]">
                  <th
                    className="px-[18px] py-[15px] font-[family-name:var(--font-bricolage)] tracking-[0.08em] text-white uppercase"
                    style={{
                      fontSize: TYPE.tableHeadSize,
                      fontWeight: TYPE.tableHeadWeight,
                    }}
                  >
                    Indicateur
                  </th>
                  <th
                    className="px-[18px] py-[15px] font-[family-name:var(--font-bricolage)] tracking-[0.08em] text-white uppercase"
                    style={{
                      fontSize: TYPE.tableHeadSize,
                      fontWeight: TYPE.tableHeadWeight,
                    }}
                  >
                    MEET Administrations
                    <span
                      className="mt-1 block tracking-[-0.03em] normal-case"
                      style={{
                        fontSize: TYPE.yearSize,
                        fontWeight: TYPE.yearWeight,
                        color: COLORS.aqua,
                      }}
                    >
                      2022
                    </span>
                  </th>
                  <th
                    className="px-[18px] py-[15px] font-[family-name:var(--font-bricolage)] tracking-[0.08em] text-white uppercase"
                    style={{
                      fontSize: TYPE.tableHeadSize,
                      fontWeight: TYPE.tableHeadWeight,
                    }}
                  >
                    MEET Écosystème
                    <span
                      className="mt-1 block tracking-[-0.03em] normal-case"
                      style={{
                        fontSize: TYPE.yearSize,
                        fontWeight: TYPE.yearWeight,
                        color: COLORS.jaune,
                      }}
                    >
                      2023
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="hover:bg-white/[0.04] [&:last-child>td]:border-b-0"
                  >
                    <td
                      className="w-[26%] border-b border-white/12 px-[18px] py-[15px] align-top font-[family-name:var(--font-ibm-plex-mono)] text-white/60"
                      style={{
                        fontSize: TYPE.rowLabelSize,
                        fontWeight: TYPE.rowLabelWeight,
                      }}
                    >
                      {row.label}
                    </td>
                    <Td>
                      <CellContent cell={row.y22} />
                    </Td>
                    <Td>
                      <CellContent cell={row.y23} />
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

          <Reveal delay={0.22}>
            <p
              className="mt-[clamp(1.5rem,3vw,2.25rem)] text-center tracking-[-0.03em] text-balance text-white"
              style={{
                fontFamily: TYPE.titleFont,
                fontSize: TYPE.punchSize,
                fontWeight: TYPE.punchWeight,
              }}
            >
              Ces chiffres ne sont pas des promesses.{" "}
              <em className="not-italic" style={{ color: COLORS.jaune }}>
                Ce sont des preuves.
              </em>
            </p>
          </Reveal>
      </div>
    </section>
  );
}
