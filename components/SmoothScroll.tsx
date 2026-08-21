"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const OPTIONS = {
  autoRaf: true,
  lerp: 0.08,
  anchors: true,
  allowNestedScroll: true,
};

export function SmoothScroll() {
  return <ReactLenis root options={OPTIONS} />;
}
