import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxPagesToShow = 3;

  const getPageNumbers = () => {
    const halfMax = Math.floor(maxPagesToShow / 2);
    let start = Math.max(currentPage - halfMax, 1);
    let end = Math.min(start + maxPagesToShow - 1, totalPages);

    if (totalPages - end < halfMax) {
      start = Math.max(end - maxPagesToShow + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="pagination-button">
          &lt; Prev
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            currentPage === page
              ? "bg-indigo-600 m-2 rounded-[50%] w-8 h-8"
              : "bg-indigo-300 m-2 rounded-[50%] w-8 h-8"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="pagination-button">
          Next &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
