import React, { useState, useEffect } from "react";
import AxiosInstance from "./../../auth/axiosInstance.js";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import BookPopup from "./../Books/BookPopup.jsx";
import Pagination from "./Pagination.jsx";
import {DebounceInput} from 'react-debounce-input';

function Home() {
  const [allBooks, setBooks] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

 

  useEffect(() => {
    getAllBooks(currentPage);
  }, [currentPage, searchQuery]);

  const getAllBooks = async (pageNumber) => {
    try {
      const response = await AxiosInstance.get(
        `/store/book?page=${pageNumber}&limit=3&search=${searchQuery}`
      );
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error fetching books");
    }
  };

  const openBookPopup = (book) => {
    setSelectedBook(book);
  };

  const closeBookPopup = () => {
    setSelectedBook(null);
    getAllBooks(1); // after edit reload get all books
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchBooks = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1) /* when user go to 2nd or above page and search books
    page number auto redirect to 1 */
  };

  return (
    <div className="h-screen p-4 flex flex-col items-center">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">All Books</h2>

      {/* Search books */}
      <DebounceInput
          className="border p-2 mb-4 outline-none w-9/10 sm:w-1/2"
          placeholder="Search books..."
          minLength={2}
          debounceTimeout={300}
          value={searchQuery}
          onChange={handleSearchBooks}
      />

      {allBooks && (
        <ul className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:gap-4 sm:justify-evenly">
          {allBooks.map((book) => (
            <li
              key={book.isbn}
              className="mb-4 flex flex-col items-center w-[250px] h-auto"
            >
              <div
                className="image-card cursor-pointer"
                onClick={() => openBookPopup(book)}
              >
                {book.img && (
                  <img
                    className="w-[250px] h-[320px] mt-2"
                    src={`${AxiosInstance.defaults.baseURL}/${book.img}`}
                    alt="Book Cover"
                  />
                )}
                <p className="text-[1em] font-semibold">{`${book.name}`}</p>
                <p className="text-[0.8em] font-semibold">{`${book.author}`}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedBook && <BookPopup book={selectedBook} onClose={closeBookPopup} />}

      {/* Render Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
