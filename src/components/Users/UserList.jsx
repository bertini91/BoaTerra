import React from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import UserListItem from "./UserListItem";

const UserList = (props) => {
  const { usuarios, usuarioActivo, setRefrescar } = props;

  const handleDeleteUser = async (_id)=>{
    try {
      const resultado = await fetch(
        `https://boa-terra.herokuapp.com/api/boaterra/administracion/usuarios/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resultado.status === 200) {
        Swal.fire(
          "Listo!",
          "El se eliminó correctamente el Usuario",
          "success"
        );
        setRefrescar(true); 
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo eliminar el cliente.</p>",
      });
    }
  }
  return (
    <Table className="usersTable">
      <thead>
        <tr>
          <th>NOMBRE Y APELLIDO</th>
          <th>USUARIO</th>
          <th>PERMISO</th>
          {usuarioActivo.permisoUsu ? <th>OPCIONES</th> : null}
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario, index) => (
          
          <UserListItem usuario={usuario} key={index} usuarioActivo={usuarioActivo.permisoUsu} handleDeleteUser={handleDeleteUser}></UserListItem>
        ))}
      </tbody>
    </Table>
  );
};

export default UserList;
