import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function MediaView() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  // Obține fișierele media din backend
  useEffect(() => {
    const fetchMediaFiles = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/media/");
        const data = await response.json();

        const filesWithUrls = data.map((file) => ({
          ...file,
          url: `http://127.0.0.1:8000/static/media/${file.filename}`,
        }));

        setMediaFiles(filesWithUrls);
      } catch (error) {
        console.error("Error fetching media files:", error);
      }
    };

    fetchMediaFiles();
  }, []);

  // Schimbare media în buclă
  useEffect(() => {
    if (mediaFiles.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaFiles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mediaFiles, isPaused]);

  if (mediaFiles.length === 0) {
    return <p className="text-center text-gray-400">No media files available for display.</p>;
  }

  const currentMedia = mediaFiles[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      {currentMedia.filetype.startsWith("image") ? (
        <img
          src={currentMedia.url}
          alt={`Media ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      ) : (
        <video
          src={currentMedia.url}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover transition-opacity duration-500"
        ></video>
      )}

      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Exit
      </button>

      <button
        onClick={() => setIsPaused(!isPaused)}
        className="absolute top-4 right-4 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
      >
        {isPaused ? "Play" : "Pause"}
      </button>
    </div>
  );
}

MediaView.propTypes = {
  mediaFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      filetype: PropTypes.string.isRequired,
    })
  ),
};
