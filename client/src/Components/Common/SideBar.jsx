import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser && currentUser.role === "admin";

  return (
    <div>
      <div className="h-full w-[60px] sm:w-[170px] bg-stone-600 rounded-lg">
        <ul className="flex flex-col items-center pt-[60px] w-full">
          {/* home */}
          <li className="w-full">
            <Link
              to={"/dashboard"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${
                location.pathname === "/dashboard" ? "bg-indigo-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-[40px] h-[40px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <p className="p-0 m-0 hidden sm:flex text-white text-lg sm:ml-2">
                Home
              </p>
            </Link>
          </li>

          {/* profile */}
          <li className="w-full">
            <Link
              to={"/dashboard/profile"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${
                location.pathname === "/dashboard/profile"
                  ? "bg-indigo-600"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-[40px] h-[40px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p className="p-0 m-0 hidden sm:flex text-white text-lg sm:ml-2">
                Profile
              </p>
            </Link>
          </li>

          {/* add book */}
          <li className="w-full">
            <Link
              to={"/dashboard/add-book"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${
                location.pathname === "/dashboard/add-book"
                  ? "bg-indigo-600"
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-[40px] h-[40px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              </svg>

              <p className="p-0 m-0 hidden sm:flex text-white text-lg sm:ml-2">
                Add
              </p>
            </Link>
          </li>

          {/* delete book */}
          {isAdmin && (
            <li className="w-full">
              <Link
                to={"/dashboard/delete-books"}
                className={`flex items-center justify-right w-full p-2 gap-2e ${
                  location.pathname === "/dashboard/delete-books"
                    ? "bg-indigo-600"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-[40px] h-[40px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>

                <p className="p-0 m-0 hidden sm:flex text-white text-lg sm:ml-2">
                  Delete
                </p>
              </Link>
            </li>
          )}

          {/* log out */}
          <li className="w-full" onClick={handleLogout}>
            <Link
              to={"/dashboard/logout"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${
                location.pathname === "/dashboard/logout" ? "bg-indigo-600" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-[40px] h-[40px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>

              <p className="p-0 m-0 hidden sm:flex text-white text-lg sm:ml-2">
                Logout
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideBar;
