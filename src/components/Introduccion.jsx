import "./css/Introduccion.css";

const Introduccion = () => {
  return (
    <section className="welcome-section ">
      <img
        src="/src/assets/ImagenesOptimizadas/human-footprints.png"
        alt="Pie Izquierdo"
        className="left-foot"
      />

      <h2 className="welcome-title">Bienvenidos a Podo Estética La Plata</h2>
      <p className="welcome-text">
        En Podo Estética, nos dedicamos a mejorar y{" "}
        <strong>mantener la belleza de tus pies y uñas</strong>. Combinando
        productos de alta calidad con un compromiso absoluto hacia tu bienestar.
      </p>
      <p className="welcome-text">
        Ofrecemos servicios de <strong>medicina estética de excelencia</strong>.
        Desde limpieza de uñas encarnadas hasta tratamientos de micosis, estamos
        aquí para{" "}
        <strong>cuidar tus pies y brindarte una experiencia relajante</strong>.
      </p>
      <img
        src="/src/assets/ImagenesOptimizadas/human-footprints.png"
        alt="Pie Derecho"
        className="right-foot"
      />
    </section>
  );
};

export default Introduccion;
