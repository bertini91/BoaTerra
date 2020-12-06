import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SendingModalDetailItem = (props) => {
  const { nombreProd, detalleProd, unidad, precioProd } = props;
  const total = Number(precioProd * unidad);
  return (
    <tr>
      <td>{nombreProd}</td>
      <td className="text-center">{detalleProd}</td>
      <td className="text-center">{unidad}</td>
      <td className="text-center">{total}</td>
    </tr>
  );
};

export default SendingModalDetailItem;
