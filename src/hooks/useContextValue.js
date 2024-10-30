import { useContext } from "react";

const useContextValue = (Context) => {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      `useContextValue debe ser usado dentro de un proveedor de ${
        Context.displayName || "Contexto"
      }`
    );
  }

  return contextValue;
};

export default useContextValue;
