import React from "react";
import IconSending from "../../assets/static/enviar.png";
import IconSeeSending from "../../assets/static/verenvio.png";
import ExampleIcon from "../Print/ExampleIcon.jsx";

const SendingListItem = (props) => {
  const { envio, index, operationSend, handleShowDetail } = props;

  return (
    <>
      <tr>
        <td class="text-center">{index}</td>
        <td className="SendingListItem_name">{`${envio.ventaEnvio.clienteVen.nombreCli} ${envio.ventaEnvio.clienteVen.apellidoCli}`}</td>
        <td>{envio.ventaEnvio.direccionVen}</td>
        <td>{envio.estadoEnvio}</td>
        <td>
          <div className="d-flex">
            <button
              className="sendingTable_buttons"
              onClick={() => handleShowDetail(envio)}
            >
              <img src={IconSeeSending} alt="VER" />
            </button>
            <button
              className="sendingTable_buttons"
              onClick={() => operationSend(envio)}
            >
              <img src={IconSending} alt="ENVIAR" />
            </button>
            <ExampleIcon productosCarrito={envio.ventaEnvio.productoVen} currentCliente={envio.ventaEnvio.clienteVen} medioPago={envio.ventaEnvio.mediopagoVen}></ExampleIcon>
          </div>
        </td>
      </tr>
    </>
  );
};

export default SendingListItem;
