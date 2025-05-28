// src/services/adminServices.js

const API_BASE = "https://fxga0x7bo5.execute-api.eu-west-1.amazonaws.com/prod/ssmparameter"; // Update to your real API Gateway base if needed

/**
 * Get SSM parameter by key
 * @param {string} key
 * @returns {Promise<string>}
 */
export async function getSSMParameter(key) {
  // Encode key to safely use in a URL
  const encodedKey = encodeURIComponent(key);
  const response = await fetch(`${API_BASE}?key=${encodedKey}`);
  if (!response.ok) {
    throw new Error("Failed to fetch SSM parameter");
  }
  // Assuming API returns: { value: "..." }
  const data = await response.json();
  return data.value;
}

/**
 * Put SSM parameter value
 * @param {string} key
 * @param {string} value
 * @returns {Promise<void>}
 */
export async function putSSMParameter(key, value) {
  const encodedKey = encodeURIComponent(key);
  const response = await fetch(`${API_BASE}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ key, value }),
  });
  if (!response.ok) {
    throw new Error("Failed to update SSM parameter");
  }
}