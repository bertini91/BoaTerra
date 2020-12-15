import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../assets/styles/components/UserModal.scss";

const UserModal = (props) => {
  const { setShowUserModal, setRefrescar, showUserModal } = props;
  const [styleUserModal, setStayleUserModal] = useState({ display: "none" });
  const [typePermise, setTypePermise] = useState(false); //Arranca permiso Empleado
  const [styleErrorPass, setStyleErrorPass] = useState({});

  useEffect(() => {
    if (showUserModal) {
      setStayleUserModal({
        display: "flex",
      });
    } else {
      setStayleUserModal({
        display: "none",
      });
    }
  }, [showUserModal]);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const cleanUserModal = () => {
    document.getElementById("inputName").value = "";
    document.getElementById("inputSurname").value = "";
    document.getElementById("inputUser").value = "";
    document.getElementById("inputPass").value = "";
    document.getElementById("inputRepPass").value = "";
    setTypePermise(false);
  };
  const handleSaveUser = async (event) => {
    event.preventDefault();
    const pass1 = document.getElementById("inputPass").value;
    const pass2 = document.getElementById("inputRepPass").value;

    if (pass1 === pass2) {
      try {
        const newUser = {
          nombreUsu: document.getElementById("inputName").value,
          apellidoUsu: document.getElementById("inputSurname").value,
          usuarioUsu: document.getElementById("inputUser").value,
          contrasenaUsu: document.getElementById("inputPass").value,
          permisoUsu: typePermise,
        };
        console.log(newUser);
        const resultado = await fetch(
          "https://boa-terra.herokuapp.com/api/boaterra/administracion/usuarios/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        if (resultado.status === 200) {
          Swal.fire("Listo!", "La venta se cargó correctamente", "success");
          cleanUserModal();
          setRefrescar(true);
          setShowUserModal(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo crear el Usuario.</p>",
        });
      }
    } else {
      document.getElementById("msjError").style.display = "flex";
      setStyleErrorPass({
        "border-width": "4px",
        "border-color": "red",
      });
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show" style={styleUserModal}></div>
      <div className="modalNew" style={styleUserModal}>
        <div className="backgroudItem contentModalNew">
          <section>
            <p className="userModal_title">Nuevo Usuario</p>
            <form onSubmit={handleSaveUser}>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Nombre: </p>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputName"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Apellido: </p>
                <input
                  type="text"
                  placeholder="Ingrese el apellido"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputSurname"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Usuario: </p>
                <input
                  type="text"
                  placeholder="Ingrese el nombre de usuario"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputUser"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Contraseña: </p>
                <input
                  type="password"
                  placeholder="Ingrese la contraseña"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputPass"
                  style={styleErrorPass}
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Repetir Contra.: </p>
                <input
                  type="password"
                  placeholder="Ingrese nuevamente la contraseña"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputRepPass"
                  style={styleErrorPass}
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Permiso: </p>
                <div className="d-flex justify-content-center w-100">
                  <div>
                    <input
                      type="radio"
                      id="employee"
                      name="gender"
                      value="employee"
                      onClick={() => setTypePermise(false)}
                      /* checked */
                      defaultChecked
                    />
                    <label for="employee" className="userModal_permitText ml-1">Vendedor</label>
                  </div>
                  <div className="ml-3">
                    <input
                      type="radio"
                      id="administrator"
                      name="gender"
                      value="administrator"
                      className="ml-2"
                      onClick={() => setTypePermise(true)}
                    />
                    <label for="administrator" className="userModal_permitText ml-1">Administrador</label>
                  </div>
                </div>
              </div>

              <section className="d-flex justify-content-around pt-5 pb-3">
                <button
                  className="userModal_button userModal_buttonText"
                  type="button"
                  onClick={() => (setShowUserModal(false), cleanUserModal())}
                >
                  ATRÁS
                </button>
                <button
                  className="userModal_button userModal_buttonText"
                  type="submit"
                >
                  CONFIRMAR
                </button>
              </section>
            </form>
          </section>
          <p className="msjError" id="msjError">
            ERROR: Las contraseñas no coinciden
          </p>
        </div>
      </div>
    </>
  );
};

export default UserModal;
