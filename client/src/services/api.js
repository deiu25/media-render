// services/api.js
const API_BASE_URL = "http://127.0.0.1:8000";

// Helper function to generate full URL
const getFullUrl = (path) => `${API_BASE_URL}/${path}`;

// Generalized fetch function with error handling
const apiRequest = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
  return response.json();
};

const jsonHeaders = { "Content-Type": "application/json" };

// Fetch media files
export const fetchMediaFiles = async () => {
  const data = await apiRequest(getFullUrl("media/"));
  return data.map((file) => ({ ...file, url: getFullUrl(`static/media/${file.filename}`) }));
};

// Fetch settings
export const fetchSettings = () => apiRequest(getFullUrl("settings/"));

// Update settings
export const updateSettings = (settingsData) =>
  apiRequest(getFullUrl("settings/"), {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(settingsData),
  }).then(() => "Settings updated successfully!")
    .catch(() => "Failed to update settings. Please try again.");

// Upload files
export const uploadFilesToServer = (mediaFiles) => {
  const formData = new FormData();
  mediaFiles.forEach((file) => formData.append("files", file));

  return apiRequest(getFullUrl("media/upload/"), { method: "POST", body: formData });
};

// Delete a single media file
export const deleteMediaFile = (fileId) => apiRequest(getFullUrl(`media/${fileId}`), { method: "DELETE" });

// Reorder media files
export const reorderMediaFiles = (mediaOrder) =>
  apiRequest(getFullUrl("media/reorder"), {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(mediaOrder.map((file) => file.id)),
  });
