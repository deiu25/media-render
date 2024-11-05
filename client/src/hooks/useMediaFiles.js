import { useState, useEffect } from "react";
import * as api from "../services/api";

export default function useFetchMedia() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({ play_order: "custom", playback_time: 5.0 });

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

  useEffect(() => {
    fetchData();
  }, []);

  return { mediaFiles, setMediaFiles, settings, error, refetchMediaFiles: fetchData };
}
