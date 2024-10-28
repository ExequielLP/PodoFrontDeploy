import { useContext, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import ServicesContext from "../../context/ServiceContext";
import "./css/EditCard.css";
import { useModalContext } from "../../context/ModalContext";
import { ImageIcon, PencilIcon } from "../../icons";

export const EditService = ({ service }) => {
  const { submitModificarServicio } = useContext(ServicesContext);
  const { toggleModal } = useModalContext();
  const { nombre, imagen, descripcion, costo } = service;
  const [isEditing, setIsEditing] = useState({
    nombre: false,
    costo: false,
    descripcion: false,
  });

  const [form, setForm] = useState({
    id: service.id,
    nombre: nombre || "",
    descripcion: descripcion || "",
    costo: costo || 0,
    file: null,
    imagePreviewUrl: `data:${imagen.mime};base64,${imagen.content}`,
  });

  useEffect(() => {
    setForm({
      id: service.id,
      nombre: service.nombre || "",
      descripcion: service.descripcion || "",
      costo: service.costo || 0,
      file: null,
      imagePreviewUrl: `data:${service.imagen.mime};base64,${service.imagen.content}`,
    });
  }, [service]);

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

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="edit-service">
      <header className="edit-service__header">
        <h2 className="edit-service__title">
          Editando <span className="">{nombre}</span>
        </h2>
      </header>
      <article className="edit-service__content">
        <div className="edit-service__image-container">
          <img
            className="edit-service__image"
            src={form.imagePreviewUrl}
            alt={nombre}
            height={200}
            width={"auto"}
          />
          <label className="edit-service__image-button">
            <ImageIcon color="#a0aec0" size={20} />
            Cambiar imagen
            <input
              type="file"
              name="file"
              className="edit-service__file-input"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="edit-service__form">
          <div className="edit-service__input-group">
            {isEditing.nombre ? (
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                className="edit-service__input edit-service__input--name"
                onChange={handleServiceChange}
                onBlur={() => toggleEditing("nombre")}
              />
            ) : (
              <p
                className="edit-service__text edit-service__text--name"
                onClick={() => toggleEditing("nombre")}
              >
                {form.nombre}
              </p>
            )}
            <PencilIcon
              className="edit-service__edit-icon"
              color="#64748b"
              size={20}
              onClick={() => toggleEditing("nombre")}
            />
          </div>
          <div className="edit-service__input-group">
            <NumericFormat
              name="costo"
              value={form.costo}
              className="edit-service__input edit-service__input--price"
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
              onBlur={() => toggleEditing("costo")}
            />
            <PencilIcon
              className="edit-service__edit-icon"
              color="#64748b"
              size={20}
              onClick={() => toggleEditing("costo")}
            />
          </div>
          <div className="edit-service__input-group">
            {isEditing.descripcion ? (
              <textarea
                name="descripcion"
                value={form.descripcion}
                className="edit-service__input edit-service__input--description"
                cols={2}
                rows={5}
                onChange={handleServiceChange}
                onBlur={() => toggleEditing("descripcion")}
              />
            ) : (
              <p
                className="edit-service__text edit-service__text--description"
                onClick={() => toggleEditing("descripcion")}
              >
                {form.descripcion}
              </p>
            )}
            <PencilIcon
              className="edit-service__edit-icon"
              color="#64748b"
              size={20}
              onClick={() => toggleEditing("descripcion")}
            />
          </div>
        </div>
      </article>
      <footer className="edit-service__footer">
        <button
          className="edit-service__button edit-service__button--outline"
          onClick={() => toggleModal("editService")}
        >
          Volver
        </button>
        <button
          className="edit-service__button edit-service__button--primary"
          onClick={(e) => {
            submitModificarServicio(e, form);
            toggleModal("editService");
          }}
        >
          Editar
        </button>
      </footer>
    </div>
  );
};
