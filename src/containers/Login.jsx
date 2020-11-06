import React from "react";
import Header from "../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/Login.scss";

const Login = () => {
  return (
    <div className="login">
      <Header isLogin /* ={false} */ isAdmin={false}></Header>
      <div className="loginContainer">
        <h1 className="py-3">INGRESE SUS DATOS</h1>
        <div className="d-flex m-4 justify-content-between">
          <h2>Usuario: </h2>
          <input placeholder="Ingrese su usuario"></input>
        </div>
        <div className="d-flex m-4 justify-content-between">
          <h2>Contraseña: </h2>
          <input placeholder="Ingrese su contraseña"></input>
        </div>
        <button id="button_login" className="my-2 mb-4">
          INGRESAR
        </button>
      </div>
    </div>
  );
};

export default Login;
