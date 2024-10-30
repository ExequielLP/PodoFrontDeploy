import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  openModal: null,           // Almacena el nombre del modal actualmente abierto
  toggleModal: () => null,    // Función para abrir/cerrar el modal
});

export const ModalProvider = ({ children }) => {
  const [openModal, setOpenModal] = useState(null);


  // 3. Función para alternar el modal
  const toggleModal = (modalName) => {
    setOpenModal((current) => (current === modalName ? null : modalName));
    // Explicación:
    // - Si `current` ya es el modal solicitado (`modalName`), establece `openModal` en `null` para cerrar el modal.
    // - Si `current` es diferente, abre el modal especificado (`modalName`).
  };

  return (
    <ModalContext.Provider
      value={{ openModal, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal is being use outside it´s provider");
  }
  return context;
};
