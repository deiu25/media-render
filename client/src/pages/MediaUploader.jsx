// MediaUploader.jsx
import { useRef } from "react";
import useFileUpload from "../hooks/useFileUpload";
import { uploadFilesToServer } from "../services/api";
import FileUploader from "../components/FileUploader";
import MediaPreview from "../components/MediaPreview";


export default function MediaUploader() {
  const { mediaFiles, handleFileUpload, clearFiles } = useFileUpload();
  const fileInputRef = useRef(null);
  
  const handleUpload = async () => {
    await uploadFilesToServer(mediaFiles);
    clearFiles();
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Media</h2>
      
      <FileUploader
        onFileSelect={handleFileUpload}
        fileInputRef={fileInputRef}
      />
      
      {mediaFiles.length > 0 && (
        <MediaPreview files={mediaFiles} />
      )}

      <button
        onClick={handleUpload}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
      >
        Upload to Server
      </button>

      <button
        onClick={clearFiles}
        className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
      >
        Clear All
      </button>
    </div>
  );
}
