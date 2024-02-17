import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axiosInstance from "./../../../auth/axiosInstance.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    userName: Yup.string().required("Username required!"),
    email: Yup.string()
      .required("Email required!")
      .email("Invalid email format!"),
    password: Yup.string()
      .required("Password required!")
      .min(8, "Password must be 8 characters"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      firstName: "migara",
      userName: "migara10",
      email: "migara@gmail.com",
      password: "J@va1234",
      role: "user",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      registerUser(values);
    },
  });

  // Register user function
  const registerUser = async (user) => {
    await axiosInstance
      .post("auth/register", user)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.response.data.message);
      });
  };

  return (
    <div className="sm:flex-row sm:flex sm:items-center sm:justify-center sm:h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title flex  justify-center items-center  w-full sm:w-2/5">
        <h2 className="text-[1.8em] my-6 text-center w-full sm:text-[2em] md:text-[3em]">
          Book Store
        </h2>
      </div>

      <div className="form-data flex justify-center items-center w-full sm:w-3/5">
        <div className="register flex flex-col justify-center">
          <form
            className="p-6 bg-green-500 rounded-[10px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col justify-start gap-3">
              <h3 className="text-center text-lg font-bold">Register</h3>

              {/* user name */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center ">
                <label htmlFor="">User Name</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("userName")}
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Username*"
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.userName}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* email */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center ">
                <label htmlFor="Email">Email</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("email")}
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Email*"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* password */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center ">
                <label htmlFor="">Password</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("password")}
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-72 outline-none sm:ml-3"
                    type="text"
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* select role */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center ">
                <label htmlFor="">Select Role</label>
                <select
                  {...formik.getFieldProps("role")}
                  className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-72 outline-none sm:ml-3"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <button
                  className=" p-2 w-2/6 bg-indigo-800 rounded-[5px] hover:bg-indigo-500 transition-colors duration-300"
                  type="submit"
                >
                  Register
                </button>
                <p>
                  Already Register?
                  <Link to={"/login"} className="text-red-600">
                    {" "}
                    Log In
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
