import { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "../css/pagination-tables.css"

export default function Pagination({ page, totalPages, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(page);

  function handlePageChange(page) {
    console.log(page);
    setCurrentPage(page);
    onPageChange(page);
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
