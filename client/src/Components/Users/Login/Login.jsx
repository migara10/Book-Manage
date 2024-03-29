import React from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axiosInstance from "./../../../auth/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateUser } = useUser(); // use context

  // Validation schema
  const validationSchema = Yup.object({
    userName: Yup.string().required("Username required!"),
    password: Yup.string()
      .required("Password required!")
      .min(8, "Password must be 8 characters"),
  });

  // useFormik hook
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      loginUser(values);
    },
  });

  // login user function
  const loginUser = async (user) => {
    await axiosInstance
      .post("auth/login", user)
      .then((res) => {
        const { accessToken, refreshToken, message, user } = res.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        toast.success(message);
        setTimeout(() => {
          updateUser(user);
          navigate("/dashboard");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.error || error.response.data.message);
      });
  };

  return (
    <div className="sm:flex-row sm:flex sm:items-center sm:justify-center sm:h-screen overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="title flex  justify-center items-center  w-full sm:w-2/5">
        <h2 className="text-[2em] my-6 text-center w-full sm:text-[2.8em] md:text-[4em]  text-indigo-800">
          Book Store
        </h2>
      </div>

      <div className="form-data flex justify-center h-[400px] sm:h-full items-center w-full sm:w-3/5">
        <div className="login h-auto flex flex-col justify-center">
          <form
            className="p-6 bg-green-500 rounded-[10px]"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col justify-start gap-3">
              <h3 className="text-center text-lg font-bold">Login</h3>

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

              {/* password */}
              <div className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center ">
                <label htmlFor="">Password</label>
                <div className="flex flex-col">
                  <input
                    {...formik.getFieldProps("password")}
                    className="input-field rounded-[5px] px-2 py-2 border-2 border-indigo-600 w-72 outline-none sm:ml-3"
                    type="password"
                    placeholder="Password*"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600 font-semibold ml-3 my-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="text-white p-2 w-1/4 bg-indigo-800 rounded-[5px] hover:bg-indigo-500 transition-colors duration-300"
                  type="submit"
                >
                  Log In
                </button>
                <p>
                  Still not Register?
                  <Link to={"/register"} className="text-red-600">
                    {" "}
                    Sign In
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

export default Login;
