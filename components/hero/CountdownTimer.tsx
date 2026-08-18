'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
        <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.days}</div>
        <div className="text-[9px] text-gray-400 uppercase font-semibold">JOURS</div>
      </div>
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
        <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.hours}</div>
        <div className="text-[9px] text-gray-400 uppercase font-semibold">HEURES</div>
      </div>
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
        <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.minutes}</div>
        <div className="text-[9px] text-gray-400 uppercase font-semibold">MIN</div>
      </div>
      <div className="bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg">
        <div className="text-xl sm:text-2xl font-black text-white">{timeLeft.seconds}</div>
        <div className="text-[9px] text-gray-400 uppercase font-semibold">SEC</div>
      </div>
    </div>
  );
}