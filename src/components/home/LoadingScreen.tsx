"use client";

import { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnd = () => {
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        setIsFading(true);
        
        setTimeout(() => {
          setIsComplete(true);
          onComplete();
        }, 1000);
      }
    };

    const handleCanPlay = () => {
      video.play().catch(() => {
        // If autoplay fails, skip loading screen
        handleVideoEnd();
      });
    };

    // Handle video error
    const handleError = () => {
      handleVideoEnd();
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Fallback timeout in case video doesn't load
    const fallbackTimeout = setTimeout(() => {
      if (!hasPlayedRef.current) {
        handleVideoEnd();
      }
    }, 10000);

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  if (isComplete) return null;

  return (
    <div
      className={`loading-screen flex items-center justify-center ${
        isFading ? "loading-fade-out" : ""
      }`}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/Loading page.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

