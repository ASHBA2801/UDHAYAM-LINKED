"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Create floating particles
    const section = sectionRef.current;
    if (!section) return;

    const particleContainer = section.querySelector(".particle-container");
    if (!particleContainer) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particle.style.animationDuration = `${10 + Math.random() * 10}s`;
      particleContainer.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden section-container pt-20 sm:pt-24 md:pt-28"
    >
      {/* Particle container */}
      <div className="particle-container absolute inset-0 pointer-events-none" />

      {/* Magical radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.05)] via-transparent to-transparent blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        {/* KIT-CBE */}
        <h2 className="hero-animate hero-animate-delay-1 text-[#8b7355] text-base sm:text-lg md:text-xl tracking-[0.1em] uppercase font-semibold mb-0 -mb-2 sm:-mb-3">
          KIT-Kalaignarkarunanidhi Institute of Technology,<br />Coimbatore
        </h2>

        {/* UDHAYAM Logo */}
        <div className="hero-animate hero-animate-delay-2 mb-0 -mt-6 sm:-mt-8">
          <Image
            src="/Logo.png"
            alt="UDHAYAM 2K26 Logo"
            width={800}
            height={400}
            className="h-[65vh] sm:h-[70vh] md:h-[75vh] w-auto object-contain mx-auto"
            priority
          />
        </div>

        {/* Date */}
        <p className="hero-animate hero-animate-delay-3 text-[#d4c5a9] text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.2em] uppercase mb-0 sm:mb-0 md:-mt-6 lg:-mt-8">
          MARCH 5–6th
        </p>

        {/* Decorative line with three diamonds */}
        <div className="hero-animate hero-animate-delay-3 mt-6 sm:mt-8 md:mt-1 lg:mt-2 flex items-center justify-center">
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

