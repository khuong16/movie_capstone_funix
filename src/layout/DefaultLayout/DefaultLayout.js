import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function DefaultLayout() {
  return (
    <div className="flex flex-col justify-between items-center w-full min-h-screen">
      <Header></Header>
      <div className="flex-grow flex w-full h-full justify-center ">
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
}
