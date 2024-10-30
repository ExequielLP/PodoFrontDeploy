export const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new Error(
      `${response.status} error: ${errorData.message || response.statusText}`
    );
  }

  if (response.status === 204) {
    return null; // No content
  }

  try {
    return await response.json();
  } catch {
    return {}; // Maneja errores de análisis
  }
};
