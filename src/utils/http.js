export const get = async (url) => {
  try {
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(
        respuesta.status + "error en fecth" + respuesta.statusText
      );
    }

    console.log(respuesta);
    const data = await respuesta.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(`error cath de get ${error}`);
  }
};

// get con token
export const getToken = async (url, token) => {
  try {
    const fetchConfig = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const respuesta = await fetch(url, fetchConfig);

    if (!respuesta.ok) {
      console.log("---!respuesta.ok?---" + respuesta.ok);
      throw new Error(
        respuesta.status + " Error en fetch getToken " + respuesta.statusText
      );
    }
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.log(`Error catch de GET-TOKEN ${error}`);
    console.log("---Creo q el tema esta acá---");
    return null;
  }
};

export const post = async (url, data) => {
  const fechConfig = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  // creo que lo que falta, es poner en el post, el headers:header insertando el token digamos ,pero en la parte de la autorizacion del la peticion post

  try {
    const respuesta = await fetch(url, fechConfig);

    if (!respuesta.ok) {
      throw new Error(
        respuesta.status + "error en fecth [post hhtp]" + respuesta.statusText
      );
    }
    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.log(`error cath de get [POST HTTPS]${error}`);
  }
};

export const postImagen = async (url, servicioPodo, token) => {
  const formData = new FormData();
  formData.append("nombre", servicioPodo.nombre); // Convertir objeto a JSON y agregar como parte
  formData.append("descripcion", servicioPodo.descripcion); // Convertir objeto a JSON y agregar como parte
  formData.append("costo", servicioPodo.costo); // Convertir objeto a JSON y agregar como parte
  formData.append("file", servicioPodo.file); // Convertir objeto a JSON y agregar como parte

  // Agregar archivo de imagen como parte

  const fetchConfig = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };

  try {
    const respuesta = await fetch(url, fetchConfig);

    if (!respuesta.ok) {
      throw new Error(
        respuesta.status +
          " error en fetch [post hhtp]: " +
          respuesta.statusText
      );
    }

    const datos = await respuesta.json();

    return datos;
  } catch (error) {
    console.log("error cath de get [POST HTTPS]: " + error.statusText);
  }
};

export const put = async (url, token) => {
  const fetchConfig = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, fetchConfig);

    if (!response.ok) {
      throw new Error(
        `${response.status} error en fetch [PUT HTTP]: ${response.statusText}`
      );
    }
    return response;
  } catch (error) {
    console.log(`Error catch de put [PUT HTTPS]: ${error}`);
  }
};
