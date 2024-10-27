import { useState } from "react";
import { useModalContext } from "../../context/ModalContext";
import "../css/modal-filter.css";
/*
PROPS
{ state, dispatch, searchTypes, services, states, handleSearch, saveFilter, loadFilter, setIsModalOpen, format, validateCost }
*/
const services = [
  { value: "LÁSER DE ALTA FRECUENCIA", label: "LÁSER DE ALTA FRECUENCIA" },
  { value: "MÁQUINA DE MASAJES DE PIES", label: "MÁQUINA DE MASAJES DE PIES" },
  { value: "ONICOMICOSIS", label: "ONICOMICOSIS" },
  { value: "REFLEXOLOGÍA", label: "REFLEXOLOGÍA" },
  { value: "SERVICIO GENERAL", label: "SERVICIO GENERAL" },
  { value: "SPA DE PIES", label: "SPA DE PIES" },
];

const servicesOrderASC = services.sort((a, b) => (a.value > b.value ? 1 : -1));

const FilterComponent = () => {
  const { setExclusiveModal } = useModalContext();
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };

  return (
    <div className="modal-filter-container">
      <div className="modal-filter-content">
        <h2 className="modal-filter-title">Filtros de búsqueda</h2>
        <div className="modal-filter">
          {/* <div className="filter-input-group">
            <label htmlFor="search-type" className="filter-input-label">
              Tipo de búsqueda
            </label>
            <select
              id="search-type"
              //   value={state.searchType}
              //   onChange={(e) =>
              //     dispatch({ type: "SET_SEARCH_TYPE", payload: e.target.value })
              //   }
              className="filter-select"
            >
              {/* {searchTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))} 
            </select>
          </div>
           <div className="filter-input-group">
            <label htmlFor="search-value" className="filter-input-label">
              Valor de búsqueda
            </label>
            <input
              type="text"
              id="search-value"
              //   value={state.searchValue}
              //   onChange={(e) =>
              //     dispatch({ type: "SET_SEARCH_VALUE", payload: e.target.value })
              //   }
              className="filter-input"
              placeholder={`Buscar por ${"state.searchType"}`}
            />
          </div> */}
          <div className="filter-input-group">
            <label htmlFor="service-filter" className="filter-input-label">
              Filtrar por servicio
            </label>
            <select
              id="service-filter"
              value={selectedService}
              onChange={handleServiceChange}
              className="filter-select"
            >
              <option value="">Seleccionar servicio</option>
              {servicesOrderASC.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-input-group">
            <label htmlFor="state-filter" className="filter-input-label">
              Filtrar por estado
            </label>
            <select
              id="state-filter"
              //   value={state.state}
              //   onChange={(e) =>
              //     dispatch({ type: "SET_STATE", payload: e.target.value })
              //   }
              className="filter-select"
            >
              <option value="">Seleccionar estado</option>
              {/* {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))} */}
            </select>
          </div>
          <div className="filter-input-group">
            <label htmlFor="date-filter" className="filter-input-label">
              Filtrar por fecha
            </label>
            <input
              type="date"
              id="date-filter"
              //   value={
              //     state.date ? format(new Date(state.date), "yyyy-MM-dd") : ""
              //   }
              //   onChange={(e) =>
              //     dispatch({ type: "SET_DATE", payload: e.target.value })
              //   }
              className="filter-input"
            />
          </div>
          {/* <div className="filter-input-group">
            <label htmlFor="cost-filter" className="filter-input-label">
              Filtrar por costo
            </label>
            <input
              type="text"
              id="cost-filter"
              //   value={state.cost}
              //   onChange={(e) => {
              //     if (validateCost(e.target.value)) {
              //       dispatch({ type: "SET_COST", payload: e.target.value });
              //     }
              //   }}
              className="filter-input"
              placeholder="Ingrese costo"
            />
          </div> */}
        </div>
        <div className="modal-filter-buttons">
          <button
            onClick={() => {
              // onSearchFilter();
              setExclusiveModal(null);
            }}
            className="filter-btn filter-btn-close"
          >
            Cerrar
          </button>
          <button
            //onClick={saveFilter}
            className="filter-btn filter-btn-secondary"
          >
            Guardar filtro
          </button>
          <button
            // onClick={loadFilter}
            className="filter-btn filter-btn-secondary"
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
