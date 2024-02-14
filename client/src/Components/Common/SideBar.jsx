import React from "react";
import { Link, Outlet, useNavigate, useLocation  } from "react-router-dom";

function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        localStorage.removeItem("authToken")
        /* axios.get('http://localhost:3000/auth/logout')
        .then(result => {
          if(result.data.Status) { 
            localStorage.removeItem("authToken")
            navigate('/login')
          }
        }) */
      }

  return (
    <div>
      <div className="h-screen w-[80px] sm:w-[200px] bg-stone-600 rounded-lg">
        <ul className="flex flex-col items-center pt-[60px] w-full">
          <li className="w-full">
            <Link
              to={"/dashboard"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${location.pathname === '/dashboard' ? 'bg-indigo-600' : ''}`}
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
              <p className="p-0 m-0 hidden sm:flex text-white text-lg">Home</p>
            </Link>
          </li>
          <li className="w-full">
            <Link
              to={"/dashboard/profile"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${location.pathname === '/dashboard/profile' ? 'bg-indigo-600' : ''}`}
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

            <p className="p-0 m-0 hidden sm:flex text-white text-lg">Profile</p>
            </Link>
          </li>
          <li className="w-full">
            <Link
              to={"/dashboard/books"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${location.pathname === '/dashboard/books' ? 'bg-indigo-600' : ''}`}
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
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>

            <p className="p-0 m-0 hidden sm:flex text-white text-lg">Book</p>
            </Link>
          </li>
          <li className="w-full" onClick={handleLogout}>
            <Link
              to={"/dashboard/logout"}
              className={`flex items-center justify-right w-full p-2 gap-2e ${location.pathname === '/dashboard/logout' ? 'bg-indigo-600' : ''}`}
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

            <p className="p-0 m-0 hidden sm:flex text-white text-lg">Logout</p>
            </Link>
          </li>

        </ul>
      </div>
    </div>
  );
}

export default SideBar;
