"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const TYPE = {
  titleSize: "clamp(2rem, 5vh, 3.5rem)",
  titleWeight: 700,
  bodySize: "clamp(1.05rem, 2.4vh, 1.25rem)",
} as const;

/** Taille de la carte active et de son contenu — contraint par la hauteur de viewport. */
const CARD = {
  width: "min(63.8rem, 97vw, calc(57vh * 16 / 10))",
  aspectRatio: "16 / 10",
  padding: "clamp(1.1rem, 3.1vh, 1.93rem)",
  quoteSize: "clamp(1.05rem, 2.6vh, 1.7rem)",
  metaSize: "clamp(0.88rem, 2vh, 1.2rem)",
  arrowSize: "clamp(2.2rem, 5vh, 3rem)",
  arrowIcon: "clamp(1rem, 2.2vh, 1.4rem)",
} as const;

const STORIES = [
  {
    quote:
      "J'ai le foncier, le besoin, mais où sont les porteurs de solutions ? Back2Mboa m'a présenté des projets bancables, pas des poignées de main.",
    role: "Maire",
    org: "Commune de Yaoundé VI",
    video: "/videos/stories/maire.mp4",
    poster: "/videos/stories/maire.webp",
  },
  {
    quote:
      "J'avais les compétences et le capital. Il me manquait le bon atterrissage. Ici, on structure jusqu'au résultat — pas jusqu'à la photo.",
    role: "Solutionneur diaspora",
    org: "Back2Mboa",
    video: "/videos/stories/diaspora.mp4",
    poster: "/videos/stories/diaspora.webp",
  },
  {
    quote:
      "Nous avons la liquidité. Il nous fallait des dossiers pré-qualifiés et des autorités déjà dans la boucle. C'est ce que nous avons trouvé.",
    role: "Investisseur",
    org: "Fonds partenaire",
    video: "/videos/stories/investisseur.mp4",
    poster: "/videos/stories/investisseur.webp",
  },
  {
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus.",
    role: "Entrepreneure locale",
    org: "Atelier Douala",
    video: "/videos/stories/entrepreneure.mp4",
    poster: "/videos/stories/entrepreneure.webp",
  },
  {
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
    role: "Directeur régional",
    org: "Ministère partenaire",
    video: "/videos/stories/directeur.mp4",
    poster: "/videos/stories/directeur.webp",
  },
  {
    quote:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    role: "Banquière",
    org: "Institution financière",
    video: "/videos/stories/banquiere.mp4",
    poster: "/videos/stories/banquiere.webp",
  },
  {
    quote:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
    role: "Ingénieur diaspora",
    org: "Collectif Berlin",
    video: "/videos/stories/ingenieur.mp4",
    poster: "/videos/stories/ingenieur.webp",
  },
  {
    quote:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
    role: "Présidente de coopérative",
    org: "Coopérative de l'Ouest",
    video: "/videos/stories/cooperative.mp4",
    poster: "/videos/stories/cooperative.webp",
  },
] as const;

const ARROW_HOVER = {
  rest: { scale: 1 },
  hover: { scale: 1.08 },
  tap: { scale: 0.94 },
} as const;

const ARROW_ICON_HOVER = {
  rest: { x: 0, y: 0 },
  hover: { x: 3, y: -3 },
  tap: { x: 1, y: -1 },
} as const;

function isVideoDownloaded(video: HTMLVideoElement) {
  const { buffered, duration } = video;
  if (!duration || buffered.length === 0) return false;
  return buffered.end(buffered.length - 1) >= duration - 0.25;
}

function StoryVideo({
  src,
  poster,
  active,
}: {
  src: string;
  poster: string;
  active: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;

    if (!active) {
      video.pause();
      if (!ready) {
        video.removeAttribute("src");
        video.load();
      } else if (video.readyState >= 1) {
        video.currentTime = 0;
      }
      return;
    }

    const markReady = () => {
      if (isVideoDownloaded(video)) setReady(true);
    };

    if (video.getAttribute("src") !== src) {
      video.src = src;
      video.preload = "auto";
      video.load();
    }

    video.addEventListener("progress", markReady);
    video.addEventListener("canplaythrough", markReady);
    markReady();
    return () => {
      video.removeEventListener("progress", markReady);
      video.removeEventListener("canplaythrough", markReady);
    };
  }, [active, src, reduce, ready]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active && ready && !reduce) {
      void video.play().catch(() => {});
      return;
    }
    video.pause();
  }, [active, ready, reduce]);

  return (
    <>
      <Image src={poster} alt="" fill sizes="53rem" className="object-cover" />
      {reduce ? null : (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          className={cn(
            "absolute inset-0 size-full object-cover transition-opacity duration-300 ease-out",
            ready ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />
      )}
    </>
  );
}

/** Répète la liste seulement si trop courte pour boucler avec des cartes visibles de chaque côté. */
function buildLoopSlides(stories: typeof STORIES) {
  const minSlides = 6;
  const copies = Math.max(1, Math.ceil(minSlides / Math.max(stories.length, 1)));
  return {
    slides: Array.from({ length: stories.length * copies }, (_, i) => ({
      ...stories[i % stories.length],
      key: `${i}`,
    })),
    startIndex: copies > 1 ? stories.length * Math.floor(copies / 2) : 0,
  };
}

const { slides: SLIDES, startIndex: START_INDEX } = buildLoopSlides(STORIES);

export function StoriesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(START_INDEX);
  const reduce = useReducedMotion();

  const syncActive = useCallback((embla: CarouselApi) => {
    if (!embla) return
    const viewport = embla.rootNode().getBoundingClientRect()
    const center = viewport.left + viewport.width / 2
    let best = 0
    let bestDist = Infinity
    embla.slideNodes().forEach((node, i) => {
      const rect = node.getBoundingClientRect()
      const dist = Math.abs(rect.left + rect.width / 2 - center)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setCurrent(best)
  }, [])

  useEffect(() => {
    if (!api) return
    const frame = requestAnimationFrame(() => syncActive(api))
    api.on("select", syncActive)
    api.on("settle", syncActive)
    api.on("scroll", syncActive)
    api.on("reInit", syncActive)
    return () => {
      cancelAnimationFrame(frame)
      api.off("select", syncActive)
      api.off("settle", syncActive)
      api.off("scroll", syncActive)
      api.off("reInit", syncActive)
    }
  }, [api, syncActive])

  return (
    <section
      id="histoires"
      className="flex h-screen flex-col overflow-hidden bg-brand-paper px-[var(--page-gutter)] py-5 sm:py-8 text-brand-ink"
      aria-label="Histoires"
    >
      <header className="mx-auto max-w-[40rem] text-center">
        <h2
          className="font-heading tracking-[-0.03em] text-balance"
          style={{ fontSize: TYPE.titleSize, fontWeight: TYPE.titleWeight }}
        >
          Vraies histoires, vrais résultats
        </h2>
        <p
          className="mx-auto mt-3 max-w-[36rem] text-pretty text-brand-copy"
          style={{ fontSize: TYPE.bodySize }}
        >
          Des territoires aux investisseurs, ces voix disent ce que Back2Mboa
          débloque — de la rencontre jusqu&apos;au résultat.
        </p>
      </header>

      <div className="mt-4 sm:mt-6 flex min-h-0 flex-1 flex-col justify-center">
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
            skipSnaps: false,
            containScroll: false,
            startIndex: START_INDEX,
          }}
          className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
        >
          <CarouselContent className="-ml-2 sm:-ml-3 lg:-ml-4 items-center">
            {SLIDES.map((story, i) => {
              const active = i === current
              return (
                <CarouselItem
                  key={story.key}
                  className="basis-auto flex items-center justify-center pl-2 sm:pl-3 lg:pl-4"
                  style={{ flex: "0 0 auto", width: CARD.width }}
                >
                  <article
                    className={cn(
                      "relative mx-auto overflow-hidden rounded-lg transition-[transform,opacity] duration-300 ease-out",
                      active ? "opacity-100" : "opacity-40",
                    )}
                    style={{
                      width: "100%",
                      aspectRatio: CARD.aspectRatio,
                      transform: active ? "scale(1)" : "scale(0.9)",
                    }}
                  >
                    <StoryVideo src={story.video} poster={story.poster} active={active} />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {active ? (
                      <>
                        <motion.button
                          type="button"
                          onClick={() => api?.scrollNext()}
                          className="absolute top-4 right-4 z-10 grid place-items-center rounded-full bg-brand-yellow text-brand-ink"
                          style={{ width: CARD.arrowSize, height: CARD.arrowSize }}
                          aria-label="Histoire suivante"
                          initial="rest"
                          whileHover={reduce ? undefined : "hover"}
                          whileTap={reduce ? undefined : "tap"}
                          variants={ARROW_HOVER}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <motion.span
                            className="grid place-items-center"
                            variants={ARROW_ICON_HOVER}
                          >
                            <ArrowUpRight style={{ width: CARD.arrowIcon, height: CARD.arrowIcon }} strokeWidth={2.4} />
                          </motion.span>
                        </motion.button>
                        <div
                          className="absolute inset-x-0 bottom-0 text-white"
                          style={{ padding: CARD.padding }}
                        >
                          <blockquote
                            className="max-w-[34ch] leading-snug text-pretty"
                            style={{ fontSize: CARD.quoteSize }}
                          >
                            « {story.quote} »
                          </blockquote>
                          <p className="mt-4 leading-snug" style={{ fontSize: CARD.metaSize }}>
                            <span className="block font-medium">{story.role}</span>
                            <span className="text-white/75">{story.org}</span>
                          </p>
                        </div>
                      </>
                    ) : null}
                  </article>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            <CarouselPrevious className="static top-auto left-auto size-9 sm:size-10 translate-y-0 rounded-full border-0 bg-brand-ink text-brand-yellow hover:bg-brand-ink hover:text-brand-yellow" />
            <CarouselNext className="static top-auto right-auto size-9 sm:size-10 translate-y-0 rounded-full border-0 bg-brand-ink text-brand-yellow hover:bg-brand-ink hover:text-brand-yellow" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
