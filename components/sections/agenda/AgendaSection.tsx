"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { AGENDA_COPY } from "@/data/agenda";
import "./AgendaSection.css";

export function AgendaSection() {
  const { kicker, ctaPrimary, ctaSecondary, events } = AGENDA_COPY;
  const [active, setActive] = useState(0);
  const event = events[active] ?? events[0];
  const total = events.length;
  const counter = `${event.index} / 0${total}`;

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + total) % total);
    },
    [total],
  );

  return (
    <section id="agenda" className="agenda" aria-labelledby="agenda-title">
      <span className="agenda-orb agenda-orb-a" aria-hidden="true" />
      <span className="agenda-orb agenda-orb-b" aria-hidden="true" />

      <div className="agenda-stage">
        <p className="agenda-kicker">{kicker}</p>
        <p className="agenda-counter" aria-live="polite">
          {counter}
          <span className="agenda-progress" style={{ ["--agenda-p" as string]: `${((active + 1) / total) * 100}%` }} />
        </p>

        <span className="agenda-badge">{event.badge}</span>

        <h2 id="agenda-title" key={event.id} className="agenda-title">
          {event.title}
          {event.titleAccent ? (
            <>
              <br />
              <em>{event.titleAccent}</em>
            </>
          ) : null}
        </h2>

        <ul className="agenda-meta">
          <li>
            <Calendar size={15} strokeWidth={1.75} aria-hidden="true" />
            <span>{event.date}</span>
          </li>
          {event.location ? (
            <li>
              <MapPin size={15} strokeWidth={1.75} aria-hidden="true" />
              <span>{event.location}</span>
            </li>
          ) : null}
        </ul>

        {event.body ? <p className="agenda-body">{event.body}</p> : null}

        <div className="agenda-cta">
          <Link href="/inscription" className="agenda-btn is-primary">
            {ctaPrimary}
          </Link>
          <button type="button" className="agenda-btn is-ghost">
            {ctaSecondary}
          </button>
        </div>

        <div className="agenda-nav" role="group" aria-label="Événements">
          <button type="button" onClick={() => go(-1)} aria-label="Événement précédent">
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Événement suivant">
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <nav className="agenda-tabs" aria-label="Agenda 2026">
        {events.map((item, i) => {
          const selected = i === active;
          return (
            <button
              key={item.id}
              type="button"
              className={`agenda-tab${selected ? " is-active" : ""}`}
              aria-pressed={selected}
              onClick={() => setActive(i)}
            >
              <span className={`agenda-thumb is-${item.thumb}`} aria-hidden="true">
                <span />
              </span>
              <span className="agenda-tab-copy">
                <small>{item.index}</small>
                <strong>{item.tabTitle}</strong>
                <span>{item.date}</span>
              </span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}
