import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import SendingListItem from "./SendingListItem";
import { useEffect } from "react";

const SendingList = (props) => {
  /* const handleClose = () => setShow(false);
  const [show, setShow] = useState(false); */
  /* const [cadetesList, setCadetesList] = useState([]); */
  const {
    enviosPendientes,
    /* enviosEnCurso, */
    setRefrescar,
/*     entregarEnvio,
    caminoEnvio, */
    cadetes,
    operationSend
  } = props;

  useEffect(() => {
    
  }, []);

  /* const operationSend = (envio, id) => {
    if (envio.estadoEnvio === "Preparacion") {
      console.log("EN PREPARACION " + id);
      console.log(cadetes);
      setShow(true);
    } else {
      console.log("EN CAMINO");
    }
  }; */

  return (
    <>
      <div className="sendingContentTable">
        <Table className="sendingTable">
          <thead>
            <tr>
              <th>#</th>
              <th>CLIENTE</th>
              <th>ESTADO</th>
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {enviosPendientes.map((envio, index) => (
              <SendingListItem
                key={index}
                /* _id={envio._id} */
                envio={envio}
                index={index}
                /* entregarEnvio={entregarEnvio}
                caminoEnvio={caminoEnvio} */
                operationSend={operationSend}
                /* cadetes={cadetes} */
              ></SendingListItem>
            ))}
          </tbody>
        </Table>
      </div>
      
    </>
  );
};

export default SendingList;
