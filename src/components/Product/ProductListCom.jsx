import React from "react";
import Table from "react-bootstrap/Table";
import ImgDelete from "../../assets/static/usertrash.png";
import ImgEdit from "../../assets/static/edit.png";
import Swal from "sweetalert2";

const ProductListCom = (props) => {
    const {tipoUsuario,combos, setRefrescar} = props;

    const handleDeleteCombo = async (_id)=>{
      try {
        const resultado = await fetch(
          `http://localhost:4000/api/boaterra/administracion/${_id}`,
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
            "El se eliminó correctamente el Combo",
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
    <Table className="productTable">
      <thead>
        <tr>
          <th>COMBO</th>
          <th>DETALLE</th>
          <th>CONTENIDO</th>
          <th>PRECIO</th>
          {tipoUsuario ? <th>OPCIONES</th> : null}
        </tr>
      </thead>
      <tbody>
        {combos.map((combo, index) => (
          <tr key={index}>
            <td>{combo.nombreCombo}</td>
            <td>{combo.detalleCombo}</td>
            <td>
              {combo.productoCombo.map(
                (producto, i) =>
                  `${producto.detalleProd}  ${producto.nombreProd} __ `
              )}
            </td>
            <td>{`$ ${combo.precioCombo}`} </td>
            {tipoUsuario ? (
              <th className="d-flex justify-content-lefth">
                <button className="productListItem_button">
                  <img src={ImgEdit} alt="Editar" />
                </button>
                <button className="productListItem_button" onClick={()=>handleDeleteCombo(combo._id)}>
                  <img src={ImgDelete} alt="Eliminar" />
                </button>
              </th>
            ) : null}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductListCom;
