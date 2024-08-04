import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ContextoAdministrador from "../context/ContextLoginRegister";
import useTitle from "../hooks/useTitle";
import "./css/Admin-buttons.css";
import "./css/RegisterService.css";

export const RegisterService = () => {
  const { SubmintCrearServicio } = useContext(ContextoAdministrador);
  useTitle({ title: "Servicios Admin" });

  const [form, setform] = useState({
    nombre: "",
    descripcion: "",
    costo: 0,
    file: null,
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setform({
      ...form,
      file: e.target.files[0],
    });
  };

  return (
    <section className="register-service-section">
      <h2 className="admin-subtitle">Ingrese el servicio a crear</h2>
      <form className="register-service-form" encType='"multipart/form-data"'>
        <div className="register-service-inset">
          <div className="register-service-inputs">
            <label htmlFor="nombre" className="form-label">
              Nombre del servicio
            </label>
            <input
              className="form-service-input"
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Nombre del servicio"
              aria-label="Nombre del servicio"
              onChange={handleChange}
            />
            <label htmlFor="descripcion" className="form-label">
              Descripción del servicio
            </label>
            <textarea
              className="form-service-input"
              id="descripcion"
              name="descripcion"
              rows="4"
              cols="8"
              placeholder="Descripción del servicio"
              aria-label="Descripcion del servicio de podología"
              onChange={handleChange}
            />
            <label htmlFor="costo" className="form-label">
              Costo
            </label>
            <input
              className="form-service-input"
              id="costo"
              type="number"
              name="costo"
              placeholder="$ ARS"
              aria-label="Costo  del servicio de podología"
              onChange={handleChange}
            />
            <label htmlFor="imagen" className="form-label">
              Imagen del sevicio
            </label>
            <input
              className="form-service-input"
              id="imagen"
              type="file"
              name="file"
              placeholder="Agregué una imagen"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="admin-btn servicio-btn"
            onClick={(e) => {
              SubmintCrearServicio(e, form);
            }}
          >
            Crear Servicio
          </button>
        </div>
      </form>
      <div className="admin-section-buttons">
        <Link className="admin-btn" to={"/"}>
          {" "}
          Volver a inicio
        </Link>
        <Link className="admin-btn" to={"/admin/turnos"}>
          {" "}
          Ver turnos
        </Link>
      </div>
    </section>
  );
};
