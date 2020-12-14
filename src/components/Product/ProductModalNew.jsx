import React from "react";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../assets/styles/components/ProductModalNew.scss";

const ProductModalNew = (props) => {
  const {
    categorias,
    showModal,
    setShowModal,
    setCategories,
    setRefrescar,
  } = props;
  const [typeStock, setTypeStock] = useState("");
  const [styleModal, setStyleModal] = useState({
    display: "none",
  });
  const [styleLabelNewCategory, setStyleLabelNewCategory] = useState({});
  const [styleStockUnit, setStyleStockUnit] = useState({
    display: "none",
  });
  const [unCheckBox, setUnCheckBox] = useState({});
  const [styleAddCategory, setStyleAddCategory] = useState({
    display: "none",
  });
  const [categorySelected, setCategorySelected] = useState("");
  /*   console.log(`en productModalNew ${categorias}`);
  console.log(categorias); */

  useEffect(() => {
    console.log("En useEffect ProductModalNew");
    console.log(categorias);
    if (showModal) {
      setStyleModal({
        display: "flex",
      });
    } else {
      //AQUI DEBO LIMPIAR LOS CAMPOS Y STATE
      /* clearModalNew(); */
      setStyleModal({
        display: "none",
      });
    }
    /* showModal
      ? setStyleModal({
          display: "flex",
        })
      : setStyleModal({
          display: "none",
        }); */
  }, [showModal, categorias]);

  const handleCloseModal = () => {
    setStyleModal({
      display: "none",
    });
    setShowModal(false);
  };

  const handleUnCheckBox = (id) => {};

  const handleUnchekedBox = (id) => {
    /* let idActual = element.id; */
    console.log("EN handleUnchekedBox" + id);
    console.log(id);
    for (let i = 0; i < categorias.length; i++) {
      console.log(`${id}Category`);
      `${i}Category` !== id ? (document.getElementById(`${i}Category`).checked = false) : null;
    }
    console.log("FIN EN handleUnchekedBox "+categorySelected);
  };

  const handleShowInput = () => {
    setStyleAddCategory({ display: "flex" });
    setStyleLabelNewCategory({
      display: "none",
    });
    setShowModal(true);
  };

  /*  const handleSaveCategory = (event) => {
    console.log("EN handleSaveCategory");
    if (event.keyCode === 13) {
      console.log("ENTER");
      let arrayCateg = categorias;
      arrayCateg.push(categorySelected);
      setCategories(arrayCateg);
    } else {
      console.log("NO ENTER");
    }
  }; */

  const clearModalNew = () => {
    console.log("EN clearModalNew(); ****************************")
    document.getElementById("inputName").value = "";
    document.getElementById("inputDetail").value = "";
    document.getElementById("inputURL").value = "";
    document.getElementById("inputPrice").value = "";
    for (let i = 0; i < categorias.length; i++) {
      document.getElementById(`${i}Category`).checked = false;
    }
    document.getElementById("peso").checked = false;
    document.getElementById("unidad").checked = false;
    document.getElementById("inputStock").value = 0;
    setTypeStock("");
    setCategorySelected("");
  };

  const handleSaveProd = async (event) => {
    event.preventDefault();
    if (categorySelected === "" || categorySelected.length < 2 || typeStock === "") {
      document.getElementById("msjError").style.display = "flex";
    } else {
      const tipoStockProd = typeStock === "peso" ? false : true;
      try {
        
        const newProduct = {
          nombreProd: document.getElementById("inputName").value,
          detalleProd: document.getElementById("inputDetail").value,
          categoriaProd: categorySelected.toUpperCase(),
          precioProd: Number(document.getElementById("inputPrice").value),
          tipoStockProd, 
          stockProd: document.getElementById("inputStock").value,
          urlImgProd: document.getElementById("inputURL").value,
        };
        console.log(newProduct);
        const resultado = await fetch(
          "https://boa-terra.herokuapp.com/api/boaterra/administracion/productos/nuevo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
          }
        );
        if (resultado.status === 200) {
          Swal.fire("Listo!", "La venta se cargó correctamente", "success");
          clearModalNew();
          setRefrescar(true);
          setShowModal(false);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo cargar el producto.</p>",
        });
      } 
    }
  };

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show" style={styleModal}></div>
      <div className="modalNew" style={styleModal}>
        <div className="backgroudItem contentModalNew">
          {/* <div>
            <div>BOA TERRA</div>
          </div> */}
          <div>
            <p className="modalNewProduct_title">Nuevo Producto</p>
            <form /* onKeyPress={handleSaveProd} */ onSubmit={handleSaveProd}>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Nombre: </p>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputName"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Precio: </p>
                <input
                  type="text"
                  placeholder="Ingrese el precio"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  id="inputPrice"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Detalle: </p>
                <input
                  type="text"
                  placeholder="Ingrese el detalle (Ej. 2Kg)"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  id="inputDetail"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="d-flex mb-4 justify-content-between">
                <p className="modalNewProduct_text d-flex align-items-start pt-1">
                  Categoria:{" "}
                </p>
                <div className="modalNewProduct_input">
                  {categorias.map((categoria, index) => (
                    <span className="todo-wrap" key={`${index}${categoria}`}>
                      <input
                        type="checkbox"
                        id={`${index}Category`}
                        value={categoria}
                        onClick={(r) => (setCategorySelected(r.target.value), handleUnchekedBox(r.target.id))}
                      />
                      <label
                        htmlFor={`${index}Category`}
                        className="todo"
                        value={`${index}Category`}
                      >
                        <i
                          className="fa fa-check"
                          id={`${index}Check`}
                          value={index}
                          /* onChange={(e) => setCategorySelected(e.target.value)} */
                          /* onClick={(e) => handleUnchekedBox(e.target.value)} */
                        ></i>
                        {categoria}
                      </label>
                    </span>
                  ))}
                  <div className="d-block" id="add-todo">
                    <span className="todo-wrap" style={styleAddCategory}>
                      {/* <input type="checkbox" /> */}
                      <label className="todo">
                        <i className="fa fa-check d-flex align-items-center"></i>
                        <input
                          type="text"
                          className="modalNewProduct_inputAdd"
                          id="inputNewCategory"
                          onChange={(e) => setCategorySelected(e.target.value)}
                          onKeyDown={handleEnter}
                        />
                      </label>
                    </span>
                    <div className="d-flex">
                      <i className="fa fa-plus"></i>
                      <label
                        className="todo"
                        onClick={() => handleShowInput()}
                        style={styleLabelNewCategory}
                      >
                        Nueva Categoria
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Stock en: </p>
                <div className="containerTypeStock">
                  <div className="pl-3">
                    <input
                      type="radio"
                      id="peso"
                      name="typeStock"
                      value="peso"
                      onChange={(e) => (
                        setTypeStock(e.target.value),
                        setStyleStockUnit({ display: "none" })
                      )}
                      /* checked */
                    />
                    <label for="peso" className="ml-1">
                      Por Peso
                    </label>
                  </div>
                  <div className="pl-3">
                    <input
                      type="radio"
                      id="unidad"
                      name="typeStock"
                      value="unidad"
                      onChange={(e) => (
                        setTypeStock(e.target.value),
                        setStyleStockUnit({ display: "flex" })
                      )}
                      /* onClick={()=>setStyleStockUnit({display: "flex"})} */
                    />
                    <label for="unidad" className="ml-1">
                      Por Unidad
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="justify-content-between mb-4"
                id="containerStock"
                style={styleStockUnit}
              >
                <p className="modalNewProduct_text">Stock Actual: </p>
                <input
                  type="number"
                  placeholder="Ingrese el Stock"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  id="inputStock"
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">urlImgProd: </p>
                <input
                  type="text"
                  placeholder="Ingrese la categoria"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  id="inputURL"
                />
              </div>
              <section className="d-flex justify-content-around pt-5 pb-3">
                <button
                  className="modalNewProd_button modalNewProd_buttonText"
                  type="button"
                  onClick={() => (setShowModal(false), clearModalNew())}
                >
                  ATRÁS
                </button>
                <button
                  className="modalNewProd_button modalNewProd_buttonText"
                  /* onClick={handleConfirmClient} */
                  type="submit"
                  /* onClick={handleSaveClient} */
                >
                  CONFIRMAR
                </button>
              </section>
            </form>
          </div>
          <p className="msjOptional">* URL de imagen es Opcional</p>
          <p className="msjError" id="msjError">
            ERROR: Campos obligatorios no completados
          </p>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductModalNew;
