"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const TEXT_Y_HIDDEN = "100%";
const TEXT_Y_SHOWN = "0%";

export function MuseeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.38"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [TEXT_Y_HIDDEN, TEXT_Y_SHOWN]);

  return (
    <section
      ref={ref}
      id="musee"
      className="relative isolate z-10 overflow-visible"
      aria-label="Musée national"
    >
      <div className="pointer-events-none absolute bottom-full left-0 z-0 w-full">
        <Image
          src="/images/museum_floor-1920.webp"
          alt=""
          width={3840}
          height={1224}
          sizes="100vw"
          className="block h-auto w-full"
        />
        <motion.p
          style={{ y: reduce ? TEXT_Y_SHOWN : y }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto mb-15 max-w-[64rem] px-[var(--page-gutter)] text-center font-sans text-[clamp(1.2rem,3.8vw,3.0rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgb(0_0_0_/_0.5)]"
        >
          Nous ouvrons les voies, nous levons les obstacles, nous connectons les
          bonnes personnes, pour que la prospérité soit créée, captée, partagée
          et multipliée.
        </motion.p>
      </div>

      <Image
        src="/images/museum_-1920.webp"
        alt="Musée national du Cameroun"
        width={3840}
        height={946}
        sizes="100vw"
        className="relative z-20 block h-auto w-full"
      />
    </section>
  );
}
