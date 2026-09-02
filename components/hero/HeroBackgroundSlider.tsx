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
  
  // États de l'animation en direct (synchronisés via requestAnimationFrame)
  const [revealRadius, setRevealRadius] = useState(0);
  const [gateScale, setGateScale] = useState(1);
  const [gateBlur, setGateBlur] = useState(0);
  const [gateOpacity, setGateOpacity] = useState(1);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const totalSlides = SLIDES_DATA.length;

  // Sync de la lecture vidéo
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

  // Lancement du Portail Immersif (Même logique que le code HTML)
  const handleNext = useCallback(() => {
    if (isTransitioning) return;

    const targetIndex = (currentIndex + 1) % totalSlides;
    setNextIndex(targetIndex);
    setIsTransitioning(true);

    const startTime = performance.now();
    const duration = 1350; // Durée exacte de l'animation HTML

    const animatePortal = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const p = Math.min(elapsed / duration, 1);

      // 1. Calcul du Zoom de l'arche (Prise d'élan puis explosion scale x22)
      let currentScale = 1;
      let currentBlur = 0;
      let currentOpacity = 1;

      if (p < 0.35) {
        // Prise d'élan (recul léger)
        const subP = p / 0.35;
        currentScale = 1 - 0.08 * subP;
        currentBlur = 0;
        currentOpacity = 1;
      } else {
        // Projection fulgurante vers la caméra
        const subP = (p - 0.35) / 0.65;
        const easedZoom = Math.pow(subP, 3);
        currentScale = 0.92 + (22 - 0.92) * easedZoom; // Zoom jusqu'à x22
        currentBlur = subP * 20; // Motion blur
        currentOpacity = 1 - Math.pow(subP, 2); // Disparition progressive
      }

      // 2. Calcul du Masque Radial (S'ouvre en synchronie)
      let easedRadius = 0;
      if (p < 0.35) {
        easedRadius = Math.pow(p / 0.35, 2) * 0.05;
      } else {
        const subP = (p - 0.35) / 0.65;
        easedRadius = 0.05 + Math.pow(subP, 3) * 0.95;
      }

      setGateScale(currentScale);
      setGateBlur(currentBlur);
      setGateOpacity(currentOpacity);
      setRevealRadius(easedRadius * 180);

      if (p < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePortal);
      } else {
        // Réinitialisation et changement de slide
        setCurrentIndex(targetIndex);
        if (onSlideChange) onSlideChange(targetIndex);
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
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black select-none">
      
      {/* COUCHES VIDÉOS EN ARRIÈRE-PLAN */}
      {SLIDES_DATA.map((slide, index) => {
        const isActive = index === currentIndex;
        const isNext = index === nextIndex;

        if (!isActive && !isNext) return null;

        return (
          <div
            key={slide.id}
            className="absolute inset-0 w-full h-full"
            style={{
              zIndex: isActive ? 1 : 2,
              ...(isNext && isTransitioning
                ? {
                    WebkitMaskImage: `radial-gradient(circle at 50% 50%, #000 ${revealRadius}%, transparent ${revealRadius + 4}%)`,
                    maskImage: `radial-gradient(circle at 50% 50%, #000 ${revealRadius}%, transparent ${revealRadius + 4}%)`,
                    willChange: 'mask-image, -webkit-mask-image',
                  }
                : {})
            }}
          >
            <video
              ref={(el) => { videoRefs.current[index] = el; }}
              src={slide.videoUrl}
              poster={slide.posterUrl}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
          </div>
        );
      })}

      {/* OVERLAY SOMBRETTE */}
      <div 
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.8) 100%)
          `
        }}
      />

      {/* PORTAIL / ARCHE AVEC EFFECT ZOOM SUR CAMÉRA — légèrement plus bas pour laisser monter les titres latéraux */}
      <div 
        onClick={handleNext}
        className="absolute left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group pointer-events-auto sm:top-[55%] md:top-[56%]"
        style={{ perspective: '1000px' }}
      >
        <div 
          className="relative w-[260px] h-[330px] sm:w-[320px] sm:h-[400px] md:w-[380px] md:h-[480px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{
            transform: `scale(${gateScale})`,
            filter: `blur(${gateBlur}px) drop-shadow(0 0 ${40 + gateBlur * 4}px rgba(243, 204, 19, 0.5))`,
            opacity: gateOpacity,
            willChange: 'transform, filter, opacity',
            transformOrigin: 'center center'
          }}
        >
          <Image 
            src="/images/Back2Mboa_Portail_Terre_Cuite.webp" 
            alt="Portail Back2Mboa"
            fill
            priority
            className="object-contain"
          />

          {/* BOUTON PLAY AU CENTRE (Masqué pendant la téléportation) */}
          <div 
            className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-2xl ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current ml-1" />
          </div>
        </div>
      </div>

    </div>
  );
}