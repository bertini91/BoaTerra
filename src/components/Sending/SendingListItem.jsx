import React from "react";
import IconSending from "../../assets/static/enviar.png";
import IconSeeSending from "../../assets/static/verenvio.png";
const SendingListItem = (props) => {
  const { envio, index } = props;
  return (
    <tr>
      <td>{index}</td>
      <td className="SendingListItem_name">{`${envio.ventaEnvio.clienteVen.nombreCli} ${envio.ventaEnvio.clienteVen.apellidoCli}`}</td>
      {/* <p>{envio.clienteVen.detalleCli}</p> */}
      <td>{envio.estadoEnvio}</td>
      <td>
        <div className="d-flex">
          <button className="sendingTable_buttons">
            <img src={IconSeeSending} alt="VER" />
          </button>
          <button className="sendingTable_buttons">
            <img src={IconSending} alt="ENVIAR" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default SendingListItem;
