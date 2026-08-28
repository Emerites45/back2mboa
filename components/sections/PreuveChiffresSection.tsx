import type { ReactNode } from "react";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const COLORS = {
  forest: "var(--color-dark-green)",
  jaune: "var(--color-brand-yellow)",
  aqua: "var(--color-brand-teal)",
  ink: "var(--color-text-white)",
} as const;

/** Typo — ajuster ici. */
const TYPE = {
  titleSize: "clamp(1.55rem, 2.6vw + 0.8vh, 2.5rem)",
  titleWeight: 700,
  titleFont: "var(--font-bricolage)",
  subtitleSize: "0.95rem",
  subtitleWeight: 400,
  subtitleFont: "var(--font-roboto)",
  tableHeadSize: "0.8rem",
  tableHeadWeight: 600,
  yearSize: "1.15rem",
  yearWeight: 700,
  rowLabelSize: "0.8rem",
  rowLabelWeight: 400,
  cellSize: "0.85rem",
  cellWeight: 400,
  valSize: "0.95rem",
  valWeight: 700,
} as const;

/** Section — 1 écran desktop, hauteur auto sous `md`. */
const SECTION = {
  paddingY: "clamp(0.85rem, 2.4vh, 1.75rem)",
  headerMaxWidth: "40rem",
  headerMargin: "clamp(0.85rem, 2vh, 1.5rem)",
  cellPadX: "1rem",
  cellPadY: "clamp(0.4rem, 1.1vh, 0.7rem)",
} as const;

/** Pastilles logo institutions. */
const LOGO = {
  size: 32,
  wide: 48,
  radius: "6px",
  pad: "4px",
  gap: "0.35rem",
} as const;

const INSTITUTIONS = {
  MINREX: {
    src: "/images/institutions/minrex.svg",
    label: "MINREX — Relations extérieures",
  },
  MINDDEVEL: {
    src: "/images/institutions/minddevel.svg",
    label: "MINDDEVEL — Développement local",
  },
  APME: {
    src: "/images/institutions/apme.svg",
    label: "APME — Promotion des PME",
  },
  FEICOM: {
    src: "/images/institutions/feicom.svg",
    label: "FEICOM — Financement des communes",
  },
  CARPA: {
    src: "/images/institutions/carpa.svg",
    label: "CARPA — Partenariats public-privé",
  },
  CVUC: {
    src: "/images/institutions/cvuc.svg",
    label: "CVUC — Communes et villes unies",
  },
  GIZ: {
    src: "/images/institutions/giz.svg",
    label: "GIZ — Coopération allemande",
    wide: true,
  },
  AFD: {
    src: "/images/institutions/afd.svg",
    label: "AFD — Agence française de développement",
    wide: true,
  },
  UE: {
    src: "/images/institutions/ue.svg",
    label: "Union européenne",
  },
  CCIMA: {
    src: "/images/institutions/ccima.svg",
    label: "CCIMA — Chambre de commerce",
  },
} as const;

type InstId = keyof typeof INSTITUTIONS;

const INST_2022 = [
  "MINREX",
  "MINDDEVEL",
  "APME",
  "FEICOM",
  "CARPA",
  "CVUC",
  "GIZ",
] as const satisfies readonly InstId[];

const INST_2023 = [
  "MINREX",
  "MINDDEVEL",
  "FEICOM",
  "AFD",
  "UE",
  "GIZ",
  "APME",
  "CCIMA",
] as const satisfies readonly InstId[];

type Cell =
  | { kind: "text"; strong: string; rest?: string }
  | { kind: "na" }
  | { kind: "tags"; tags: readonly InstId[] };

const ROWS: { label: string; y22: Cell; y23: Cell }[] = [
  {
    label: "Mairies / CTD",
    y22: { kind: "text", strong: "40", rest: " couvrant les 10 régions" },
    y23: { kind: "text", strong: "20", rest: " de 6 régions" },
  },
  {
    label: "Entrepreneurs diaspora",
    y22: { kind: "text", strong: "35" },
    y23: { kind: "text", strong: "70" },
  },
  {
    label: "Satisfaction CTD",
    y22: { kind: "text", strong: "89 %" },
    y23: { kind: "na" },
  },
  {
    label: "Satisfaction entrepreneurs",
    y22: { kind: "text", strong: "97 %" },
    y23: { kind: "na" },
  },
  {
    label: "Renforcement de capacité",
    y22: { kind: "text", strong: "91 %" },
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
    y23: { kind: "text", strong: "60 000+" },
  },
  {
    label: "Institutions",
    y22: { kind: "tags", tags: INST_2022 },
    y23: { kind: "tags", tags: INST_2023 },
  },
];

function Val({ strong, rest }: { strong: string; rest?: string }) {
  return (
    <>
      <span
        className="font-[family-name:var(--font-bricolage)] tabular-nums"
        style={{
          fontSize: TYPE.valSize,
          fontWeight: TYPE.valWeight,
          color: COLORS.ink,
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
    return (
      <span className="text-white/35" aria-label="Non mesuré">
        —
      </span>
    );
  }
  if (cell.kind === "tags") {
    return (
      <ul className="m-0 flex list-none flex-wrap p-0" style={{ gap: LOGO.gap }}>
        {cell.tags.map((id) => {
          const inst = INSTITUTIONS[id];
          const w = "wide" in inst && inst.wide ? LOGO.wide : LOGO.size;
          return (
            <li key={id}>
              <span
                className="inline-flex items-center justify-center bg-white"
                style={{
                  height: LOGO.size,
                  width: w,
                  borderRadius: LOGO.radius,
                  padding: LOGO.pad,
                }}
                title={inst.label}
              >
                <Image
                  src={inst.src}
                  alt={inst.label}
                  width={w}
                  height={LOGO.size}
                  unoptimized
                  className="h-full w-full object-contain"
                />
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
  return <Val strong={cell.strong} rest={cell.rest} />;
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td
      className="border-b border-white/15 align-top text-white/80"
      style={{
        fontSize: TYPE.cellSize,
        fontWeight: TYPE.cellWeight,
        padding: `${SECTION.cellPadY} ${SECTION.cellPadX}`,
      }}
    >
      {children}
    </td>
  );
}

function YearHead({
  edition,
  year,
  accent,
}: {
  edition: string;
  year: string;
  accent: string;
}) {
  return (
    <th
      scope="col"
      className="border-b border-white/20 text-left font-[family-name:var(--font-bricolage)] text-white/70"
      style={{
        fontSize: TYPE.tableHeadSize,
        fontWeight: TYPE.tableHeadWeight,
        padding: `${SECTION.cellPadY} ${SECTION.cellPadX}`,
      }}
    >
      {edition}
      <span
        className="mt-0.5 block tracking-[-0.03em]"
        style={{
          fontSize: TYPE.yearSize,
          fontWeight: TYPE.yearWeight,
          color: accent,
        }}
      >
        {year}
      </span>
    </th>
  );
}

function YearStack({
  edition,
  year,
  accent,
  cells,
}: {
  edition: string;
  year: string;
  accent: string;
  cells: "y22" | "y23";
}) {
  return (
    <section>
      <h3
        className="mb-3 font-[family-name:var(--font-bricolage)] tracking-[-0.03em]"
        style={{ color: accent, fontSize: TYPE.yearSize, fontWeight: TYPE.yearWeight }}
      >
        <span className="block text-[0.8rem] font-medium text-white/65">
          {edition}
        </span>
        {year}
      </h3>
      <dl className="m-0">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-3 border-t border-white/15 py-3"
          >
            <dt
              className="text-white/55"
              style={{
                fontFamily: TYPE.subtitleFont,
                fontSize: TYPE.rowLabelSize,
                fontWeight: TYPE.rowLabelWeight,
              }}
            >
              {row.label}
            </dt>
            <dd className="m-0 text-white/85">
              <CellContent cell={row[cells]} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function PreuveChiffresSection() {
  const cellPad = `${SECTION.cellPadY} ${SECTION.cellPadX}`;

  return (
    <section
      id="preuve-chiffres"
      className="flex h-auto min-h-dvh flex-col overflow-x-hidden px-[var(--page-gutter)] text-white/85 md:h-dvh md:overflow-hidden"
      style={{
        backgroundColor: COLORS.forest,
        paddingTop: SECTION.paddingY,
        paddingBottom: SECTION.paddingY,
      }}
      aria-labelledby="preuve-chiffres-heading"
    >
      <div className="mx-auto h-full min-h-0 w-full max-w-[1240px] overflow-y-auto">
        <Reveal y={0} className="flex min-h-full flex-col justify-center">
          <header
            className="shrink-0"
            style={{
              maxWidth: SECTION.headerMaxWidth,
              marginBottom: SECTION.headerMargin,
            }}
          >
            <h2
              id="preuve-chiffres-heading"
              className="mb-2 tracking-[-0.03em] text-balance text-white"
              style={{
                fontFamily: TYPE.titleFont,
                fontSize: TYPE.titleSize,
                fontWeight: TYPE.titleWeight,
                lineHeight: 1.07,
              }}
            >
              La preuve par les chiffres.
            </h2>
            <p
              className="max-w-[62ch] text-pretty text-white/70"
              style={{
                fontFamily: TYPE.subtitleFont,
                fontSize: TYPE.subtitleSize,
                fontWeight: TYPE.subtitleWeight,
              }}
            >
              Douala, 2022. Musée National de Yaoundé, 2023.
            </p>
          </header>

          <div className="flex flex-col gap-10 md:hidden">
            <YearStack
              edition="Meet Administrations"
              year="2022"
              accent={COLORS.aqua}
              cells="y22"
            />
            <YearStack
              edition="Meet Écosystème"
              year="2023"
              accent={COLORS.jaune}
              cells="y23"
            />
          </div>

          <div className="hidden min-w-0 md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparaison des éditions pilotes Meet Administrations 2022 et
                Meet Écosystème 2023
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="border-b border-white/20 font-[family-name:var(--font-bricolage)] text-white/70"
                    style={{
                      fontSize: TYPE.tableHeadSize,
                      fontWeight: TYPE.tableHeadWeight,
                      padding: cellPad,
                    }}
                  >
                    Indicateur
                  </th>
                  <YearHead
                    edition="Meet Administrations"
                    year="2022"
                    accent={COLORS.aqua}
                  />
                  <YearHead
                    edition="Meet Écosystème"
                    year="2023"
                    accent={COLORS.jaune}
                  />
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr
                    key={row.label}
                    className="[&:last-child>td]:border-b-0 [&:last-child>th]:border-b-0"
                  >
                    <th
                      scope="row"
                      className="w-[26%] border-b border-white/15 text-left align-top font-normal text-white/55"
                      style={{
                        fontFamily: TYPE.subtitleFont,
                        fontSize: TYPE.rowLabelSize,
                        fontWeight: TYPE.rowLabelWeight,
                        padding: cellPad,
                      }}
                    >
                      {row.label}
                    </th>
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
      </div>
    </section>
  );
}
