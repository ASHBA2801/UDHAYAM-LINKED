"use client";

import { useEffect, useRef, useState } from "react";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Lazy load map when footer is visible
          setTimeout(() => setIsMapLoaded(true), 100);
        }
      },
      { threshold: 0.1 }
    );

    const footer = footerRef.current;
    if (footer) {
      observer.observe(footer);
    }

    return () => {
      if (footer) {
        observer.unobserve(footer);
      }
    };
  }, []);

  // Google Maps embed URL with dark styling
  const mapSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.4!2d77.08447477226164!3d10.999757945499377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDU5JzU5LjEiTiA3N8KwMDUnMDQuMSJF!5e0!3m2!1sen!2sin!4v1640000000000!5m2!1sen!2sin&maptype=roadmap`;

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative section-container border-t border-[rgba(201,162,39,0.1)]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#0a0a0f] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[450px]">
          {/* Left Half - Map */}
          <div
            className={`p-4 sm:p-6 lg:p-8 scroll-reveal ${isVisible ? "visible" : ""}`}
          >
            <h3 className="gold-glow text-lg sm:text-xl tracking-[0.2em] uppercase mb-4 sm:mb-6">
              Location
            </h3>

            <div className="map-container h-[250px] sm:h-[300px] lg:h-[350px]">
              {isMapLoaded ? (
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KIT CBE Location"
                />
              ) : (
                <div className="w-full h-full bg-[#0d1321] flex items-center justify-center">
                  <span className="text-[#8b7355] text-sm tracking-wider">Loading map...</span>
                </div>
              )}
            </div>

            <p className="mt-4 text-[#8b8b7a] text-sm tracking-wide">
              KIT - Kalaignarkarunanidhi Institute of Technology, Coimbatore
            </p>
          </div>

          {/* Right Half - Coordinators */}
          <div
            className={`p-4 sm:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-[rgba(201,162,39,0.1)] scroll-reveal ${
              isVisible ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <h3 className="gold-glow text-lg sm:text-xl tracking-[0.2em] uppercase mb-6 sm:mb-8">
              Coordinators
            </h3>

            {/* Coordinator Placeholders */}
            <div className="space-y-6">
              {/* Coordinator 1 */}
              <div className="flex items-center space-x-4 p-4 bg-[rgba(13,19,33,0.5)] rounded-lg border border-[rgba(201,162,39,0.1)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center border border-[rgba(201,162,39,0.2)]">
                  <span className="gold-glow text-lg">?</span>
                </div>
                <div>
                  <p className="text-[#d4c5a9] tracking-wider">Coordinator Name</p>
                  <p className="text-[#8b7355] text-sm tracking-wide">+91 XXXXX XXXXX</p>
                </div>
              </div>

              {/* Coordinator 2 */}
              <div className="flex items-center space-x-4 p-4 bg-[rgba(13,19,33,0.5)] rounded-lg border border-[rgba(201,162,39,0.1)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center border border-[rgba(201,162,39,0.2)]">
                  <span className="gold-glow text-lg">?</span>
                </div>
                <div>
                  <p className="text-[#d4c5a9] tracking-wider">Coordinator Name</p>
                  <p className="text-[#8b7355] text-sm tracking-wide">+91 XXXXX XXXXX</p>
                </div>
              </div>

              {/* Coordinator 3 */}
              <div className="flex items-center space-x-4 p-4 bg-[rgba(13,19,33,0.5)] rounded-lg border border-[rgba(201,162,39,0.1)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] flex items-center justify-center border border-[rgba(201,162,39,0.2)]">
                  <span className="gold-glow text-lg">?</span>
                </div>
                <div>
                  <p className="text-[#d4c5a9] tracking-wider">Coordinator Name</p>
                  <p className="text-[#8b7355] text-sm tracking-wide">+91 XXXXX XXXXX</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-[rgba(201,162,39,0.1)]">
              <p className="text-[#8b7355] text-sm tracking-[0.15em] uppercase mb-4">Follow Us</p>
              <div className="flex space-x-4">
                <a
                  href="https://kitcbe.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[rgba(201,162,39,0.2)] rounded text-[#d4c5a9] text-sm tracking-wider hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
                >
                  KIT-CBE
                </a>
                <a
                  href="https://www.instagram.com/kit_udhayam_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[rgba(201,162,39,0.2)] rounded text-[#d4c5a9] text-sm tracking-wider hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/udhayamkit/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-[rgba(201,162,39,0.2)] rounded text-[#d4c5a9] text-sm tracking-wider hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-300"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(201,162,39,0.1)] py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-[#8b7355] text-sm tracking-wider">
              © 2026 UDHAYAM. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-[#8b7355] text-sm">Made by KITians</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

