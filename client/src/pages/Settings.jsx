// components/Settings.jsx
import { useEffect, useState } from "react";
import OrderPreview from "../components/OrderPreview";
import useMediaManager from "../hooks/useMediaManager";
import useSettings from "../hooks/useSettings";
import { reorderMediaFiles } from "../services/api";

export default function Settings() {
  const { mediaFiles, settings } = useMediaManager();
  const [customOrder, setCustomOrder] = useState(mediaFiles);

  const { playbackTime, setPlaybackTime, saveSettings, statusMessage } = useSettings(
    settings.playback_time
  );

  useEffect(() => {
    setCustomOrder(mediaFiles);
  }, [mediaFiles]);

  const handleReorder = async (newOrder) => {
    setCustomOrder(newOrder);
    try {
      await reorderMediaFiles(newOrder);
    } catch (error) {
      console.error("Error reordering media files:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-4 text-white">Settings</h2>

      <div className="flex flex-col items-center space-y-4 mb-4">
        <label className="block text-white">Playback Time (seconds)</label>
        <input
          type="number"
          min="1"
          step="0.5"
          value={playbackTime}
          onChange={(e) => setPlaybackTime(Number(e.target.value))}
          className="w-[20%] px-3 py-2 bg-gray-700 text-white rounded-lg text-center"
        />

        <button
          onClick={saveSettings}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
        >
          Save Settings
        </button>
      </div>

      {statusMessage && <p className="text-gray-300">{statusMessage}</p>}

      <h3 className="mt-6 text-lg font-semibold text-white">Order Preview</h3>
      <OrderPreview images={customOrder} onReorder={handleReorder} />
    </div>
  );
}
