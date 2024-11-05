import { useState, useEffect } from "react";

export default function Settings() {
  const [playOrder, setPlayOrder] = useState("asc");
  const [playbackTime, setPlaybackTime] = useState(5.0);
  const [statusMessage, setStatusMessage] = useState("");

  // Preluarea setărilor existente la montarea componentei
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/settings/");
        if (response.ok) {
          const data = await response.json();
          setPlayOrder(data.play_order);
          setPlaybackTime(data.playback_time);
        } else {
          console.error("Error fetching settings.");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  // Funcția pentru actualizarea setărilor
  const handleSaveSettings = async () => {
    const settingsData = {
      play_order: playOrder,
      playback_time: parseFloat(playbackTime),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/settings/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settingsData),
      });
      if (response.ok) {
        setStatusMessage("Settings updated successfully!");
      } else {
        setStatusMessage("Failed to update settings.");
      }
    } catch (error) {
      setStatusMessage("An error occurred while updating settings.");
      console.error("Error updating settings:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-white">Settings</h2>

      <div className="mb-4">
        <label className="block text-white mb-2">Play Order</label>
        <select
          value={playOrder}
          onChange={(e) => setPlayOrder(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-white mb-2">Playback Time (seconds)</label>
        <input
          type="number"
          min="1"
          step="0.5"
          value={playbackTime}
          onChange={(e) => setPlaybackTime(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg"
        />
      </div>

      <button
        onClick={handleSaveSettings}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
      >
        Save Settings
      </button>

      {statusMessage && <p className="mt-4 text-center text-gray-300">{statusMessage}</p>}
    </div>
  );
}
