import { useState, useRef } from "react";

export default function MediaUploader() {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const uploadFilesToServer = async () => {
    setUploadStatus("Uploading...");
    const formData = new FormData();

    mediaFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Upload successful!");
        setMediaFiles([]);
      } else {
        setUploadStatus("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">Upload Media</h2>
      
      <div
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`w-full flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer ${
          isDragging ? "border-blue-500 bg-blue-200" : "border-dashed border-gray-500"
        }`}
      >
        <span className="text-gray-300 mb-2">Click to upload or drag files here</span>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      <div className="mt-4 w-full">
        {mediaFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Selected Media</h3>
            <div className="flex flex-wrap gap-4 overflow-y-auto max-h-40">
              {mediaFiles.map((file, index) => (
                <div key={index} className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden">
                  {file.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt="uploaded media"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      className="w-full h-full object-cover"
                      controls={false}
                      muted
                    ></video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={uploadFilesToServer}
        className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500"
      >
        Upload to Server
      </button>

      {uploadStatus && (
        <p className="mt-4 text-center text-gray-300">{uploadStatus}</p>
      )}

      <button
        onClick={() => setMediaFiles([])}
        className="mt-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500"
      >
        Clear All
      </button>
    </div>
  );
}
