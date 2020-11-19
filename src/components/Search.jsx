import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo_search from "../assets/static/search_find.png";
import "../assets/styles/components/Search.scss";

const Search = (props) => {
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
  );
};

export default Search;
