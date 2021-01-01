import React from "react";
import Table from "react-bootstrap/Table";
import SalesListSummaryItem from "./SalesListSummaryItem";

const SalesListSummary = (props) => {
  const { sales } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>CLIENTE</th>
          <th>DIRECCION</th>
          <th class="text-center">IMPORTE ($)</th>
          <th class="text-center">VER MÁS</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((item, index) => 
          <SalesListSummaryItem
            key={index}
            sale={item}
            n={index}
          ></SalesListSummaryItem>
        )}
      </tbody>
    </Table>
  );
};

export default SalesListSummary;
