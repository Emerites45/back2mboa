"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { OPEN_ROAD_COPY } from "@/data/open-road";
import "./OpenRoadSection.css";

export function OpenRoadSection() {
  const [activeId, setActiveId] = useState(OPEN_ROAD_COPY.programs[0].id);
  const active = OPEN_ROAD_COPY.programs.find((p) => p.id === activeId) ?? OPEN_ROAD_COPY.programs[0];

  return (
    <section id="open-road" className="open-road" aria-labelledby="open-road-title">
      <Image
        className="open-road-photo"
        src="/images/open-road/femme.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className="open-road-vignette" aria-hidden="true" />
      <div className="open-road-fade" aria-hidden="true" />

      <div className="open-road-main">
        <h2 id="open-road-title">{active.title}</h2>
        <button type="button" className="open-road-watch">
          <Play size={14} fill="currentColor" aria-hidden="true" />
          <span>{OPEN_ROAD_COPY.watchLabel}</span>
          <span className="open-road-duration">{OPEN_ROAD_COPY.duration}</span>
        </button>
      </div>

      <nav className="open-road-bar" aria-label="Programmes">
        {OPEN_ROAD_COPY.programs.map((program) => {
          const selected = program.id === activeId;
          return (
            <button
              key={program.id}
              type="button"
              className={`open-road-item${selected ? " is-active" : ""}`}
              aria-current={selected ? "true" : undefined}
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
    </section>
  );
}
