// pages/MediaManager.jsx
import { useState } from "react";
import { ConfirmToast } from "react-confirm-toast";
import PaginatedImages from "../components/PaginatedImages";
import { deleteMediaFile } from "../services/api";
import useMediaManager from "../hooks/useMediaManager";

export default function MediaManager() {
  const { mediaFiles, error, refetchMediaFiles } = useMediaManager();
  const [confirmState, setConfirmState] = useState({ show: false, fileId: null });

  const handleDelete = async (fileId) => {
    try {
      await deleteMediaFile(fileId);
      refetchMediaFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const confirmDelete = (fileId) => setConfirmState({ show: true, fileId });

  const executeDelete = () => {
    if (confirmState.fileId !== null) {
      handleDelete(confirmState.fileId);
      setConfirmState({ show: false, fileId: null });
    }
  };

  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Media Manager</h2>

      {mediaFiles.length > 0 ? (
        <PaginatedImages images={mediaFiles} onDelete={confirmDelete} />
      ) : (
        <p className="text-center text-gray-400">There are no media files uploaded.</p>
      )}

      <ConfirmToast
        showConfirmToast={confirmState.show}
        setShowConfirmToast={(show) => setConfirmState((prev) => ({ ...prev, show }))}
        customFunction={executeDelete}
        toastText="Are you sure you want to delete this file?"
        buttonYesText="Yes"
        buttonNoText="No"
        asModal
      />
    </div>
  );
}
