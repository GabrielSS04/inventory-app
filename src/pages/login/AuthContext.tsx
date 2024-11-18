import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Interface para definir o tipo do usuário
interface User {
  username: string;
  email?: string; // Adicionado email como opcional
  password?: string; // Senha opcional, já que não será armazenada no estado do usuário logado
}

// Interface para os valores do contexto
interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Carregar o usuário logado do localStorage quando o componente for montado
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  // Função para login
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Fazer a requisição para buscar os usuários do banco de dados
      const response = await fetch("http://localhost:3000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Erro ao buscar usuários do banco de dados.");
      }
  
      const users: User[] = await response.json();
  
      // Verificar se existe um usuário com as credenciais fornecidas
      const existingUser = users.find(
        (user) => user.username === username && user.password === password
      );
  
      if (existingUser) {
        // Atualizar o estado do usuário logado e armazenar no localStorage
        setUser({ username });
        localStorage.setItem("loggedUser", JSON.stringify({ username }));
        navigate("/home"); // Navegar para a página inicial
        return true;
      }
  
      alert("Credenciais inválidas! Verifique o username e a senha.");
      return false;
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Ocorreu um erro durante o login. Tente novamente.");
      return false;
    }
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    navigate("/login"); // Navegar de volta para a página de login
  };

  // Função para registro
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3000/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Obter mensagem de erro do servidor
        throw new Error(errorMessage || "Erro ao registrar o usuário");
      }

      const result = await response.json();
      alert(`Usuário registrado com sucesso! Bem-vindo, ${result.username}`);
      navigate("/login");
      return true;
    } catch (error) {
      console.error("Erro durante o registro:", error);
      alert("Erro ao registrar, tente novamente.");
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
