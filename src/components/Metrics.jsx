import { AwardIcon, ClockIcon, StarIcon } from "../icons";
import "./css/metrics.css";

export const Metrics = () => {
  return (
    <div className="metrics-container">
      <h2 className="metrics-title font-bold">¿Por qué elegirnos?</h2>
      <div className="metrics-grid">
        <div className="metrics-feature">
          <AwardIcon className="metrics-icon" color="#ed64a6" size={48} />
          <h3 className="metrics-feature-title font-semibold">Experiencia Comprobada</h3>
          <p className="metrics-feature-description">
            Más de 10 años en el mercado
          </p>
        </div>
        <div className="metrics-feature">
          <ClockIcon className="metrics-icon" color="#ed64a6" size={48} />
          <h3 className="metrics-feature-title font-semibold">Soporte 24/7</h3>
          <p className="metrics-feature-description">
            Estamos siempre disponibles para ti
          </p>
        </div>
        <div className="metrics-feature">
          <StarIcon className="metrics-icon" color="#ed64a6" size={48} />
          <h3 className="metrics-feature-title font-semibold">Satisfacción Garantizada</h3>
          <p className="metrics-feature-description">98% de clientes satisfechos</p>
        </div>
      </div>
    </div>
  );
};
