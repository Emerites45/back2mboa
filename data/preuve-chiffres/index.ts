import type { PreuveCopy } from "@/types/preuve-chiffres";

/** Copy extraite de 01_Preuve_Chiffres_2022_2023 1.png. Ne pas inventer. */
export const PREUVE_CHIFFRES_COPY: PreuveCopy = {
  kicker: "2.6 — Les résultats des éditions pilotes",
  title: "La preuve par les chiffres.",
  subtitle:
    "Deux éditions pilotes — Douala 2022, Musée National de Yaoundé 2023. Mesuré, pas estimé.",
  kpis: [
    { value: "97 %", label: "Satisfaction entrepreneurs" },
    { value: "89 %", label: "Satisfaction CTD" },
    { value: "60 000+", label: "Personnes touchées" },
    { value: "60+", label: "Mises en relation" },
  ],
  headers: {
    indicator: "Indicateur",
    edition2022: "Meet Administrations",
    year2022: "2022",
    edition2023: "Meet Écosystème",
    year2023: "2023",
  },
  rows: [
    {
      indicator: "Mairies / CTD",
      y2022: { value: "40", note: "couvrant les 10 régions" },
      y2023: { value: "20", note: "de 6 régions" },
    },
    {
      indicator: "Entrepreneurs diaspora",
      y2022: { value: "35" },
      y2023: { value: "70" },
    },
    {
      indicator: "Satisfaction CTD",
      y2022: { value: "89 %", tone: "teal" },
      y2023: { value: "—", tone: "muted" },
    },
    {
      indicator: "Satisfaction entrepreneurs",
      y2022: { value: "97 %", tone: "teal" },
      y2023: { value: "—", tone: "muted" },
    },
    {
      indicator: "Renforcement de capacité",
      y2022: { value: "91 %", tone: "teal" },
      y2023: { value: "—", tone: "muted" },
    },
    {
      indicator: "Mises en relation",
      y2022: { value: "60+", tone: "teal" },
      y2023: { value: "—", tone: "muted" },
    },
    {
      indicator: "Portée numérique",
      y2022: { value: "—", tone: "muted" },
      y2023: { value: "60 000+", tone: "gold" },
    },
    {
      indicator: "Institutions",
      y2022: {
        value: "",
        tags: ["MINREX", "MINDDEVEL", "APME", "FEICOM", "CARPA", "CVUC", "GIZ"],
      },
      y2023: {
        value: "",
        tags: ["MINREX", "MINDDEVEL", "FEICOM", "AFD", "UE", "GIZ", "APME", "CCIMA"],
      },
    },
  ],
  closing: "Ces chiffres ne sont pas des promesses.",
  closingAccent: "Ce sont des preuves.",
};
