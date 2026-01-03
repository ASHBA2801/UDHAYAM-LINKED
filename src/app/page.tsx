"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useLoading } from "@/contexts/LoadingContext";
import HeroSection from "@/components/home/HeroSection";
import CountdownTimer from "@/components/home/CountdownTimer";
import ChiefGuests from "@/components/home/ChiefGuests";
import PrizePool from "@/components/home/PrizePool";
import PastEvents from "@/components/home/PastEvents";
import Footer from "@/components/home/Footer";

// Dynamically import LoadingScreen to avoid hydration issues
const LoadingScreen = dynamic(() => import("@/components/home/LoadingScreen"), {
  ssr: false,
});

export default function Home() {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // Check if we should skip loading screen (e.g., coming from sign-in page)
    if (typeof window !== "undefined") {
      const skipLoading = sessionStorage.getItem("skipLoading");
      if (skipLoading === "true") {
        setIsLoading(false);
        sessionStorage.removeItem("skipLoading");
      }
    }
  }, [setIsLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen - Only show if loading */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"
          }`}
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Chief Guests Section */}
        <ChiefGuests />

        {/* Prize Pool Section */}
        <PrizePool />

        {/* Past Events Section */}
        <PastEvents />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
