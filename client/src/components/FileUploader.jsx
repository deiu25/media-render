// FileUploader.jsx
import PropTypes from "prop-types";
import { useState } from "react";

export default function FileUploader({ onFileSelect, fileInputRef }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onFileSelect(e.dataTransfer.files);
    setIsDragging(false);
  };

  return (
    <div
      onClick={() => fileInputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      className={`w-full flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer ${
        isDragging ? "border-blue-500 bg-blue-200" : "border-dashed border-gray-500"
      }`}
    >
      <span className="text-gray-300 mb-2">Click to upload or drag files here</span>
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={(e) => onFileSelect(e.target.files)}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}

FileUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
};
