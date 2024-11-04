import { useState, useEffect } from "react";
import { fetchMediaFiles } from "../services/api";

export default function useFetchMedia() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const files = await fetchMediaFiles();
        setMediaFiles(files);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { mediaFiles, setMediaFiles, error };
}
