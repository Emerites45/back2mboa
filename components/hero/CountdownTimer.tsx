"use client";

import { useEffect, useId, useState } from "react";

export function CountdownTimer({ targetDate }: { targetDate: string }) {
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
    <div className="grid grid-cols-4 divide-x divide-white/15 text-center" key={timerId}>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">
          {timeLeft.days}
        </div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">
          JOURS
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">
          {timeLeft.hours}
        </div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">
          HEURES
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">
          {timeLeft.minutes}
        </div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">
          MIN
        </div>
      </div>
      <div className="px-1">
        <div className="text-xl sm:text-2xl font-black text-white drop-shadow">
          {timeLeft.seconds}
        </div>
        <div className="text-[9px] text-white/80 font-bold uppercase mt-0.5">
          SEC
        </div>
      </div>
    </div>
  );
}
