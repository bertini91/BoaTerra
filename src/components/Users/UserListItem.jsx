import React from "react";
import ImgDelete from "../../assets/static/usertrash.png";
import ImgEdit from "../../assets/static/edit.png";

const UserListItem = (props) => {
  const { usuario,usuarioActivo, handleDeleteUser } = props;
  return (
    <tr>
      <td>{`${usuario.nombreUsu} ${usuario.apellidoUsu}`}</td>
      <td>{usuario.usuarioUsu}</td>
      <td>{`${usuario.permisoUsu ? "Administrador" : "Empleado"}`}</td>
      {usuarioActivo ? (
        <th className="d-flex justify-content-lefth">
          <button className="userListItem_button">
            <img src={ImgEdit} alt="Editar" />
          </button>
          <button
            className="userListItem_button"
            onClick={() => handleDeleteUser(usuario._id)}
          >
            <img src={ImgDelete} alt="Eliminar" />
          </button>
        </th>
      ) : null}
    </tr>
  );
};

export default UserListItem;
