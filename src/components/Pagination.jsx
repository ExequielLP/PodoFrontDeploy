import { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

import "react-responsive-pagination/themes/classic.css";
// ^ classic theme, see below for other themes
// include this once in the project (preferrably the main index.js)

export default function Pagination() {
  const totalPages = 120;
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageChange(page) {
    setCurrentPage(page);
    // ... do something with `page`
  }

  return (
    <ResponsivePagination
      total={totalPages}
      current={currentPage}
      onPageChange={(page) => handlePageChange(page)}
    />
  );
}
