"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATIC = {
  div: "div",
  span: "span",
  p: "p",
  li: "li",
} as const;

type RevealAs = keyof typeof STATIC;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  as?: RevealAs;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  x = 0,
  duration = 0.5,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Static = STATIC[as];
    return <Static className={className}>{children}</Static>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

export function cardDelay(n: number) {
  const wave = n % 2 === 1 ? (n - 1) / 2 : 4 + (n / 2 - 1);
  return 0.42 + wave * 0.055;
}
