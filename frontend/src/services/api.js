/**
 * API Service
 * Communicates with the BFHL backend.
 */

// Backend URL — set VITE_API_URL in .env for production
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * POST /bfhl
 * @param {string[]} data - Array of edge strings like ["A->B", "A->C"]
 * @returns {Promise<Object>} parsed JSON response
 */
export async function postBfhl(data) {
  const res = await fetch(`${BASE_URL}/bfhl`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    throw new Error(errBody.error || `HTTP ${res.status}`);
  }

  return res.json();
}
