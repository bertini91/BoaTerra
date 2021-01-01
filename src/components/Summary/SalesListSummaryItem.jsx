import React from "react";
import SeeMore from '../../assets/static/verenvio.png'

const SalesListSummaryItem = (props) => {
    const{
        sale, n
    } = props;

  return (
    <tr key={n}>
      <td>{n+1}</td>
      <td>{sale.clienteVen===null?"VENTA AL PUBLICO":`${sale.clienteVen.nombreCli} ${sale.clienteVen.apellidoCli}`}</td>
      <td>{sale.direccionVen}</td>
      <td class="text-center">{sale.totalVen}</td>
      <td class="text-center"><img src={SeeMore} alt="VER"></img></td>
    </tr>
  );
};

export default SalesListSummaryItem;
