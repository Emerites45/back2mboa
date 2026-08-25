import Image from "next/image";
import Link from "next/link";
import "./PreludeSection.css";

export function PreludeSection() {
  return (
    <div className="b2m-prelude">
      <section className="prelude" id="prelude-mission">
        <div className="prelude-eyebrow">Prélude · Double flux 2026</div>
        <h2 className="prelude-title">Avant Yaoundé : former, capter, signer.</h2>
        <p className="prelude-sub">
          Masterclass d’octobre pour les mairies, puis mission et salon de la
          diaspora en décembre — le premier sens de la flèche : les territoires
          vont vers la diaspora.
        </p>

        <article className="block">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80"
              alt="Salon et networking diaspora"
              width={600}
              height={400}
            />
          </div>
          <div className="block-body">
            <div className="block-num">01</div>
            <h3>Salon de la Diaspora &amp; mission</h3>
            <p>
              Du <strong>1er au 7 décembre 2026</strong>, les territoires
              rencontrent la diaspora et les partenaires en Europe. Point
              d’orgue : le <strong>salon le 4 décembre</strong> — visibilité,
              deals, visites d’entreprises et d’infrastructures (ports, sites
              industriels).
            </p>
            <div className="tags">
              <span className="tag accent">1–7 décembre 2026</span>
              <span className="tag">Salon · 4 décembre</span>
              <span className="tag">Visites entreprises</span>
              <span className="tag">Ports &amp; sites</span>
              <span className="tag">B2G · Deals</span>
            </div>
          </div>
        </article>

        <article className="block reverse">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80"
              alt="Masterclass maires et équipes CTD"
              width={600}
              height={400}
            />
          </div>
          <div className="block-body">
            <div className="block-num">02</div>
            <h3>Masterclass CTD — octobre</h3>
            <p>
              En <strong>octobre 2026</strong>, masterclass pratique pour les
              maires et leurs équipes : attractivité territoriale, mobilisation
              diaspora / investisseurs, outils IA et numériques pour augmenter
              les recettes, cartes d’opportunités, pitch investisseur.
            </p>
            <div className="tags">
              <span className="tag accent">Octobre 2026</span>
              <span className="tag">Attractivité</span>
              <span className="tag">Recettes CTD</span>
              <span className="tag">Pitch investisseur</span>
              <span className="tag">Outils ready-to-use</span>
            </div>
          </div>
        </article>

        <article className="block block-cta">
          <div className="block-media">
            <Image
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=900&q=80"
              alt="Partenaires et sponsors"
              width={600}
              height={400}
            />
          </div>
          <div className="block-body">
            <div className="block-num">03</div>
            <h3>Partenaires : rejoignez le salon</h3>
            <p>
              L’accès au salon de la diaspora et à la mission est désormais
              inclus dans les packs sponsors. Visibilité, networking décideurs,
              démonstration terrain — tous frais de prise en charge selon le
              niveau.
            </p>
            <div className="packs">
              <div className="pack">
                <strong>Prosperity Partner</strong>
                <span>
                  Prise en charge de <b>2 personnes</b>, tous frais payés —
                  salon + activités mission.
                </span>
              </div>
              <div className="pack">
                <strong>Vision Partner</strong>
                <span>
                  Prise en charge d’<b>1 personne</b>, tous frais payés — salon
                  + activités mission.
                </span>
              </div>
            </div>
            <div>
              <Link className="btn-jaune" href="#billets">
                Voir les packs partenaires
              </Link>
              <Link className="btn-ghost" href="#partenaires">
                Nous contacter
              </Link>
            </div>
          </div>
        </article>

        <div className="prelude-foot">
          <span>
            <strong>Masterclass</strong> · octobre 2026
          </span>
          <span>
            <strong>Mission / salon</strong> · 1–7 déc. (salon 4 déc.)
          </span>
          <span>
            <strong>Back2Mboa</strong> · 16–17 déc. · Musée National, Yaoundé
          </span>
        </div>
      </section>
    </div>
  );
}
