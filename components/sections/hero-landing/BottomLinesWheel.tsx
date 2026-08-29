"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_LINES } from "@/data/hero-landing";

const N = HERO_LINES.length;
const TRIPLE = [...HERO_LINES, ...HERO_LINES, ...HERO_LINES];
const MOVE_MS = 750; // cadence du déplacement, un cran à la fois

function tickMs(el: HTMLElement | null): number {
  if (!el) return 2600;
  const v = parseInt(getComputedStyle(el).getPropertyValue("--tick"), 10);
  return Number.isFinite(v) && v > 0 ? v : 2600;
}

export function BottomLinesWheel() {
  const listRef = useRef<HTMLUListElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const ihRef = useRef(56);
  const animatingRef = useRef(false);
  const timerRef = useRef<number | null>(null);
  const unlockRef = useRef<number | null>(null);
  const [logical, setLogical] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useRef(false);

  const yFor = useCallback((logicalIdx: number) => {
    const centerIdx = N + logicalIdx;
    const wheelH = wheelRef.current?.clientHeight ?? 400;
    const ih = ihRef.current;
    return -(centerIdx * ih) + wheelH / 2 - ih / 2;
  }, []);

  const snap = useCallback(
    (withTransition: boolean, idx: number) => {
      const list = listRef.current;
      if (!list) return;
      list.style.willChange = withTransition ? "transform" : "auto";
      list.style.transition = withTransition ? `transform ${MOVE_MS}ms var(--ease)` : "none";
      list.style.transform = `translate3d(0, ${yFor(idx)}px, 0)`;
    },
    [yFor],
  );

  const measure = useCallback(() => {
    const list = listRef.current;
    const li = list?.querySelector("li");
    if (!list || !li) return;
    const fs = parseFloat(getComputedStyle(li).fontSize) || 18;
    ihRef.current = Math.round(fs * 2.2);
    list.style.setProperty("--ih", `${ihRef.current}px`);
    snap(false, indexRef.current);
  }, [snap]);

  const go = useCallback(
    (next: number, manual: boolean) => {
      if (animatingRef.current && !manual) return;
      const prev = indexRef.current;
      const i = ((next % N) + N) % N;
      if (i === prev) return;

      if (unlockRef.current) {
        window.clearTimeout(unlockRef.current);
        unlockRef.current = null;
      }

      indexRef.current = i;
      setLogical(i);
      const list = listRef.current;
      if (!list) return;
      animatingRef.current = true;
      list.style.willChange = "transform";

      const afterMove = (reset?: () => void) => {
        unlockRef.current = window.setTimeout(() => {
          reset?.();
          animatingRef.current = false;
          list.style.willChange = "auto";
          unlockRef.current = null;
        }, MOVE_MS);
      };

      if (prev === N - 1 && i === 0 && !manual) {
        list.style.transition = `transform ${MOVE_MS}ms var(--ease)`;
        list.style.transform = `translate3d(0, ${yFor(0) - N * ihRef.current}px, 0)`;
        afterMove(() => {
          list.style.transition = "none";
          list.style.transform = `translate3d(0, ${yFor(0)}px, 0)`;
          void list.offsetHeight;
        });
      } else if (manual && prev === 0 && i === N - 1) {
        list.style.transition = "none";
        list.style.transform = `translate3d(0, ${yFor(0) + N * ihRef.current}px, 0)`;
        void list.offsetHeight;
        list.style.transition = `transform ${MOVE_MS}ms var(--ease)`;
        list.style.transform = `translate3d(0, ${yFor(N - 1) + N * ihRef.current}px, 0)`;
        afterMove(() => {
          list.style.transition = "none";
          list.style.transform = `translate3d(0, ${yFor(N - 1)}px, 0)`;
          void list.offsetHeight;
        });
      } else {
        list.style.transition = `transform ${MOVE_MS}ms var(--ease)`;
        list.style.transform = `translate3d(0, ${yFor(i)}px, 0)`;
        afterMove();
      }
    },
    [yFor],
  );

  useEffect(() => {
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    measure();
    const onResize = () => {
      window.setTimeout(measure, 120);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  useEffect(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (reduceMotion.current || paused) return;

    const wait = tickMs(wheelRef.current);
    const loop = () => {
      timerRef.current = window.setTimeout(() => {
        go(indexRef.current + 1, false);
        loop();
      }, wait);
    };
    loop();

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [go, paused]);

  useEffect(
    () => () => {
      if (unlockRef.current) window.clearTimeout(unlockRef.current);
    },
    [],
  );

  return (
    <div className="stage">
      <div
        className="wheel"
        ref={wheelRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <ul ref={listRef}>
          {TRIPLE.map(([text, n], k) => {
            const absDist = Math.abs(k - (N + logical));
            return (
              <li key={`${text}-${k}`} className={absDist === 0 ? "on" : absDist === 1 ? "near" : ""}>
                <span className="mark" />
                <span className="txt">{text}</span>
                <span className="n">{n}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="dots" role="tablist" aria-label="Bottom lines">
        {HERO_LINES.map(([text], k) => (
          <button
            type="button"
            role="tab"
            key={text}
            className={k === logical ? "on" : undefined}
            aria-label={text}
            aria-selected={k === logical}
            onClick={() => go(k, true)}
          />
        ))}
      </div>
    </div>
  );
}
