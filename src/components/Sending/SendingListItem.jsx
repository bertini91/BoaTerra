import React, {useState} from "react";
import IconSending from "../../assets/static/enviar.png";
import IconSeeSending from "../../assets/static/verenvio.png";
import { Modal, Button } from "react-bootstrap";

const SendingListItem = (props) => {
  const { envio, index, /* _id, *//*  entregarEnvio, caminoEnvio, */ operationSend, setShowDetail, handleShowDetail/* , cadetes */ } = props;
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  return (
    <>
    <tr>
      <td>{index}</td>
      <td className="SendingListItem_name">{`${envio.ventaEnvio.clienteVen.nombreCli} ${envio.ventaEnvio.clienteVen.apellidoCli}`}</td>
  <td>{envio.ventaEnvio.direccionVen}</td>
      {/* <p>{envio.clienteVen.detalleCli}</p> */}
      <td>{envio.estadoEnvio}</td>
      <td>
        <div className="d-flex">
          <button className="sendingTable_buttons" onClick={()=>handleShowDetail(envio)}>
            <img src={IconSeeSending} alt="VER" />
          </button>
          <button className="sendingTable_buttons" onClick={()=>operationSend(envio)}>
            <img src={IconSending} alt="ENVIAR" />
          </button>
        </div>
      </td>
    </tr>
    
    </>
  );
};

export default SendingListItem;
