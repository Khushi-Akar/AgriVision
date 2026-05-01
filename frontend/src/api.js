const API_BASE = 'https://agrivision-j0t2.onrender.com/api';
export async function scanCrop(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/scan`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Scan failed");
  }

  return response.json();
}

export async function getHistory() {
  const response = await fetch(`${API_BASE}/history`);

  if (!response.ok) {
    throw new Error("Failed to load history");
  }

  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_BASE}/stats`);

  if (!response.ok) {
    throw new Error("Failed to load stats");
  }

  return response.json();
}