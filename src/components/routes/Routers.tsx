import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/login/Login";
import Home from "../../pages/home/Home";
import About from "../../pages/about/About";


export const Routers = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/about" element={<About/>} />


                    <Route path="*" element={<Navigate to='/login'/>} />
                    
                </Routes>
            </BrowserRouter>
        </>
    );
}