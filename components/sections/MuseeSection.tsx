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

const MUSEE_COPY =
  "Nous ouvrons les voies, nous levons les obstacles, nous connectons les bonnes personnes, pour que la prospérité soit créée, captée, partagée et multipliée.";

function toTitleCaseFr(value: string) {
  return value.replace(/\p{L}+/gu, (word) => {
    const lower = word.toLocaleLowerCase("fr-FR");
    return lower.charAt(0).toLocaleUpperCase("fr-FR") + lower.slice(1);
  });
}

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
      className="relative isolate z-10 overflow-hidden bg-[#061a14]"
      aria-label="Musée national"
    >
      {/* Sol + texte — dans le flux (plus de bottom-full qui chevauche la section précédente) */}
      <div className="relative w-full overflow-hidden">
        <Image
          src="/images/museum_floor-1920.webp"
          alt=""
          width={3840}
          height={1224}
          sizes="100vw"
          className="block h-auto w-full"
          priority={false}
        />
        <motion.p
          style={{ y: reduce ? TEXT_Y_SHOWN : y }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto mb-[clamp(0.85rem,3vw,3.75rem)] max-w-[64rem] px-[var(--page-gutter,1.25rem)] text-center font-sans text-[clamp(0.95rem,3.2vw,3rem)] font-bold leading-[1.25] tracking-[-0.02em] text-pretty text-white [text-shadow:0_2px_28px_rgb(0_0_0_/_0.5)]"
        >
          {toTitleCaseFr(MUSEE_COPY)}
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
