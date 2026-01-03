"use client";

import { useEffect, useRef, useState, useMemo } from "react";

export default function PrizePool() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const maxCountReached = useRef(0);
  const TARGET = 1000000;

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Check if section is in viewport
      const isInView = sectionTop < windowHeight && sectionBottom > 0;
      
      if (isInView) {
        setIsVisible(true);
        
        // If target has already been reached, keep it static
        if (maxCountReached.current >= TARGET) {
          setCount(TARGET);
          return;
        }
        
        // Calculate scroll progress through the section
        // Progress starts when section enters viewport and completes when it's fully visible
        let progress = 0;
        
        if (sectionTop >= 0 && sectionTop < windowHeight) {
          // Section is entering from bottom - calculate based on how much has entered
          // Use a smoother calculation based on viewport intersection
          const visibleHeight = windowHeight - sectionTop;
          const sectionHeight = rect.height;
          const maxVisibleHeight = Math.min(sectionHeight, windowHeight);
          progress = Math.min(1, visibleHeight / maxVisibleHeight);
        } else if (sectionTop < 0 && sectionBottom > windowHeight) {
          // Section is fully in viewport
          progress = 1;
        } else if (sectionTop < 0 && sectionBottom <= windowHeight) {
          // Section is leaving from top - still at full progress
          progress = 1;
        }
        
        // Apply easing function
        progress = Math.max(0, Math.min(1, progress));
        const easedProgress = easeOutQuart(progress);
        
        // Calculate count based on progress
        const currentCount = Math.floor(easedProgress * TARGET);
        
        // Track maximum count reached - once it reaches TARGET, keep it there
        if (currentCount > maxCountReached.current) {
          maxCountReached.current = currentCount;
        }
        
        // If we've reached the target, always show the target value
        if (maxCountReached.current >= TARGET) {
          setCount(TARGET);
        } else {
          setCount(currentCount);
        }
      } else {
        // When out of view, keep the max count if target was reached
        setIsVisible(false);
        if (maxCountReached.current >= TARGET) {
          // Keep at target if it was reached
          setCount(TARGET);
        } else {
          // Reset only if target wasn't reached
          setCount(0);
          maxCountReached.current = 0;
        }
      }
    };

    // Initial check
    handleScroll();

    // Listen to scroll events with throttling for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-IN");
  };

  // Generate sparkle positions (memoized to prevent regeneration on every render)
  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      delay: `${Math.random() * 2}s`,
    }));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 section-container overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[500px] h-[500px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.08)] via-[rgba(201,162,39,0.02)] to-transparent blur-3xl transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Sparkles */}
      {isVisible &&
        sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDelay: sparkle.delay,
            }}
          />
        ))}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h2
          className={`text-center gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-20 sm:mb-24 md:mb-28 lg:mb-32 scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
        >
          Total Prize Pool
        </h2>

        {/* Prize Amount */}
        <div className="relative inline-block">
          {/* Rupee symbol */}
          <span
            className={`text-[#d4c5a9] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mr-2 ${
              isVisible && count >= TARGET * 0.95 ? "count-glow" : ""
            }`}
            style={{
              textShadow: '0 0 10px rgba(212, 197, 169, 0.6), 0 0 20px rgba(212, 197, 169, 0.4), 0 0 30px rgba(212, 197, 169, 0.3)'
            }}
          >
            ₹
          </span>

          {/* Animated number */}
          <span
            className={`text-[#d4c5a9] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-wider ${
              isVisible && count >= TARGET * 0.95 ? "count-glow" : ""
            }`}
            style={{
              textShadow: '0 0 10px rgba(212, 197, 169, 0.6), 0 0 20px rgba(212, 197, 169, 0.4), 0 0 30px rgba(212, 197, 169, 0.3), 0 0 40px rgba(212, 197, 169, 0.2)'
            }}
          >
            {formatNumber(count)}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className={`mt-6 sm:mt-8 text-[#d4c5a9] text-base sm:text-lg md:text-xl tracking-[0.15em] scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "0.3s" }}
        >
          Worth of Prizes & Rewards
        </p>

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

