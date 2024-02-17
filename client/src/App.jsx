import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AxiosInstance from "./auth/axiosInstance";
import "./App.css";
import Register from "./Components/Users/Register/Register";
import Login from "./Components/Users/Login/Login";
import Dashboard from "./Components/Common/DashBoard";
import Home from "./Components/Common/Home";

import { UserProvider } from "./UserContext"; // import user context
import AddBook from "./Components/Books/AddBook";
import AdminRouteGuard from "./utils/AdminRouteGuard";

AxiosInstance.defaults.baseURL = "http://localhost:3000"; // backend base URL

const UserRouteGuard = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return currentUser ? children : <Navigate to="/login" />;
};

// routers
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/",
        element: (
          <UserRouteGuard>
            <Home />
          </UserRouteGuard>
        ),
      },
      {
        path: "/dashboard/delete-books",
        element: (
          <UserRouteGuard>
             <AdminRouteGuard />
          </UserRouteGuard>
        ),
      },
      {
        path: "/dashboard/add-book",
        element: (
          <UserRouteGuard>
            <AddBook />
          </UserRouteGuard>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "*",
    element: <div>page not found</div>,
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserProvider>
  );
}

export default App;
