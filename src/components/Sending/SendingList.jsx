import React from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import SendingListItem from "./SendingListItem";
import "bootstrap/dist/css/bootstrap.min.css";

const SendingList = (props) => {
  const {
    enviosPendientes,
    operationSend,
    handleShowDetail
  } = props;

  useEffect(() => {}, []);

  return (
    <>
      <div className="sendingContentTable">
        <Table className="sendingTable">
          <thead>
            <tr>
              <th>#</th>
              <th>CLIENTE</th>
              <th>DIRECCIÓN</th>
              <th>ESTADO</th>
              <th>OPCIONES</th>
            </tr>
          </thead>
          <tbody>
            {enviosPendientes.map((envio, index) => (
              <SendingListItem
                key={index}
                envio={envio}
                index={index}
                operationSend={operationSend}
                handleShowDetail={handleShowDetail}
              ></SendingListItem>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default SendingList;
