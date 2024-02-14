import React from "react";
import { useUser } from "./../../UserContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, logOutUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOutUser();
    navigate("/login", { state: { user } });
  };

  return (
    <nav className="w-[95/100] rounded-lg bg-stone-400">
      <div className="w-full">
        {user && (
          <div className="flex flex-col items-end sm:hidden pr-4">
            <p className="mb-2">Hello {user.firstName}</p>
            <p className="">{user.role}</p>
          </div>
        )}
        {user && (
          <div className="hidden items-end sm:flex sm:justify-between p-4">
            <p className="">Hello {user.firstName}</p>
            <p className="">{user.role}</p>
          </div>
        )}
        {!user && <p>Hello User</p>}
      </div>
    </nav>
  );
}

export default NavBar;
