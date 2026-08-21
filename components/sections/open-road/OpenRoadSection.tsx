"use client";

import { useState } from "react";
import Image from "next/image";
import { OPEN_ROAD_COPY } from "@/data/open-road";
import "./OpenRoadSection.css";

export function OpenRoadSection() {
  const [activeId, setActiveId] = useState(OPEN_ROAD_COPY.programs[0].id);
  const active =
    OPEN_ROAD_COPY.programs.find((program) => program.id === activeId) ??
    OPEN_ROAD_COPY.programs[0];

  return (
    <section id="open-road" className="open-road" aria-labelledby="open-road-title">
      <Image
        className="open-road-photo"
        src={OPEN_ROAD_COPY.image}
        alt=""
        fill
        sizes="100vw"
      />

      <p className="open-road-brand" aria-label={OPEN_ROAD_COPY.brand}>
        BACK <span>2</span> MBOA
      </p>

      <div className="open-road-footer">
        <div className="open-road-main">
          <h2 id="open-road-title" key={active.id} className="open-road-title">
            {active.title}
          </h2>
          <div className="open-road-actions">
            <button type="button" className="open-road-watch">
              <span className="open-road-play" aria-hidden="true" />
              <span>{OPEN_ROAD_COPY.watchLabel}</span>
            </button>
            <button type="button" className="open-road-viewall">
              {OPEN_ROAD_COPY.viewAll}
            </button>
          </div>
        </div>

        <nav className="open-road-bar" aria-label="Programmes">
          {OPEN_ROAD_COPY.programs.map((program) => {
            const selected = program.id === activeId;
            return (
              <button
                key={program.id}
                type="button"
                className={`open-road-item${selected ? " is-active" : ""}`}
                aria-pressed={selected}
                onClick={() => setActiveId(program.id)}
              >
                <span className="open-road-index">{program.index}</span>
                <span className="open-road-item-copy">
                  <span className="open-road-item-title">{program.title}</span>
                  <span className="open-road-item-schedule">{program.schedule}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
