import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Inventory from "../pages/inventory/Inventory";
import { Header } from "../components/header/Header";
import Register from "../pages/login/Register";

export const Routers = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};
