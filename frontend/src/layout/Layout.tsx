// import React from "react";
import Header from "../components/Layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import ScrollToTop from "../components/others/ScrollToTop";

const Layout = () => {
  return (
    <div>
      <ScrollToTop /> {/* Placez ScrollToTop ici, à l'intérieur du Layout */}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
