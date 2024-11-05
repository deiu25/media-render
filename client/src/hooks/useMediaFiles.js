// hooks/useMediaFiles.js
import { useState, useEffect } from "react";
import { fetchMediaFiles, fetchSettings } from "../services/api";

export default function useFetchMedia() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({ play_order: "asc", playback_time: 5.0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const files = await fetchMediaFiles();
        const settingsData = await fetchSettings();
        setMediaFiles(files);
        setSettings(settingsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { mediaFiles, settings, error };
}
