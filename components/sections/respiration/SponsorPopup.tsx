"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Service {
  label: string;
  desc: string;
  iconKey: string;
  color: string;
}

export interface SlideSponsor {
  titre: string;
  nom: string;
  type: string;
  logoC: string;
  init: string;
  vp: string;
  site: string;
  tag: string;
  pos: string;
  posTxt: string;
  section: string;
  svc: Service[];
  slideImage: string;
}

/* ------------------------------------------------------------------ */
/*  Paths SVG                                                          */
/* ------------------------------------------------------------------ */
const SHARE = {
  share: "M18 16.1c-.8 0-1.5.3-2 .8l-7.1-4.1c.1-.3.1-.5.1-.8s0-.5-.1-.8L16 7.1c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .3 0 .5.1.8L7.9 9.5C7.4 9 6.7 8.7 6 8.7c-1.7 0-3 1.3-3 3s1.3 3 3 3c.7 0 1.5-.3 2-.8l7.1 4.1c-.1.3-.1.5-.1.8 0 1.7 1.3 3 3 3s3-1.3 3-3-1.3-3-3-3z",
  fb: "M22 12a10 10 0 10-11.6 9.9v-7h-2.5V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z",
  li: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.19 1.45-2.19 2.96V21h-4z",
  wa: "M12 2a10 10 0 00-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.4-5.9c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.5.1-.6.8-.8 1-.3.2-.5 0a6.6 6.6 0 01-3.2-2.8c-.2-.4.2-.4.6-1.2a.4.4 0 000-.4l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001 2.7 11.8 11.8 0 004.6 4 5.3 5.3 0 002.4.4 2.7 2.7 0 001.8-1.3 2.2 2.2 0 00.2-1.3c-.1-.1-.3-.2-.5-.3z",
  ig: "M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4a4.5 4.5 0 011.6 1 4.5 4.5 0 011 1.6c.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2a4.8 4.8 0 01-2.6 2.6c-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4a4.8 4.8 0 01-2.6-2.6c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2a4.5 4.5 0 011-1.6 4.5 4.5 0 011.6-1c.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2a6.6 6.6 0 100 13.2 6.6 6.6 0 000-13.2zm0 10.9a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm6.8-11.1a1.5 1.5 0 11-3.1 0 1.5 1.5 0 013.1 0z",
  x: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.11z",
  mail: "M2 5.5A2.5 2.5 0 014.5 3h15A2.5 2.5 0 0122 5.5v13a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5zm2.4-.5L12 11.2 19.6 5zM20 7.2l-7.4 6a1 1 0 01-1.2 0L4 7.2V19h16z",
};

const SVC: Record<string, string> = {
  photo: "M3 6h18a3 3 0 013 3v6a3 3 0 01-3 3H3a3 3 0 01-3-3V9a3 3 0 013-3zm6 9a4 4 0 108 0 4 4 0 00-8 0zm2-4l1.5-2h3L16 11",
  video: "M2 6a3 3 0 013-3h9a3 3 0 013 3v6a3 3 0 01-3 3H5a3 3 0 01-3-3V6zm14 4l6-3v10l-6-3z",
  drone: "M12 12a3 3 0 100-6 3 3 0 000 6zm-7-7l4 4m10-4l-4 4M5 19l4-4m10 4l-4-4",
  print: "M6 3h12a1 1 0 011 1v2H5V4a1 1 0 011-1zm-2 6h16a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2zm3 6h10v4H7v-4z",
  pin: "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
  hotel: "M3 20V8l9-5 9 5v12H3zm6-7h6v7H9v-7z",
  food: "M6 3v8a3 3 0 006 0V3m-3 8v10m6-18c-1.5 2-2 4-2 6s.5 3 2 3v9",
  route: "M4 20L10 4m4 16l6-16m-8 6v3m0 3v3m0 2v2",
  build: "M3 21h18M6 21V8l6-4 6 4v13m-8 0v-6h4v6",
  solar: "M12 3v2m-7 7H3m18 0h-2M6 6L4.5 4.5M18 6l1.5-1.5M12 12a4 4 0 100-8 4 4 0 000 8z",
  water: "M12 3s6 6.4 6 10.4A6 6 0 016 13.4C6 9.4 12 3 12 3z",
  audit: "M4 4h16v16H4zm4 8l3 3 5-6",
};

/* ------------------------------------------------------------------ */
/*  Parser <em> → JSX (évite dangerouslySetInnerHTML)                  */
/* ------------------------------------------------------------------ */
function parseEm(html: string): React.ReactNode[] {
  return html
    .split(/<\/?em>/)
    .map((part, i) =>
      i % 2 === 1 ? <em key={i} className="italic text-[#119D63]">{part}</em> : part,
    );
}

/* ------------------------------------------------------------------ */
/*  Composant                                                          */
/* ------------------------------------------------------------------ */
export function SponsorPopup({
  sponsor,
  open,
  onClose,
}: {
  sponsor: SlideSponsor | null;
  open: boolean;
  onClose: () => void;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  /* ---- fermeture (Escape + body scroll lock) ---- */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!sponsor) return null;

  /* ---- partage ---- */
  const url = `${location.origin}${location.pathname}#respiration`;
  const txt = `${sponsor.titre} — image offerte par ${sponsor.nom}, ${sponsor.type}. ${sponsor.vp}`;
  const eu = encodeURIComponent(url);
  const et = encodeURIComponent(txt);

  const share = [
    { key: "fb", label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${eu}` },
    { key: "li", label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${eu}` },
    { key: "wa", label: "WhatsApp", href: `https://wa.me/?text=${et}%20${eu}` },
    { key: "ig", label: "Instagram" },
    { key: "x", label: "X", href: `https://twitter.com/intent/tweet?text=${et}&url=${eu}` },
    { key: "mail", label: "E-mail", href: `mailto:?subject=${encodeURIComponent(sponsor.nom + " — Back2Mboa")}&body=${et}%0A%0A${eu}` },
  ];

  const flash = (msg: string) => {
    setToast(msg);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 3200);
  };

  const onShare = async () => {
    if (navigator.share && matchMedia("(max-width:760px)").matches) {
      try {
        await navigator.share({ title: sponsor.nom, text: txt, url });
        return;
      } catch { /* annulé → panneau */ }
    }
    setShareOpen((v) => !v);
  };

  const onIg = async () => {
    try {
      await navigator.clipboard.writeText(`${txt}\n${url}`);
      flash("Texte et lien copiés — collez-les dans votre publication Instagram.");
    } catch {
      flash("Copie impossible : sélectionnez le texte manuellement.");
    }
    window.open("https://www.instagram.com/", "_blank", "noopener");
  };

  /* ---- rendu ---- */
  const node = (
    <>
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-[999] flex items-center justify-center p-4 overflow-y-auto",
          "bg-black/70 transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="fixed top-4 right-5 z-[1000] h-10 w-10 rounded-full
            bg-white/15 border border-white/30 text-white grid place-items-center
            hover:bg-white hover:text-[#0A2B21] transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2.2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full max-w-2xl flex flex-col gap-5 animate-[rise_0.4s_cubic-bezier(.34,1.12,.44,1)]">

          {/* ——— CARD-TOP ——— */}
          <div className="bg-white rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[250px_1fr]">
            <div className="relative min-h-[170px] bg-[#0A2B21]">
              <Image
                src={sponsor.slideImage}
                alt={sponsor.titre}
                fill
                className="object-cover"
                sizes="250px"
              />
            </div>

            <div className="p-5 md:p-7 flex flex-col">
              {/* marque + partage */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-11 h-11 rounded-xl grid place-items-center flex-none
                    font-extrabold text-base text-white"
                  style={{ background: sponsor.logoC }}
                >
                  {sponsor.init}
                </span>
                <span className="font-extrabold text-lg tracking-tight text-[#121915] leading-tight">
                  {sponsor.nom}
                  <span className="block text-xs font-medium tracking-widest uppercase text-[#5A6B60] mt-0.5">
                    {sponsor.type}
                  </span>
                </span>
                <button
                  onClick={onShare}
                  aria-label="Partager"
                  aria-expanded={shareOpen}
                  className="ml-auto w-9 h-9 rounded-full flex-none bg-[#F3ECDD]
                    grid place-items-center hover:bg-[#0A2B21] hover:-translate-y-0.5
                    transition-all duration-200 group"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#121915] group-hover:fill-white transition-colors">
                    <path d={SHARE.share} />
                  </svg>
                </button>
              </div>

              {/* panneau partage */}
              {shareOpen && (
                <div className="grid grid-cols-3 gap-2 mb-4 animate-[rise_0.25s_cubic-bezier(.34,1.12,.44,1)]">
                  {share.map((s) =>
                    s.href ? (
                      <a
                        key={s.key}
                        href={s.href}
                        target={s.key === "mail" ? undefined : "_blank"}
                        rel="noopener"
                        className="flex flex-col items-center gap-1.5 px-1.5 py-2.5 rounded-xl
                          bg-[#FBF7EF] border border-[#E6DCC7] text-xs text-[#5A6B60]
                          font-medium hover:bg-[#0A2B21] hover:text-white hover:border-[#0A2B21]
                          hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                          <path d={SHARE[s.key as keyof typeof SHARE] ?? ""} />
                        </svg>
                        {s.label}
                      </a>
                    ) : (
                      <button
                        key={s.key}
                        type="button"
                        onClick={onIg}
                        className="flex flex-col items-center gap-1.5 px-1.5 py-2.5 rounded-xl
                          bg-[#FBF7EF] border border-[#E6DCC7] text-xs text-[#5A6B60]
                          font-medium hover:bg-[#0A2B21] hover:text-white hover:border-[#0A2B21]
                          hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                          <path d={SHARE.ig} />
                        </svg>
                        {s.label}
                      </button>
                    )
                  )}
                </div>
              )}

              <p className="text-[#5A6B60] text-sm mb-4">{sponsor.vp}</p>

              <a
                href={sponsor.site}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 self-start mt-auto
                  font-semibold text-sm px-6 py-3 rounded-xl bg-[#121915] text-white
                  hover:-translate-y-0.5 hover:bg-[#0A2B21] transition-all duration-200"
              >
                Visiter le site <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {/* ——— CARD-BOT ——— */}
          <div className="rounded-2xl p-6 md:p-8 text-center bg-gradient-to-br from-[#F4FBF6] via-[#EAF6EF] to-[#E4F2EA]">
            <div className="text-xs tracking-widest uppercase text-[#119D63] mb-3 font-mono">
              {sponsor.tag}
            </div>
            <h3 className="text-xl md:text-2xl text-[#0A2B21] mb-3 max-w-[30ch] mx-auto font-extrabold tracking-tight">
              {parseEm(sponsor.pos)}
            </h3>
            <p className="text-[#5A6B60] text-sm max-w-xl mx-auto mb-5">{sponsor.posTxt}</p>

            <a
              href={sponsor.section}
              className="inline-flex items-center justify-center gap-2 mx-auto
                font-semibold text-sm px-6 py-3 rounded-xl bg-[#FFD506] text-[#0A2B21]
                hover:-translate-y-0.5 hover:bg-[#ffdf3d] transition-all duration-200"
            >
              Voir sa place dans Back2Mboa <span aria-hidden>→</span>
            </a>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
              {sponsor.svc.map((v) => (
                <div
                  key={v.label}
                  className="bg-white border border-[rgba(10,43,33,0.08)] rounded-lg p-3.5
                    hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                >
                  <span
                    className="w-8 h-8 rounded-lg grid place-items-center mx-auto mb-2"
                    style={{ background: v.color }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-white fill-none"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={SVC[v.iconKey] ?? ""} />
                    </svg>
                  </span>
                  <b className="block text-sm font-bold text-[#0A2B21] leading-tight">{v.label}</b>
                  <span className="block text-xs text-[#5A6B60] mt-1 leading-snug">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[1100]
            bg-[#0A2B21] text-white px-5 py-3 rounded-full text-sm
            animate-[rise_0.3s_cubic-bezier(.34,1.12,.44,1)]"
        >
          {toast}
        </div>
      )}
    </>
  );

  return createPortal(node, document.body);
}
