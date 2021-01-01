import React from "react";
import Table from "react-bootstrap/Table";
import ProdListSummaryItem from "./ProdListSummaryItem";

const ProdListSummary = (props) => {
  const { productsSold } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>PRODUCTO</th>
          <th>DETALLE</th>
          <th class="text-center">IMPORTE ($)</th>
          <th class="text-center">CANTIDAD</th>
          <th class="text-center">TOTAL ($)</th>
        </tr>
      </thead>
      <tbody>
        {productsSold.map((prod, index) => (
          <ProdListSummaryItem producto={prod} key={index} num={index}></ProdListSummaryItem>
        ))}
      </tbody>
    </Table>
  );
};

export default ProdListSummary;
