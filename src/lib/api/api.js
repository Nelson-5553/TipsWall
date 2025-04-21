const { API_HOST } = import.meta.env;

/**
 * Llama a la API con un endpoint y opciones personalizadas
 * @param {string} endpoint - Ruta relativa, ej: 'api/posts'
 * @param {object} options - Opciones extra para fetch (headers, body, etc.)
 * @returns {Promise<any>}
 */
export async function fetchFromApi(endpoint, options = {}) {
  if (!API_HOST) {
    throw new Error("API_HOST no está definido en el entorno.");
  }

  const url = `${API_HOST}${endpoint}`;
  const start = performance.now();

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const duration = performance.now() - start;
    if (import.meta.env.DEV) {
      console.log(`[fetchFromApi] ${endpoint} - ${Math.round(duration)}ms`);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`[fetchFromApi] Fallo en "${endpoint}":`, error);
    throw error;
  }
}
