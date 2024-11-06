// api.js
const API_BASE_URL = "http://127.0.0.1:8000";

// Helper function to generate full URL
const getFullUrl = (path) => `${API_BASE_URL}/${path}`;

// Generalized fetch function with error handling
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error(`API request failed: ${error.message}`);
    throw error;
  }
};

// Fetch media files
export const fetchMediaFiles = async () => {
  const data = await apiRequest(getFullUrl("media/"));
  return data.map((file) => ({ ...file, url: getFullUrl(`static/media/${file.filename}`) }));
};

// Fetch settings
export const fetchSettings = async () => {
  return await apiRequest(getFullUrl("settings/"));
};

// Update settings
export const updateSettings = async (settingsData) => {
  try {
    await apiRequest(getFullUrl("settings/"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsData),
    });
    return "Settings updated successfully!";
  } catch (error) {
    console.error("Failed to update settings:", error);
    return "Failed to update settings. Please try again.";
  }
};

// Upload files
export const uploadFilesToServer = async (mediaFiles) => {
  const formData = new FormData();
  mediaFiles.forEach((file) => formData.append("files", file));

  return await apiRequest(getFullUrl("upload/"), { method: "POST", body: formData });
};

// Delete a single media file
export const deleteMediaFile = async (fileId) => {
  await apiRequest(getFullUrl(`media/${fileId}`), { method: "DELETE" });
};

// Reorder media files
export const reorderMediaFiles = async (mediaOrder) => {
  await apiRequest(getFullUrl("media/reorder"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mediaOrder.map((file) => file.id)),
  });
};
