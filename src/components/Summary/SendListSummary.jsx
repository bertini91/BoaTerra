import React from "react";
import Table from "react-bootstrap/Table";
import SendListSummaryItem from "./SendListSummaryItem";

const SendListSummary = (props) => {
  const { shipping } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>CLIENTE</th>
          <th>DIRECCION</th>
          <th>PAGO</th>
          <th>CADETE</th>
        </tr>
      </thead>
      <tbody>
        {shipping.map((sending, index) => (
          <SendListSummaryItem
            key={index}
            sending={sending}
            n={index}
          ></SendListSummaryItem>
        ))}
      </tbody>
    </Table>
  );
};

export default SendListSummary;
