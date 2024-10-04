import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { priceFormatter } from "../utils/priceFormatter";
import ServicesContext from "./../context/ServiceContext";
import Pagination from "../shared/components/Pagination";
import Table from "../shared/components/Table";
import SearchComponent from "./SearchComponent";
import { CalendarCrossIcon, CalendarSettingsIcon } from "../icons/index";
import "../shared/css/Tablas-Admin.css";

export const TurnosAdmin = () => {
  const { arrayTurnosAdmin, listaTurnosAdmin, eliminarTurnoAdmin } =
    useContext(ServicesContext);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setpageSize] = useState(10);

  const [searchType, setSearchType] = useState("cliente");
  const [searchResult, setSearchResult] = useState("");

  // Ordenar turnos reservados por fecha
  const turnosReservados = arrayTurnosAdmin.content
    ?.filter((turno) => turno.estado === true)
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const handleSearch = (searchValue) => {
    // Maneja el valor de búsqueda emitido por el componente hijo
    console.log(`Buscando ${searchType}: ${searchValue}`);
    setSearchResult(searchValue);
  };

  useEffect(() => {
    listaTurnosAdmin(pageNumber);
  }, [pageNumber]);

  const handlePageChange = (newPageNumber) => {
    console.log(newPageNumber);
    setPageNumber(newPageNumber - 1); // Asegúrate de restar 1 para convertir a base 0
  };

  const columns = [
    { key: "nombreUsuario", header: "Nombre del Cliente" },
    { key: "nombreServicio", header: "Nombre del servicio" },
    {
      key: "startTime",
      header: "Hora del turno",
      render: (startTime) => format(new Date(startTime), "hh:mm a dd/MM/yyyy"),
    },
    {
      key: "costo",
      header: "Costo",
      render: (costo) => priceFormatter(costo),
    },
    {
      key: "estado",
      header: "Estado del turno",
      render: (estado) => (
        <span className={estado ? "habilitado" : "deshabilitado"}>
          {estado ? "Confirmado" : "Cancelado"}
        </span>
      ),
    },
  ];

  const actions = [
    {
      label: "Modificar",
      icon: (
        <CalendarSettingsIcon size={24} color="#050505" alt="Modificar turno" />
      ),
      onClick: (turno) => {
        // Implementar lógica de modificación aquí
      },
    },
    {
      label: "Cancelar",
      icon: <CalendarCrossIcon size={24} color="#050505" alt="Quitar turno" />,
      onClick: (turno) => eliminarTurnoAdmin(turno.id, pageNumber, pageSize),
    },
  ];

  return (
    <main className="admin-table-main-container">
      <SearchComponent searchType={searchType} onSearch={handleSearch} />
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
                {turnosReservados && turnosReservados.length > 0 ? (
                  <>
                    <Table
                      columns={columns}
                      data={turnosReservados}
                      actions={actions}
                    />
                    <Pagination
                      page={pageNumber}
                      totalPages={arrayTurnosAdmin.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <p>No tienes turnos reservados</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="admin-section-buttons">
          <Link className="admin-btn" to={"/"}>
            Volver a inicio
          </Link>
          <Link className="admin-btn" to={"/admin/servicios"}>
            Ir a servicios
          </Link>
        </div>
      </section>
    </main>
  );
};
