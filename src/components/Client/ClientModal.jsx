import React from "react";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";

const ClientModal = (props) => {
  const {
    /* setClientes, clientes, */ setShow,
    show,
    setRefrescar,
    optionEdit,
    clientEdit,
    setClientEdit,
    setOptionEdit,
    usuarioActivo,
  } = props;
  const [styleModal, setStyleModal] = useState({
    display: "none",
  });
  const [styleInput, setStyleInput] = useState({});

  const handleCloseModal = () => {
    setClientEdit({});
    setStyleInput({});
    document.getElementById("inputName").value = "";
    document.getElementById("inputSurname").value = "";
    document.getElementById("inputAddress").value = "";
    document.getElementById("inputTel").value = "";
    document.getElementById("inputDescrip").value = "";
    setOptionEdit(false);
    setShow(false);
  };

  useEffect(() => {
    /* console.log(show); */
    /* console.log(optionEdit); */
    show
      ? setStyleModal({
          display: "flex",
        })
      : setStyleModal({
          display: "none",
        });
    optionEdit ? handleLoadInput() : null; //Ver si funciona null sino cargar el estilo de input en vacio
  }, [show, optionEdit]);

  const handleDecideOperation = (event) => {
    optionEdit ? handleEditClient(event) : handleSaveClient(event);
  };

  const handleLoadInput = () => {
    console.log("en handleLoadInput ................... ");
    console.log(clientEdit);

    document.getElementById("inputName").value = clientEdit.nombreCli;
    document.getElementById("inputSurname").value = clientEdit.apellidoCli;
    document.getElementById("inputAddress").value = clientEdit.direccionCli;
    document.getElementById("inputTel").value = clientEdit.telefonoCli;
    document.getElementById("inputDescrip").value = clientEdit.detalleCli;
    usuarioActivo.permisoUsu
      ? setStyleInput({})
      : setStyleInput({
          "pointer-events": "none",
          color: "#AAA",
          background: "#F5F5F5",
        });
  };

  const handleEditClient = async (event) => {
    event.preventDefault();
    console.log("EDITAR CLIENTE");
    setShow(false);
    const cli = {
      nombreCli: document.getElementById("inputName").value,
      apellidoCli: document.getElementById("inputSurname").value,
      telefonoCli: document.getElementById("inputTel").value,
      direccionCli: document.getElementById("inputAddress").value,
      detalleCli: document.getElementById("inputDescrip").value,
    };
    try {
      const resultado = await fetch(
        `https://boa-terra.herokuapp.com/api/boaterra/administracion/clientes/actualizar/${clientEdit._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cli),
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "El cliente se editó correctamente", "success");
        setRefrescar(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo editar el cliente.</p>",
      });
    }
  };

  const handleSaveClient = async (event) => {
    event.preventDefault();
    console.log("NUEVO CLIENTE");
    setShow(false);
    const cli = {
      nombreCli: document.getElementById("inputName").value,
      apellidoCli: document.getElementById("inputSurname").value,
      telefonoCli: document.getElementById("inputTel").value,
      direccionCli: document.getElementById("inputAddress").value,
      detalleCli: document.getElementById("inputDescrip").value,
    };

    try {
      const resultado = await fetch(
        "https://boa-terra.herokuapp.com/api/boaterra/administracion/clientes/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cli),
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "El cliente se cargó correctamente", "success");
        setRefrescar(true);
        handleCloseModal();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo agregar el cliente.</p>",
      });
    }
    
  };
  return (
    <>
      <div className="fade modal-backdrop show" style={styleModal}></div>
      <div className="clientModal modal-backdrop" style={styleModal}>
        <div className="contentModalNew">
          <div className="d-flex justify-content-end mt-2">
            <button
              className="clientModal_buttonClose"
              onClick={() => setShow(false)}
            >
              X
            </button>
          </div>
          <div>
            <p className="clientModal_title">NUEVO CLIENTE</p>
          </div>
          <div>
            <form onSubmit={handleDecideOperation}>
              <section className="">
                <div className="d-flex mb-4 justify-content-between">
                  <p className=" clientModal_text">NOMBRE: </p>
                  <input
                    type="text"
                    placeholder="Ingrese el nombre"
                    className=" clientModal_input "
                    id="inputName"
                    required
                    style={styleInput}
                  />
                </div>

                <div className="d-flex mb-4 justify-content-between">
                  <p className=" clientModal_text">APELLIDO: </p>
                  <input
                    type="text"
                    placeholder="Ingrese el apellido"
                    className=" clientModal_input "
                    id="inputSurname"
                    style={styleInput}
                    required
                  />
                </div>
                <div className="d-flex mb-4 justify-content-between">
                  <p className="clientModal_text">DIRECCIÓN: </p>
                  <input
                    type="text"
                    placeholder="Ingrese la dirección"
                    className=" clientModal_input "
                    id="inputAddress"
                    required
                    style={styleInput}
                  />
                </div>
                <div className="d-flex mb-4 justify-content-between">
                  <p className="clientModal_text">TELEFONO: </p>
                  <input
                    type="text"
                    name=""
                    id="inputTel"
                    placeholder="Ingrese el telefono"
                    className="clientModal_input"
                    required
                  />
                </div>
                <div className="d-flex mb-4 justify-content-between">
                  <p className="clientModal_text clientModal_textArea">
                    DETALLE:{" "}
                  </p>
                  <textarea
                    name="textarea"
                    rows="10"
                    /* type="text" */
                    placeholder="Ingrese algun detalle que desea aclarar"
                    className="clientModal_input "
                    id="inputDescrip"
                  />
                </div>
              </section>

              <section className="d-flex justify-content-around py-5">
                <button
                  className="buttonCli textButtonCli"
                  onClick={() => handleCloseModal()}
                >
                  ATRÁS
                </button>
                <button
                  className="buttonCli textButtonCli"
                  /* onClick={handleConfirmClient} */
                  type="submit"
                  /* onClick={handleSaveClient} */
                >
                  CONFIRMAR
                </button>
              </section>
            </form>
          </div>
          {/* <div>
          <div>
            <Button variant="secondary" className="buttonClose" onClick={()=>handleCloseModal}>
              Cancelar
            </Button>
            <Button
              variant="primary" //Aqui debo llamar a la funcion que cambie de estdo
              className="buttonAcept"
            >
              Agregar
            </Button>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default ClientModal;
