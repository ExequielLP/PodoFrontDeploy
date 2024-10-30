// .toLocaleString("es-AR" , {style: "currency", currency: "ARS"})
export const priceFormatter = (value) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(Number(value));
};
