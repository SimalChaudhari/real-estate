"use client";
import React, { useState, useEffect } from "react";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(page);
    onPageChange(page); // Notify parent about page change
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust startPage if endPage exceeds totalPages
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="mbp_pagination text-center">
      <ul className="page_navigation">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <span
            className="page-link pointer"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span className="fas fa-angle-left" />
          </span>
        </li>
        {generatePageNumbers().map((page) => (
          <li
            key={page}
            className={`page-item ${page === currentPage ? "active" : ""}`}
          >
            <span
              className="page-link pointer"
              onClick={() => handlePageClick(page)}
            >
              {page}
            </span>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <span
            className="page-link pointer"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <span className="fas fa-angle-right" />
          </span>
        </li>
      </ul>
      <p className="mt10 pagination_page_count text-center">
        {currentPage} of {totalPages} pages
      </p>
    </div>
  );
};

export default Pagination;
