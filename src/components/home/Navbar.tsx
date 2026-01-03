"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/contexts/LoadingContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Departments", href: "/departments" },
  { label: "Schedule", href: "/schedule" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { isLoading } = useLoading();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  // Hide navbar during loading only on home page
  const pathname = usePathname();
  if (isLoading && pathname === "/") return null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "navbar-glass py-3" : "bg-transparent py-4"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            {/* Mobile/Tablet spacer for balance */}
            <div className="lg:hidden w-12"></div>

            {/* Mobile/Tablet Title - Centered */}
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-xl md:text-2xl font-bold text-[#d4c5a9] tracking-wide">
                <span className="gold-glow font-decorative">UDHAYAM</span>
              </h1>
            </div>

            {/* Empty spacer for desktop layout balance */}
            <div className="hidden lg:block flex-shrink-0 w-10 sm:w-12" />

            {/* Desktop Navigation - Center (lg and above) */}
            <div className="hidden lg:flex items-center justify-center flex-1 px-8">
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/" || item.href === "/schedule" || item.href === "/contact") {
                        sessionStorage.setItem("skipLoading", "true");
                      }
                    }}
                    className="text-[#d4c5a9] hover:text-[#c9a227] transition-colors duration-300 underline-reveal text-sm tracking-widest uppercase"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop Action Buttons - Right (lg and above) */}
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="/signin"
                className="btn-magical text-xs"
              >
                Sign in
              </a>
              <a
                href="#register"
                className="btn-magical btn-magical-primary text-xs"
              >
                Get Started
              </a>
            </div>

            {/* Mobile/Tablet Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative w-12 h-12 md:w-14 md:h-14 flex flex-col items-center justify-center space-y-1.5 group rounded-lg border-2 border-white bg-black transition-all duration-300 hover:border-[#c9a227] hover:bg-[rgba(201,162,39,0.1)]"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 md:w-6 h-0.5 bg-[#c9a227] transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2 md:translate-y-2.5" : ""
                  }`}
              />
              <span
                className={`w-5 md:w-6 h-0.5 bg-[#c9a227] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`w-5 md:w-6 h-0.5 bg-[#c9a227] transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2 md:-translate-y-2.5" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden mobile-menu-overlay">
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-[#050508]/95 backdrop-blur-md"
            onClick={closeMenu}
          />

          {/* Menu Content */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm md:max-w-md bg-gradient-to-b from-[#0d1321] to-[#050508] mobile-menu-content border-l border-[rgba(201,162,39,0.1)]">
            <div className="flex flex-col h-full pt-24 md:pt-28 px-8 md:px-10">
              {/* Navigation Links */}
              <nav className="flex flex-col space-y-6 md:space-y-8">
                {navItems.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/" || item.href === "/schedule" || item.href === "/contact") {
                        sessionStorage.setItem("skipLoading", "true");
                      }
                      closeMenu();
                    }}
                    className="text-[#d4c5a9] hover:text-[#c9a227] transition-colors duration-300 text-xl md:text-2xl tracking-widest uppercase"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Action Buttons */}
              <div className="mt-auto mb-12 md:mb-16 space-y-4">
                <a
                  href="/signin"
                  onClick={closeMenu}
                  className="btn-magical block text-center w-full text-sm md:text-base py-3 md:py-4"
                >
                  Sign in
                </a>
                <a
                  href="#register"
                  onClick={closeMenu}
                  className="btn-magical btn-magical-primary block text-center w-full text-sm md:text-base py-3 md:py-4"
                >
                  Get Started
                </a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-8 md:bottom-12 left-8 md:left-10 right-8 md:right-10 border-t border-[rgba(201,162,39,0.1)] pt-4">
                <p className="text-[#8b7355] text-xs md:text-sm tracking-wider text-center">
                  UDHAYAM 2K26
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

