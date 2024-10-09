import { handleResponse } from "./responseHandler";

export const useHttp = (verifyAuthentication) => {
  const fetchWithInterceptor = async (url, options = {}) => {
    try {
      const response = await fetch(url, { ...options, credentials: "include" }); // Incluir cookies

      if (response.status === 403) {
        verifyAuthentication();
        throw new Error("No autorizado");
      }

      return response;
    } catch (error) {
      console.error("Error en la solicitud:", error);
      throw error;
    }
  };

  const get = async (url) => {
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

  const getWithAuth = async (url) => {
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

  const post = async (url, data) => {
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

  const postLogout = async (url) => {
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

  const postImagen = async (url, servicioPodo) => {
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

  const put = async (url, data) => {
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

  const del = async (url) => {
    try {
      const response = await fetchWithInterceptor(url, { method: "DELETE" });
      return handleResponse(response);
    } catch (error) {
      console.error(`Error en DELETE: ${error}`);
      throw error;
    }
  };

  return { get, getWithAuth, post, postLogout, postImagen, put, del };
};
