"use client";

import { useEffect, useRef, useState } from "react";

function GuestCard() {
  return (
    <div className="guest-card p-6 sm:p-8 flex flex-col items-center">
      {/* Silhouette Image Placeholder */}
      <div className="relative w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 mb-6 overflow-hidden rounded-lg">
        {/* Dark gradient background simulating silhouette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] via-[#0f0f1a] to-[#050508]" />
        
        {/* Silhouette shape */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-24 h-32 sm:w-28 sm:h-36 md:w-32 md:h-40 text-[#0a0a0f]"
            viewBox="0 0 100 130"
            fill="currentColor"
          >
            {/* Head */}
            <circle cx="50" cy="30" r="25" />
            {/* Body */}
            <ellipse cx="50" cy="95" rx="35" ry="35" />
          </svg>
        </div>

        {/* Question mark overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="gold-glow-intense text-5xl sm:text-6xl md:text-7xl font-bold">
            ?
          </span>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-radial from-[rgba(201,162,39,0.1)] via-transparent to-transparent" />
      </div>

      {/* Guest Name */}
      <h3 className="text-[#d4c5a9] text-lg sm:text-xl md:text-2xl tracking-[0.2em] uppercase">
        UNKNOWN
      </h3>
    </div>
  );
}

export default function ChiefGuests() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
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
  }, []);

  return (
    <section
      ref={sectionRef}
      id="guests"
      className="relative py-16 sm:py-24 md:py-32 section-container"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[rgba(201,162,39,0.02)] via-transparent to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-radial from-[rgba(13,19,33,0.3)] via-transparent to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          className={`text-center gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-12 sm:mb-16 md:mb-20 scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
        >
          CHIEF GUESTS
        </h2>

        {/* Guest Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Guest 1 */}
          <div className="flex justify-center md:justify-end">
            <GuestCard />
          </div>

          {/* Guest 2 */}
          <div className="flex justify-center md:justify-start">
            <GuestCard />
          </div>
        </div>

        {/* Three diamond design */}
        <div className="mt-12 sm:mt-16 flex items-center justify-center">
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

