import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  actionModal: false,
  filterModal: false,
  setExclusiveModal: () => null,
});

export const ModalProvider = ({ children }) => {
  const [actionModal, setActionModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const setExclusiveModal = (modalName) => {
    setFilterModal(modalName === "filter");
    setActionModal(modalName === "action");
  };

  //Si queremos usar la funcion del setState de la modal, se debera agregar el ternario
  // const setExclusiveModal = (modalName) => {
  //   setFilterModal(modalName === 'filter' ? true : false);
  //   setActionModal(modalName === 'action' ? true : false);
  // };

  return (
    <ModalContext.Provider
      value={{ actionModal, filterModal, setExclusiveModal }}
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
