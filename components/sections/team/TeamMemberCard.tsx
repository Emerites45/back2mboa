"use client";

import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import type { TeamMember, TeamSocial, TeamSocialKind } from "@/types/team";
import { cn } from "@/lib/utils";

/** Géométrie / motion de la carte flip. */
const CARD = {
  /** Coins arrondis des deux faces. */
  radius: "0.7rem",
  /** Durée du retournement 3D (ms). */
  flipMs: 650,
  /** Courbe d’accélération du flip. */
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

/** Typo face avant — cartes secondaires (échelle via cqw = taille de cellule). */
const FRONT = {
  /** Police du nom. */
  nameFont: "var(--font-bricolage)",
  /** Graisse du nom. */
  nameWeight: 800,
  /** Taille du nom — secondaires (suit la largeur de carte). */
  nameSize: "clamp(0.65rem, 6.5cqw, 1.05rem)",
  /** Taille du nom — featured. */
  nameSizeFeatured: "clamp(1rem, 1.6vw, 1.35rem)",
  /** Taille du rôle — secondaires. */
  roleSize: "clamp(0.55rem, 4.8cqw, 0.82rem)",
  /** Taille du rôle — featured. */
  roleSizeFeatured: "clamp(0.75rem, 1.1vw, 0.9rem)",
  /** Taille des pastilles réseaux (teaser) — secondaires. */
  socialSize: "clamp(2.75rem, 9cqw, 2.75rem)",
  /** Taille des pastilles réseaux — featured. */
  socialSizeFeatured: "2.75rem",
} as const;

/** Typo face arrière (carte retournée) — ajuster ici. */
const BACK = {
  /** Police du nom au verso. */
  nameFont: "var(--font-bricolage)",
  /** Graisse du nom au verso. */
  nameWeight: 800,
  /** Taille du nom — secondaires (cqw = réactif à la cellule). */
  nameSize: "clamp(0.7rem, 6.5cqw, 1.1rem)",
  /** Taille du nom — carte featured. */
  nameSizeFeatured: "1.15rem",

  /** Taille du rôle (uppercase) — secondaires. */
  roleSize: "clamp(0.52rem, 4.2cqw, 0.72rem)",
  /** Taille du rôle — carte featured. */
  roleSizeFeatured: "0.7rem",
  /** Graisse du rôle. */
  roleWeight: 600,
  /** Espacement des lettres du rôle. */
  roleTracking: "0.06em",

  /** Taille de la bio — secondaires. */
  bioSize: "clamp(0.6rem, 5.2cqw, 0.88rem)",
  /** Taille de la bio — carte featured. */
  bioSizeFeatured: "0.9rem",
  /** Graisse de la bio. */
  bioWeight: 400,
  /** Interligne de la bio — secondaires. */
  bioLineHeight: 1.4,
  /** Interligne de la bio — carte featured. */
  bioLineHeightFeatured: 1.55,
} as const;

/** Ignore les liens vides ou placeholder `#`. */
function activeSocials(socials: TeamSocial[]): TeamSocial[] {
  return socials.filter((s) => {
    const href = s.href?.trim();
    return Boolean(href) && href !== "#";
  });
}

function SocialGlyph({
  kind,
  className,
}: {
  kind: TeamSocialKind;
  className?: string;
}) {
  const cls = cn("size-[1em] shrink-0", className);

  if (kind === "email") {
    return <Mail className={cls} aria-hidden="true" strokeWidth={2} />;
  }
  if (kind === "x") {
    return (
      <svg viewBox="0 0 24 24" className={cn(cls, "fill-current")} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
      </svg>
    );
  }
  if (kind === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={cn(cls, "fill-current")} aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" className={cn(cls, "fill-current")} aria-hidden="true">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.688-1.335-1.688-1.09-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cn(cls, "fill-current")} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type TeamMemberCardProps = {
  member: TeamMember;
  featured?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Contrôlé par la section — une seule carte retournée à la fois. */
  flipped?: boolean;
  /** Tap mobile : toggle exclusif (géré par le parent). */
  onActivate?: () => void;
};

function isFinePointerHover() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function TeamMemberCard({
  member,
  featured = false,
  className,
  style,
  flipped = false,
  onActivate,
}: TeamMemberCardProps) {
  const socials = activeSocials(member.socials);
  const socialPx = featured ? FRONT.socialSizeFeatured : FRONT.socialSize;

  function onCardClick(e: MouseEvent<HTMLElement>) {
    if ((e.target as HTMLElement).closest("a")) return;
    if (isFinePointerHover()) return;
    onActivate?.();
  }

  function onCardKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key !== "Enter" && e.key !== " ") return;
    if ((e.target as HTMLElement).closest("a")) return;
    e.preventDefault();
    onActivate?.();
  }

  return (
    <article
      className={cn(
        "group relative min-h-0 @container [perspective:1200px]",
        "h-full",
        className,
      )}
      style={style}
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}`}
      data-flipped={flipped || undefined}
      onClick={onCardClick}
      onKeyDown={onCardKeyDown}
    >
      <div
        className={cn(
          "relative h-full w-full rounded-[var(--team-radius)] [transform-style:preserve-3d]",
          "motion-safe:transition-transform motion-safe:duration-[var(--team-flip)] motion-safe:ease-[var(--team-ease)]",
          "motion-safe:group-hover:[transform:rotateY(180deg)] motion-safe:group-focus-within:[transform:rotateY(180deg)]",
          flipped && "motion-safe:[transform:rotateY(180deg)]",
          "group-hover:shadow-[0_20px_48px_rgb(0_0_0_/_0.35)]",
        )}
        style={
          {
            "--team-radius": CARD.radius,
            "--team-flip": `${CARD.flipMs}ms`,
            "--team-ease": CARD.ease,
          } as CSSProperties
        }
      >
        {/* Face avant */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col items-stretch justify-end overflow-hidden rounded-[inherit]",
            "border border-white/10 bg-white/5",
            featured ? "px-4 pb-5" : "px-2.5 pb-3",
            "[backface-visibility:hidden] [transform:translateZ(0)]",
          )}
        >
          <Image
            src={member.photo}
            alt=""
            fill
            sizes={featured ? "(min-width: 768px) 30vw, 100vw" : "(min-width: 768px) 18vw, 45vw"}
            className={cn(
              "object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:scale-[1.05] motion-reduce:scale-100",
            )}
            priority={featured}
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-transparent from-[42%] to-[#061A14]/92"
            aria-hidden="true"
          />

          {/* Teaser réseaux : invite au survol — non cliquable (liens au verso) */}
          {socials.length > 0 ? (
            <ul
              className={cn(
                "pointer-events-none absolute top-2.5 right-2.5 z-[2] flex items-center gap-1",
                "motion-safe:transition-transform motion-safe:duration-300",
                "group-hover:-translate-y-0.5",
              )}
              aria-hidden="true"
            >
              {socials.map((social) => (
                <li
                  key={social.kind}
                  className={cn(
                    "grid place-items-center rounded-md text-white/90",
                    "border border-white/25 bg-black/35 shadow-[0_4px_12px_rgb(0_0_0_/_0.25)] backdrop-blur-[2px]",
                    "motion-safe:transition-[background-color,border-color,color] motion-safe:duration-300",
                    "group-hover:border-brand-yellow/70 group-hover:bg-brand-yellow group-hover:text-[var(--color-dark-green)]",
                  )}
                  style={{ width: socialPx, height: socialPx, fontSize: `calc(${socialPx} * 0.45)` }}
                >
                  <SocialGlyph kind={social.kind} />
                </li>
              ))}
            </ul>
          ) : null}

          <div className="relative z-[2] w-full min-w-0">
            <p
              className="truncate tracking-[-0.02em] text-brand-yellow"
              title={member.name}
              style={{
                fontFamily: FRONT.nameFont,
                fontWeight: FRONT.nameWeight,
                fontSize: featured ? FRONT.nameSizeFeatured : FRONT.nameSize,
              }}
            >
              {member.name}
            </p>
            <p
              className="mt-0.5 truncate font-medium leading-snug text-white/75"
              style={{
                fontSize: featured ? FRONT.roleSizeFeatured : FRONT.roleSize,
              }}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* Face arrière */}
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[inherit]",
            "border border-brand-yellow/25",
            "bg-gradient-to-br from-[var(--brand-result)] via-[var(--color-dark-green)] to-[#061A14]",
            featured ? "p-5" : "p-3",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
          )}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
            <p
              className="leading-tight tracking-[-0.02em] text-brand-yellow"
              style={{
                fontFamily: BACK.nameFont,
                fontWeight: BACK.nameWeight,
                fontSize: featured ? BACK.nameSizeFeatured : BACK.nameSize,
              }}
            >
              {member.name}
            </p>
            <p
              className="text-white/60 uppercase"
              style={{
                fontSize: featured ? BACK.roleSizeFeatured : BACK.roleSize,
                fontWeight: BACK.roleWeight,
                letterSpacing: BACK.roleTracking,
              }}
            >
              {member.roleBack}
            </p>
            <span
              className={cn(
                "origin-left rounded-sm bg-brand-yellow",
                featured ? "mt-1 mb-1 h-[3px] w-10" : "my-0.5 h-[2px] w-6",
                "motion-safe:transition-transform motion-safe:duration-500 motion-safe:delay-100",
                "group-hover:scale-x-[1.5] group-focus-within:scale-x-[1.5]",
              )}
              aria-hidden="true"
            />
            <p
              className={cn(
                "min-h-0 flex-1 overflow-hidden text-pretty text-white/85",
                !featured && "line-clamp-5",
              )}
              style={{
                fontSize: featured ? BACK.bioSizeFeatured : BACK.bioSize,
                fontWeight: BACK.bioWeight,
                lineHeight: featured
                  ? BACK.bioLineHeightFeatured
                  : BACK.bioLineHeight,
              }}
            >
              {member.bio}
            </p>
          </div>

          {socials.length > 0 ? (
            <ul
              className={cn(
                "mt-3 flex shrink-0 items-center gap-2",
                "motion-safe:translate-y-1.5 motion-safe:opacity-0",
                "motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:delay-150",
                "group-hover:translate-y-0 group-hover:opacity-100",
                "group-focus-within:translate-y-0 group-focus-within:opacity-100",
                "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
                flipped && "translate-y-0 opacity-100",
              )}
            >
              {socials.map((social) => (
                <li key={social.kind}>
                  <a
                    href={social.href}
                    target={social.kind === "email" ? undefined : "_blank"}
                    rel={social.kind === "email" ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    title={social.label}
                    className={cn(
                      "grid place-items-center rounded-md text-[0.9rem]",
                      "size-11 lg:size-8",
                      "border border-white/15 bg-white/8 text-white/85",
                      "motion-safe:transition-[background-color,color,border-color,transform] motion-safe:duration-200",
                      "hover:-translate-y-0.5 hover:border-brand-yellow hover:bg-brand-yellow hover:text-[var(--color-dark-green)]",
                      "focus-visible:border-brand-yellow focus-visible:bg-brand-yellow focus-visible:text-[var(--color-dark-green)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/40",
                    )}
                  >
                    <SocialGlyph kind={social.kind} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}
