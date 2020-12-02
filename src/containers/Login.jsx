import React from "react";
/* import Header from "../components/Common/Header"; */
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/Login.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
/* import Swal from "sweetalert2"; */
const Login = (props) => {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  /* const [usuencontrado, setUsuencontrado] = useState(false); */
  const { usuarios, setUsuarioActivo, setIsLogin, setIsAdmin} = props;
  const history = useHistory();

  useEffect(() => {
    setIsLogin(true);
    setIsAdmin(false);
  }, []);

  const consultarDatos = (e) => {
    e.preventDefault();
    const activo = usuarios.find(
      (item) => item.usuarioUsu === usuario && item.contrasenaUsu === contrasena
    );
    console.log(activo)
    if (activo) {
      setUsuarioActivo(activo);
/*       console.log(activo); */
      setIsLogin(false);
      activo.permisoUsu === true ? setIsAdmin(true) : setIsAdmin(false);
      history.push("/principal");
    } else {
      /* document.getElementsByClassName("msjError").style.display = "row"; */
      document.getElementById("p-error").style.display = "inline";
      /* Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error!",
        footer: "<p>Email o contraseña incorrectas</p>",
      });
      return; */
    }
  };

  return (
    <div className="login">
      <form onSubmit={consultarDatos} className="loginContainer">
        <h1 className="py-3">INGRESE SUS DATOS</h1>
        <div className="d-flex m-4 justify-content-between login-line_input">
          <h2>Usuario: </h2>
          <input
            placeholder="Ingrese su usuario"
            onChange={(e) => setUsuario(e.target.value)}
          ></input>
        </div>
        <div className="d-flex m-4 justify-content-between login-line_input">
          <h2>Contraseña: </h2>
          <input
            placeholder="Ingrese su contraseña"
            onChange={(e) => setContrasena(e.target.value)}
            type="password"
          ></input>
        </div>
        <div className="button_eror">
          <button id="button_login" className="my-2 mb-4">
            INGRESAR
          </button>
          <p id="p-error" className="msjError">
            Los datos son INCORRECTOS!
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
