"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date("March 6, 2026 09:00:00").getTime();

function FlipCard({ value, label, prevValue }: { value: number; label: string; prevValue: number }) {
  const [isFlipping, setIsFlipping] = useState(false);
  const displayValue = String(value).padStart(2, "0");
  const prevDisplayValue = String(prevValue).padStart(2, "0");

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center">
      <div className="flip-card w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 lg:w-28 lg:h-32 relative">
        <div className="flip-card-inner">
          {/* Top half - static */}
          <div className="flip-card-front flex items-end justify-center pb-0 overflow-hidden">
            <span className="gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold translate-y-1/2">
              {displayValue}
            </span>
          </div>

          {/* Top flipping part */}
          {isFlipping && (
            <div className="absolute top-0 left-0 right-0 h-1/2 flip-card-front flip-animate-top overflow-hidden">
              <span className="gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2">
                {prevDisplayValue}
              </span>
            </div>
          )}

          {/* Bottom half - static */}
          <div className="flip-card-back flex items-start justify-center pt-0 overflow-hidden">
            <span className="gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold -translate-y-1/2">
              {displayValue}
            </span>
          </div>

          {/* Bottom flipping part */}
          {isFlipping && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/2 flip-card-back overflow-hidden"
              style={{
                transform: "rotateX(90deg)",
                transformOrigin: "top",
                animation: "flipBottom 0.3s ease-out 0.3s forwards"
              }}
            >
              <span className="gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold absolute bottom-1/2 left-1/2 -translate-x-1/2">
                {displayValue}
              </span>
            </div>
          )}

          {/* Divider line */}
          <div className="flip-card-divider" />
        </div>
      </div>

      {/* Label */}
      <span className="mt-2 sm:mt-3 text-[#8b7355] text-xs sm:text-sm tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [prevTimeLeft, setPrevTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  }, []);

  useEffect(() => {
    setHasMounted(true);
    const initial = calculateTimeLeft();
    setTimeLeft(initial);
    setPrevTimeLeft(initial);
  }, [calculateTimeLeft]);

  useEffect(() => {
    if (!hasMounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [hasMounted]);

  useEffect(() => {
    if (!isVisible || !hasMounted) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        setPrevTimeLeft(prev);
        return calculateTimeLeft();
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible, hasMounted, calculateTimeLeft]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 section-container"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[200px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.03)] via-transparent to-transparent blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-center gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-20 sm:mb-24 md:mb-28 lg:mb-32">
          Countdown to the Magic
        </h2>

        {/* Countdown Grid */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <FlipCard value={timeLeft.days} label="Days" prevValue={prevTimeLeft.days} />
          <FlipCard value={timeLeft.hours} label="Hours" prevValue={prevTimeLeft.hours} />
          <FlipCard value={timeLeft.minutes} label="Minutes" prevValue={prevTimeLeft.minutes} />
          <FlipCard value={timeLeft.seconds} label="Seconds" prevValue={prevTimeLeft.seconds} />
        </div>

        {/* Three diamond design */}
        <div className="mt-20 sm:mt-24 md:mt-28 lg:mt-32 flex items-center justify-center">
          {/* Left diamond */}
          <div className="w-4 h-4 rotate-45 border-2 border-[#c9a227]" />
          
          {/* Left line */}
          <div className="w-20 sm:w-28 md:w-32 h-px bg-gradient-to-r from-[#c9a227] via-[#c9a227]/80 to-transparent" />
          
          {/* Center diamond (larger with glow) */}
          <div className="relative mx-3 sm:mx-6">
            <div className="w-5 h-5 rotate-45 border-2 border-[#c9a227] relative z-10" />
            {/* Glow effect */}
            <div className="absolute inset-0 w-5 h-5 rotate-45 border-2 border-[#c9a227] blur-md opacity-50 -z-10" style={{ boxShadow: '0 0 12px rgba(201, 162, 39, 0.6)' }} />
          </div>
          
          {/* Right line */}
          <div className="w-20 sm:w-28 md:w-32 h-px bg-gradient-to-l from-[#c9a227] via-[#c9a227]/80 to-transparent" />
          
          {/* Right diamond */}
          <div className="w-4 h-4 rotate-45 border-2 border-[#c9a227]" />
        </div>
      </div>
    </section>
  );
}

