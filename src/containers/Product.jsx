import React from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import logo_search from "../assets/static/search_find.png";
import "../assets/styles/components/Search.scss";
import "../assets/styles/ProductList.scss";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { productos, setProductos, setRefrescar } = props;
  const resultProd = [];
  const handleSearch = () => {
    const word = document.getElementById("searchInput").value.toUpperCase();
    if (word !== "") {
      for (let producto of productos) {
        let nameProd = producto.nombreProd.toUpperCase();
        if (nameProd.indexOf(word) !== -1) {
          resultProd.push(producto);
        }
      }
      setProductos(resultProd);
    } else {
      setRefrescar(true);
    }
  };
  return (
    <div className="productList">
      <p className="productList_title">LISTADO DE PRODUCTOS</p>
      <div className="search">
        <button className="transparentButton">
          <img src={logo_search} alt="Buscar" />
        </button>
        <input
          id="searchInput"
          type="text"
          placeholder="Buscar Producto"
          className="search_input"
          onChange={handleSearch}
        />
      </div>
      <div className="productConteiner_Table">
        <Table className="productTable">
          <thead>
            <tr>
              <th>PRODUCTO</th>
              <th>DETALLE</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombreProd}</td>
                <td>{producto.detalleProd}</td>
                <td>{`$ ${producto.precioProd}`} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="d-flex justify-content-center pb-4">
        <button className="productList_button"><Link to="/principal">ATRÁS</Link></button>
      </div>
    </div>
  );
};

export default Product;
