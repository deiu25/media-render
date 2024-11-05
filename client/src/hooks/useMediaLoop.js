// hooks/useMediaLoop.jsx
import { useState, useEffect } from "react";

export default function useMediaLoop(mediaFiles, playOrder = "asc", intervalTime = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (mediaFiles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (playOrder === "asc") {
          return (prevIndex + 1) % mediaFiles.length;
        } else if (playOrder === "desc") {
          return (prevIndex - 1 + mediaFiles.length) % mediaFiles.length;
        } else {
          return prevIndex; // Custom ordering could be added here
        }
      });
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [mediaFiles, isPaused, intervalTime, playOrder]);

  return { currentIndex, isPaused, setIsPaused };
}
