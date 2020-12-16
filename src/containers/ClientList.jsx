import React, { useState } from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import logo_search from "../assets/static/search_find.png";
import Swal from "sweetalert2";
import "../assets/styles/ClientList.scss";
import ClientModal from "../components/Client/ClientModal";
import ClientListItem from "../components/Client/ClientListItem";

const ClientList = (props) => {
  const { clientes, setClientes, setRefrescar, usuarioActivo } = props;
  const [show, setShow] = useState(false);

  const [optionEdit, setOptionEdit] = useState(false);
  const [clientEdit, setClientEdit] = useState({});


  const resultCli = [];

  const handleSearch = () => {
    const word = document.getElementById("searchInput").value.toUpperCase();
    if (word !== "") {
      for (let cliente of clientes) {
        let nombre = cliente.nombreCli.toUpperCase();
        let apellido = cliente.apellidoCli.toUpperCase();
        let direccion = cliente.direccionCli.toUpperCase();
        let telefono = String(cliente.telefonoCli);
        if (
          nombre.indexOf(word) !== -1 ||
          apellido.indexOf(word) !== -1 ||
          direccion.indexOf(word) !== -1 ||
          telefono.indexOf(word) !== -1
        ) {
          resultCli.push(cliente);
        }
      }
      setClientes(resultCli);
    } else {
      setRefrescar(true);
    }
  };

 

  const handleDeleteCli = async (_id) => {
    if(usuarioActivo.permisoUsu){
      try {
        const resultado = await fetch(
          `https://boa-terra.herokuapp.com/api/boaterra/administracion/clientes/eliminar/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (resultado.status === 200) {
          Swal.fire(
            "Listo!",
            "Se eliminó correctamente el Cliente",
            "success"
          );
          setRefrescar(true); 
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo eliminar el cliente.</p>",
        });
      }
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No cuenta con los permisos correspondientes!",
        footer: "<p>No se pudo eliminar el cliente.</p>",
      });
    }
  };

  return (
    <>
      <div className="productList">
        <p className="productList_title">LISTADO DE CLIENTES</p>
        <section className="d-flex justify-content-center">
          <div className="newClient-Search_container">
            <div className="search pr-5">
              <button className="transparentButton">
                <img src={logo_search} alt="Buscar" />
              </button>
              <input
                id="searchInput"
                type="text"
                placeholder="Buscar Cliente"
                className="search_input"
                onChange={handleSearch}
              />
            </div>
            <button
              className="clientList_newClient ml-5"
              onClick={() => setShow(true)}
            >
              Nuevo
            </button>
          </div>
        </section>
        <section className="productConteiner_Table">
          <Table className="productTable">
            <thead>
              <tr>
                <th>NOMBRE Y APELLIDO</th>
                <th>DIRECCIÓN</th>
                <th>TELEFONO</th>
                <th>DETALLE</th>
                <th>OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <ClientListItem
                  cliente={cliente}
                  key={index}
                  handleDeleteCli={handleDeleteCli}
                  setOptionEdit={setOptionEdit}
                  setClientEdit={setClientEdit}
                  setShow={setShow}
                ></ClientListItem>
              ))}
            </tbody>
          </Table>
        </section>
        <div className="d-flex justify-content-center pb-4">
          <button className="productList_button">
            <Link to="/principal">ATRÁS</Link>
          </button>
        </div>
      </div>
      <ClientModal
        show={show}
        setShow={setShow}
        setRefrescar={setRefrescar}
        optionEdit={optionEdit}
        clientEdit={clientEdit}
        setClientEdit={setClientEdit}
        setOptionEdit={setOptionEdit}
        usuarioActivo={usuarioActivo}
      ></ClientModal>
    </>
  );
};

export default ClientList;
