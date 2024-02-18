import React from "react";
import { useUser } from "./../../UserContext";

function NavBar() {
  const { user } = useUser();

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
            <p className="">Role: {user.role}</p>
          </div>
        )}
        {!user && <p>Hello User</p>}
      </div>
    </nav>
  );
}

export default NavBar;
