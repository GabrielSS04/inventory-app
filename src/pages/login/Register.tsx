import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Se você quiser usar o mesmo contexto de login para registrar

import "./style.css";
import Box from "../../images/img.png";
import perfil from "../../images/perfil-icon.png";
import passwordicon from "../../images/password-icon.png"
import emailico from "../../images/email-icon.png"

export default function Register() {
    const { register } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); // Novo estado para o email
    const [password, setPassword] = useState("");
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await register(username, email, password);
      if (success) {
        alert("Registro realizado com sucesso!");
      }
    };
  
    return (
      <>
        <div className="container-form">
          <form onSubmit={handleRegister}>
            <p className="title">Register</p>
            <div className="inputs">
              <div className="username">
                <label htmlFor="user">
                  <img src={perfil} alt="Perfil" />
                </label>
                <input
                  type="text"
                  id="user"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="email">
                <label htmlFor="email">
                  <img src={emailico} alt="Email" className="icons"/>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="pass">
                  <img src={passwordicon} alt="Senha" />
                </label>
                <input
                  type="password"
                  id="pass"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="button-register">
              Register
            </button>
            <button className="button-gotologin">
              <a href="/login">Já possuo uma conta?</a>
            </button>
          </form>
        </div>
  
        <div className="img-box">
          <img src={Box} alt="" />
        </div>
      </>
    );
  }
  