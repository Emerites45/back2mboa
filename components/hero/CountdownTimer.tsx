"use client";

import React, { useState, useEffect, useId } from "react";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import HeroBackgroundSlider from "@/components/hero/HeroBackgroundSlider";
import { SLIDES_DATA, SlideData } from "@/data/slides";

const APFEL =
  "var(--font-apfel-grotezk), 'Apfel Grotezk', system-ui, sans-serif";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 122,
    hours: 15,
    minutes: 40,
    seconds: 21,
  });
  const timerId = useId();

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className="grid grid-cols-4 divide-x divide-white/15 text-center"
      key={timerId}
      style={{ fontFamily: APFEL }}
    >
      <div className="px-1">
        <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
          {timeLeft.days}
        </div>
        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
          JOURS
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
          {timeLeft.hours}
        </div>
        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
          HEURES
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
          {timeLeft.minutes}
        </div>
        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
          MIN
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl font-bold text-white drop-shadow sm:text-2xl">
          {timeLeft.seconds}
        </div>
        <div className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-white/85 sm:text-[11px]">
          SEC
        </div>
      </div>
    </div>
  );
}