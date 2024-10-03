import "./css/podogonnet-loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <p>Cargando...</p>
      <img
        className="podogonnet-loader"
        src="/assets/ImagenesOptimizadas/Pedicuria-la-plata.webp"
        alt="Podo Estetica"
        height={100}
        width={100}
      />
    </div>
  );
}
