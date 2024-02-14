import React from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import SideBar from "./SideBar";


const DashBoard = () => {
  return (
    <div className="flex">
  {/* Sidebar */}
  <SideBar />

  <div className="grow flex flex-col overflow-hidden p-3 pb-[3px]">
    {/* Navbar */}
    <NavBar />

    {/* Main Content */}
    <div className="grow overflow-x-hidden overflow-y-auto bg-stone-300 mt-3 rounded-[5px] mb-0">
      {/* Content Wrapper */}
      <div className="py-6">
        {/* Main Body */}
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default DashBoard