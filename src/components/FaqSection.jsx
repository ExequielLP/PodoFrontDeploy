import { ChevronRightIcon } from "../icons/index";
import "./css/faq-section.css";

export const FaqSection = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Preguntas Frecuentes</h2>
      <div className="faq-items">
        <details className="faq-item group">
          <summary className="faq-summary">
            <span>¿Qué incluye el servicio de mantenimiento web?</span>
            <span className="faq-chevron transition">
              <ChevronRightIcon className="chevron-icon" />
            </span>
          </summary>
          <p className="faq-answer">
            Nuestro servicio de mantenimiento web incluye actualizaciones
            regulares, copias de seguridad, monitoreo de seguridad, optimización
            de rendimiento y soporte técnico continuo.
          </p>
        </details>
        <details className="faq-item group">
          <summary className="faq-summary">
            <span>¿Con qué frecuencia se realizan las actualizaciones?</span>
            <span className="faq-chevron transition">
              <ChevronRightIcon className="chevron-icon" />
            </span>
          </summary>
          <p className="faq-answer">
            Realizamos actualizaciones de seguridad y mantenimiento
            semanalmente, y actualizaciones de contenido según lo acordado en el
            plan de servicio.
          </p>
        </details>
      </div>
    </div>
  );
};
