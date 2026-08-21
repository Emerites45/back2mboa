import { NECESSITE_COPY } from "@/data/necessite";
import "./NecessiteSection.css";

export function NecessiteSection() {
  const { cards, impact, headers, rows } = NECESSITE_COPY;

  return (
    <section
      id="necessite"
      className="necessite"
      aria-labelledby="necessite-impact"
    >
      <div className="necessite-inner">
        <ul className="necessite-cards">
          {cards.map((card) => (
            <li key={card.title} className="necessite-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </li>
          ))}
        </ul>

        <p id="necessite-impact" className="necessite-impact">
          {impact}
        </p>
      </div>

      <div className="necessite-table-band">
        <div className="necessite-inner">
          <div className="necessite-table-wrap">
            <table className="necessite-table">
              <caption className="sr-only">
                Comparaison Back2Mboa, salons classiques et forums diaspora
              </caption>
              <thead>
                <tr>
                  <th scope="col">{headers.criterion}</th>
                  <th scope="col">{headers.salons}</th>
                  <th scope="col">{headers.forums}</th>
                  <th scope="col">{headers.back2mboa}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row">{row.criterion}</th>
                    <td>{row.salons}</td>
                    <td>{row.forums}</td>
                    <td>{row.back2mboa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
