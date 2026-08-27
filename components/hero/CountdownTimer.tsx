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

  const units = [
    { value: timeLeft.days, label: 'JOURS' },
    { value: timeLeft.hours, label: 'HEURES' },
    { value: timeLeft.minutes, label: 'MIN' },
    { value: timeLeft.seconds, label: 'SEC' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="bg-white/20 border border-white/20 p-3 rounded-lg"
        >
          <div className="text-xl sm:text-2xl font-black text-white">{unit.value}</div>
          <div className="text-[9px] text-gray-400 uppercase font-semibold mt-0.5">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}