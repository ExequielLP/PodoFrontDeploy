import { useEffect, useState } from "react";
import { ClockIcon, LoaderIcon, MailIcon, MapPinIcon, PhoneIcon, SendIcon } from "../icons/index";
import './css/contact-info.css'

const ContactInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    validateForm();
  }, [name, email, message]);

  const validateForm = () => {
    let newErrors = { name: "", email: "", message: "" };
    if (name && name.length < 2)
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    if (email && !/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email inválido";
    if (message && message.length < 10)
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== "")) return;

    setIsSubmitting(true);
    // Simular envío de formulario
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Resetear formulario después de un delay
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
  };
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Contáctanos</h2>
        <div className="contact-grid">
          <div className="contact-info-card">
            <h3 className="contact-info-title">Información de Contacto</h3>
            <ul className="contact-info-list">
              <li className="contact-info-item">
                <div className="contact-icon-wrapper">
                <MapPinIcon className="contact-icon" color="#d63384"/>
                </div>
                <span>Calle 123, La Plata, Buenos Aires</span>
              </li>
              <li className="contact-info-item">
                <div className="contact-icon-wrapper">
                <PhoneIcon className="contact-icon" color="#d63384"/>
                </div>
                <a href="tel:+541234567890" className="hover-link">+54 123 456 7890</a>
              </li>
              <li className="contact-info-item">
                <div className="contact-icon-wrapper">
                <MailIcon className="contact-icon" color="#d63384"/>
                </div>
                <a href="mailto:info@pedicurialaplata.com" className="hover-link">info@pedicurialaplata.com</a>
              </li>
              <li className="contact-info-item">
                <div className="contact-icon-wrapper">
                <ClockIcon className="contact-icon" color="#d63384"/>
                </div>
                <span>Lunes a Viernes: 9:00 - 20:00</span>
              </li>
            </ul>
          </div>
          <form
            onSubmit={handleSubmit}
            className="form-container"
          >
            <h3 className="form-title">Envíanos un Mensaje</h3>
            <div className="form-fields">
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={`form-input ${errors.name ? "input-error" : ""}`}
                  placeholder="Tu nombre"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="error-message">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  placeholder="tu@email.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="error-message">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className={`form-input ${
                    errors.message ? "input-error" : ""
                  }`}
                  placeholder="¿En qué podemos ayudarte?"
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby="message-error"
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="error-message">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="admin-btn submit-button"
                disabled={
                  isSubmitting ||
                  isSubmitted ||
                  Object.values(errors).some((error) => error !== "")
                }
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="loader-icon" />
                    Enviando...
                  </>
                ) : isSubmitted ? (
                  "Mensaje Enviado"
                ) : (
                  <>
                    Enviar Mensaje
                    <SendIcon className="send-icon" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
