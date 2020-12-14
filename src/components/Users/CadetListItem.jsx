import React from "react";
import ImgDelete from "../../assets/static/usertrash.png";
import ImgEdit from "../../assets/static/edit.png";

const CadetListItem = (props) => {
  const { cadete, usuarioActivo, handleDeleteCadet } = props;
  return (
    <tr>
      <td>{`${cadete.nombreCadete} ${cadete.apellidoCadete}`}</td>

      <td>
        <a
          href={`https://wa.me/549${cadete.telefonoCadete}`}
          target="_blank"
          className="tableCadet_tel"
        >
          {cadete.telefonoCadete}
        </a>
      </td>

      <td>{cadete.detalleCadete}</td>

      {usuarioActivo
        ? ((<td>{cadete.direccionCadete}</td>),
          (
            <th className="d-flex justify-content-lefth">
              <button className="userListItem_button">
                <img src={ImgEdit} alt="Editar" />
              </button>
              <button
                className="userListItem_button"
                onClick={() => handleDeleteCadet(cadete._id)}
              >
                <img src={ImgDelete} alt="Eliminar" />
              </button>
            </th>
          ))
        : null}
    </tr>
  );
};

export default CadetListItem;
