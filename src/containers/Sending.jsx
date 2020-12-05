import React, { useState } from "react";
import Swal from "sweetalert2";
import SendingList from "../components/Sending/SendingList";
import SendingModal from "../components/Sending/SendingModal";
import "../assets/styles/Sending.scss";

const Sending = (props) => {
  const {
    enviosPendientes /* , enviosEnCurso */,
    setRefrescar,
    cadetes,
  } = props;

  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [cadetSelected, setCadetSelected] = useState({})
  const [actuallySend, setActuallySend] = useState({})

  const operationSend = (envio) => {
    if (envio.estadoEnvio === "Preparacion") {
      console.log("EN PREPARACION " + envio._id);
      console.log(cadetes);
      setActuallySend(envio);
      setShow(true);
    } else {
      console.log("EN CAMINO");
      console.log(envio);
      entregarEnvio(envio);
    }
  };

  const processSend = ()=>{
    setShow(false);
    caminoEnvio(actuallySend.ventaEnvio, actuallySend._id)
  }

  const caminoEnvio = async (ventaEnvio, idEnvio) => {
    //DEBO TRAER EL ID DEL ENVIO PARA LA URL
    try {
      const fecha = new Date();
      const env = {
        ventaEnvio,
        cadeteEnvio: cadetSelected,
        estadoEnvio: "Camino",
        fechaEnvio: fecha,
      };
      /* /confirmar/:id */
      const resultado = await fetch(
        `http://localhost:4000/api/boaTerra/principal/envios/${idEnvio}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(env),
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "El pedido está en camino", "success");
        setRefrescar(true);
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
  const entregarEnvio = async (envio) => {
    try {
      const fecha = new Date();
      const env = {
        ventaEnvio: envio.ventaEnvio,
        cadeteEnvio: envio.cadeteEnvio,
        estadoEnvio: "Entregado",
        fechaEnvio: fecha,
      };
      /* /confirmar/:id */
      const resultado = await fetch(
        `http://localhost:4000/api/boaTerra/principal/envios/confirmar/${envio._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(env),
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "El pedido fué entregado", "success");
        setRefrescar(true);
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
      <div className="sending pt-5">
        <p className="sendingTitle">ENVIOS</p>
        <SendingList
          enviosPendientes={enviosPendientes}
          /* enviosEnCurso={enviosEnCurso} */
          setRefrescar={setRefrescar}
/*           entregarEnvio={entregarEnvio}
          caminoEnvio={caminoEnvio} */
          cadetes={cadetes}
          operationSend={operationSend}
        ></SendingList>
      </div>
      {show ? 
      <SendingModal
        handleClose={handleClose}
        show={show}
        handleClose ={handleClose}
        cadetes={cadetes}
        setCadetSelected={setCadetSelected}
        processSend={processSend}
      ></SendingModal> :null}
    </>
  );
};

export default Sending;
