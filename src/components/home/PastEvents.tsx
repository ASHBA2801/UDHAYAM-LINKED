"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Placeholder images - replace with actual past event images
const pastEventImages = [
  { id: 1, src: "/past-events/event1.jpg", title: "UDHAYAM 2K25" },
  { id: 2, src: "/past-events/event2.jpg", title: "UDHAYAM 2K24" },
  { id: 3, src: "/past-events/event3.jpg", title: "UDHAYAM 2K23" },
  { id: 4, src: "/past-events/event4.jpg", title: "UDHAYAM 2K22" },
  { id: 5, src: "/past-events/event5.jpg", title: "UDHAYAM 2K21" },
];

export default function PastEvents() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for visibility
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

  // Auto-switch images every 4 seconds
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pastEventImages.length);
        setIsTransitioning(false);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section
      ref={sectionRef}
      className="relative pt-2 sm:pt-4 md:pt-6 pb-20 sm:pb-28 md:pb-36 section-container overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className={`w-[600px] h-[400px] rounded-full bg-gradient-radial from-[rgba(201,162,39,0.06)] via-[rgba(201,162,39,0.02)] to-transparent blur-3xl transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2
          className={`text-center gold-glow text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.2em] uppercase mb-20 sm:mb-24 md:mb-28 lg:mb-32 scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
        >
          Past Events
        </h2>

        {/* Image Carousel */}
        <div
          className={`relative max-w-4xl mx-auto scroll-reveal ${
            isVisible ? "visible" : ""
          }`}
          style={{ transitionDelay: "0.2s" }}
        >
          {/* Main Image Container */}
          <div className="relative aspect-video rounded-lg overflow-hidden border border-[rgba(201,162,39,0.2)] shadow-[0_0_30px_rgba(201,162,39,0.1)]">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,5,8,0.8)] via-transparent to-[rgba(5,5,8,0.3)] z-10 pointer-events-none" />
            
            {/* Image */}
            <div
              className={`relative w-full h-full transition-opacity duration-500 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <Image
                src={pastEventImages[currentIndex].src}
                alt={pastEventImages[currentIndex].title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
              />
            </div>

            {/* Event Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20">
              <h3
                className={`text-[#d4c5a9] text-xl sm:text-2xl md:text-3xl tracking-[0.15em] uppercase transition-opacity duration-500 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                {pastEventImages[currentIndex].title}
              </h3>
            </div>

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a227] z-20" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#c9a227] z-20" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#c9a227] z-20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a227] z-20" />
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {pastEventImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#c9a227] scale-125 shadow-[0_0_10px_rgba(201,162,39,0.6)]"
                    : "bg-[#8b7355] hover:bg-[#c9a227]/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
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

