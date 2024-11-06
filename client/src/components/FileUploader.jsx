import PropTypes from "prop-types";
import { useState } from "react";

export default function FileUploader({ onFileSelect, fileInputRef }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e, isDragOver) => {
    e.preventDefault();
    setIsDragging(isDragOver);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    onFileSelect(e.dataTransfer.files);
  };

  const handleFileClick = () => fileInputRef.current.click();

  return (
    <div
      onClick={handleFileClick}
      onDrop={handleDrop}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => handleDrag(e, false)}
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
  fileInputRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};
