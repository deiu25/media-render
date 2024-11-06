// hooks/useMediaManager.js
import { useState, useEffect, useCallback } from "react";
import * as api from "../services/api";

export default function useMediaManager() {
  const [state, setState] = useState({
    mediaFiles: [],
    settings: { play_order: "custom", playback_time: 5.0 },
    currentIndex: 0,
    isPaused: false,
    error: null,
  });

  const fetchMediaData = useCallback(async () => {
    try {
      const [files, settingsData] = await Promise.all([api.fetchMediaFiles(), api.fetchSettings()]);
      setState((prev) => ({
        ...prev,
        mediaFiles: files.sort((a, b) => a.display_order - b.display_order),
        settings: settingsData,
      }));
    } catch (err) {
      setState((prev) => ({ ...prev, error: err.message }));
    }
  }, []);

  useEffect(() => {
    fetchMediaData();
  }, [fetchMediaData]);

  useEffect(() => {
    if (state.mediaFiles.length === 0 || state.isPaused) return;

    const intervalId = setInterval(() => {
      setState((prev) => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.mediaFiles.length,
      }));
    }, state.settings.playback_time * 1000);

    return () => clearInterval(intervalId);
  }, [state.mediaFiles, state.isPaused, state.settings.playback_time]);

  return {
    ...state,
    setIsPaused: (isPaused) => setState((prev) => ({ ...prev, isPaused })),
    setSettings: (settings) => setState((prev) => ({ ...prev, settings })),
    refetchMediaFiles: fetchMediaData,
  };
}
