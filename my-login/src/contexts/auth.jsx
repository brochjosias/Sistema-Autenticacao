//Memória central do sistema reservada pra deixar disponivel pra gravar certas infos que precisam ser global, ex: usuario central: admin
import React, { createContext, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State
  const [loading, setLoading] = useState(true); //Carregar a info de login

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    // recoveredUser = Usuario recuperado
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);
  // Primeiro parametro: função q quero q seja executada no momento que eu inicializar
  // [] Array de monitoramento: a partir de quem quero q o useEffect seja executado

  const login = (email, password) => {
    console.log("login auth", { email, password });

    // Ir na api e criar uma session

    const loggedUser = {
      id: "123",
      email,
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));

    if (password === "secret") {
      setUser(loggedUser); //Seta o usuário
      navigate("/"); //Navegar para a homePage
    }

    //setUser({ id: "123", email }); // Dado fixo pra nao trabalhar com api (mock)
  }; //Função Login

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
      // user != null === authenticated = true, Casting simples q faz isso = !!user
    >
      {children}
    </AuthContext.Provider>
  );
  // {children} = Exibe o conteudo que o componente esta abraçando. No caso oq esta dentro do AuthProvider no AppRoutes
};
