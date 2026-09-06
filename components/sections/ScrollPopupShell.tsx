"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const STORAGE_KEY = "b2m-scroll-popup-submitted";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HTML_RE = /<[^>]*>/g;
const DANGEROUS_RE = /[<>"'`;\\]/g;
const MIN_OPEN_DELAY_MS = 1500;

function sanitize(v: string): string {
  return v.replace(DANGEROUS_RE, "").replace(HTML_RE, "").trim();
}

export function ScrollPopupShell({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === "1"; } catch { return false; }
  });
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openTime = useRef(0);
  const honeypotRef = useRef<HTMLInputElement>(null);

  /* ---- reset openTime à chaque ouverture ---- */
  useEffect(() => {
    if (open) openTime.current = Date.now();
  }, [open]);

  /* ---- body scroll lock + focus ---- */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    if (!submitted) setTimeout(() => inputRef.current?.focus(), 200);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;

    /* ---- anti-spam: honeypot ---- */
    if (honeypotRef.current?.value) return;

    /* ---- anti-spam: ouverture trop rapide ---- */
    if (Date.now() - openTime.current < MIN_OPEN_DELAY_MS) {
      setError("Veuillez patienter un instant.");
      return;
    }

    const cleanNom = sanitize(nom);
    const cleanEmail = sanitize(email);

    /* ---- validation ---- */
    if (cleanNom.length < 2) {
      setError("Le nom doit contenir au moins 2 caractères.");
      return;
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      setError("Adresse email invalide.");
      return;
    }

    setError(null);
    setSending(true);
    try {
      /* TODO: remplacer par un vrai appel API avec cleanNom, cleanEmail */
      await new Promise((r) => setTimeout(r, 800));
      setSubmitted(true);
      try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setSending(false);
    }
  };

  const node = (
    <div
      ref={overlayRef}
      className={
        "fixed inset-0 z-[999] flex items-center justify-center p-5 " +
        "bg-[#0A2B21]/80 backdrop-blur-sm transition-opacity duration-300 " +
        (open ? "opacity-100" : "pointer-events-none opacity-0")
      }
      role="dialog"
      aria-modal="true"
      aria-label="Inscription à l'événement"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="fixed top-5 right-5 z-[1000] h-11 w-11 rounded-full
          bg-white/10 border border-white/20 text-white/70 grid place-items-center
          hover:bg-white hover:text-[#0A2B21] transition-all duration-200"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-sm animate-[rise_0.35s_cubic-bezier(.22,1,.36,1)]">
        <div className="bg-white rounded-3xl overflow-hidden p-8 md:p-10 text-center">
          {!submitted ? (
            <>
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#FFB902] grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-[#0A2B21] fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" />
                  <path d="M13 17v2" />
                  <path d="M13 11v2" />
                </svg>
              </div>

              <h3 className="text-[1.35rem] md:text-2xl font-extrabold text-[#0A2B21] tracking-tight leading-snug mb-2">
                Rejoignez l&apos;événement
              </h3>
              <p className="text-[#5A6B60] text-[0.82rem] leading-relaxed mb-7">
                Laissez vos coordonnées. On vous envoie la procédure pour finaliser votre inscription.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-stretch">
                {/* ---- honeypot (caché des humains) ---- */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] opacity-0 w-0 h-0 overflow-hidden"
                />

                <input
                  ref={inputRef}
                  type="text"
                  required
                  autoComplete="family-name"
                  placeholder="Votre nom"
                  maxLength={100}
                  value={nom}
                  onChange={(e) => { setNom(e.target.value); setError(null); }}
                  className={
                    "w-full px-4 py-3.5 rounded-xl border text-sm text-[#0A2B21] " +
                    "placeholder:text-[#9CA89F] bg-[#F7FAF8] " +
                    "focus:outline-none focus:ring-2 focus:ring-[#FFB902]/50 focus:border-[#FFB902] " +
                    "transition-all duration-200 border-[rgba(10,43,33,0.12)]"
                  }
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="vous@exemple.com"
                  maxLength={254}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  aria-invalid={!!error}
                  className={
                    "w-full px-4 py-3.5 rounded-xl border text-sm text-[#0A2B21] " +
                    "placeholder:text-[#9CA89F] bg-[#F7FAF8] " +
                    "focus:outline-none focus:ring-2 focus:ring-[#FFB902]/50 focus:border-[#FFB902] " +
                    "transition-all duration-200 " +
                    (error ? "border-red-400" : "border-[rgba(10,43,33,0.12)]")
                  }
                />
                {error && (
                  <p className="text-red-500 text-xs text-left -mt-1">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className={
                    "w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 " +
                    (sending
                      ? "bg-[#d4d4d4] text-white cursor-wait"
                      : "bg-[#FFB902] text-[#0A2B21] hover:bg-[#e6a102] hover:shadow-md active:scale-[0.98]")
                  }
                >
                  {sending ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : "S'inscrire"}
                </button>
              </form>

              <p className="text-[#9CA89F] text-[0.68rem] mt-4 leading-relaxed">
                Pas de spam. Désinscription en un clic.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-[#119D63] grid place-items-center">
                <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-white fill-none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <h3 className="text-[1.35rem] md:text-2xl font-extrabold text-[#0A2B21] tracking-tight leading-snug mb-1.5">
                Vérifiez votre boîte mail
              </h3>
              <p className="text-[#5A6B60] text-[0.82rem] leading-relaxed mb-7 max-w-[18rem] mx-auto">
                On vous a envoyé un mail avec la procédure d&apos;inscription. Pensez à vérifier vos spams.
              </p>

              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-xl bg-[#0A2B21] text-white font-bold text-sm
                  hover:bg-[#1a3d30] hover:shadow-md active:scale-[0.98] transition-all duration-200"
              >
                Fermer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
