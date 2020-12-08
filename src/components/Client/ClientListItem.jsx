import React from "react";
import imgEditar from "../../assets/static/edit.png";
import imgEliminar from "../../assets/static/usertrash.png";

const ClientListItem = (props) => {
  const {
    cliente,
    handleDeleteCli,
    setOptionEdit,
    setClientEdit,
    setShow,
  } = props;

  const handleLoadEdit = () => {
    setClientEdit(cliente);
    setOptionEdit(true);
    setShow(true);
  };

  return (
    <tr>
      <td>{`${cliente.nombreCli} ${cliente.apellidoCli}`}</td>
      <td>{cliente.direccionCli}</td>
      <td>
        {" "}
        <a
          href={`https://wa.me/549${cliente.telefonoCli}`}
          target="_blank"
          className="tableCli_tel"
        >
          {cliente.telefonoCli}
        </a>
      </td>
      <td>{cliente.detalleCli} </td>
      <td className="d-flex justify-content-around">
        <button
          className="clientListItem_button"
          onClick={() => handleLoadEdit()}
        >
          <img src={imgEditar} className="clientTable-Item_option"></img>
        </button>
        <button
          className="clientListItem_button"
          onClick={() => handleDeleteCli(cliente._id)}
        >
          <img src={imgEliminar} className="clientTable-Item_option"></img>
        </button>
      </td>
    </tr>
  );
};

export default ClientListItem;
