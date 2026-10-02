import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  description: "Cette page n’existe pas ou a été déplacée.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(212,175,55,0.18), transparent 70%)",
        }}
      />
      <p className="font-mono text-xs tracking-[0.35em] text-white/50 uppercase">
        Erreur 404
      </p>
      <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
        Cette page n’existe pas
      </h1>
      <p className="mt-4 max-w-md text-base text-white/65 sm:text-lg">
        Le lien est peut‑être périmé, ou la page a changé d’adresse.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#e0c04a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/potentialites/"
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Voir les potentialités
        </Link>
      </div>
    </main>
  );
}
