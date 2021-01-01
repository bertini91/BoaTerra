import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import logo_add from "../../assets/static/add-item.png";
import ProductComboItem from "./ProductComboItem";
import "../../assets/styles/components/ProductModalCombo.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductModalCombo = (props) => {
  const {
    setRefrescar,
    showModalCombo,
    setShowModalCombo,
    setSelectedProducts,
    selectedProducts,
  } = props;

  const [styleModalCombo, setStyleModalCombo] = useState({
    display: "none",
  });
  const [styleMsjError, setStyleMsjError] = useState({
    display: "none",
  });

  const [reloadTable, setReloadTable] = useState(false);

  useEffect(() => {
    if (showModalCombo) {
      setStyleModalCombo({
        display: "flex",
      });
    } else {
      setStyleModalCombo({
        display: "none",
      });
    }
    reloadTable ? setReloadTable(false) : null;
  }, [showModalCombo, reloadTable]);

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  const cleanView = () => {
    document.getElementById("inputNameCombo").value = "";
    document.getElementById("inputDetailCombo").value = "";
    document.getElementById("inputPriceCombo").value = "";
    document.getElementById("msjDetail").style.display = "flex";
    setSelectedProducts([]);
    setStyleMsjError({
      display: "none",
    });
  };

  const handleAddProduct = () => {
    console.log("EN handleAddProduct ..........................");
    const productoAdd = {
      nombreProd: document.getElementById("inputNameProd").value,
      detalleProd: document.getElementById("inputDetailProd").value,
    };
    let arrayProducts = selectedProducts;
    arrayProducts.push(productoAdd);
    setSelectedProducts(arrayProducts);
    document.getElementById("inputNameProd").value = "";
    document.getElementById("inputDetailProd").value = "";
    document.getElementById("inputNameProd").focus();
    setReloadTable(true);
  };

  const handleSaveCombo = async (event) => {
    event.preventDefault();
    if (selectedProducts.length > 0) {
      try {
        const newCombo = {
          nombreCombo: document.getElementById("inputNameCombo").value,
          detalleCombo: document.getElementById("inputDetailCombo").value,
          productoCombo: selectedProducts,
          precioCombo: Number(document.getElementById("inputPriceCombo").value),
        };
        console.log(newCombo);
        const resultado = await fetch(
          "http://localhost:4000/api/boaterra/administracion/combo",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCombo),
          }
        );
        console.log("STADO RESP = " + resultado.status);
        if (resultado.status === 200) {
          Swal.fire("Listo!", "La venta se cargó correctamente", "success");
          cleanView();
          setRefrescar(true);
          setShowModalCombo(false);
        }
        if (resultado.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El nombre del combo ya se encuentra registrado",
            footer: "<p>No se pudo cargar el producto.</p>",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo cargar el producto.</p>",
        });
        console.log(error);
      }
    } else {
      document.getElementById("msjDetail").style.display = "none";
      setStyleMsjError({
        display: "flex",
      });
    }
  };

  return (
    <>
      <div className="fade modal-backdrop show" style={styleModalCombo}></div>
      <div className="modalNew" style={styleModalCombo}>
        <div className="backgroudItem contentModalNew">
          <div>
            <p className="modalNewProduct_title">Nuevo Combo</p>
            <form onSubmit={handleSaveCombo}>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Nombre: </p>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  id="inputNameCombo"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Precio: $</p>
                <input
                  type="number"
                  placeholder="Ingrese el precio"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputPriceCombo"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Detalle: </p>
                <input
                  type="text"
                  placeholder="Ingrese el detalle corto"
                  className="modalNewProduct_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputDetailCombo"
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="modalNewProduct_text">Productos </p>
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    id="inputNameProd"
                    placeholder="Nombre"
                    className="productAddCombo mr-2"
                    onKeyDown={handleEnter}
                    autoComplete="off"
                  />
                  <input
                    type="text"
                    id="inputDetailProd"
                    placeholder="Detalle"
                    className="productAddCombo mr-1"
                    onKeyDown={handleEnter}
                    autoComplete="off"
                  />
                  <button
                    className="transparentButton"
                    type="button"
                    onClick={() => handleAddProduct()}
                  >
                    <img
                      src={logo_add}
                      alt="Agregar"
                      className="imgProductAddCombo"
                    />
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center">
                {selectedProducts.length > 0 ? (
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="pt-1">
                          #
                        </th>
                        <th scope="col" className="pt-1">
                          Producto
                        </th>
                        <th scope="col" className="pt-1">
                          Detalle
                        </th>
                        <th scope="col" className="pt-1">
                          Eliminar
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProducts.map((producto, index) => (
                        <ProductComboItem
                          producto={producto}
                          index={index}
                          key={`${index}_product`}
                          setReloadTable={setReloadTable}
                          setSelectedProducts={setSelectedProducts}
                          selectedProducts={selectedProducts}
                        ></ProductComboItem>
                      ))}
                    </tbody>
                  </table>
                ) : null}
              </div>
              <section className="d-flex justify-content-around pt-5 pb-3">
                <button
                  className="modalNewProd_button modalNewProd_buttonText"
                  type="button"
                  onClick={() => setShowModalCombo(false)}
                >
                  ATRÁS
                </button>
                <button
                  className="modalNewProd_button modalNewProd_buttonText"
                  type="submit"
                >
                  CONFIRMAR
                </button>
              </section>
            </form>
          </div>
          <p className="msjOptional" id="msjDetail">
            * Detalle es Opcional
          </p>
          <p className="msjError" id="msjErrorCombo" style={styleMsjError}>
            ERROR: Campos obligatorios no completados y debe contener al menos 2
            productos.
          </p>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default ProductModalCombo;
