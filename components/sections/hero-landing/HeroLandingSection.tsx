import Link from "next/link";
import { buildSceneSvg } from "@/lib/scene-svg";
import { BottomLinesWheel } from "./BottomLinesWheel";
import "./HeroLandingSection.css";

const HERO_BG = buildSceneSvg("hero", 77, "hero");

export function HeroLandingSection() {
  return (
    <div className="b2m-hero">
      <section className="hero" id="hero" style={{ paddingTop: "5rem" }}>
        <div
          className="bg"
          id="bg"
          dangerouslySetInnerHTML={{ __html: HERO_BG }}
        />
        <div className="veil" />
        <div className="veil-b" />

        <div className="grid">
          <div>
            <div className="pill">
              <b>Salon de la Diaspora — 1er au 7 décembre, Europe</b>
              <Link href="#salon">
                Découvrir <span className="arw">→</span>
              </Link>
            </div>

            <h1>
              Deux jours pour transformer un besoin en <em>contrat signé</em>.
            </h1>

            <p className="lede">
              16 et 17 décembre 2026, Musée National du Cameroun, Yaoundé. Six
              mairies championnes présentent leurs Mayor Calls devant 500
              décideurs. Vous repartez avec des protocoles, pas des cartes de
              visite.
            </p>

            <div className="acts">
              <Link className="btn btn-1" href="/inscription">
                Demander une invitation
              </Link>
              <Link className="btn btn-2" href="#agenda">
                <span className="tri">▶</span> Voir le programme
              </Link>
            </div>
          </div>

          <div>
            <BottomLinesWheel />
          </div>
        </div>

        <div className="strip">
          <div>
            <b>500</b>
            <span>décideurs réunis</span>
          </div>
          <div>
            <b>6</b>
            <span>mairies championnes</span>
          </div>
          <div>
            <b>100</b>
            <span>entrepreneurs locaux</span>
          </div>
          <div>
            <b>30</b>
            <span>médias d&apos;influence</span>
          </div>
        </div>
      </section>
    </div>
  );
}
