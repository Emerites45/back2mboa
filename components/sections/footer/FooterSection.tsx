"use client";

import { useCallback, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FOOTER_COPY, FOOTER_LOGO } from "@/data/footer";
import { cn } from "@/lib/utils";

/** Section — fond sombre + espacements. */
const SECTION = {
  bg: "#1a1a1a",
  maxWidth: "72rem",
  paddingX: "clamp(1rem, 4vw, 2rem)",
  paddingY: "clamp(2.5rem, 6vw, 5rem)",
} as const;

/** Typo — titres colonnes et liens. */
const TYPE = {
  bodyFont: "var(--font-inter)",
  taglineSize: "0.8125rem",
  columnTitleSize: "0.9375rem",
  linkSize: "0.875rem",
} as const;

/**
 * Logo — tuning affichage (largeur à l’écran).
 * Fichier + dimensions intrinsèques : `data/footer` → `FOOTER_LOGO`.
 */
const LOGO = {
  maxWidth: "15rem",
  sizesMobile: "60vw",
  sizesDesktop: "13rem",
} as const;

/** Mini-formulaire email — pill blanc + bouton vert. */
const EMAIL = {
  maxWidth: "18rem",
  fieldBg: "#ffffff",
  fieldText: "#0a0a0a",
  placeholder: "rgba(0, 0, 0, 0.42)",
  ring: "rgba(255, 255, 255, 0.22)",
  submitBg: "#10b981",
  submitSize: "2.25rem",
} as const;

export function FooterSection() {
  const copy = FOOTER_COPY;
  const [email, setEmail] = useState("");

  const onEmailSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      document.getElementById("newsletter")?.scrollIntoView({ behavior: "smooth" });
    },
    [email],
  );

  return (
    <footer
      id="footer"
      className="text-white"
      style={{
        backgroundColor: SECTION.bg,
        fontFamily: TYPE.bodyFont,
        paddingTop: SECTION.paddingY,
        paddingBottom: SECTION.paddingY,
        paddingLeft: SECTION.paddingX,
        paddingRight: SECTION.paddingX,
        ["--footer-logo-max-w" as string]: LOGO.maxWidth,
      }}
    >
      <div
        className="mx-auto grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-[minmax(0,1.35fr)_repeat(4,minmax(0,1fr))] lg:gap-8"
        style={{ maxWidth: SECTION.maxWidth }}
      >
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="inline-block">
            <Image
              src={FOOTER_LOGO.src}
              alt={copy.logoAlt}
              width={FOOTER_LOGO.width}
              height={FOOTER_LOGO.height}
              sizes={`(max-width: 640px) ${LOGO.sizesMobile}, ${LOGO.sizesDesktop}`}
              className="h-auto w-[min(100%,var(--footer-logo-max-w))]"
            />
          </Link>
          <p
            className="mt-4 max-w-xs leading-relaxed text-white/70"
            style={{ fontSize: TYPE.taglineSize }}
          >
            {copy.tagline}
          </p>

          <form
            className="mt-6 flex overflow-hidden rounded-lg p-1"
            style={{
              maxWidth: EMAIL.maxWidth,
              border: `1px solid ${EMAIL.ring}`,
              backgroundColor: EMAIL.fieldBg,
            }}
            onSubmit={onEmailSubmit}
          >
            <label className="sr-only" htmlFor="footer-email">
              {copy.emailPlaceholder}
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={copy.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none placeholder:text-black/40"
              style={{
                fontSize: TYPE.linkSize,
                color: EMAIL.fieldText,
              }}
              required
            />
            <button
              type="submit"
              className={cn(
                "flex shrink-0 items-center justify-center rounded-md text-white",
                "transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40",
                "disabled:cursor-not-allowed disabled:opacity-40",
              )}
              style={{
                width: EMAIL.submitSize,
                height: EMAIL.submitSize,
                backgroundColor: EMAIL.submitBg,
              }}
              aria-label={copy.submitLabel}
              disabled={!email.trim()}
            >
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </form>
        </div>

        {copy.columns.map((column) => (
          <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
            <h2
              id={`footer-${column.title}`}
              className="mb-4 font-semibold text-white"
              style={{ fontSize: TYPE.columnTitleSize }}
            >
              {column.title}
            </h2>
            <ul className="space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 transition-colors hover:text-white"
                      style={{ fontSize: TYPE.linkSize }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white/80 transition-colors hover:text-white"
                      style={{ fontSize: TYPE.linkSize }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
    </footer>
  );
}
