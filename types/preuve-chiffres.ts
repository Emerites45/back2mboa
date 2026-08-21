export type PreuveTone = "default" | "teal" | "gold" | "muted";

export type PreuveKpi = {
  value: string;
  label: string;
};

export type PreuveCell = {
  value: string;
  note?: string;
  tone?: PreuveTone;
  tags?: string[];
};

export type PreuveRow = {
  indicator: string;
  y2022: PreuveCell;
  y2023: PreuveCell;
};

export type PreuveCopy = {
  kicker: string;
  title: string;
  subtitle: string;
  kpis: [PreuveKpi, PreuveKpi, PreuveKpi, PreuveKpi];
  headers: {
    indicator: string;
    edition2022: string;
    year2022: string;
    edition2023: string;
    year2023: string;
  };
  rows: PreuveRow[];
  closing: string;
  closingAccent: string;
};
