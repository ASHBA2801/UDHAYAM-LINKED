"use client";

import { useEffect, useRef } from "react";

export default function AnimatedStars() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars
    const starCount = 100;
    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "animated-star";
      
      // Random position
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size (small, medium, large)
      const size = Math.random();
      if (size < 0.7) {
        star.style.width = "2px";
        star.style.height = "2px";
        star.style.boxShadow = "0 0 2px rgba(212, 197, 169, 0.8)";
      } else if (size < 0.9) {
        star.style.width = "3px";
        star.style.height = "3px";
        star.style.boxShadow = "0 0 4px rgba(212, 197, 169, 0.9), 0 0 8px rgba(201, 162, 39, 0.5)";
      } else {
        star.style.width = "4px";
        star.style.height = "4px";
        star.style.boxShadow = "0 0 6px rgba(212, 197, 169, 1), 0 0 12px rgba(201, 162, 39, 0.6)";
      }
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.style.animationDuration = `${3 + Math.random() * 4}s`;
      
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((star) => star.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ zIndex: 0 }}
    />
  );
}

