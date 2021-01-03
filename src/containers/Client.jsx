import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../assets/styles/Client.scss";
import ExamplePrint from "../components/Print/Example";

const Client = (props) => {
  const resultList = React.createRef;
  const [styleSearch, setStyleSearch] = useState({
    display: "none",
  });
  const [styleInput, setStyleInput] = useState({});
  const [resultClient, setResultClient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [alreadySave, setAlreadySave] = useState(false); //debo usarlo para saber si el cliente ya esta guardado o consulto para agregarlo
  const [currentCliente, setCurrentCliente] = useState({});

  const {
    clientes,
    usuarioActivo,
    total,
    productosCarrito,
    medioPago,
    setRefrescar,
    clearSale,
  } = props;
  let history = useHistory();

  useEffect(() => {
    setResultClient(clientes);
    console.log("En useEffect");
    console.log(currentCliente);
  }, [currentCliente]);

  const handleSearch = (event) => {
    event.preventDefault();
    const word = document.getElementById("inputSearch").value.toUpperCase();
    const resultCli = [];
    if (word !== "") {
      for (let cliente of clientes) {
        let nombre = cliente.nombreCli.toUpperCase();
        let apellido = cliente.apellidoCli.toUpperCase();
        let direccion = cliente.direccionCli.toUpperCase();
        if (
          nombre.indexOf(word) !== -1 ||
          apellido.indexOf(word) !== -1 ||
          direccion.indexOf(word) !== -1
        ) {
          resultCli.push(cliente);
        }
      }
      setResultClient(resultCli);
      setStyleSearch({
        display: "block",
      });
    } else {
      setResultClient(clientes);
      setStyleSearch({
        display: "none",
      });
    }
  };

  const handleLoadInput = (cli) => {
    console.log("en handleLoadInput ................... ");
    console.log(cli);
    setCurrentCliente(cli);
    console.log(currentCliente);
    document.getElementById("inputSearch").value = "";
    setResultClient(clientes);
    setStyleSearch({
      display: "none",
    });

    document.getElementById("inputName").value = cli.nombreCli;
    document.getElementById("inputSurname").value = cli.apellidoCli;
    document.getElementById("inputAddress").value = cli.direccionCli;
    document.getElementById("inputTel").value = cli.telefonoCli;
    document.getElementById("inputDescrip").value = cli.detalleCli;
    setStyleInput({
      "pointer-events": "none",
      color: "#AAA",
      background: "#F5F5F5",
    });
    setAlreadySave(true);
  };

  const cleanInput = () => {
    //A ESTA FUNCION SE LA PUEDE TENER EN CUENTA EL ERROR AL SELECCIONAR LA PERSONA QUE NO ESTABA EN LA DB
    /* console.log("en cleanInput __________________");
    console.log(currentCliente); */
    document.getElementById("inputName").value = "";
    document.getElementById("inputSurname").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputTel").value = "";
    document.getElementById("inputDescrip").value = "";
    setStyleInput({});
    setAlreadySave(false);
  };

  const handleConfirmClient = (event) => {
    //AQUI DEBERIA PREGUNTAR SI LOS CAMPOS OBLIGATORIOS ESTAN COMPLETOS
    event.preventDefault();
    /* console.log(`en handleConfirmClient ************** ${alreadySave}`);
    console.log(currentCliente); */
    const cli = {
      nombreCli: document.getElementById("inputName").value,
      apellidoCli: document.getElementById("inputSurname").value,
      telefonoCli: document.getElementById("inputTel").value,
      direccionCli: document.getElementById("inputAddress").value,
      detalleCli: document.getElementById("inputDescrip").value,
    };
    setCurrentCliente(cli);
    alreadySave ? handleSaveBuy() : setShowModal(true);
  };

  const handleSaveClient = async () => {
    console.log(`en handleSaveClient ........... ${alreadySave}`);
    setShowModal(false);
    const cli = {
      nombreCli: document.getElementById("inputName").value,
      apellidoCli: document.getElementById("inputSurname").value,
      telefonoCli: document.getElementById("inputTel").value,
      direccionCli: document.getElementById("inputAddress").value,
      detalleCli: document.getElementById("inputDescrip").value,
    };
    setCurrentCliente(cli);

    try {
      const resultado = await fetch(
        "http://localhost:4000/api/boaTerra/principal/venta/cliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cli),
        }
      );
      console.log(resultado.status);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo agregar el cliente.</p>",
      });
    }
    /* console.log("CURRETCLIENTE = ");
    console.log(currentCliente); */
    handleSaveBuy();
  };

  const handleSaveBuy = async () => {
    console.log(`en handleSaveBuy ---------- ${alreadySave}`);

    const fecha = new Date();
    const newBuy = {
      fechaVen: fecha,
      estadoVen: false,
      vendedorVen: usuarioActivo,
      totalVen: total,
      productoVen: productosCarrito,
      mediopagoVen: medioPago,
      clienteVen: currentCliente,
      detalleVen: document.getElementById("inputDescrip").value,
      direccionVen: document.getElementById("inputAddress").value, //Tomo este input porque es un campo que puede variar
    };
    try {
      console.log(newBuy);
      const resultado = await fetch(
        "http://localhost:4000/api/boaTerra/principal/venta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBuy),
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "La venta se cargó correctamente", "success");
        clearSale();
        setRefrescar(true);
        history.push("/principal");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo cargar la venta.</p>",
      });
    }
    setShowModal(false);
  };

  return (
    <>
      <div className="home">
        <p className="textTitleCli">CLIENTE</p>
        <form
          onSubmit={handleSearch}
          className="d-flex my-5 justify-content-center"
          autoComplete="off"
        >
          <p className="textPropCli">NOMBRE: </p>
          <div className="contentSearch">
            <input
              type="search"
              id="inputSearch"
              placeholder="Ingrese el nombre o apellido"
              className="inputPropCli"
              onChange={handleSearch}
              onClick={cleanInput}
              autoComplete="off"
            />
            <ul
              className="ulResultSearch"
              style={styleSearch}
              id="ulResult"
              ref={resultList}
            >
              {resultClient.map((cli) => (
                <li
                  className="liResultSearch"
                  key={cli._id}
                  onClick={() => handleLoadInput(cli)}
                >
                  {`${cli.nombreCli} ${cli.apellidoCli}`}
                </li>
              ))}
            </ul>
          </div>
          <button className="buttonCli ml-5" type="submit">
            <p className="mb-0">BUSCAR</p>
          </button>
        </form>
        <form onSubmit={handleConfirmClient}>
          <section className="ml-5">
            <div className="d-flex mb-4 justify-content-center">
              <p className="textPropCli">NOMBRE: </p>
              <input
                type="text"
                placeholder="Ingrese el nombre"
                className="inputPropCli"
                id="inputName"
                required
                style={styleInput}
              />
            </div>

            <div className="d-flex mb-4 justify-content-center">
              <p className="textPropCli">APELLIDO: </p>
              <input
                type="text"
                placeholder="Ingrese el apellido"
                className="inputPropCli"
                id="inputSurname"
                style={styleInput}
                required
              />
            </div>
            <div className="d-flex mb-4 justify-content-center">
              <p className="textPropCli">DIRECCIÓN: </p>
              <input
                type="text"
                placeholder="Ingrese la dirección"
                className="inputPropCli"
                id="inputAddress"
                required
              />
            </div>
            <div className="d-flex mb-4 justify-content-center">
              <p className="textPropCli">TELEFONO: </p>
              <input
                type="text"
                name=""
                id="inputTel"
                placeholder="Ingrese el telefono"
                className="inputPropCli"
                style={styleInput}
                required
              />
            </div>
            <div className="d-flex mb-4 justify-content-center">
              <p className="textPropCli">DETALLE: </p>
              <textarea
                name="textarea"
                rows="10"
                placeholder="Ingrese algun detalle que desea aclarar"
                className="detailPropCli"
                id="inputDescrip"
              />
            </div>
          </section>

          <section className="d-flex justify-content-around py-5">
            <button
              className="buttonCli textButtonCli"
              onClick={() => history.push("/principal/confirmarEnvio")}
            >
              ATRÁS
            </button>
            {console.log(Object.keys(currentCliente).length !== 0),
            (Object.keys(currentCliente).length !== 0)?
               <ExamplePrint
                 productosCarrito={productosCarrito}
                 currentCliente={currentCliente}
                 medioPago={medioPago}
               ></ExamplePrint>
             :null}
            <button className="buttonCli textButtonCli" type="submit">
              CONFIRMAR
            </button>
          </section>
        </form>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <div className="backgroudItem modalCombo">
          <Modal.Header closeButton>
            <Modal.Title>BOA TERRA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="cartTitle">¿Desea registrar el cliente?</h2>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button
                variant="secondary"
                className="buttonClose"
                onClick={handleSaveBuy}
              >
                NO
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveClient}
                className="buttonAcept"
              >
                SI
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default Client;
