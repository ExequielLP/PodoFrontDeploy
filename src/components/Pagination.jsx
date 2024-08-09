import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";

export default function Pagination({ page, totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {

  }, [page]);

  function handlePageChange(page) {
    console.log(page);
    setCurrentPage(page);
    onPageChange(page); // Llama a la función de cambio de página del componente padre
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
