import { useState, useEffect } from "react";

export default function useMediaLoop(mediaFiles, intervalTime = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (mediaFiles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [mediaFiles, isPaused, intervalTime]);

  return { currentIndex, isPaused, setIsPaused };
}
