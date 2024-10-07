const fetchWithInterceptor = async (url, options = {}) => {
  try {
    const response = await fetch(url, { ...options, credentials: "include" }); // Incluir cookies

    // if (response.status === 401) {
    //   // Intentar refrescar el token
    //   const newToken = await refreshToken();

    //   if (newToken) {
    //     // Intentar la solicitud nuevamente con el nuevo token
    //     response = await fetch(url, defaultOptions);
    //   } else {
    //     // Redirigir al inicio de sesión si no se puede refrescar el token
    //     window.location.href = "/login";
    //     throw new Error("No autorizado");
    //   }
    // }

    if (!response.ok) {
      const errorData = await response.json(); // Captura el mensaje de error
      throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
    }
    return response;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error; // Lanza el error para que pueda ser manejado en el llamador
  }
};

export default fetchWithInterceptor;

const refreshToken = async () => {
  try {
    const response = await fetch("/api/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return data.token; // Asume que el backend responde con un nuevo token si es necesario
    } else {
      throw new Error("No se pudo refrescar el token");
    }
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return null;
  }
};
