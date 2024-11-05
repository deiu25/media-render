import { useState } from "react";
import { ConfirmToast } from "react-confirm-toast";
import PaginatedImages from "../components/PaginatedImages";
import { deleteMediaFile } from "../services/api";
import useFetchMedia from "../hooks/useMediaFiles";

export default function MediaManager() {
  const { mediaFiles, setMediaFiles, error } = useFetchMedia(); 
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  const handleDelete = async (fileId) => {
    try {
      await deleteMediaFile(fileId);
      setMediaFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const confirmDelete = (fileId) => {
    setFileToDelete(fileId);
    setShowConfirm(true);
  };

  const executeDelete = () => {
    if (fileToDelete !== null) {
      handleDelete(fileToDelete);
      setFileToDelete(null);
      setShowConfirm(false);
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

      {showConfirm && (
        <ConfirmToast
          showConfirmToast={showConfirm}
          setShowConfirmToast={setShowConfirm}
          customFunction={executeDelete}
          toastText="Are you sure you want to delete this file?"
          buttonYesText="Yes"
          buttonNoText="No"
          asModal={true}
        />
      )}
    </div>
  );
}
