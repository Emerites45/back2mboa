import type { CSSProperties } from "react";
import Image from "next/image";
import { FOOTER_BANNER } from "@/data/footer-banner";

/** Section — bandeau sous footer. */
const SECTION = {
  bg: "#1a1a1a",
  height: "30vh",
} as const;

/**
 * Wordmark — logo coloré centré.
 * `offsetX` / `offsetY` : décalage fin depuis le centre.
 */
const WORDMARK = {
  maxWidth: "min(88vw, 22rem)",
  sizes: "min(88vw, 22rem)",
  offsetX: "0",
  offsetY: "0",
} as const;

const bannerCssVars = {
  "--footer-wordmark-max-w": WORDMARK.maxWidth,
  "--footer-wordmark-offset-x": WORDMARK.offsetX,
  "--footer-wordmark-offset-y": WORDMARK.offsetY,
} as CSSProperties;

export function FooterBannerSection() {
  const { alt, wordmark } = FOOTER_BANNER;

  return (
    <section
      id="footer-banner"
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: SECTION.bg,
        height: SECTION.height,
        ...bannerCssVars,
      }}
      aria-label={alt}
    >
      <div
        className="motion-reduce:transform-none"
        style={{
          width: "var(--footer-wordmark-max-w)",
          transform:
            "translate(var(--footer-wordmark-offset-x), var(--footer-wordmark-offset-y))",
        }}
      >
        <Image
          src={wordmark.src}
          alt={alt}
          width={wordmark.width}
          height={wordmark.height}
          sizes={WORDMARK.sizes}
          className="block h-auto w-full"
          priority={false}
        />
      </div>
    </section>
  );
}
