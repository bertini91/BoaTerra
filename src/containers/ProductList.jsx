import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo_search from "../assets/static/search_find.png";
import "../assets/styles/components/Search.scss";
import "../assets/styles/ProductList.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ProductListProd from "../components/Product/ProductListProd";
import ProductListCom from "../components/Product/ProductListCom";
import ProductModalNew from "../components/Product/ProductModalNew";
import ProductModalCombo from "../components/Product/ProductModalCombo";

const ProductList = (props) => {
  const {
    productos,
    setProductos,
    setRefrescar,
    tipoUsuario,
    combos,
    setCombos,
  } = props;
  const [typeOpenTable, setTypeOpenTable] = useState(true); //true = Productos; false = combos
  const [showModal, setShowModal] = useState(false);
  const [showModalCombo, setShowModalCombo] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const resultProd = [];
  const resultCombo = [];
  const resultCategories = [];

  useEffect(() => {
    console.log("En useEffectProduct");
    console.log(typeOpenTable);
    console.log(categories);
    handleSearchCategories();
  }, [typeOpenTable]);

  const handleOpenModalNewProd = () => {
    handleSearchCategories();
    setShowModal(true);
  };
  const handleOpenModalNewcombo = () => {};

  const handleSearchCategories = () => {
    for (let producto of productos) {
      if (resultCategories.indexOf(producto.categoriaProd) === -1) {
        resultCategories.push(producto.categoriaProd);
      }
    }
    setCategories(resultCategories);
    console.log(categories);
  };

  const handleSearch = () => {
    const word = document.getElementById("searchInput").value.toUpperCase();

    if (word !== "") {
      if (tipoUsuario) {
        for (let producto of productos) {
          let nameProd = producto.nombreProd.toUpperCase();
          if (nameProd.indexOf(word) !== -1) {
            resultProd.push(producto);
          }
        }
        setProductos(resultProd);
      } else {
        for (let combo of combos) {
          let nameCombo = combo.nombreCombo.toUpperCase();
          if (nameCombo.indexOf(word) !== -1) {
            resultCombo.push(combo);
          }
        }
        setCombos(resultCombo);
      }
    } else {
      setRefrescar(true);
    }
  };

  return (
    <div className="productList">
      <p className="productList_title">LISTADO DE PRODUCTOS</p>
      {tipoUsuario ? (
        <div className="productContainerOptions">
          <button
            className="productList_button productContainerOptions_button"
            onClick={() => handleOpenModalNewProd()}
          >
            Nuevo Producto
          </button>
          <div className="search">
            <button className="transparentButton ">
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
          <button
            className="productList_button productContainerOptions_button"
            onClick={() => setShowModalCombo(true)}
          >
            Nuevo Combo
          </button>
        </div>
      ) : (
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
      )}
      {/* <div className="search">
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
      </div> */}
      <div className="tab">
        <button className="tablinks" onClick={() => setTypeOpenTable(true)}>
          Productos
        </button>
        <button className="tablinks" onClick={() => setTypeOpenTable(false)}>
          Combos
        </button>
      </div>
      <div className="productConteiner_Table">
        {typeOpenTable ? (
          <ProductListProd
            productos={productos}
            tipoUsuario={tipoUsuario}
            setRefrescar={setRefrescar}
          ></ProductListProd>
        ) : (
          <ProductListCom
            combos={combos}
            tipoUsuario={tipoUsuario}
            setRefrescar={setRefrescar}
          ></ProductListCom>
        )}
      </div>
      <div className="d-flex justify-content-center pb-4">
        <button className="productList_button">
          <Link to="/principal">ATRÁS</Link>
        </button>
      </div>
      <ProductModalNew
        categorias={categories}
        showModal={showModal}
        setShowModal={setShowModal}
        setCategories={setCategories}
        setRefrescar={setRefrescar}
      ></ProductModalNew>
      <ProductModalCombo
        setRefrescar={setRefrescar}
        setCombos={setCombos}
        productos={productos}
        showModalCombo={showModalCombo}
        setShowModalCombo={setShowModalCombo}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      ></ProductModalCombo>
    </div>
  );
};

export default ProductList;
