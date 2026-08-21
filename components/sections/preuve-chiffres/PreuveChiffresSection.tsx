import { PREUVE_CHIFFRES_COPY } from "@/data/preuve-chiffres";
import type { PreuveCell } from "@/types/preuve-chiffres";
import "./PreuveChiffresSection.css";

function CellContent({ cell }: { cell: PreuveCell }) {
  if (cell.tags?.length) {
    return (
      <ul className="preuve-tags">
        {cell.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  return (
    <span className={`preuve-val tone-${cell.tone ?? "default"}`}>
      {cell.value}
      {cell.note ? <small>{cell.note}</small> : null}
    </span>
  );
}

export function PreuveChiffresSection() {
  const copy = PREUVE_CHIFFRES_COPY;

  return (
    <section id="preuve-chiffres" className="preuve" aria-labelledby="preuve-title">
      <div className="preuve-inner">
        <header className="preuve-head">
          <p className="preuve-kicker">{copy.kicker}</p>
          <h2 id="preuve-title">{copy.title}</h2>
          <p className="preuve-sub">{copy.subtitle}</p>
        </header>

        <ul className="preuve-kpis">
          {copy.kpis.map((kpi) => (
            <li key={kpi.label}>
              <strong>{kpi.value}</strong>
              <span>{kpi.label}</span>
            </li>
          ))}
        </ul>

        <div className="preuve-table-wrap">
          <table className="preuve-table">
            <caption className="sr-only">
              Comparaison des éditions pilotes Meet Administrations 2022 et Meet
              Écosystème 2023
            </caption>
            <thead>
              <tr>
                <th scope="col">{copy.headers.indicator}</th>
                <th scope="col">
                  <span className="preuve-edition">{copy.headers.edition2022}</span>
                  <span className="preuve-year is-2022">{copy.headers.year2022}</span>
                </th>
                <th scope="col">
                  <span className="preuve-edition">{copy.headers.edition2023}</span>
                  <span className="preuve-year is-2023">{copy.headers.year2023}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {copy.rows.map((row) => (
                <tr key={row.indicator}>
                  <th scope="row">{row.indicator}</th>
                  <td>
                    <CellContent cell={row.y2022} />
                  </td>
                  <td>
                    <CellContent cell={row.y2023} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="preuve-close">
          {copy.closing} <strong>{copy.closingAccent}</strong>
        </p>
      </div>
    </section>
  );
}
