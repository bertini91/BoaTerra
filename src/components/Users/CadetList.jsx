import React from "react";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";
import CadetListItem from "./CadetListItem";

const CadetList = (props) => {
  const { cadetes, usuarioActivo, setRefrescar } = props;

  const handleDeleteCadet = async (_id) => {
    try {
      const resultado = await fetch(
        `http://localhost:4000/api/boaterra/administracion/cadetes/${_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resultado.status === 200) {
        Swal.fire("Listo!", "El se eliminó correctamente el Cadete", "success");
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
  };
  return (
    <Table className="usersTable">
      <thead>
        <tr>
          <th>NOMBRE Y APELLIDO</th>
          <th>TELEFONO</th>
          <th>DETALLE</th>

          {usuarioActivo.permisoUsu
            ? ((<th>DIRECCIÓN</th>), (<th>OPCIONES</th>))
            : null}
        </tr>
      </thead>
      <tbody>
        {cadetes.map((cadete, index) => (
          
          <CadetListItem  key={index} cadete={cadete} usuarioActivo={usuarioActivo.permisoUsu} handleDeleteCadet={handleDeleteCadet}></CadetListItem>
        ))}
      </tbody>
    </Table>
  );
};

export default CadetList;
