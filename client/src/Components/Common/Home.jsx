import React, { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import BookPopup from "./../Books/BookPopup.jsx";

function Home() {
  const [allBooks, setBooks] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getAllBooks(currentPage);
  }, [currentPage]);

  const getAllBooks = async (page) => {
    try {
      const response = await axios.get(`/store/book?page=${page}`);
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || "Error fetching books");
    }
  };

  const openBookPopup = (book) => {
    setSelectedBook(book);
  };

  const closeBookPopup = () => {
    setSelectedBook(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="h-screen p-4 flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      {allBooks && (
        <ul className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:gap-4 sm:justify-evenly">
          {allBooks.map((book) => (
            <li
              key={book.isbn}
              className="mb-4 flex flex-col items-center w-[250px] h-auto"
            >
              <div
                className="image-card border-2 border-pink-500 cursor-pointer"
                onClick={() => openBookPopup(book)}
              >
                <p>{`${book.name}`}</p>
                {book.img && (
                  <img
                    className="w-[250px] h-[320px] mt-2"
                    src={`${axios.defaults.baseURL}/${book.img}`}
                    alt="Book Cover"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
      {selectedBook && (
        <BookPopup book={selectedBook} onClose={closeBookPopup} />
      )}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`pagination-button ${
              currentPage === index + 1 ? "bg-red-600 m-2 rounded-[50%] w-8 h-8" : "bg-red-300 m-2 rounded-[50%] w-8 h-8"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
    </div>
  );
}

export default Home;
