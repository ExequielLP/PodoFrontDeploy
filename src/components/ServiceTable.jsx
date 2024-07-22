import { useContext, useEffect } from "react";
import ContextoAdministrador from "./../context/ContextLoginRegister";
import "./css/Tablas-Admin.css";

export const ServiceTable = ({ onSeleccionarServicio }) => {
  const { eliminarServicioAdmin, listaServicios, listaServiciosAdmin } =
    useContext(ContextoAdministrador);

  useEffect(() => {
    listaServiciosAdmin();

  }, []);

  return (
    <section className="tabla-admin my-5" id="TablaServicios">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Servicios agregados
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body tabla-admin-body table-responsive">
              {listaServicios && listaServicios.length > 0 ? (
                <table className="table align-middle table-borderless ">
                  <thead className="tabla-header">
                    <tr>
                      <th scope="col" className="m-auto text-center">
                        Imagen
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Nombre del servicio
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Descripción del servicio
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Costo
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Estado del servicio
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Modificar
                      </th>
                      <th scope="col" className="m-auto text-center">
                        Cancelar
                      </th>
                    </tr>
                  </thead>
                  {listaServicios.map((servicio) => (
                    <tbody key={servicio.id} className="table-group-divider">
                      <tr>
                        <td className="m-auto">
                          <img
                            className="table-img"
                            width={60}
                            height={60}
                            src={`data:${servicio.imagen.mime};base64,${servicio.imagen.content}`}
                            alt={servicio.nombre}
                          />
                        </td>
                        <td className="m-auto p-4 service-name">
                          {servicio.nombre}
                        </td>
                        <td className="m-auto p-4 service-description">
                          {servicio.descripcion}
                        </td>
                        <td className="m-auto p-4 service-price">
                          ${servicio.costo}
                        </td>
                        <td className="m-auto p-4">
                          {servicio.estado === true ? (
                            <span className="habilitado">Habilitado</span>
                          ) : (
                            <span className="deshabilitado">Deshabilitado</span>
                          )}
                        </td>
                        <td className="m-auto">
                          <a
                            href="#target-div"
                            className="tabla-admin-btn admin-btn"
                            onClick={() => {
                              onSeleccionarServicio(servicio);
                            }}
                          >
                            <img
                              className="admin-icons"
                              src="/src/assets/ImagenesOptimizadas/icons/calendar-cog.svg"
                              alt="Modificar servicio"
                            />
                          </a>
                        </td>
                        <td className="m-auto">
                          <button
                            className="tabla-admin-btn admin-btn"
                            onClick={(e) => {
                              eliminarServicioAdmin(e, servicio.id);
                            }}
                          >
                            <img
                              className="admin-icons"
                              src="/src/assets/ImagenesOptimizadas/icons/calendar-x.svg"
                              alt="Eliminar Turno"
                            />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              ) : (
                <p>No tienes turnos reservados</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
