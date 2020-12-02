import React from "react";
import Swal from "sweetalert2";
import SendingList from "../components/Sending/SendingList";

const Sending = (props) => {
  const { enviosPendientes, enviosEnCurso, setRefrescarVentEnv } = props;

  const registrarEnvio = async (ventaEnvio, cadeteEnvio) => {
    try {
      const fecha = new Date();
      const env = {
        ventaEnvio,
        estadoEnvio: "Camino",
        cadeteEnvio,
        fechaEnvio: fecha,
      };
      const resultado = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/nuevo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(env),
        }
      );
      setRefrescarVentEnv(true);
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
  };

  const caminoEnvio = async (ventaEnvio, cadeteEnvio) => {
          //DEBO TRAER EL ID DEL ENVIO PARA LA URL
    try {
      const fecha = new Date();
      const env = {
        ventaEnvio,
        cadeteEnvio,
        estadoEnvio: "Camino",
        fechaEnvio: fecha,
      };
      /* /confirmar/:id */
      const resultado = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/:id",
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
        setRefrescarVentEnv(true);
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
  const entregarEnvio = async (ventaEnvio, cadeteEnvio) => {
            //DEBO TRAER EL ID DEL ENVIO PARA LA URL
    try {
      const fecha = new Date();
      const env = {
        ventaEnvio,
        cadeteEnvio,
        estadoEnvio: "Entregado",
        fechaEnvio: fecha,
      };
      /* /confirmar/:id */
      const resultado = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/confirmar/:id",
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
        setRefrescarVentEnv(true);
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
    <div>
      <p>ENVIOS</p>
      <SendingList
        enviosPendientes={enviosPendientes}
        enviosEnCurso={enviosEnCurso}
        setRefrescarVentEnv={setRefrescarVentEnv}
      ></SendingList>
    </div>
  );
};

export default Sending;
