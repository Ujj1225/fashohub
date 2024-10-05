import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import MNavbar from "../components/MNavbar/MNavbar";
const UserLayout = () => {
  const isMobile = useMediaQuery("(max-width: 1250px)");

  return (
    <div className="pt-16">
      {isMobile ? <MNavbar /> : <Navbar />}
      <Outlet />
    </div>
  );
};

export default UserLayout;
