import React from "react";

const SendListSummaryItem = (props) => {
  const { sending, n } = props;

  return (
    <tr key={n}>
      <td>{n + 1}</td>
      <td>{`${sending.ventaEnvio.clienteVen.nombreCli} ${sending.ventaEnvio.clienteVen.apellidoCli}`}</td>
      <td>{sending.ventaEnvio.direccionVen}</td>
      <td>{sending.ventaEnvio.mediopagoVen}</td>
      <td>{sending.cadeteEnvio===undefined?"SIN DEFINIR":`${sending.cadeteEnvio.nombreCadete} ${sending.cadeteEnvio.apellidoCadete}`}</td>
    </tr>
  );
};

export default SendListSummaryItem;
