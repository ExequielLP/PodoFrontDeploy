import { AwardIcon, ClockIcon, StarIcon } from "../icons";
import "./css/metrics.css";

export const Metrics = () => {
  return (
    <div class="metrics-container">
      <h2 class="metrics-title">¿Por qué elegirnos?</h2>
      <div class="metrics-grid">
        <div class="metrics-feature">
          <AwardIcon class="metrics-icon" color="#ed64a6" size={48} />
          <h3 class="metrics-feature-title">Experiencia Comprobada</h3>
          <p class="metrics-feature-description">
            Más de 10 años en el mercado
          </p>
        </div>
        <div class="metrics-feature">
          <ClockIcon class="metrics-icon" color="#ed64a6" size={48} />
          <h3 class="metrics-feature-title">Soporte 24/7</h3>
          <p class="metrics-feature-description">
            Estamos siempre disponibles para ti
          </p>
        </div>
        <div class="metrics-feature">
          <StarIcon class="metrics-icon" color="#ed64a6" size={48} />
          <h3 class="metrics-feature-title">Satisfacción Garantizada</h3>
          <p class="metrics-feature-description">98% de clientes satisfechos</p>
        </div>
      </div>
    </div>
  );
};
