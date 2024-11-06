// hooks/useSettings.js
import { useState, useEffect } from "react";
import { updateSettings } from "../services/api";

export default function useSettings(initialPlaybackTime) {
  const [playbackTime, setPlaybackTime] = useState(initialPlaybackTime);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    setPlaybackTime(initialPlaybackTime);
  }, [initialPlaybackTime]);

  const saveSettings = async () => {
    const settingsData = {
      play_order: "custom",
      playback_time: parseFloat(playbackTime),
    };
    const message = await updateSettings(settingsData);
    setStatusMessage(message);
  };

  return {
    playbackTime,
    setPlaybackTime,
    saveSettings,
    statusMessage,
  };
}
