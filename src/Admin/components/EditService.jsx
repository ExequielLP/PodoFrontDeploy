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

  return (
    <div className="modal-inset-border">
      <header className="modal-header-seciton">
        <h2 className="modal-appointment-title">
          Editando <span className="">{nombre}</span>
        </h2>
      </header>
      <article className="modal-description">
        <div className="modal-image-container">
          <img
            className="modal-service-image"
            src={form.imagePreviewUrl}
            alt={nombre}
            height={200}
            width={"auto"}
          />
          <label className="modal-change-image-btn">
            <ImageIcon color="#a0aec0" size={20} />
            Cambiar imagen
            <input
              type="file"
              name="file"
              className="service-file-update"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="modal-form">
          <div className="modal-input-group">
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              className="modal-edit-service-name"
              onChange={handleServiceChange}
            />
            <PencilIcon className="modal-edit-icon" color="#a0aec0" size={20} />
          </div>
          <div className="modal-input-group">
            <NumericFormat
              name="costo"
              value={form.costo}
              className="modal-service-price-input"
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
            <PencilIcon className="modal-edit-icon" color="#a0aec0" size={20} />
          </div>
          <div className="modal-input-group">
            <textarea
              name="descripcion"
              value={form.descripcion}
              className="modal-service-description-input"
              cols={2}
              rows={5}
              onChange={handleServiceChange}
            />
            <PencilIcon className="modal-edit-icon" color="#a0aec0" size={20} />
          </div>
        </div>
      </article>
      <footer className="modal-footer">
        <button
          className="modal-button modal-button-outline"
          onClick={() => toggleModal("editService")}
        >
          Volver
        </button>
        <button
          className="modal-button modal-button-destructive"
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
