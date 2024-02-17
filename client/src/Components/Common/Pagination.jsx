import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`pagination-button ${
            currentPage === index + 1
              ? "bg-indigo-600 m-2 rounded-[50%] w-8 h-8"
              : "bg-indigo-300 m-2 rounded-[50%] w-8 h-8"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
