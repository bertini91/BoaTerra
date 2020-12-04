import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import SendingListItem from "./SendingListItem";

const SendingList = (props) => {
  const {
    enviosPendientes,
    /* enviosEnCurso, */
    setRefrescar,
    entregarEnvio,
    caminoEnvio,
  } = props;
  return (
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
              _id={envio._id}
              envio={envio}
              index={index}
            ></SendingListItem>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SendingList;
