import "./style.css"
import Box from "../../img.png"
import google from "../../google-icon.png"
import github from "../../github-icon.png"
import gmail from "../../gmail-icon.png"
import perfil from "../../perfil-icon.png"
import password from "../../password-icon.png"
import Logo from "../../logo-icon.png"
import { useNavigate } from "react-router-dom"



export default function Login(){

    const navigate = useNavigate();

    function toHome(){
        navigate("/home")
    }

    return (
        <>
            <div className="header">
                <img src={Logo} alt="" className="logo-icon"/>
                
            </div>
            
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
                            <p>Contect with google</p>
                        </div>

                        <div className='github'>
                            <img src={github} alt="github" className="icons"/>
                            <p>Contect with github</p>
                        </div>

                        <div className='gmail'>
                            <img src={gmail} alt="gmail" className="icons"/>
                            <p>Contect with gmail</p>
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