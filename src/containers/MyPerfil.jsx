import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import perfil from "../assets/static/perfil.jpg";
import Swal from "sweetalert2";
import "../assets/styles/MyPerfil.scss";

const MyPerfil = (props) => {
  const { usuarioActivo, setRefrescar } = props;
  const [styleInput, setStyleInput] = useState({});
  const [typePermise, setTypePermise] = useState(false);

  useEffect(() => {
    handleLoadInput();
  }, []);
  const updatePerfil = async (event) => {
    event.preventDefault();
    const pass1 = document.getElementById("passPerfil").value;
    const pass2 = document.getElementById("pass2Perfil").value;
    if ((pass1 === pass2) && (pass1 === usuarioActivo.contrasenaUsu)) {
      try {
        const user = {
          nombreUsu: document.getElementById("namePerfil").value,
          apellidoUsu: document.getElementById("surnamePerfil").value,
          usuarioUsu: document.getElementById("userNamePerfil").value,
          contrasenaUsu: pass1,
          permisoUsu: typePermise,
        };
        const resultado = await fetch(
          `http://localhost:4000/api/boaterra/administracion/usuarios/${usuarioActivo._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        if (resultado.status === 200) {
          Swal.fire("Listo!", "Tus datos fueron actualizados", "success");
          setRefrescar(true);
        }
        if (resultado.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre de usuario ya se encuentra registrado",
            footer: "<p>No se pudo actualizar sus datos.</p>",
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo actualizar sus datos.</p>",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Contraseña incorrecta!",
        footer: "<p>No se pudo actualizar sus datos.</p>",
      });
    }
  };

  const handleLoadInput = () => {
    document.getElementById("namePerfil").value = usuarioActivo.nombreUsu;
    document.getElementById("surnamePerfil").value = usuarioActivo.apellidoUsu;
    document.getElementById("userNamePerfil").value = usuarioActivo.usuarioUsu;
    document.getElementById("passPerfil").value = "";
    document.getElementById("pass2Perfil").value = "";
    if (usuarioActivo.permisoUsu) {
      document.getElementById("perfilAdmin").checked = true;
      document.getElementById("perfilEmployee").checked = false;
      setStyleInput({});
      setTypePermise(true);
    } else {
      document.getElementById("perfilEmployee").checked = true;
      document.getElementById("perfilAdmin").checked = false;
      setStyleInput({
        "pointer-events": "none",
        color: "#AAA",
        background: "#F5F5F5",
      });
      setTypePermise(false);
    }
  };

  return (
    <div className="myPerfil">
      <section className="col-4 d-flex justify-content-center align-items-start pt-5">
        <img src={perfil} alt="Perfil" className="imgPerfil" />
      </section>
      <section className="col-8 p-5 ">
        <p className="myPerfil_title">Mi Perfil</p>
        <form onSubmit={updatePerfil} className="pl-5">
          <div className="d-flex mb-4">
            <p className="myPerfil_text">Nombre: </p>
            <input
              type="text"
              id="namePerfil"
              style={styleInput}
              className="myPerfil_input"
              required
            />
          </div>
          <div className="d-flex mb-4">
            <p className="myPerfil_text">Apellido: </p>
            <input
              type="text"
              id="surnamePerfil"
              style={styleInput}
              className="myPerfil_input"
              required
            />
          </div>
          <div className="d-flex mb-4">
            <p className="myPerfil_text">usuario: </p>
            <input
              type="text"
              id="userNamePerfil"
              style={styleInput}
              className="myPerfil_input"
              required
            />
          </div>
          <div className="d-flex mb-4">
            <p className="myPerfil_text">Mi contraseña: </p>
            <input
              type="password"
              id="passPerfil"
              className="myPerfil_input"
              required
              placeholder="Ingrese su contraseña"
            />
          </div>
          <div className="d-flex mb-4">
            <p className="myPerfil_text">Repetir Contra.: </p>
            <input
              type="password"
              id="pass2Perfil"
              className="myPerfil_input"
              placeholder="Repita la contraseña"
              required
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <p className="myPerfil_text">Permiso: </p>
            <div className="d-flex w-100 pl-5">
              <div className="pl-4">
                <input
                  type="radio"
                  id="perfilEmployee"
                  name="gender"
                  value="perfilEmployee"
                  onClick={() => setTypePermise(false)}
                  style={styleInput}
                />
                <label
                  for="perfilEmployee"
                  className="userModal_permitText ml-1"
                >
                  Vendedor
                </label>
              </div>
              <div className="ml-3">
                <input
                  type="radio"
                  id="perfilAdmin"
                  name="gender"
                  value="perfilAdmin"
                  className="ml-2"
                  onClick={() => setTypePermise(true)}
                  style={styleInput}
                />
                <label for="perfilAdmin" className="userModal_permitText ml-1">
                  Administrador
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex  justify-content-around mb-5 pt-4">
            <button
              type="button"
              className="myPerfil_button myPerfil_buttonText"
            >
              <Link to="/principal">ATRÁS</Link>
            </button>
            <button
              type="submit"
              className="myPerfil_button myPerfil_buttonText"
            >
              ACTUALIZAR
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default MyPerfil;
