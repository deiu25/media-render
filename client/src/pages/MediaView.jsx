// pages/MediaView.jsx
import { useNavigate } from "react-router-dom";
import useMediaManager from "../hooks/useMediaManager";

export default function MediaView() {
  const { mediaFiles, currentIndex, isPaused, setIsPaused, error } = useMediaManager();
  const navigate = useNavigate();

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (mediaFiles.length === 0)
    return (
      <p className="text-center text-gray-400">
        No media files available for display.
      </p>
    );

  const currentMedia = mediaFiles[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      {currentMedia?.filetype.startsWith("image") ? (
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
        />
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
