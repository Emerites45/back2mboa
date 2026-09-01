"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { STEPS } from "@/data/steps";
import { StepCard } from "@/components/parcours/StepCard";
import { Reveal, cardDelay } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const HINT_KEY = "b2m-steps-hint";
const GAP_PX = 12;

function useIsLg() {
  const [lg, setLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return lg;
}

export function StepsCarousel() {
  const lg = useIsLg();
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [hintGone, setHintGone] = useState(false);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || lg) return undefined;

    const sync = () => {
      const first = el.querySelector("li");
      if (!first) return;
      const step = first.getBoundingClientRect().width + GAP_PX;
      const index = Math.round(el.scrollLeft / step);
      setActive(Math.min(STEPS.length - 1, Math.max(0, index)));
      if (el.scrollLeft > 12) setHintGone(true);
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    return () => el.removeEventListener("scroll", sync);
  }, [lg]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || lg || reduce) return undefined;
    if (sessionStorage.getItem(HINT_KEY)) return undefined;

    const start = window.setTimeout(() => {
      el.scrollTo({ left: 28, behavior: "smooth" });
      window.setTimeout(() => {
        el.scrollTo({ left: 0, behavior: "smooth" });
        sessionStorage.setItem(HINT_KEY, "1");
      }, 420);
    }, 800);

    return () => window.clearTimeout(start);
  }, [lg, reduce]);

  const goTo = (index: number) => {
    const el = scrollerRef.current;
    const item = el?.querySelectorAll("li")[index];
    item?.scrollIntoView({
      inline: "start",
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <>
      <div className="relative">
        <ol
          ref={scrollerRef}
          aria-label="Les 7 étapes du parcours, faire défiler horizontalement"
          className="scrollbar-none flex list-none snap-x snap-mandatory items-start gap-3 overflow-x-auto overscroll-x-contain p-0 pb-3 [-webkit-overflow-scrolling:touch] lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0"
        >
          {STEPS.map((step) => (
            <Reveal
              key={step.n}
              as="li"
              delay={lg ? cardDelay(step.n) : 0.4}
              y={lg ? 16 : 10}
              duration={lg ? 0.5 : 0.3}
              className={`relative w-[min(70vw,15.5rem)] shrink-0 snap-start list-none lg:w-auto lg:min-w-0 ${step.n % 2 === 0 ? "lg:mt-12" : ""}`}
            >
              <StepCard step={step} />
            </Reveal>
          ))}
        </ol>

        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-brand-paper to-transparent transition-opacity duration-200 lg:hidden",
            hintGone ? "opacity-0" : "opacity-100",
          )}
          aria-hidden="true"
        />
      </div>

      <div
        className="mt-3 flex items-center justify-center gap-2 lg:hidden"
        role="group"
        aria-label="Pagination des étapes"
      >
        {STEPS.map((step, index) => (
          <button
            key={step.n}
            type="button"
            aria-label={`Étape ${step.n}, ${step.title}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
            className={cn(
              "size-2 rounded-full transition-transform duration-150",
              index === active ? "scale-125 bg-brand-ink" : "bg-brand-ink/25",
            )}
          />
        ))}
      </div>
    </>
  );
}
