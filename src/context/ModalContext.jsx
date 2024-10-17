import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  state: false,
  setState: () => null,
});

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState(false);
  return (
    <ModalContext.Provider value={{ state, setState }}>
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
