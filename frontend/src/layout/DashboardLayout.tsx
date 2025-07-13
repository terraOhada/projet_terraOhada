// import React from "react";
import SidebarDash from "../components/adminComponents/LayoutDash/SidebarDash";
// import MainDash from "../components/adminComponents/LayoutDash/MainDash";
import { Outlet } from "react-router-dom";
import Couverture from "../assets/images/couverture.jpeg"; // Adjust path as needed

const DashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-[20%] fixed left-0 h-screen z-50">
        <SidebarDash />
      </div>
      <div
        className="w-full pl-[20%] min-h-screen relative"
        style={{
          backgroundImage: `url(${Couverture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-ohada-blue-one/50 absolute inset-0 -z-10"></div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
