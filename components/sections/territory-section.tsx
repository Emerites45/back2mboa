/**
 * Section Paris ↔ Guider — plein écran, textes calés
 * sur la même gouttière que Éditions pilotes.
 * Respiration haute pour ne pas coller au bandeau du hero.
 */
export function TerritorySection() {
  return (
    <section
      aria-label="Double flux Paris Guider"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", height: "auto", background: "#0A2B21" }}
    >
      <div
        className="
          mx-auto flex h-full w-full max-w-[min(100%,92rem)] flex-col
          px-[clamp(1.35rem,5.5vw,4.75rem)]
          pt-[clamp(3.25rem,8vh,6rem)]
          pb-[clamp(1.25rem,3vh,2.5rem)]
        "
      >
        <iframe
          src="/territory-paris-guider.html"
          title="Back2Mboa — Paris ↔ Guider"
          className="h-full min-h-0 w-full flex-1 border-0"
          loading="lazy"
        />
      </div>
    </section>
  );
}
