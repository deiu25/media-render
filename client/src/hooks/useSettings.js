// hooks/useSettings.js
import { useState, useEffect } from "react";

export default function useSettings(initialPlaybackTime, settingsUrl) {
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
    try {
      const response = await fetch(settingsUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsData),
      });
      setStatusMessage(response.ok ? "Settings updated successfully!" : "Failed to update settings.");
    } catch (error) {
      setStatusMessage("An error occurred while updating settings.");
      console.error("Error updating settings:", error);
    }
  };

  return {
    playbackTime,
    setPlaybackTime,
    saveSettings,
    statusMessage,
  };
}
