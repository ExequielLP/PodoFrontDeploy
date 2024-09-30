import "./css/About-info.css";

const About_info = () => {
  return (
    <main className="about-container">
      <section className="section-content">
          <div id="pdg-text" className="about-text-content">
          <h2 className="about-heading">Sobre Pedicuría La Plata</h2>
          <div className="about-text-container">
            <p>En Pedicuría La Plata nos dedicamos a ofrecer servicios de cuidado y salud para tus pies. Contamos con un equipo de profesionales altamente capacitados que se encargan de brindarte la mejor atención y cuidado personalizado.</p>
            <p class="highlight">⭐️ <strong>Atención en gabinete</strong>: Ubicados en la zona de Plaza Italia, nuestro gabinete está equipado con la más avanzada tecnología para asegurar que recibas un tratamiento eficaz y seguro.</p>
            <p class="highlight">⭐️ <strong>Atención a domicilio</strong>: Pensando en las personas con movilidad reducida, ofrecemos un servicio de atención a domicilio para que puedas recibir el cuidado que necesitas sin salir de tu hogar.</p>
            <p>Nuestro compromiso es tu bienestar. En Pedicuría La Plata trabajamos para que cada visita sea una experiencia agradable y relajante. ¡Visítanos y descubre cómo podemos ayudarte a mantener tus pies saludables!</p>
            <p>Para más información o para agendar una cita, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
          </div>
        </div>
        <div id="pdg" className="about-image-container">
          <img
            className="image"
            height="500"
            src="/assets/tipos-de-infecciones.webp"
            width="500"
            alt="Podología Gonnet"
          />
        </div>
      </section>
      <section className="section-content">
        <div id="community" className="about-image-container">
          <img
            className="image"
            height="500"
            src="/assets/pedicurialp.webp"
            width="500"
            alt="Podología Gonnet"
          />
        </div>
        <div id="community-text" className="about-text-content-second">
          <h2 className="about-heading">¿Quienes somos?</h2>
          <div className="about-text-container">
          <p><strong>Conoce a Pedicuría La Plata</strong></p>
          <p>En Pedicuría La Plata, somos un equipo de profesionales apasionados por el cuidado y la salud de los pies. Nuestra misión es proporcionar un servicio excepcional y personalizado que mejore la calidad de vida de nuestros pacientes.</p>
          <p class="highlight">⭐️ <strong>Nuestra Historia</strong>: Fundada en el corazón de La Plata, nuestra pedicuría ha crecido gracias a la confianza y satisfacción de nuestros clientes. Nos enorgullecemos de ofrecer un ambiente acogedor y un servicio de alta calidad.</p>
          <p class="highlight">⭐️ <strong>Nuestro Equipo</strong>: Contamos con un equipo de especialistas en podología, comprometidos con el bienestar y la salud de nuestros pacientes. Cada miembro de nuestro equipo está altamente capacitado y en constante formación para brindar los mejores tratamientos.</p>
          <p>En Pedicuría La Plata, creemos en la importancia de cuidar tus pies y estamos dedicados a ofrecerte la mejor atención. ¡Te invitamos a conocernos y a descubrir cómo podemos ayudarte a mantener tus pies en las mejores condiciones!</p>
          <p>Para más información o para agendar una cita, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About_info;
