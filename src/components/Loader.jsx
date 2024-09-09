import "./css/podogonnet-loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <p>Cargando..</p>
      <img
        className="podogonnet-loader"
        src="/assets/ImagenesOptimizadas/CC2E1AA6-02E9-4DF2-BBD6-8BD62A378986.webp"
        alt="Podo Estetica"
        height={120}
        width={120}
      />
    </div>
  );
}
