import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "./../../auth/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import convertBase64 from './../../utils/convertBase64.js'

const AddBook = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Book name is required!"),
    author: Yup.string().required("Author name is required!"),
    year: Yup.number()
      .required("Year is required!")
      .min(4, "Year must be 4 characters"),
    isbn: Yup.string()
      .required("ISBN is required!")
      .min(4, "ISBN must be 4 characters"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      name: "Harry Potter 1",
      author: "J.K. Rowling",
      year: 1994,
      isbn: "1851180080",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      addBook(values);
    },
  });

  // Image upload
  const uploadImage = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      try {
        const img = await convertBase64(selectedFile);
        setImgUrl(img);
      } catch (error) {
        console.error(error);
      }
    } else {
      setImgUrl(null);
    }
  };

  // Add book function
  const addBook = async (bookData) => {
    const formData = new FormData();
    formData.append("file", file);

    // Append other form values to FormData
    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });
    await axiosInstance
      .post("/store/book", formData)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.response.data.message);
      });
  };

  return (
    <div className="sm:flex-row sm:flex sm:items-start sm:justify-center sm:h-auto">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="form-data flex justify-center sm:h-full items-center w-full sm:w-3/5">
        <div className="register h-full flex flex-col justify-center">
          <form
            className="p-6 bg-green-500 rounded-[10px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col justify-start gap-3">
              <h3 className="text-center text-lg font-bold">Add New Book</h3>

              {/* Book name */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                <label htmlFor="book">Book Name</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("name")}
                    id="name"
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-54 sm:w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Book Name*"
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Author name */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                <label htmlFor="author">Author</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("author")}
                    id="author"
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-54 sm:w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Author*"
                  />
                  {formik.touched.author && formik.errors.author && (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.author}
                    </div>
                  )}
                </div>
              </div>

              {/* Year */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                <label htmlFor="year">Year</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("year")}
                    id="year"
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-54 sm:w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Year*"
                  />
                  {formik.touched.year && formik.errors.year && (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.year}
                    </div>
                  )}
                </div>
              </div>

              {/* ISBN */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center">
                <label htmlFor="isbn">ISBN</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("isbn")}
                    id="isbn"
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-54 sm:w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="ISBN*"
                  />
                  {formik.touched.isbn && formik.errors.isbn && (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.isbn}
                    </div>
                  )}
                </div>
              </div>
              {/* image */}
              <div className="flex justify-end">
                <div className="image">
                <label htmlFor="add-image" className="">
                    {!imgUrl && (<svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="50px"
                      viewBox="0 0 24 24"
                      width="50px"
                      fill="indigo"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" />
                    </svg>)}
                    {imgUrl && (<img className="w-[185px] h-[150px]" src={imgUrl}  alt="" />)}
                    
                    <input
                    type="file"
                    id="add-image"
                    className="invisible hidden"
                    onChange={uploadImage}
                  />
                  </label>
                </div>
                <div className="btn ml-2">
                    <div className="btn-row flex flex-col justify-end h-full">
                    <button
                      className="p-2 mt-2 w-24 h-[40px] text-white bg-indigo-800 rounded-[5px] hover:bg-indigo-500 transition-colors duration-300"
                      type="submit"
                    >
                      Add
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
