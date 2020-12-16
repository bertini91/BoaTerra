import React, { useState } from "react";
import CadetList from "../components/Users/CadetList";
import UserList from "../components/Users/UserList";
import { Link } from "react-router-dom";
import "../assets/styles/Users.scss";
import UserModal from "../components/Users/UserModal";
import CadetModal from "../components/Users/CadetModal";

const Users = (props) => {
  const { usuarioActivo, usuarios, cadetes, setRefrescar } = props;
  const [typeOpenTable, setTypeOpenTable] = useState(true); //true = Usuarios; false = Cadetes
  const [showUserModal,setShowUserModal] = useState(false);
  const [showCadetModal,setShowCadetModal] = useState(false);


  return (
    <>
      <div className="users">
        {usuarioActivo.permisoUsu ? (
          <p className="users_title">LISTA DE USUARIOS Y CADETES</p>
        ) : (
          <p className="users_title">LISTA DE CADETES</p>
        )}
        {usuarioActivo.permisoUsu ? (
          <div className="usersContainerOptions">
            <button
              className="usersContainerOptions_button"
              onClick={() => setShowUserModal(true)}
            >
              Nuevo Usuario
            </button>
            <button
              className="usersContainerOptions_button"
              onClick={() => setShowCadetModal(true)}
            >
              Nuevo Cadete
            </button>
          </div>
        ) : null}
        {usuarioActivo.permisoUsu ? (
          <div className="userTab">
            <button className="tablinks" onClick={() => setTypeOpenTable(true)}>
              Usuarios
            </button>
            <button
              className="tablinks"
              onClick={() => setTypeOpenTable(false)}
            >
              Cadetes
            </button>
          </div>
        ) : null}
        <div className="usersConteiner_Table">
          {usuarioActivo.permisoUsu ? (
            typeOpenTable ? (
              <UserList
                usuarios={usuarios}
                usuarioActivo={usuarioActivo}
                setRefrescar={setRefrescar}
              ></UserList>
            ) : (
              <CadetList
                cadetes={cadetes}
                usuarioActivo={usuarioActivo}
                setRefrescar={setRefrescar}
              ></CadetList>
            )
          ) : (
            <CadetList
              cadetes={cadetes}
              usuarioActivo={usuarioActivo}
              setRefrescar={setRefrescar}
            ></CadetList>
          )}
        </div>
        <div className="d-flex justify-content-center pb-4">
          <button className="user_button">
            <Link to="/principal">ATRÁS</Link>
          </button>
        </div>
      </div>
      <UserModal setShowUserModal={setShowUserModal} setRefrescar={setRefrescar} showUserModal={showUserModal}></UserModal>
      <CadetModal setRefrescar={setRefrescar} setShowCadetModal={setShowCadetModal} showCadetModal={showCadetModal}></CadetModal>
    </>
  );
};

export default Users;
