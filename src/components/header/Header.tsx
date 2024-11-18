import "./style.css";
import React from "react";
import { useAuth } from "../../pages/login/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo-icon.png";

export const Header = () => {
  const { user, logout } = useAuth(); // Pega o usuário logado e a função de logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Executa o logout
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo-ico" />

      {/* Renderiza o menu de navegação e logout apenas se o usuário estiver logado */}
      {user ? (
        <>
          <ul className="links-ul">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/sobre">About</a>
            </li>
            <li>
              <a href="/inventory">Inventory</a>
            </li>
          </ul>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
        <span></span>
        <span></span>
        <span></span>
        </>
      )}
    </div>
  );
};
