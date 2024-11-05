const API_BASE_URL = "http://127.0.0.1:8000";

export const fetchMediaFiles = async () => {
  const response = await fetch(`${API_BASE_URL}/media/`);
  if (!response.ok) throw new Error("Error fetching media files.");
  const data = await response.json();
  return data.map((file) => ({
    ...file,
    url: `${API_BASE_URL}/static/media/${file.filename}`,
  }));
};

export const deleteMediaFile = async (fileId) => {
  const response = await fetch(`${API_BASE_URL}/media/${fileId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error deleting file.");
};

export async function fetchSettings() {
  const response = await fetch(`${API_BASE_URL}/settings/`);
  if (!response.ok) throw new Error("Failed to fetch settings");
  return response.json();
}