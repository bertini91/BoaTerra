import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import "../assets/styles/Client.scss";

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
  /* const [currentCliente2, setCurrentCliente2] = useState({
    nombreCli: "",
    apellidoCli: "",
    telefonoCli: "",
    direccionCli: "",
    detalleCli: "",
    _id: "",
  }); */
  /* let currentCliente2 = {}; */

  const {
    setClientes,
    clientes,
    usuarioActivo,
    total,
    productosCarrito,
    medioPago,
    setRefrescar,
    clearSale,
  } = props;
  let history = useHistory();

  useEffect(
    () => {
      setResultClient(clientes);
      console.log("En useEffect");
      console.log(currentCliente);
    } , [currentCliente]
  );

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
    /* setCurrentCliente(cli); */
    setResultClient(clientes);
    /* currentCliente = cli.Body; */
    /* const clienteVenta = {
      nombreCli: cli.nombreCli,
      apellidoCli: cli.apellidoCli,
      telefonoCli: cli.telefonoCli,
      direccionCli: cli.direccionCli,
      detalleCli: cli.detalleCli,
      _id: cli._id,
    }; */
    /* console.log(clienteVenta) */
    /* console.log(clienteVenta); */
    /* currentCliente2 = clienteVenta;
    console.log(currentCliente2); */

    setStyleSearch({
      display: "none",
    });
    /* console.log(cli); */

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
    console.log("en cleanInput __________________");
    console.log(currentCliente);
    document.getElementById("inputName").value = "";
    document.getElementById("inputSurname").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputTel").value = "";
    document.getElementById("inputDescrip").value = "";
    setStyleInput({});
    /* setCurrentCliente({
      nombreCli: "",
      apellidoCli: "",
      telefonoCli: "",
      direccionCli: "",
      detalleCli: "",
      _id: "",
    }); */
    /* currentCliente = {
    nombreCli: "",
    apellidoCli: "",
    telefonoCli: "",
    direccionCli: "",
    detalleCli: "",
    _id: "",
  }; */
    setAlreadySave(false);
  };

  const handleConfirmClient = (event) => {
    //AQUI DEBERIA PREGUNTAR SI LOS CAMPOS OBLIGATORIOS ESTAN COMPLETOS
    event.preventDefault();
    console.log(`en handleConfirmClient ************** ${alreadySave}`);
    console.log(currentCliente);
    const cli = {
      nombreCli: document.getElementById("inputName").value,
      apellidoCli: document.getElementById("inputSurname").value,
      telefonoCli: document.getElementById("inputTel").value,
      direccionCli: document.getElementById("inputAddress").value,
      detalleCli: document.getElementById("inputDescrip").value,
    };
    setCurrentCliente(cli);
    alreadySave ? handleSaveBuy() : setShowModal(true);
    /* if (
      document.getElementById("inputName").checkValidity() &&
      document.getElementById("inputSurname").checkValidity() &&
      document.getElementById("inputAddress").checkValidity() &&
      document.getElementById("inputTel").checkValidity()
    ) {
      console.log("SI ESTAN VALIDADOS LOS CAMPOS");
      alreadySave ? handleSaveBuy() : setShowModal(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡Faltó completar datos para el envio!",
        footer:
          "<p>Nombre, Apellido, Direccion y Telefono son campos obligatorios.</p>",
      });
    } */
  };

  const handleSaveClient = async () => {
    //Primero guardar el cliente a la DB, luego agregar a la venta llamando a handleSaveBuy y actualizar HOOKS
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
      /* if (resultado.status === 200) {
        Swal.fire("Listo!", "El se cargó correctamente", "success");
        clearSale();
        setRefrescar(true);
      } */
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo agregar el cliente.</p>",
      });
    }

    /* console.log("CLI = ");
    console.log(cli); */
    console.log("CURRETCLIENTE = ");
    console.log(currentCliente);
    handleSaveBuy();
  };

  const handleSaveBuy = async () => {
    //preguntar si los campos obligatorios estan completados
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
    console.log(newBuy);
    console.log(currentCliente);
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
                  {/* <Link id={cli._id} onClick={()=>handleLoadInput('id')}> */}
                  {`${cli.nombreCli} ${cli.apellidoCli}`}
                  {/* {cli.nombreCli + " "+  cli.apellidoCli} */}
                  {/* </Link> */}
                </li>
              ))}
            </ul>
          </div>
          <button className="buttonCli ml-5" type="submit">
            <p className="textButtonCli mb-0">BUSCAR</p>
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
                /* disabled */
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
                /* type="text" */
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
              {/* <Link to="/principal/confirmarEnvio" className="textButtonCli">
              ATRÁS
            </Link> */}
              ATRÁS
            </button>
            {/* <button className="buttonCli">
          <Link
          to=""
            className="textButtonCli"
            onClick={() => setShowModal(true)}
          >
            CONFIRMAR
          </Link>
        </button> */}
            <button
              className="buttonCli textButtonCli"
              /* onClick={handleConfirmClient} */
              type="submit"
            >
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
            {/* <ul className="listProd">
              {productoCombo.map((element, i) => (
                <li className="itemList d-flex" key={i}>
                  <p>{element.detalleProd}</p>
                  <p className="ml-4">{element.nombreProd}</p>
                </li>
              ))}
            </ul> */}
          </Modal.Body>
          <Modal.Footer>
            {/* <div className=" itemList">
              <p className="mb-0">PRECIO: $ {precioCombo}</p>
            </div> */}
            <div>
              <Button
                variant="secondary"
                /* onClick={hangleSaveSend} */
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
                {/* <Link className="cart-button_text" to="/principal/confirmarEnvio/cliente">SI</Link> */}
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default Client;
