"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import "lenis/dist/lenis.css";

const OPTIONS = {
  autoRaf: false,
  lerp: 0.08,
  anchors: true,
  allowNestedScroll: true,
};

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update({ timestamp }: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return <ReactLenis root options={OPTIONS} ref={lenisRef} />;
}
