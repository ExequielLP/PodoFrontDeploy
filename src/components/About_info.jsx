import "./css/About-info.css";

const About_info = () => {
  return (
    <main>
      <section className="section-content">
        <div id="ong-text" className="text-content">
          <h2 className="heading">Sobre Podogología Gonnet</h2>
          <p className="paragraph">
            La podoestética es fundamental para el cuidado integral de los pies,
            ofreciendo una combinación perfecta de tratamientos de salud y
            belleza. Uno de los principales beneficios es la prevención y
            tratamiento de problemas comunes como callosidades, durezas, uñas
            encarnadas y hongos. Estos procedimientos no solo mejoran la
            apariencia de los pies, sino que también alivian molestias y
            previenen complicaciones mayores.
          </p>
          <p className="paragraph">
            {" "}
            Además de tratar condiciones específicas, la podoestética promueve
            una excelente higiene podal. Mediante técnicas como la exfoliación,
            limpieza profunda y aplicación de productos hidratantes, se eliminan
            impurezas y células muertas, dejando la piel suave y saludable. Los
            masajes incluidos en muchos de estos tratamientos también ofrecen
            beneficios adicionales, como la mejora de la circulación sanguínea,
            reducción de la tensión muscular y alivio del estrés.
          </p>
          <p className="paragraph">
            {" "}
            La podoestética es ideal para personas de todas las edades,
            especialmente aquellas que buscan mantener una imagen cuidada y
            profesional. También es una excelente opción para quienes pasan
            mucho tiempo de pie o usan calzado inadecuado, ya que ayuda a
            aliviar la fatiga y el dolor. En resumen, la podoestética no solo
            embellece los pies, sino que también asegura su salud,
            proporcionando comodidad y bienestar general.
          </p>
        </div>
        <div id="ong" className="image-container">
          <img
            className="image"
            height="500"
            src="/assets/ImagenesOptimizadas/woman-s-feet-bowl-with-water-petal_329181-18808.jpg"
            width="500"
            alt="Podología Gonnet"
          />
        </div>
      </section>
      <section className="section-content">
        <div id="community" className="image-container">
          <img
            className="image"
            height="556"
            src="/assets/ImagenesOptimizadas/woman-s-feet-bowl-with-water-petal_329181-18808.jpg"
            width="812"
            alt="Podología Gonnet"
          />
        </div>
        <div id="community-text" className="text-content">
          <h2 className="heading">¿Quienes somos?</h2>
          <p className="paragraph">
            {" "}
            Somos un equipo de profesionales especializados en podoestética,
            dedicados a brindar servicios de alta calidad para el cuidado
            integral de tus pies. Con años de experiencia y una pasión por la
            salud y belleza podal, nos comprometemos a ofrecer tratamientos
            personalizados que combinan técnicas avanzadas y productos de
            primera calidad. Nos enorgullece proporcionar un ambiente cálido y
            acogedor, donde cada cliente recibe atención individualizada y
            asesoramiento experto. Nuestro objetivo es mejorar tanto la salud
            como la apariencia de tus pies, ayudándote a sentirte cómodo y
            seguro. Ya sea que busques alivio para problemas podales específicos
            o simplemente quieras mantener tus pies en perfectas condiciones,
            estamos aquí para cuidar de ti con profesionalismo y dedicación.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About_info;
