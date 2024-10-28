import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React from "react";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import { Header } from "../components/header/Header";
import Inventory from "../pages/inventory/Inventory";


export const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>

                    <Route path="/login" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/sobre" element={<About/>} />
                    <Route path="/inventory" element={<Inventory/>} />


                    <Route path="*" element={<Navigate to='/login'/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}