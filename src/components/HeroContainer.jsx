import "./css/hero-section.css";
const HeroContainer = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-text-container headline">
          <span className="hero-text">
            Pedicura a domicilio Gonnet • City bell
          </span>
          <h1 className="hero-title font-bold">
            <span className="span">Pedicuría La Plata</span>
          </h1>
          <a href="#" className="hero-btn">
            Conoce Nuestros Servicios &#9660;
          </a>
        </div>
        <div className="hero-clipped hero-bg clipped"></div>
      </div>
    </section>
  );
};

export default HeroContainer;
