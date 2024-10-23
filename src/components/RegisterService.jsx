import { useContext, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import ServicesContext from "../context/ServiceContext";
import useTitle from "../hooks/useTitle";
import "./css/Admin-buttons.css";
import "./css/RegisterService.css";
import { ImageIcon } from "../icons/index";

export const RegisterService = () => {
  const { submitCrearServicio } = useContext(ServicesContext);
  useTitle({ title: "Servicios Admin" });

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    costo: 0,
    file: null,
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    console.log(e.target);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  const clearSelectedFile = () => {
    setForm({ ...form, file: null });
  };

  return (
    <section className="register-service-section">
      <form className="register-service-form" encType='"multipart/form-data"'>
        <div className="register-service-inset">
          <div className="formHeader">
            <h2 className="create-service-title">Crear nuevo servicio</h2>
          </div>
          <div className="register-service-inputs">
            <label htmlFor="nombre" className="form-label">
              Nombre del servicio
            </label>
            <input
              className="form-service-input"
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Ej: Pedicuría"
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
              placeholder="Descripción del servicio..."
              aria-label="Descripcion del servicio de podología"
              onChange={handleChange}
            />
            <label htmlFor="costo" className="form-label">
              Costo
            </label>
            <NumericFormat
              className="form-service-input"
              id="costo"
              name="costo"
              placeholder="$ ARS"
              aria-label="Costo del servicio de podología"
              thousandSeparator={true}
              prefix={"$ "}
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                handleChange({
                  target: {
                    name: "costo",
                    value: value,
                  },
                });
              }}
            />
            <div className="image-container">
              <label htmlFor="imagen" className="form-label">
                Imagen del sevicio
              </label>
              <div className="fileInputWrapper">
                <input
                  accept="image/*"
                  hidden
                  id="imagen"
                  name="file"
                  onChange={handleImageChange}
                  placeholder="Agregué una imagen"
                  ref={fileInputRef}
                  type="file"
                />
                {form.file ? (
                  <div className="text-center">
                    <p className="file-input-text">Imagen seleccionada:</p>
                    <p className="text-pink">{form.file.name}</p>
                    <button
                      type="button"
                      onClick={clearSelectedFile}
                      className="fileButton"
                    >
                      <span className="icon-spacing">X</span> Eliminar imagen
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="file-text-not-selected">
                      Ninguna imagen seleccionada. Haz clic para elegir una
                      imagen para tu servicio.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="fileButton"
                    >
                      <ImageIcon /> Seleccionar Imagen
                    </button>
                  </>
                )}
              </div>
            </div>
            <button
              className="service-submit-btn"
              onClick={(e) => {
                submitCrearServicio(e, form);
              }}
            >
              Crear Servicio
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
