// src/lib/api.js
const { API_HOST } = import.meta.env;

/**
 * Llama a la API con un endpoint y opciones personalizadas
 * @param {string} endpoint - Ruta relativa, ej: 'api/posts'
 * @param {object} options - Opciones extra para fetch (headers, método, etc.)
 * @returns {Promise<any>}
 */
export async function fetchFromApi(endpoint, options = {}) {
  const url = `${API_HOST}${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return await response.json();
   
}
