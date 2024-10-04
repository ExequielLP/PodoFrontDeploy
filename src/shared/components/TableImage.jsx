
export const TableImage = ({image}) => {
  return (
    <img
      className="table-img"
      width={60}
      height={60}
      src={`data:${image.mime};base64,${image.content}`}
      alt="Servicio"
    />
  );
};
