"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ChampionStageBackdropProps = {
  image: string;
  video?: string;
  active: boolean;
  /** Prefetch as soon as the section nears the viewport. */
  eager?: boolean;
};

/**
 * When a video exists: only the video (no legacy landscape photo underneath).
 * Solid stage fill while buffering — never the old still image.
 */
export function ChampionStageBackdrop({
  image,
  video,
  active,
  eager = false,
}: ChampionStageBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [nearView, setNearView] = useState(false);
  const [inView, setInView] = useState(false);
  const [readyVideo, setReadyVideo] = useState<string | undefined>();
  const [reduce, setReduce] = useState(false);

  const useVideo = Boolean(video) && !reduce;
  const shouldLoad = useVideo && (eager || nearView || inView || active);
  const showVideo = useVideo && readyVideo === video && Boolean(video);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const near = new IntersectionObserver(
      ([entry]) => setNearView(entry?.isIntersecting ?? false),
      { threshold: 0, rootMargin: "60% 0px 60% 0px" },
    );
    const visible = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.12, rootMargin: "120px 0px" },
    );

    near.observe(node);
    visible.observe(node);
    return () => {
      near.disconnect();
      visible.disconnect();
    };
  }, []);

  useEffect(() => {
    // Réinitialise l’état de chargement quand la vidéo active change.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReadyVideo(undefined);
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !useVideo || !shouldLoad) return;

    const markReady = () => {
      if (video) setReadyVideo(video);
    };

    if (el.readyState >= 2) markReady();

    const onReady = () => markReady();
    el.addEventListener("loadeddata", onReady);
    el.addEventListener("canplay", onReady);

    try {
      el.load();
    } catch {
      /* ignore */
    }

    return () => {
      el.removeEventListener("loadeddata", onReady);
      el.removeEventListener("canplay", onReady);
    };
  }, [useVideo, shouldLoad, video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !useVideo) return;

    if (active && inView && showVideo) {
      void el.play().catch(() => {
        window.setTimeout(() => void el.play().catch(() => {}), 200);
      });
      return;
    }

    el.pause();
  }, [active, inView, useVideo, showVideo, video]);

  return (
    <div
      ref={rootRef}
      className={`champ-stage-backdrop${useVideo ? " has-video" : ""}`}
      aria-hidden="true"
    >
      {/* Photo ONLY when there is no video (or reduced-motion). */}
      {!useVideo ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 1320px"
          className="champ-stage-poster"
          priority={active || eager}
        />
      ) : null}

      {useVideo && video && shouldLoad ? (
        <video
          ref={videoRef}
          className={`champ-stage-video${showVideo ? " is-ready" : ""}`}
          src={video}
          muted
          loop
          playsInline
          autoPlay={active && inView}
          preload="auto"
          onLoadedData={() => setReadyVideo(video)}
          onCanPlay={() => setReadyVideo(video)}
          onCanPlayThrough={() => setReadyVideo(video)}
        />
      ) : null}
    </div>
  );
}
