// hooks/useMediaLoop.jsx
import { useState, useEffect } from "react";

export default function useMediaLoop(mediaFiles, playOrder = "asc", intervalTime = 5) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Restart from the first image if the media list changes
    setCurrentIndex(0);
  }, [mediaFiles]);

  useEffect(() => {
    if (mediaFiles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Calculate next index based on play order
        const nextIndex =
          playOrder === "asc"
            ? (prevIndex + 1) % mediaFiles.length
            : (prevIndex - 1 + mediaFiles.length) % mediaFiles.length;

        return nextIndex;
      });
    }, intervalTime * 1000);

    return () => clearInterval(interval);
  }, [mediaFiles, isPaused, intervalTime, playOrder, currentIndex]);

  return { currentIndex, isPaused, setIsPaused };
}
