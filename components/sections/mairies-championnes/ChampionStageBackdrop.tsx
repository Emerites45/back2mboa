"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ChampionStageBackdropProps = {
  image: string;
  video?: string;
  active: boolean;
};

export function ChampionStageBackdrop({
  image,
  video,
  active,
}: ChampionStageBackdropProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [reduce, setReduce] = useState(false);

  const useVideo = Boolean(video) && !reduce;

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

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? false),
      { threshold: 0.2, rootMargin: "80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVideoReady(false);
  }, [video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !useVideo) return;

    const play = () => {
      void el.play().catch(() => {
        window.setTimeout(() => void el.play().catch(() => {}), 280);
      });
    };

    if (active && inView) {
      play();
      return;
    }

    el.pause();
  }, [active, inView, useVideo, video, videoReady]);

  const showVideo = useVideo && videoReady;

  return (
    <div ref={rootRef} className="champ-stage-backdrop" aria-hidden="true">
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 1024px) 100vw, 1320px"
        className="champ-stage-poster"
        priority={active}
      />

      {useVideo && video ? (
        <video
          ref={videoRef}
          className={`champ-stage-video${showVideo ? " is-ready" : ""}`}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          onCanPlayThrough={() => setVideoReady(true)}
        />
      ) : null}
    </div>
  );
}
