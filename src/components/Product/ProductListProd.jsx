import React from "react";
import Table from "react-bootstrap/Table";
import ImgDelete from "../../assets/static/usertrash.png";
import ImgEdit from "../../assets/static/edit.png";
import Swal from "sweetalert2";

const ProductListProd = (props) => {
  const { tipoUsuario, productos, setRefrescar } = props;

  const handleDeleteProduct = async (_id) => {
    try {
      const resultado = await fetch(
        `http://localhost:4000/api/boaterra/administracion/productos/${_id}`,
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
          "El se eliminó correctamente el Producto",
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
  };
  return (
    <Table className="productTable">
      <thead>
        <tr>
          <th>PRODUCTO</th>
          <th>CATEGORIA</th>
          <th>DETALLE</th>
          <th>PRECIO</th>
          {tipoUsuario ? <th>OPCIONES</th> : null}
        </tr>
      </thead>
      <tbody>
        {productos.map((producto, index) => (
          <tr key={index}>
            <td>{producto.nombreProd}</td>
            <td>{producto.categoriaProd}</td>
            <td>{producto.detalleProd}</td>
            <td>{`$ ${producto.precioProd}`} </td>
            {tipoUsuario ? (
              <th className="d-flex justify-content-lefth">
                <button className="productListItem_button">
                  <img src={ImgEdit} alt="Editar" />
                </button>
                <button
                  className="productListItem_button"
                  onClick={() => handleDeleteProduct(producto._id)}
                >
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

export default ProductListProd;
