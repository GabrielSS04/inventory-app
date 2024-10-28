import "./style.css"
import Box from "../../images/img.png"
import google from "../../images/google-icon.png"
import github from "../../images/github-icon.png"
import gmail from "../../images/gmail-icon.png"
import perfil from "../../images/perfil-icon.png"
import password from "../../images/password-icon.png"
import { useNavigate } from "react-router-dom"

import React from "react"


export default function Login(){

    const navigate = useNavigate();

    function toHome(){
        navigate("/home")
    }

    return (
        <>
            
            <section className="container-form">
                <form>
                    <p className="title">Login</p>

                    <div className="inputs">
                        <div className="username">
                            <label htmlFor="user">
                                <img src={perfil} alt="image" />
                            </label>
                            <input type="text" name="user" id="user" placeholder='Username'/>
                        </div>
                        <div className="password">
                            <label htmlFor="pass">
                                <img src={password} alt="image" />
                            </label>
                            <input type="password" name='pass' id='pass' placeholder='Password' />
                        </div>
                    </div>

                    <button className="button-login" onClick={toHome}>Login</button>


                    <div className='login-with'>
                        <div className='google'>
                            <img src={google} alt="google" className="icons"/>
                            <p>Conect with google</p>
                        </div>

                        <div className='github'>
                            <img src={github} alt="github" className="icons"/>
                            <p>Conect with github</p>
                        </div>

                        <div className='gmail'>
                            <img src={gmail} alt="gmail" className="icons"/>
                            <p>Conect with gmail</p>
                        </div>
                    </div>
                </form>

                
            </section>

            <div className="img-box">
                <img src={Box} alt="" />
            </div>
        </>
    );
}