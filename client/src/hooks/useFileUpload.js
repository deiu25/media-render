import { useState } from "react";

export default function useFileUpload() {
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileUpload = (files) => {
    setMediaFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
  };

  const clearFiles = () => setMediaFiles([]);

  return {
    mediaFiles,
    handleFileUpload,
    clearFiles,
  };
}
