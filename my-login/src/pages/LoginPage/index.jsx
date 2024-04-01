/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";

import { AuthContext } from "../../contexts/auth";

import "./styles.css";

const LoginPage = () => {
  const { authenticated, login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    //Envia infos pra uma api pra um metodo de autenticaçao
    e.preventDefault();
    console.log("submit", { email, password });
    //recuperando valores q digitar e exibindo no console

    login(email, password); //integração com o meu contexto / api
  };

  return (
    <div id="login">
      <h1 className="title">Login do Sistema</h1>
      <p>{String(authenticated)}</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email} // seta o valor do campo que eu tenho no state
            onChange={(e) => setEmail(e.target.value)} //define o valor do state
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="actions">
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
