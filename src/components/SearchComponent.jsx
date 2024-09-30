import { useState } from "react";
import './css/search-component.css'

const services = [
  { value: "LÁSER DE ALTA FRECUENCIA", label: "LÁSER DE ALTA FRECUENCIA" },
  { value: "MÁQUINA DE MASAJES DE PIES", label: "MÁQUINA DE MASAJES DE PIES" },
  { value: "ONICOMICOSIS", label: "ONICOMICOSIS" },
  { value: "REFLEXOLOGÍA", label: "REFLEXOLOGÍA" },
  { value: "SERVICIO GENERAL", label: "SERVICIO GENERAL" },
  { value: "SPA DE PIES", label: "SPA DE PIES" },
]
const servicesOrderASC= services.sort((a, b) => (a.value > b.value ? 1 : -1));

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
          <option value="" disabled placeholder="Filtrar por servicio">
            Filtrar por servicio
          </option>
          {services.map((service) => (
            <option className="search-selector" key={servicesOrderASC.value} value={servicesOrderASC.value}>
              {service.label}
            </option>
          ))}
        </select>
    </div>
  )
}

export default SearchComponent;