/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "./css/EditCard.css";
import ContextoAdministrador from "../context/ContextLoginRegister";

export const AdminCardEdit = ({ servicio }) => {
  const { nombre, imagen, descripcion, costo } = servicio;
  const { submitModificarServicio } = useContext(ContextoAdministrador);
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
      <h2 className="admin-title">
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
        <img
          className="service-img-bg"
          src="/src/assets/ImagenesOptimizadas/spa-treatment-product-female-feet-hand-spa_1150-37700.jpg.url"
          alt="Spa de pies"
          width="300"
        />
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
            <span>$</span>
            <input
              type="number"
              name="costo"
              value={form.costo}
              className="service-price-edit service-price-input"
              onChange={handleServiceChange}
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
