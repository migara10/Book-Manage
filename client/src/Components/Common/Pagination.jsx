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
    <div className="pagination bg-indigo-500 px-3 sm:px-6 rounded-[10px]">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="pagination-button font-semibold">
          &lt; Prev
        </button>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`pagination-button ${
            currentPage === page
              ? "bg-indigo-800 m-2 rounded-[50%] w-8 h-8 text-white font-semibold"
              : "bg-indigo-300 m-2 rounded-[50%] w-8 h-8 font-semibold"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)} className="pagination-button font-semibold">
          Next &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
