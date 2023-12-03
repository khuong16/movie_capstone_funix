import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

/* Layout */
import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import UserLayout from "../layout/UserLayout/UserLayout";

/* Page */
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import UserPage from "../pages/UserPage/UserPage";
import Loading from "../components/Loading/Loading";
import DetailMoviePage from "../pages/DetailMoviePage/DetailMoviePage";
/* Component */
import Login from "../features/Login/Login";
import Register from "../features/Register/Register";
import MovieAdmin from "../pages/MovieAdmin/MovieAdmin";
import Booking from "../pages/Booking/Booking";
import MovieDetail from "../pages/Booking/MovieDetail";
import BuyTicket from "../pages/Booking/BuyTicket";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="Home" element={<Navigate to="/" />}></Route>
          <Route path="Login" element={<Login />}></Route>
          <Route path="Register" element={<Register />}></Route>
          <Route path="Movie">
            <Route index element={<NotFound></NotFound>}></Route>
            <Route path=":maPhim" element={<DetailMoviePage />}></Route>
          </Route>
        </Route>

        {/* User */}
        <Route path="/User" element={<UserLayout />}>
          <Route path="/User" element={<UserPage />} />
        </Route>

        {/* BOOKING */}
        <Route path="/datve" element={<Booking />}>
          <Route path=":maPhim" element={<MovieDetail />}></Route>
        </Route>
        <Route path="/">
          <Route path="/buy/:maLichChieu" element={<BuyTicket />} />
        </Route>

        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
