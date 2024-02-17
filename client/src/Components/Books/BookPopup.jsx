import React, { useEffect, useState } from "react";
import axiosInstance from "./../../auth/axiosInstance.js";
import EditBook from "./EditBook.jsx";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const BookPopup = ({ book, onClose }) => {
  const [editData, setEditData] = useState(false);
  const [isDelete, deletePathSet] = useState(false);

  const location = useLocation(); // get parent path

  useEffect(() => {
    deletePathSet(location.pathname === "/dashboard/delete-books");
  }, [location]);

  const toggleEdit = () => {
    setEditData(true);
  };

  const DeleteBooks = async (id) => {
    await axiosInstance
      .delete(`store/book/${id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.response.data.message);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <Toaster position="top-center" reverseOrder={false} />
      {!editData && (
        <div className="bg-white p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">{book.name}</h3>
          {book.img && (
            <img
              className="w-64 h-64 mb-2"
              src={`${axiosInstance.defaults.baseURL}/${book.img}`}
              alt="Book Cover"
            />
          )}
          <p className="text-sm font-semibold mb-2">Author: {book.author}</p>
          <p className="text-[0.8em] font-semibold mb-2">ISBN: {book.isbn}</p>
          <div className="flex justify-end gap-3">
            {isDelete && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-[5px]"
                onClick={() => {
                  DeleteBooks(book._id);
                }}
              >
                Delete
              </button>
            )}
            {!isDelete && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-[5px]"
                onClick={toggleEdit}
              >
                Edit
              </button>
            )}
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-[5px]"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {editData && <EditBook book={book} onClose={onClose} />}
    </div>
  );
};

export default BookPopup;
