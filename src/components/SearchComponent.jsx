import { useState } from "react";
import "./css/search-component.css";
import { FilterIcon, SearchIcon } from "../icons";
import { useModalContext } from "../context/ModalContext";
import { Modal } from "../shared/components/Modal";
import FilterComponent from "../shared/components/FilterrComponent";



const SearchComponent = ({ searchType, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const { state, setState } = useModalContext();

  const openModal = (turno) => {
    setState(true);
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
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
      <button className="actionsButton" onClick={handleSearch} title="Buscar">
        <SearchIcon color="#000" size={20} />
      </button>
      <button className="actionsButton" onClick={openModal} title="Filtros">
        <FilterIcon color="#000" size={20} />
      </button>
      <Modal>
        <FilterComponent />
      </Modal>
    </div>
  );
};

export default SearchComponent;
