import { useState } from "react";
import './css/search-component.css'

const services = [
  { value: "ONICOMICOSIS", label: "ONICOMICOSIS" },
  { value: "SERVICIO GENERAL", label: "SERVICIO GENERAL" },
  { value: "REFLEXOLOGÍA", label: "REFLEXOLOGÍA" },
  { value: "LÁSER DE ALTA FRECUENCIA", label: "LÁSER DE ALTA FRECUENCIA" },
  { value: "SPA DE PIES", label: "SPA DE PIES" },
  { value: "MÁQUINA DE MASAJES DE PIES", label: "MÁQUINA DE MASAJES DE PIES" },
]

const SearchComponent = ({searchType, onSearch}) => {
    const [searchValue, setSearchValue] = useState('')
    const [selectedService, setSelectedService] = useState('')

    const handleChange = (event) => {
        setSearchValue(event.target.value);
      };
    
      const handleSearch = () => {
        onSearch(searchValue);
      };

      const handleServiceChange = (value) => {
        setSelectedService(value)
      }

  return (
    <div className="search-container">
        <input
        type="text"
        placeholder={`Buscar ${searchType}`}
        value={searchValue}
        onChange={handleChange}
        className="search-input"
        />
        <button className="admin-btn" onClick={handleSearch}>Buscar</button>
        <select
        value={selectedService}
        onChange={handleServiceChange}
        className="search-filter"
        >
          <option value="" disabled>
            Filtrar por servicio
          </option>
          {services.map((service) => (
            <option className="search-selector" key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
    </div>
  )
}

export default SearchComponent;