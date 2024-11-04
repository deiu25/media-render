import { useState, useEffect } from "react";
import { ConfirmToast } from "react-confirm-toast";

export default function MediaManager() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);

  useEffect(() => {
    // Funcție pentru a obține fișierele media de la server
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
        console.error("Eroare la obținerea fișierelor media:", error);
      }
    };

    fetchMediaFiles();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/media/${fileId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMediaFiles((prevFiles) =>
          prevFiles.filter((file) => file.id !== fileId)
        );
      } else {
        console.error("Eroare la ștergerea fișierului.");
      }
    } catch (error) {
      console.error("Eroare la ștergerea fișierului:", error);
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
    }
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Media Manager</h2>

      {mediaFiles.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaFiles.map((file) => (
            <div
              key={file.id}
              className="relative bg-gray-700 p-2 rounded-lg overflow-hidden"
            >
              {file.filetype.startsWith("image") ? (
                <img
                  src={file.url}
                  alt={file.filename}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={file.url}
                  className="w-full h-full object-cover"
                  controls={false}
                  muted
                ></video>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-75 p-2 flex justify-between items-center text-sm text-white">
                <span>{file.filename}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => confirmDelete(file.id)}
                    className="px-2 py-1 bg-red-600 rounded hover:bg-red-500"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          Nu există fișiere media încărcate.
        </p>
      )}

      {showConfirm && (
        <ConfirmToast
          showConfirmToast={showConfirm}
          setShowConfirmToast={setShowConfirm}
          customFunction={executeDelete}
          toastText="Ești sigur că vrei să ștergi acest fișier?"
          buttonYesText="Da"
          buttonNoText="Nu"
          asModal={true}
        />
      )}
    </div>
  );
}
