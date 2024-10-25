import Breadcrumb from "../../shared/components/Breadcrumb";
import { RegisterService } from "../components/RegisterService";

export const AddServiceView = () => {
  return (
    <section className="dashboard-section-container">
      <Breadcrumb title={`Añadir Servicio`} />
      <div className="register-service-section">
        <RegisterService />
      </div>
    </section>
  );
};
