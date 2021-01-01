import React from "react";

const ProdListSummaryItem = (props) => {
  const {producto, num} = props;
  return (
    <tr>
      <td>{num+1}</td>
      <td>{producto.producto.nombreProd}</td>
      <td>{producto.producto.detalleProd}</td>
      <td class="text-center">{producto.producto.precioProd}</td>
      <td class="text-center">{producto.unidad}</td> 
      <td class="text-center">{Number(producto.producto.precioProd*producto.unidad)}</td>
    </tr>
  );
};



export default ProdListSummaryItem;
