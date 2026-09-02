"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./Navbar.css";

const NAV_LINKS = [
  { href: "#plateforme", label: "La Plateforme" },
  { href: "#secteurs", label: "Secteurs" },
  { href: "#acteurs", label: "Acteurs" },
  { href: "#double-flux", label: "Double Flux" },
  { href: "#evenement", label: "L’Événement" },
  { href: "#unlock-millions", label: "Unlock Millions™" },
  { href: "#digital-twin", label: "Digital Twin™" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    /* Focus premier lien au open — WCAG dialog pattern léger */
    requestAnimationFrame(() => firstLinkRef.current?.focus());

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Ferme le menu si on passe en desktop (≥992px) */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="b2m-nav">
      <div className="b2m-nav__bar">
        <Link href="/" className="b2m-nav__logo" onClick={close}>
          <Image
            src="/images/logo.webp"
            alt="Back2Mboa"
            width={120}
            height={40}
            className="b2m-nav__logo-img"
            priority
          />
        </Link>

        {/* Desktop — visible ≥992px */}
        <nav className="b2m-nav__desktop" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="b2m-nav__link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="b2m-nav__actions">
          <Button
            asChild
            className="b2m-nav__cta bg-amber-400 hover:bg-amber-500 text-black font-extrabold uppercase text-xs rounded-md"
          >
            <Link href="/inscription">Je m’inscris</Link>
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className={`b2m-nav__toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="b2m-nav__toggle-bar" aria-hidden="true" />
            <span className="b2m-nav__toggle-bar" aria-hidden="true" />
            <span className="b2m-nav__toggle-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Overlay + panneau mobile — < 992px */}
      <div
        className={`b2m-nav__scrim${open ? " is-open" : ""}`}
        aria-hidden={!open}
        onClick={close}
      />

      <nav
        id={panelId}
        className={`b2m-nav__panel${open ? " is-open" : ""}`}
        aria-label="Navigation mobile"
        aria-hidden={!open}
        {...(!open ? ({ inert: true } as React.HTMLAttributes<HTMLElement>) : {})}
      >
        <ul className="b2m-nav__list">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <Link
                ref={i === 0 ? firstLinkRef : undefined}
                href={link.href}
                className="b2m-nav__panel-link"
                onClick={close}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/inscription" className="b2m-nav__panel-cta" onClick={close}>
          Je m’inscris
        </Link>
      </nav>
    </header>
  );
}
