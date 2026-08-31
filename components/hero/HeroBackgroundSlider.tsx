'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { SLIDES_DATA } from '@/data/slides';

interface HeroBackgroundSliderProps {
  onSlideChange?: (index: number) => void;
}

export default function HeroBackgroundSlider({ onSlideChange }: HeroBackgroundSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [revealRadius, setRevealRadius] = useState(0);
  const [gateScale, setGateScale] = useState(1);
  const [gateBlur, setGateBlur] = useState(0);
  const [gateOpacity, setGateOpacity] = useState(1);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const totalSlides = SLIDES_DATA.length;

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (idx === currentIndex || idx === nextIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, nextIndex]);

  const handleNext = useCallback(() => {
    if (isTransitioning || totalSlides <= 1) return;

    const targetIndex = (currentIndex + 1) % totalSlides;
    setNextIndex(targetIndex);
    setIsTransitioning(true);

    const startTime = performance.now();
    const duration = 1200;

    const animatePortal = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(elapsed / duration, 1);

      let currentScale = 1;
      let currentBlur = 0;
      let currentOpacity = 1;

      if (p < 0.3) {
        const subP = p / 0.3;
        currentScale = 1 - 0.06 * subP;
        currentBlur = 0;
        currentOpacity = 1;
      } else {
        const subP = (p - 0.3) / 0.7;
        const easedZoom = Math.pow(subP, 3);
        currentScale = 0.94 + (20 - 0.94) * easedZoom;
        currentBlur = subP * 16;
        currentOpacity = 1 - Math.pow(subP, 2.5);
      }

      let easedRadius = 0;
      if (p < 0.3) {
        easedRadius = Math.pow(p / 0.3, 2) * 0.04;
      } else {
        const subP = (p - 0.3) / 0.7;
        easedRadius = 0.04 + Math.pow(subP, 2.8) * 0.96;
      }

      setGateScale(currentScale);
      setGateBlur(currentBlur);
      setGateOpacity(currentOpacity);
      setRevealRadius(easedRadius * 180);

      if (p >= 0.5 && targetIndex !== currentIndex && onSlideChange) {
        onSlideChange(targetIndex);
      }

      if (p < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePortal);
      } else {
        setCurrentIndex(targetIndex);
        setNextIndex(null);
        setIsTransitioning(false);
        setRevealRadius(0);
        setGateScale(1);
        setGateBlur(0);
        setGateOpacity(1);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animatePortal);
  }, [currentIndex, isTransitioning, totalSlides, onSlideChange]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none pointer-events-none">
      
      {/* ========== COVER EN FOND (toujours visible) ========== */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
  src="/images/back2mboa-cover.png"
  alt="Cover Back2Mboa"
  fill
  className="object-cover scale-100"   // ← plus de scale-105
  priority
/>s
      </div>

      {/* ========== SLIDES (vidéo / images) ========== */}
      {SLIDES_DATA.map((slide, index) => {
        const isActive = index === currentIndex;
        const isNext = index === nextIndex;

        if (!isActive && !isNext) return null;

        return (
          <div
            key={slide.id || index}
            className="absolute inset-0 w-full h-full"
            style={{
              zIndex: isActive ? 1 : 2,
              ...(isNext && isTransitioning
                ? {
                    WebkitMaskImage: `radial-gradient(circle at 50% 52%, #000 ${revealRadius}%, transparent ${revealRadius + 4}%)`,
                    maskImage: `radial-gradient(circle at 50% 52%, #000 ${revealRadius}%, transparent ${revealRadius + 4}%)`,
                    willChange: 'mask-image, -webkit-mask-image',
                  }
                : {})
            }}
          >
            {slide.videoUrl ? (
              <video
                ref={(el) => { videoRefs.current[index] = el; }}
                src={slide.videoUrl}
                poster={slide.posterUrl}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105"
              />
            ) : slide.posterUrl ? (
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
                style={{
  background: `
    radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.35) 100%),
    linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.65) 100%)
  `
}}
              />
            ) : null}
          </div>
        );
      })}

      {/* ========== SOLEIL — CÔTÉ GAUCHE + PLUS PETIT ========== */}
     <div className="absolute top-[-20px] left-[-40px] w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] pointer-events-none z-[2] opacity-90">
  <Image
    src="/images/sun.png"
    alt="Soleil"
    fill
    className="object-contain"
    priority
  />
</div>

      {/* ========== OVERLAY (plus léger pour garder la luminosité) ========== */}
      <div 
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.7) 100%)
          `
        }}
      />

      {/* ========== PORTAIL TERRE CUITE ========== */}
      <div 
        onClick={handleNext}
        className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group pointer-events-auto"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="relative w-[220px] h-[300px] sm:w-[280px] sm:h-[370px] md:w-[320px] md:h-[420px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            transform: `scale(${gateScale})`,
            filter: `blur(${gateBlur}px) drop-shadow(0 0 ${30 + gateBlur * 4}px rgba(243, 140, 80, 0.45))`,
            opacity: gateOpacity,
            willChange: 'transform, filter, opacity',
            transformOrigin: 'center 60%'
          }}
        >
          <Image 
            src="/images/portail-terre-cuite.png" 
            alt="Portail Back2Mboa"
            width={380}
            height={480}
            priority
            className="w-full h-full object-contain drop-shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
          />

          <div 
            className={`absolute z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-2xl ${
              isTransitioning ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          >
            <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-current ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}