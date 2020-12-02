import React from "react";
import IconSending from "../../assets/static/enviar.png";
import IconSeeSending from "../../assets/static/verenvio.png";
const SendingListItem = (props) => {
  const { envio, index } = props;
  return (
    <div>
      <p>{index}</p>
      <p>{`${envio.ventaEnvio.clienteVen.nombreCli} ${envio.ventaEnvio.clienteVen.apellidoCli}`}</p>
      <p>{envio.ventaEnvio.clienteVen.detalleCli}</p>
      <div>
        <button>
          <img src={IconSeeSending} alt="VER" />
        </button>
        <button>
          <img src={IconSending} alt="ENVIAR" />
        </button>
      </div>
    </div>
  );
};

export default SendingListItem;
