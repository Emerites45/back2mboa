"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { SendHorizontal } from "lucide-react";
import { Check } from "@/components/animate-ui/icons/check";
import { useIsInView } from "@/hooks/use-is-in-view";
import {
  NEWSLETTER_GATE_COPY,
  NEWSLETTER_GATE_IMAGE,
} from "@/data/newsletter-gate";
import { cn } from "@/lib/utils";

/** Section — hauteur viewport + espacements header. */
const SECTION = {
  bg: "#f8f4ec",
  height: "auto",
  minHeight: "100svh",
  paddingX: "clamp(1rem, 4vw, 2rem)",
  headerPaddingTop: "clamp(1.5rem, 5vh, 3.5rem)",
  headerGap: "0.75rem",
  headerMaxWidth: "36rem",
} as const;

/** Typo — titres et corps. */
const TYPE = {
  titleFont: "var(--font-fraunces)",
  bodyFont: "var(--font-inter)",
  titleSize: "clamp(1.75rem, 4.2vw, 2.5rem)",
  subtitleSize: "clamp(0.875rem, 1.8vw, 1rem)",
} as const;

/**
 * Portail — largeur + décalage vertical depuis le centre du bloc flex.
 * `offsetY` : `0` = centré ; négatif = plus haut ; positif = plus bas (clipé, pas de débordement).
 * `fadeBottom` : fondu crème sur le sol noir du PNG.
 */
const GATE = {
  width: "clamp(72%, 70vmin, 420px)",
  offsetY: "25px",
  fadeBottom: "12%",
} as const;

/**
 * Emprise du formulaire dans l’arche (% du conteneur portail).
 * Délimite la zone utile avant padding interne.
 */
const FORM_SLOT = {
  top: "41%",
  bottom: "7%",
  insetLeft: "14%",
  insetRight: "14%",
  gap: "0.45rem",
} as const;

/**
 * Marge interne — éloigne les champs des « murs » de l’emprise / de la pierre.
 * Augmenter `padInline` / `padBlock` pour des champs moins collés aux bords.
 */
const FORM_INSET = {
  padTop: "0",
  padInline: "clamp(12px, 4vw, 40px)",
  padBottom: "clamp(20px, 4vw, 40px)",
} as const;

/** Champs — texte noir sur fond crème. */
const FIELD = {
  width: "100%",
  height: "2.5rem",
  fontSize: "0.875rem",
  paddingX: "0.375rem",
  textColor: "#0a0a0a",
  placeholderColor: "rgba(0, 0, 0, 0.38)",
} as const;

/**
 * Tray — bordures CSS natives : bas + gauche + droite, pas de haut.
 * `sideClipTop` masque le haut des côtés (50 = bras jusqu’à mi-hauteur).
 */
const TRAY = {
  borderWidth: 1.8,
  borderColor: "rgba(0, 0, 0, 0.22)",
  cornerRadius: "12px",
  sideClipTop: 50,
} as const;

/** Focus tray — transition bordure + bras latéraux. */
const TRAY_FOCUS = {
  borderColor: "rgba(0, 0, 0, 0.52)",
  sideClipTop: 32,
  durationMs: 280,
  accentOpacity: 0.35,
} as const;

/** Saisie — berceau un peu plus ouvert + pulse discret pendant frappe. */
const TRAY_TYPING = {
  borderColor: "rgba(0, 0, 0, 0.62)",
  sideClipTop: 22,
  accentOpacity: 0.55,
  idleMs: 520,
} as const;

/** Rempli (hors focus) — trace légère qu’un champ est complété. */
const TRAY_FILLED = {
  borderColor: "rgba(0, 0, 0, 0.38)",
  sideClipTop: 40,
} as const;

type FieldKey = "first" | "last" | "email";

/** Bouton S'inscrire — pill sombre + avion (flottement si prêt, traversée à l'envoi). */
const BUTTON = {
  width: "70%",
  height: "2.35rem",
  fontSize: "0.875rem",
  bg: "#f8f4ec",
  textColor: "#0a0a0a",
  inactiveBg: "#d9d4c9",
  inactiveText: "rgba(0, 0, 0, 0.38)",
  planeSize: 15,
  planePadLeft: "0.3rem",
  zoneSize: "1.8rem",
  borderColor: "#119d63",
  labelFadeMs: 250,
  sendDurationMs: 900,
} as const;

/** Boule de confirmation — remplace le formulaire après l'envoi. */
const SUCCESS = {
  ballSize: "7.5rem",
  ballBg: "#119d63",
  checkStrokeWidth: 3,
  textFontSize: "0.9rem",
  gap: "1rem",
} as const;

/** Consentement — typo et espacement sous le bouton. */
const CONSENT = {
  fontSize: "0.625rem",
  lineHeight: "1.45",
  maxWidth: "11.5rem",
  padTop: "0.5rem",
  checkboxSize: "0.875rem",
} as const;

const gateCssVars = {
  "--nl-gate-w": GATE.width,
  "--nl-gate-offset-y": GATE.offsetY,
  "--nl-gate-fade-bottom": GATE.fadeBottom,
  "--nl-form-top": FORM_SLOT.top,
  "--nl-form-bottom": FORM_SLOT.bottom,
  "--nl-form-left": FORM_SLOT.insetLeft,
  "--nl-form-right": FORM_SLOT.insetRight,
  "--nl-form-gap": FORM_SLOT.gap,
  "--nl-form-pad-top": FORM_INSET.padTop,
  "--nl-form-pad-inline": FORM_INSET.padInline,
  "--nl-form-pad-bottom": FORM_INSET.padBottom,
  "--nl-section-bg": SECTION.bg,
  "--nl-field-w": FIELD.width,
  "--nl-field-h": FIELD.height,
  "--nl-field-fs": FIELD.fontSize,
  "--nl-field-px": FIELD.paddingX,
  "--nl-field-text": FIELD.textColor,
  "--nl-field-ph": FIELD.placeholderColor,
  "--nl-tray-border": TRAY.borderColor,
  "--nl-tray-border-focus": TRAY_FOCUS.borderColor,
  "--nl-tray-border-type": TRAY_TYPING.borderColor,
  "--nl-tray-border-filled": TRAY_FILLED.borderColor,
  "--nl-tray-radius": TRAY.cornerRadius,
  "--nl-tray-side-clip": `${TRAY.sideClipTop}%`,
  "--nl-tray-side-clip-focus": `${TRAY_FOCUS.sideClipTop}%`,
  "--nl-tray-side-clip-type": `${TRAY_TYPING.sideClipTop}%`,
  "--nl-tray-side-clip-filled": `${TRAY_FILLED.sideClipTop}%`,
  "--nl-tray-focus-dur": `${TRAY_FOCUS.durationMs}ms`,
  "--nl-tray-type-accent-o": String(TRAY_TYPING.accentOpacity),
  "--nl-btn-w": BUTTON.width,
  "--nl-btn-h": BUTTON.height,
  "--nl-btn-fs": BUTTON.fontSize,
  "--nl-ball-size": SUCCESS.ballSize,
  "--nl-consent-fs": CONSENT.fontSize,
  "--nl-consent-lh": CONSENT.lineHeight,
  "--nl-consent-max-w": CONSENT.maxWidth,
  "--nl-consent-pt": CONSENT.padTop,
  "--nl-consent-check": CONSENT.checkboxSize,
} as CSSProperties;

/** Style partagé — largeur calée sur l’emprise. */
const controlBlockStyle: CSSProperties = {
  width: "var(--nl-field-w)",
  maxWidth: "100%",
  marginInline: "auto",
};

function TrayField({
  children,
  filled,
  typing,
  style,
}: {
  children: ReactNode;
  filled?: boolean;
  typing?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      className="group relative shrink-0"
      data-filled={filled ? "" : undefined}
      data-typing={typing ? "" : undefined}
      style={{ ...controlBlockStyle, height: "var(--nl-field-h)", ...style }}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 box-border border-t-0",
          "border-[color:var(--nl-tray-border)]",
          "[clip-path:inset(var(--nl-tray-side-clip)_0_0_0)]",
          "group-data-[filled]:border-[color:var(--nl-tray-border-filled)]",
          "group-data-[filled]:[clip-path:inset(var(--nl-tray-side-clip-filled)_0_0_0)]",
          "group-focus-within:border-[color:var(--nl-tray-border-focus)]",
          "group-focus-within:[clip-path:inset(var(--nl-tray-side-clip-focus)_0_0_0)]",
          "group-data-[typing]:border-[color:var(--nl-tray-border-type)]",
          "group-data-[typing]:[clip-path:inset(var(--nl-tray-side-clip-type)_0_0_0)]",
          "transition-[border-color,clip-path] ease-out motion-reduce:transition-none",
        )}
        style={{
          borderBottomWidth: TRAY.borderWidth,
          borderLeftWidth: TRAY.borderWidth,
          borderRightWidth: TRAY.borderWidth,
          borderBottomStyle: "solid",
          borderLeftStyle: "solid",
          borderRightStyle: "solid",
          borderBottomLeftRadius: TRAY.cornerRadius,
          borderBottomRightRadius: TRAY.cornerRadius,
          transitionDuration: "var(--nl-tray-focus-dur)",
        }}
      />
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-[4%] bottom-0 h-[1.5px] rounded-full bg-[#10b981]",
          "scale-x-75 opacity-0 transition-[transform,opacity] ease-out",
          "group-data-[filled]:scale-x-90 group-data-[filled]:opacity-[0.18]",
          "group-focus-within:scale-x-100 group-focus-within:opacity-[var(--nl-tray-accent-o)]",
          "group-data-[typing]:scale-x-100 group-data-[typing]:opacity-[var(--nl-tray-type-accent-o)]",
          "group-data-[typing]:motion-safe:nl-tray-type-pulse",
          "motion-reduce:transition-none",
        )}
        style={{
          transitionDuration: "var(--nl-tray-focus-dur)",
          ["--nl-tray-accent-o" as string]: TRAY_FOCUS.accentOpacity,
        }}
      />
      {children}
    </div>
  );
}

export function NewsletterGateSection() {
  const copy = NEWSLETTER_GATE_COPY;
  const sectionRef = useRef<HTMLElement>(null);
  const { isInView } = useIsInView(sectionRef);
  const reduceMotion = useReducedMotion();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [phase, setPhase] = useState<"idle" | "sending" | "success">("idle");
  const [typingField, setTypingField] = useState<FieldKey | null>(null);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
      if (phaseTimer.current) clearTimeout(phaseTimer.current);
    },
    [],
  );

  const markTyping = useCallback((field: FieldKey) => {
    setTypingField(field);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(
      () => setTypingField(null),
      TRAY_TYPING.idleMs,
    );
  }, []);

  const canSubmit =
    phase === "idle" &&
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    consent;

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (phase !== "idle") return;
      if (
        firstName.trim().length === 0 ||
        lastName.trim().length === 0 ||
        email.trim().length === 0 ||
        !consent
      ) {
        return;
      }
      setPhase("sending");
      phaseTimer.current = setTimeout(
        () => setPhase("success"),
        BUTTON.sendDurationMs,
      );
    },
    [phase, firstName, lastName, email, consent],
  );

  const entranceContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const entranceItem: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  const fieldClass = cn(
    "relative z-[1] w-full border-0 bg-transparent outline-none",
    "text-[var(--nl-field-text)] placeholder:text-[var(--nl-field-ph)]",
    "placeholder:transition-opacity placeholder:duration-[var(--nl-tray-focus-dur)] motion-reduce:placeholder:transition-none",
    "focus:placeholder:opacity-[0.35]",
    "transition-[transform] duration-[var(--nl-tray-focus-dur)] ease-out",
    "focus:translate-y-[-1px] group-data-[typing]:translate-y-[-1.5px]",
    "motion-reduce:transform-none",
  );

  const inputStyle: CSSProperties = {
    height: "var(--nl-field-h)",
    fontSize: "var(--nl-field-fs)",
    paddingInline: "var(--nl-field-px)",
    color: FIELD.textColor,
  };

  return (
    <section
      id="newsletter"
      ref={sectionRef}
      className="flex flex-col overflow-visible md:overflow-hidden text-black"
      style={{
        ...gateCssVars,
        backgroundColor: SECTION.bg,
        fontFamily: TYPE.bodyFont,
        minHeight: SECTION.minHeight,
        height: SECTION.height,
        paddingLeft: SECTION.paddingX,
        paddingRight: SECTION.paddingX,
      }}
      aria-labelledby="newsletter-title"
    >
      <motion.header
        className="mx-auto shrink-0 text-center"
        style={{
          maxWidth: SECTION.headerMaxWidth,
          paddingTop: SECTION.headerPaddingTop,
          marginBottom: SECTION.headerGap,
        }}
        initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2
          id="newsletter-title"
          className="mb-2 font-bold leading-[1.12] tracking-[-0.02em]"
          style={{ fontFamily: TYPE.titleFont, fontSize: TYPE.titleSize }}
        >
          {copy.title}
        </h2>
        <p
          className="leading-relaxed text-black/60"
          style={{ fontSize: TYPE.subtitleSize }}
        >
          {copy.subtitle}
        </p>
      </motion.header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
        <div
          className="relative w-[var(--nl-gate-w)] max-w-full motion-reduce:transform-none"
          style={{ transform: "translateY(var(--nl-gate-offset-y))" }}
        >
          <Image
            src={NEWSLETTER_GATE_IMAGE.src}
            alt=""
            width={NEWSLETTER_GATE_IMAGE.width}
            height={NEWSLETTER_GATE_IMAGE.height}
            sizes="(max-width: 480px) 88vw, 420px"
            className="block h-auto w-full select-none"
            priority={false}
            aria-hidden="true"
          />
          {/* Masque le sol noir du PNG — reste crème quel que soit offsetY */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--nl-section-bg)] to-transparent"
            style={{ height: "var(--nl-gate-fade-bottom)" }}
            aria-hidden="true"
          />

          {/* Emprise calée dans le vide de l’arche — pas sur la pierre */}
          <form
            className="absolute flex flex-col items-center justify-start overflow-hidden"
            style={{
              top: "var(--nl-form-top)",
              left: "var(--nl-form-left)",
              right: "var(--nl-form-right)",
              bottom: "var(--nl-form-bottom)",
              gap: "var(--nl-form-gap)",
              paddingTop: "var(--nl-form-pad-top)",
              paddingBottom: "var(--nl-form-pad-bottom)",
              paddingInline: "var(--nl-form-pad-inline)",
            }}
            onSubmit={onSubmit}
          >
            <AnimatePresence mode="wait" initial={false}>
              {phase === "success" ? (
                <motion.div
                  key="success"
                  className="flex w-full flex-1 flex-col items-center justify-center"
                  style={{ gap: SUCCESS.gap }}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: "var(--nl-ball-size)",
                      height: "var(--nl-ball-size)",
                      backgroundColor: SUCCESS.ballBg,
                    }}
                  >
                    <Check
                      size={58}
                      strokeWidth={SUCCESS.checkStrokeWidth}
                      className="text-white"
                      animate
                    />
                  </div>
                  <motion.p
                    className="text-center font-semibold text-black/70"
                    style={{ fontSize: SUCCESS.textFontSize }}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3, ease: "easeOut" }}
                  >
                    {copy.submitDone}
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  className="flex w-full flex-1 flex-col items-center justify-start"
                  style={{ gap: "var(--nl-form-gap)" }}
                  variants={entranceContainer}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                >
                  <motion.div
                    className="flex w-full flex-1 flex-col items-center justify-start"
                    style={{ gap: "var(--nl-form-gap)" }}
                    animate={{
                      opacity: phase === "sending" ? 0 : 1,
                      y: phase === "sending" ? -6 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <motion.div variants={entranceItem} className="w-full">
                      <TrayField
                        filled={firstName.trim().length > 0}
                        typing={typingField === "first"}
                      >
                        <label className="sr-only" htmlFor="newsletter-first">
                          {copy.firstNamePlaceholder}
                        </label>
                        <input
                          id="newsletter-first"
                          type="text"
                          name="firstName"
                          autoComplete="given-name"
                          placeholder={copy.firstNamePlaceholder}
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            markTyping("first");
                          }}
                          className={fieldClass}
                          style={inputStyle}
                          required
                        />
                      </TrayField>
                    </motion.div>

                    <motion.div variants={entranceItem} className="w-full">
                      <TrayField
                        filled={lastName.trim().length > 0}
                        typing={typingField === "last"}
                      >
                        <label className="sr-only" htmlFor="newsletter-last">
                          {copy.lastNamePlaceholder}
                        </label>
                        <input
                          id="newsletter-last"
                          type="text"
                          name="lastName"
                          autoComplete="family-name"
                          placeholder={copy.lastNamePlaceholder}
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            markTyping("last");
                          }}
                          className={fieldClass}
                          style={inputStyle}
                          required
                        />
                      </TrayField>
                    </motion.div>

                    <motion.div variants={entranceItem} className="w-full">
                      <TrayField
                        filled={email.trim().length > 0}
                        typing={typingField === "email"}
                      >
                        <label className="sr-only" htmlFor="newsletter-email">
                          {copy.emailPlaceholder}
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder={copy.emailPlaceholder}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            markTyping("email");
                          }}
                          className={fieldClass}
                          style={inputStyle}
                          required
                        />
                      </TrayField>
                    </motion.div>

                    <motion.div variants={entranceItem} className="w-full">
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className={cn(
                          "group relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold",
                          "transition-[background-color,box-shadow,transform,opacity] duration-200 ease-out",
                          "motion-reduce:transition-none",
                          // Inactif — gris assumé, texte atténué
                          phase === "idle" &&
                            !canSubmit &&
                            "cursor-not-allowed",
                          // Actif — micro-interactions
                          phase === "idle" &&
                            canSubmit &&
                            "cursor-pointer hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(17,157,99,0.28)] active:translate-y-0 active:scale-[0.97] motion-reduce:transform-none",
                        )}
                        style={{
                          ...controlBlockStyle,
                          width: "var(--nl-btn-w)",
                          height: "var(--nl-btn-h)",
                          fontSize: "var(--nl-btn-fs)",
                          backgroundColor:
                            phase === "idle" && !canSubmit
                              ? BUTTON.inactiveBg
                              : BUTTON.bg,
                          color:
                            phase === "idle" && !canSubmit
                              ? BUTTON.inactiveText
                              : BUTTON.textColor,
                          boxShadow:
                            phase === "idle" && canSubmit
                              ? `inset 0 0 0 1.6px ${BUTTON.borderColor}`
                              : undefined,
                        }}
                      >
                        {/* Remplissage progressif — colorie le bouton pendant l'envoi */}
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-0 origin-left bg-[#119d63]",
                            phase === "sending" && "nl-btn-fill",
                          )}
                          style={{ transform: "scaleX(0)" }}
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "absolute inset-0 flex items-center",
                            phase === "idle" && canSubmit && "nl-plane-ready",
                            phase === "sending" && "nl-plane-send",
                          )}
                          style={{ paddingLeft: BUTTON.planePadLeft }}
                        >
                          <span
                            className={cn(
                              "flex items-center justify-center rounded-full bg-[#119d63]",
                              "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none",
                              phase === "idle" &&
                                !canSubmit &&
                                "scale-75 opacity-0",
                              phase === "idle" && canSubmit && "nl-zone-in",
                              // Hover — la pastille grandit et l'avion avance d'un cran
                              phase === "idle" &&
                                canSubmit &&
                                "group-hover:scale-110 group-active:scale-100 motion-reduce:transform-none",
                            )}
                            style={{
                              width: BUTTON.zoneSize,
                              height: BUTTON.zoneSize,
                            }}
                          >
                            <SendHorizontal
                              size={BUTTON.planeSize}
                              strokeWidth={2.25}
                              aria-hidden="true"
                              className="transition-transform duration-200 ease-out group-hover:translate-x-[2px] motion-reduce:transition-none motion-reduce:transform-none"
                            />
                          </span>
                        </span>
                        <span
                          className={cn(
                            "transition-opacity duration-[var(--nl-btn-label-fade)] ease-out motion-reduce:transition-none",
                            phase === "sending" && "opacity-0",
                          )}
                          style={{
                            ["--nl-btn-label-fade" as string]: `${BUTTON.labelFadeMs}ms`,
                          }}
                        >
                          {copy.submitLabel}
                        </span>
                      </button>
                    </motion.div>

                    <motion.div
                      variants={entranceItem}
                      className="mt-auto flex w-full justify-center"
                      style={{ paddingTop: "var(--nl-consent-pt)" }}
                    >
                      <label
                        className="flex cursor-pointer flex-col items-center gap-1.5 text-center text-black/65 motion-reduce:transition-none"
                        style={{
                          maxWidth: "var(--nl-consent-max-w)",
                          fontSize: "var(--nl-consent-fs)",
                          lineHeight: "var(--nl-consent-lh)",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className={cn(
                            "shrink-0 appearance-none rounded-[3px] border border-black/30 bg-transparent",
                            "transition-[background-color,border-color,box-shadow] duration-200",
                            "checked:border-[#10b981] checked:bg-[#10b981]",
                            "focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:outline-none",
                          )}
                          style={{
                            width: "var(--nl-consent-check)",
                            height: "var(--nl-consent-check)",
                          }}
                          required
                        />
                        <span>{copy.consentLabel}</span>
                      </label>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
