"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { BATISSEURS_COPY } from "@/data/batisseurs";
import "./BatisseursSection.css";

function useCountUp(target: number, run: boolean, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);

  return value;
}

function MetricCell({
  numeric,
  suffix,
  label,
  run,
}: {
  numeric: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const n = useCountUp(numeric, run);
  const display =
    numeric >= 1000 ? `${n.toLocaleString("fr-FR")}${suffix}` : `${n}${suffix}`;

  return (
    <div className="bat-metric">
      <b>{display}</b>
      <span>{label}</span>
    </div>
  );
}

export function BatisseursSection() {
  const copy = BATISSEURS_COPY;
  const rootRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [activeProfile, setActiveProfile] = useState(0);
  const [paused, setPaused] = useState(false);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = window.setInterval(() => {
      setActiveProfile((i) => (i + 1) % copy.profiles.length);
    }, copy.autoplayMs);
    return () => window.clearInterval(id);
  }, [inView, paused, reduce, copy.autoplayMs, copy.profiles.length]);

  const onSubscribe = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  }, [email]);

  const heroCount = useCountUp(5, inView && !reduce, 900);

  return (
    <section
      ref={rootRef}
      className="b2m-bat"
      id="batisseurs"
      aria-labelledby="bat-snap-title"
    >
      {/* —— Snapshot KPIs —— */}
      <div className="bat-snap">
        <div className="bat-snap-inner">
          <div className="bat-snap-grid">
            <div className="bat-snap-left">
              <h2 id="bat-snap-title">{copy.snapTitle}</h2>
              <p>{copy.snapBody}</p>
              <p className="bat-note">{copy.snapNote}</p>
            </div>

            <div className="bat-card">
              <div className="bat-card-meta">
                <span>
                  <strong>Back2Mboa</strong> — trajectoire consolidée
                </span>
                <span>{copy.cardMeta}</span>
              </div>

              <p className="bat-hero-num" aria-label={`${copy.heroValue} ${copy.heroUnit}`}>
                <span className="bat-hero-value">{reduce || !inView ? copy.heroValue : heroCount}</span>
                <span className="bat-hero-unit">{copy.heroUnit}</span>
              </p>
              <p className="bat-hero-label">{copy.heroLabel}</p>

              <div className="bat-metrics">
                {copy.metrics.map((m) => (
                  <MetricCell
                    key={m.label}
                    numeric={m.numeric}
                    suffix={m.suffix}
                    label={m.label}
                    run={inView && !reduce}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* —— Team —— */}
      <div className="bat-team" id="preuves-equipe">
        <div className="bat-team-inner">
          <header className="bat-team-head">
            <p className="bat-eyebrow">{copy.teamEyebrow}</p>
            <h2>{copy.teamTitle}</h2>
            <p>{copy.teamLead}</p>
          </header>

          <div
            className="bat-dots"
            role="tablist"
            aria-label="Profils Bâtisseurs"
          >
            {copy.profiles.map((profile, i) => (
              <button
                key={profile.id}
                type="button"
                role="tab"
                aria-selected={i === activeProfile}
                aria-controls={`bat-profile-${profile.id}`}
                className={`bat-dot${i === activeProfile ? " is-active" : ""}`}
                onClick={() => {
                  setActiveProfile(i);
                  setPaused(true);
                }}
              >
                <span className="sr-only">{profile.name}</span>
              </button>
            ))}
          </div>

          <div className="bat-profiles" role="list">
            {copy.profiles.map((profile, i) => {
              const active = i === activeProfile;
              return (
                <article
                  key={profile.id}
                  id={`bat-profile-${profile.id}`}
                  role="listitem"
                  className={`bat-row${active ? " is-active" : ""}`}
                  aria-current={active ? "true" : undefined}
                  tabIndex={0}
                  onClick={() => setActiveProfile(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProfile(i);
                    }
                  }}
                  onMouseEnter={() => {
                    setPaused(true);
                    setActiveProfile(i);
                  }}
                  onMouseLeave={() => setPaused(false)}
                  onFocusCapture={() => {
                    setPaused(true);
                    setActiveProfile(i);
                  }}
                  onBlurCapture={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                      setPaused(false);
                    }
                  }}
                >
                  <div className="bat-row-lead">
                    <h3>{profile.name}</h3>
                    <p className="bat-role">{profile.role}</p>
                    <Link
                      className="bat-arrow"
                      href={profile.href}
                      aria-label={`En savoir plus — ${profile.name}`}
                    >
                      →
                    </Link>
                  </div>

                  <div className="bat-row-content">
                    <div className="bat-row-body">
                      <ul>
                        {profile.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bat-row-media">
                      <Image
                        src={profile.image}
                        alt={profile.imageAlt}
                        fill
                        sizes="(max-width: 900px) 100vw, 28vw"
                        className="bat-row-img"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* —— Quote + newsletter —— */}
          <div className="bat-quote">
            <Image
              src="/images/fly.webp"
              alt=""
              width={48}
              height={48}
              className="bat-plane is-a"
              aria-hidden="true"
            />
            <Image
              src="/images/fly_yellow.webp"
              alt=""
              width={40}
              height={40}
              className="bat-plane is-b"
              aria-hidden="true"
            />

            <blockquote>
              <p>{copy.quote}</p>
            </blockquote>

            <form className="bat-form" onSubmit={onSubscribe}>
              <label className="sr-only" htmlFor="bat-email">
                Email
              </label>
              <div className="bat-input-wrap">
                <span className="bat-mail" aria-hidden="true">
                  ✉
                </span>
                <input
                  id="bat-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={copy.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="bat-subscribe">
                {subscribed ? "Merci ✓" : copy.subscribeLabel}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
