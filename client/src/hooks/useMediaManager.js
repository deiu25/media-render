// hooks/useMediaManager.js
import { useState, useEffect } from "react";
import * as api from "../services/api";

export default function useMediaManager() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [settings, setSettings] = useState({ play_order: "custom", playback_time: 5.0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);

  // Fetch media files and settings on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const files = await api.fetchMediaFiles();
        const settingsData = await api.fetchSettings();
        setSettings(settingsData);

        const sortedFiles = files.sort((a, b) => a.display_order - b.display_order);
        setMediaFiles(sortedFiles);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  // Handle playback loop based on settings
  useEffect(() => {
    if (mediaFiles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % mediaFiles.length;
      });
    }, settings.playback_time * 1000);

    return () => clearInterval(interval);
  }, [mediaFiles, isPaused, settings.playback_time]);


  return {
    mediaFiles,
    currentIndex,
    isPaused,
    setIsPaused,
    settings,
    setSettings,
    error,
    refetchMediaFiles: async () => {
      try {
        const files = await api.fetchMediaFiles();
        setMediaFiles(files.sort((a, b) => a.display_order - b.display_order));
      } catch (err) {
        setError(err.message);
      }
    },
  };
}
