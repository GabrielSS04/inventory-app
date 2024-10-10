import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";
import { Header } from "../header/Header";


export const Routers = () => {
    return (
        <>
            <BrowserRouter>
            <Header/>
                <Routes>

                    <Route path="/login" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/sobre" element={<About/>} />


                    <Route path="*" element={<Navigate to='/login'/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}