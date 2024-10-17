import "../css/Tablas-Admin.css"

export const TableImage = ({image, className, width, height}) => {
  return (
    <img
      className={className}
      width={width}
      height={height}
      src={`data:${image.mime};base64,${image.content}`}
      alt="Servicio"
    />
  );
};
