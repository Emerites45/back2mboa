import Link from "next/link";
import { buildSceneSvg } from "@/lib/scene-svg";
import { BottomLinesWheel } from "./BottomLinesWheel";
import "./HeroLandingSection.css";

const HERO_BG = buildSceneSvg("hero", 77, "hero");

export function HeroLandingSection() {
  return (
    <div className="b2m-hero">
      <section className="hero" id="hero">
        <div
          className="bg"
          id="bg"
          dangerouslySetInnerHTML={{ __html: HERO_BG }}
        />
        <div className="veil" />

        <div className="grid">
          <div className="copy">
            <p className="kicker">
              Europe, 1–7 décembre · Yaoundé, 16–17 décembre 2026
            </p>

            <h1>
              Deux jours pour transformer un besoin en contrat signé.
            </h1>

            <p className="lede">
              Musée National du Cameroun. Six mairies championnes, 500
              décideurs. Vous repartez avec des protocoles, pas des cartes de
              visite.
            </p>

            <div className="acts" role="group" aria-label="Actions principales">
              <Link className="btn btn-1" href="/inscription">
                Demander une invitation
              </Link>
              <Link className="btn btn-2" href="#agenda">
                Voir le programme
              </Link>
            </div>
          </div>

          <BottomLinesWheel />
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
