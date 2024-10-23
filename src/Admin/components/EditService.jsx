import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import ServicesContext from "../../context/ServiceContext";
import "./css/EditCard.css";

export const EditService = ({ servicio }) => {
  const { nombre, imagen, descripcion, costo } = servicio;
  const { submitModificarServicio } = useContext(ServicesContext);
  const [form, setForm] = useState({
    id: servicio.id,
    nombre: nombre || "",
    descripcion: descripcion || "",
    costo: costo || 0,
    file: null,
    imagePreviewUrl: `data:${imagen.mime};base64,${imagen.content}`,
  });

  useEffect(() => {
    setForm({
      id: servicio.id,
      nombre: servicio.nombre || "",
      descripcion: servicio.descripcion || "",
      costo: servicio.costo || 0,
      file: null,
      imagePreviewUrl: `data:${servicio.imagen.mime};base64,${servicio.imagen.content}`,
    });
  }, [servicio]);

  const handleServiceChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="card-edit-section" id="target-div">
      <h2 className="admin-title edit-section-tittle">
        Editando <span className="admin-userName">{servicio.nombre}</span>
      </h2>
      <article className="card-container-editable">
        <div>
          <img
            className="service-img"
            src={form.imagePreviewUrl}
            alt={nombre}
          />
          <label className="custom-file-upload">
            Cambiar imagen
            <input
              type="file"
              name="file"
              className="service-file-update"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="article-text-container">
          <textarea
            type="text"
            name="nombre"
            value={form.nombre}
            className="article-title service-text-input"
            onChange={handleServiceChange}
            rows={2}
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            className="article-text1 service-text-input"
            cols={2}
            rows={5}
            onChange={handleServiceChange}
          />
          <div className="input-with-symbol">
            <NumericFormat
              name="costo"
              value={form.costo}
              className="service-price-edit service-price-input"
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              fixedDecimalScale={true}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setForm((prevForm) => ({
                  ...prevForm,
                  costo: value,
                }));
              }}
            />
          </div>
        </div>
        <button
          className="article-button"
          onClick={(e) => {
            submitModificarServicio(e, form);
          }}
        >
          Confirmar cambios
        </button>
      </article>
    </section>
  );
};