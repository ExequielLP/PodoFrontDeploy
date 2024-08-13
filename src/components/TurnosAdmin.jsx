import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import ServicesContext from "./../context/ServiceContext";
import "./css/Tablas-Admin.css";
import Pagination from "./Pagination";

export const TurnosAdmin = () => {
  const { arrayTurnosAdmin, listaTurnosAdmin, eliminarTurnoAdmin } =
    useContext(ServicesContext);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setpageSize] = useState(10)
  useEffect(() => {
    listaTurnosAdmin(pageNumber);

    console.log(arrayTurnosAdmin.numberOfElements)
  }, [pageNumber]);

  const handlePageChange = (newPageNumber) => {
    console.log(newPageNumber);
    setPageNumber(newPageNumber - 1); // Asegúrate de restar 1 para convertir a base 0
  };



  return (
    <section className="tabla-admin">
      <div className="accordion" id="accordionExample">
        <div className="accordion-item text-center">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Turnos reservados
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body table-responsive">
              {arrayTurnosAdmin.content &&
                arrayTurnosAdmin.content.length > 0 &&
                arrayTurnosAdmin.content.some((e) => e.estado === true) ? (
                <>
                  <table className="table align-middle">
                    <thead className="tabla-header">
                      <tr>
                        <th scope="col" className="m-auto text-center">
                          Nombre del Cliente
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Nombre del servicio
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Hora del turno
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Costo
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Estado del turno
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Modificar
                        </th>
                        <th scope="col" className="m-auto text-center">
                          Cancelar
                        </th>
                      </tr>
                    </thead>
                    {arrayTurnosAdmin.content.map((turno) =>
                      turno.estado === true ? (
                        <tbody key={turno.id}>
                          <tr>
                            <td className="m-auto p-4 user-name">
                              {turno.nombreUsuario}
                            </td>
                            <td className="m-auto p-4 service-name">
                              {turno.nombreServicio}
                            </td>
                            <td className="m-auto p-4 service-time">
                              {format(
                                new Date(turno.startTime),
                                "hh:mm a dd/MM/yyyy"
                              )}
                            </td>
                            <td className="m-auto p-4 service-price">
                              ${turno.costo}
                            </td>
                            <td className="m-auto p-4">
                              {turno.estado === true ? (
                                <span className="habilitado">Confirmado</span>
                              ) : (
                                <span className="deshabilitado">Cancelado</span>
                              )}
                            </td>
                            <td className="m-auto">
                              <button
                                className="tabla-admin-btn admin-btn"
                              // onClick={(e) => {
                              //   eliminarTurno(e, listaTurnos.id);
                              // }}
                              >
                                <img
                                  className="admin-icons"
                                  src="/assets/icons/calendar-cog.svg"
                                  alt="Modificar Turno"
                                />
                              </button>
                            </td>
                            <td className="m-auto">
                              <button
                                className="tabla-admin-btn admin-btn"
                                onClick={(e) => {
                                  eliminarTurnoAdmin(
                                    e,
                                    turno.id,
                                    pageNumber,
                                    pageSize
                                  );
                                }}
                              >
                                <img
                                  className="admin-icons"
                                  src="/assets/icons/calendar-x.svg"
                                  alt="Eliminar Turno"
                                />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ) : null
                    )}
                  </table>
                  <Pagination
                    page={pageNumber}
                    totalPages={arrayTurnosAdmin.totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <p>No tienes turnos reservados</p>
              )}
            </div >
          </div >
        </div >
      </div >
      <div className="admin-section-buttons">
        <Link className="admin-btn" to={"/"}>
          {" "}
          Volver a inicio
        </Link>
        <Link className="admin-btn" to={"/admin/servicios"}>
          {" "}
          Ir a servicios
        </Link>
      </div>
    </section >
  );
};
