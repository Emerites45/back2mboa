import type { CSSProperties } from "react";
import Link from "next/link";
import {
  BarChart2,
  ClipboardList,
  Droplet,
  FileText,
  Globe,
  Home,
  Landmark,
  LayoutGrid,
  LineChart,
  Mountain,
  Sprout,
  Zap,
} from "lucide-react";
import { ECOSYSTEME_COPY } from "@/data/ecosysteme";
import "./EcosystemeSection.css";

/** Sens horaire depuis le sommet — maquette orbit. */
const ORBIT_ICONS = [
  Landmark,
  Globe,
  LineChart,
  Sprout,
  Droplet,
  Zap,
  LayoutGrid,
  Home,
  Mountain,
  FileText,
] as const;

export function EcosystemeSection() {
  return (
    <section
      id="digital-twin"
      className="ecosysteme"
      aria-labelledby="ecosysteme-title"
    >
      <div className="ecosysteme-inner">
        <div className="ecosysteme-left">
          <p className="ecosysteme-kicker">
            <span className="ecosysteme-kicker-line" aria-hidden="true" />
            {ECOSYSTEME_COPY.kicker}
          </p>
          <h2 id="ecosysteme-title" className="ecosysteme-title">
            {ECOSYSTEME_COPY.titleLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
            <em>{ECOSYSTEME_COPY.highlight}</em>
            <br />
            {ECOSYSTEME_COPY.titleEnd}
          </h2>
          <p className="ecosysteme-lead">{ECOSYSTEME_COPY.paragraphs[0]}</p>
          <p className="ecosysteme-lead">{ECOSYSTEME_COPY.paragraphs[1]}</p>
        </div>

        <article className="ecosysteme-phone" aria-labelledby="twin-title">
          <div className="orbit-wrapper" aria-hidden="true">
            {/* Roue GPU-only : le parent tourne, le visage reverse pour rester droit. */}
            <div className="orbit">
              {ORBIT_ICONS.map((Icon, index) => (
                <div
                  key={index}
                  className="orbit-item"
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="orbit-spoke" />
                  <span className="orbit-face">
                    <span className="orbit-upright">
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                  </span>
                </div>
              ))}
            </div>
            <div className="central-card">
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none" aria-hidden="true">
                <path
                  d="M7 23 C13 23 18 10 25 9"
                  stroke="#F5F1E9"
                  strokeWidth="1.5"
                  strokeDasharray="2.4 2.2"
                  strokeLinecap="round"
                />
                <circle cx="7" cy="23" r="2.3" fill="#C94C3A" />
                <circle cx="16.5" cy="16.5" r="1.15" fill="#7CB89A" />
                <circle cx="25" cy="9" r="2.3" fill="#E3A73B" />
              </svg>
            </div>
          </div>
          <h3 id="twin-title">{ECOSYSTEME_COPY.twinTitle}</h3>
          <p>{ECOSYSTEME_COPY.twinBody}</p>
          <Link href="/potentialites" className="ecosysteme-btn">
            {ECOSYSTEME_COPY.twinCta}
          </Link>
        </article>

        <article className="ecosysteme-right" aria-labelledby="mayor-title">
          <div className="ecosysteme-minis">
            <div className="ecosysteme-mini">
              <span className="ecosysteme-mini-icon is-gold">
                <BarChart2 size={22} strokeWidth={1.75} />
              </span>
              <p>{ECOSYSTEME_COPY.capCard}</p>
            </div>
            <div className="ecosysteme-mini">
              <span className="ecosysteme-mini-icon is-dark">
                <ClipboardList size={20} strokeWidth={1.75} />
              </span>
              <p>{ECOSYSTEME_COPY.decidersCard}</p>
            </div>
          </div>
          <h3 id="mayor-title">{ECOSYSTEME_COPY.mayorTitle}</h3>
          <p>{ECOSYSTEME_COPY.mayorBody}</p>
          <Link href="#plateforme" className="ecosysteme-btn">
            {ECOSYSTEME_COPY.mayorCta}
          </Link>
        </article>
      </div>
    </section>
  );
}
