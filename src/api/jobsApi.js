const API_URL = "https://www.arbeitnow.com/api/job-board-api";

export async function fetchJobs() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`API request failed (${response.status})`);
  }
  const result = await response.json();
  return Array.isArray(result.data) ? result.data : [];
}