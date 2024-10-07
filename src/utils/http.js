import fetchWithInterceptor from './fetchInterceptor';
import { handleResponse } from "./responseHandler";

// Función para peticiones GET sin autenticación
export const get = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include", // Incluye cookies si es necesario
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en la solicitud GET: ${error}`);
    throw error;
  }
};

// Función para peticiones GET con autenticación
export const getWithAuth = async (url) => {
  try {
    const response = await fetchWithInterceptor(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en GET-AUTH: ${error}`);
    return null;
  }
};

export const post = async (url, data) => {
  try {
    const response = await fetchWithInterceptor(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en POST: ${error}`);
    throw error;
  }
};

export const postLogout = async (url) => {
  try {
    const response = await fetchWithInterceptor(url, {
      method: "POST",
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en POST-LOGOUT: ${error}`);
    throw error;
  }
};

export const postImagen = async (url, servicioPodo) => {
  const formData = new FormData();
  formData.append("nombre", servicioPodo.nombre);
  formData.append("descripcion", servicioPodo.descripcion);
  formData.append("costo", servicioPodo.costo);
  formData.append("file", servicioPodo.file);

  try {
    const response = await fetchWithInterceptor(url, {
      method: "POST",
      body: formData,
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en POST-IMAGEN: ${error}`);
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const response = await fetchWithInterceptor(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  } catch (error) {
    console.error(`Error en PUT: ${error}`);
    throw error;
  }
};

/*
export const del = async (url) => {
  const response = await fetchWithAuth(url, { method: 'DELETE' });
  return handleResponse(response);
};
*/
