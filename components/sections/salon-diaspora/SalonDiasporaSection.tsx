import Link from "next/link";
import { buildSceneSvg } from "@/lib/scene-svg";
import "./SalonDiasporaSection.css";

const CITY = buildSceneSvg("city", 301, "salon-city");
const MUSEUM = buildSceneSvg("museum", 302, "salon-mus");

export function SalonDiasporaSection() {
  return (
    <div className="b2m-salon">
      <section className="sec" id="salon">
        <div className="wrap">
          <div className="head rv in">
            <span className="eyebrow">Décembre 2026 — deux temps, deux directions</span>
            <h2>
              La prospérité circule <em>dans les deux sens</em>.
            </h2>
            <p>
              En décembre, les territoires vont d&apos;abord chercher ce que la diaspora a à
              offrir. Deux semaines plus tard, la diaspora vient chercher ce que les
              territoires ont à offrir. C&apos;est la même route, parcourue dans les deux
              directions.
            </p>

            <div className="duo">
              <div className="duo-side a">
                <div className="d-when">1er — 7 décembre · Europe</div>
                <div className="d-what">Les territoires vont vers la diaspora</div>
                <p>
                  Salon de la Diaspora, visites d&apos;entreprises et de ports, rendez-vous
                  d&apos;affaires.
                </p>
              </div>
              <div className="duo-mid">
                <span>⇄</span>Aller — retour
              </div>
              <div className="duo-side b">
                <div className="d-when">16 — 17 décembre · Yaoundé</div>
                <div className="d-what">La diaspora vient vers les territoires</div>
                <p>Musée National : Mayor Calls, Deal Rooms, ateliers sectoriels, signatures.</p>
              </div>
            </div>
          </div>

          <div className="row rv in" style={{ ["--acc" as string]: "var(--vert)" }}>
            <div className="shot">
              <div
                style={{ position: "absolute", inset: 0 }}
                dangerouslySetInnerHTML={{ __html: CITY }}
              />
              <div className="shot-veil" />
              <span className="shot-tag">◉ Europe — 1er au 7 décembre 2026</span>
            </div>
            <div>
              <span className="num">01</span>
              <div className="label">Le Salon de la Diaspora</div>
              <h3 className="bottomline">
                Une semaine en Europe. <em>Des engagements signés avant Yaoundé.</em>
              </h3>
              <p className="explain">
                Le Salon se tient le 4 décembre. Autour de lui, Back2Mboa construit une
                semaine entière, du 1er au 7 décembre. Les délégations territoriales ne
                viennent pas exposer : elles viennent conclure.
              </p>
              <div className="gains">
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Des deals fermés sur place</b> — les rendez-vous d&apos;affaires sont
                    pré-arrangés, pas improvisés sur un stand.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Des visites d&apos;entreprises et de ports</b> — vos équipes voient les
                    procédés et les infrastructures qu&apos;elles veulent répliquer.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Une visibilité auprès de la diaspora mobilisable</b> — celle qui
                    investit, pas celle qui commente.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Les mêmes interlocuteurs retrouvés à Yaoundé</b> — dix jours plus tard,
                    la conversation reprend où elle s&apos;est arrêtée.
                  </span>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Salon le 4 décembre</span>
                <span className="tag">Visites d&apos;entreprises</span>
                <span className="tag">Visites de ports</span>
                <span className="tag">Rendez-vous d&apos;affaires</span>
                <span className="tag">Délégations territoriales</span>
              </div>
            </div>
          </div>

          <div className="row rv in" style={{ ["--acc" as string]: "var(--terre)" }}>
            <div className="shot">
              <div
                style={{ position: "absolute", inset: 0 }}
                dangerouslySetInnerHTML={{ __html: MUSEUM }}
              />
              <div className="shot-veil" />
              <span className="shot-tag">◉ Octobre 2026 — en ligne et en présentiel</span>
            </div>
            <div>
              <span className="num">02</span>
              <div className="label">La Masterclass — en prélude</div>
              <h3 className="bottomline">
                Un territoire bien présenté <em>repart avec des rendez-vous</em>.
              </h3>
              <p className="explain">
                Deux mois avant le Salon, la Masterclass prépare les Décideurs et Intendants
                territoriaux. L&apos;objectif est simple : arriver en Europe avec un dossier
                qu&apos;un investisseur peut instruire, pas avec une intention.
              </p>
              <div className="gains">
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Un pitch de territoire en trois minutes</b> — chiffres, besoin, retour
                    attendu. Rien d&apos;autre.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Une fiche d&apos;opportunité par commune</b> — le format que les
                    Investisseurs et PTF acceptent de lire.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Un marketing territorial qui tient</b> — ce que la commune offre, pas ce
                    qui lui manque.
                  </span>
                </div>
                <div className="gain">
                  <i>✓</i>
                  <span>
                    <b>Des délégations prêtes</b> — celles qui n&apos;ont pas préparé perdent
                    leur semaine en Europe.
                  </span>
                </div>
              </div>
              <div className="tags">
                <span className="tag">Pitch en 3 minutes</span>
                <span className="tag">Fiches d&apos;opportunité</span>
                <span className="tag">Marketing territorial</span>
                <span className="tag">Préparation des délégations</span>
              </div>
            </div>
          </div>

          <div className="cta-block rv in" style={{ ["--acc" as string]: "var(--jaune)" }}>
            <span
              className="num"
              style={{
                background: "rgba(255,255,255,.1)",
                borderColor: "rgba(255,255,255,.24)",
                color: "#fff",
              }}
            >
              03
            </span>
            <div className="label">Pour les partenaires</div>
            <h3 className="bottomline">
              Le voyage en Europe est <em>désormais inclus dans votre pack</em>.
            </h3>
            <p className="explain">
              L&apos;accès au Salon de la Diaspora ne se vend plus séparément. Il entre dans
              les deux paliers hauts — déplacement, hébergement et participation pris en
              charge. Vous faites la semaine européenne avec les délégations, puis vous les
              retrouvez à Yaoundé.
            </p>

            <div className="packs">
              <div className="pack feat">
                <span className="pack-flag">2 places</span>
                <div className="pack-n">PROSPERITY PARTNER</div>
                <div className="pack-p">
                  24 900 000 <small>FCFA TTC</small>
                </div>
                <ul>
                  <li>
                    <b>Deux personnes prises en charge</b>, tous frais payés
                  </li>
                  <li>Salon de la Diaspora du 1er au 7 décembre</li>
                  <li>Visites d&apos;entreprises et de ports</li>
                  <li>Rendez-vous d&apos;affaires pré-arrangés</li>
                  <li>Puis les 16 et 17 décembre à Yaoundé</li>
                </ul>
              </div>
              <div className="pack">
                <span
                  className="pack-flag"
                  style={{ background: "rgba(255,255,255,.16)", color: "#fff" }}
                >
                  1 place
                </span>
                <div className="pack-n">VISION PARTNER</div>
                <div className="pack-p" style={{ color: "#fff" }}>
                  9 900 000 <small>FCFA TTC</small>
                </div>
                <ul>
                  <li>
                    <b>Une personne prise en charge</b>, tous frais payés
                  </li>
                  <li>Salon de la Diaspora du 1er au 7 décembre</li>
                  <li>Visites d&apos;entreprises et de ports</li>
                  <li>Exclusivité sur un secteur prioritaire</li>
                  <li>Puis les 16 et 17 décembre à Yaoundé</li>
                </ul>
              </div>
            </div>

            <div className="acts">
              <Link className="btn btn-1" href="#billets">
                Réserver ma place au Salon <span className="arw">→</span>
              </Link>
              <Link className="btn btn-2" href="#partenaires">
                Recevoir le dossier partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
