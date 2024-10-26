import { useState } from "react";
import "./css/search-component.css";
import { FilterIcon, SearchIcon } from "../icons";

const services = [
  { value: "LÁSER DE ALTA FRECUENCIA", label: "LÁSER DE ALTA FRECUENCIA" },
  { value: "MÁQUINA DE MASAJES DE PIES", label: "MÁQUINA DE MASAJES DE PIES" },
  { value: "ONICOMICOSIS", label: "ONICOMICOSIS" },
  { value: "REFLEXOLOGÍA", label: "REFLEXOLOGÍA" },
  { value: "SERVICIO GENERAL", label: "SERVICIO GENERAL" },
  { value: "SPA DE PIES", label: "SPA DE PIES" },
];
const servicesOrderASC = services.sort((a, b) => (a.value > b.value ? 1 : -1));

const SearchComponent = ({ searchType, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={`Buscar ${searchType}`}
        value={searchValue}
        onChange={handleChange}
        className="search-input"
      />
      <button className="actionsButton" onClick={handleSearch}>
        <SearchIcon color="#000" size={20} />
      </button>
      <div className="select-container">
        <FilterIcon color="#fff" size={20} />
        <select
          value={selectedService}
          onChange={handleServiceChange}
          className="search-filter"
        >
          <option value="" disabled>
            Filtrar por servicio
          </option>
          {servicesOrderASC.map((service) => (
            <option
              className="search-selector"
              key={service.value}
              value={service.value}
            >
              {service.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchComponent;
