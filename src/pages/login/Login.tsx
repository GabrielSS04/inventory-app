import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Box from "../../images/img.png";
import perfil from "../../images/perfil-icon.png";
import passwordicon from "../../images/password-icon.png";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Lida com login e mostra erro caso falhe
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (!success) {
      setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
    }
  };

  // Navega para a tela de registro
  const handleNavigateToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <section className="container-form">
        <form onSubmit={handleLogin}>
          <p className="title">Login</p>

          <div className="inputs">
            <div className="username">
              <label htmlFor="user">
                <img src={perfil} alt="Ícone de perfil" />
              </label>
              <input
                type="text"
                id="user"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Username"
              />
            </div>
            <div className="password">
              <label htmlFor="pass">
                <img src={passwordicon} alt="Ícone de senha" />
              </label>
              <input
                type="password"
                id="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Password"
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="button-login" aria-label="Login">
            Login
          </button>
          <button
            type="button"
            className="button-gotoregister"
            onClick={handleNavigateToRegister}
          >
            Não possuo uma conta?
          </button>
        </form>
      </section>

      <div className="img-box">
        <img src={Box} alt="Imagem ilustrativa" />
      </div>
    </>
  );
}
