import React from "react";
import { useState } from "react";

import "../assets/styles/components/ListProductHomeItem.scss";

const ListProductHomeItem = (props) => {
  const {
    producto,
    setProductosCarrito,
    productosCarrito,
    setRefrescar,
    total,
    setTotal,
  } = props;
  /* console.log(producto); */
  const [unidad, setUnidad] = useState(1);
  const handleButton = () => {
    const carrito = productosCarrito;
    const p = {
      producto,
      unidad,
    };
    carrito.push(p);
    setTotal(Number.parseFloat(producto.precioProd * unidad + total));
    setProductosCarrito(carrito);
    setUnidad(1);
    setRefrescar(true);
  };
  const amountAdd = () => setUnidad(unidad + 1);
  const amountLess = () => (unidad > 1 ? setUnidad(unidad - 1) : null);
  return (
    <div className="listProductHomeItem">
      <img src={producto.urlImgProd} alt=" " className="imgItem" />
      <section className="px-4 title">
        <p className="titleItem">{producto.nombreProd}</p>
        <p className="detailItem">{producto.detalleProd}</p>
        {/* <p>Bandeja $150</p> */}
      </section>
      <section className="d-flex align-items-center ml-5 bodyItem">
          <div className="d-flex  align-items-center unitButtons">
            <button className="buttonLess" onClick={amountLess}>
              -
            </button>
            <input
              type="text"
              placeholder={unidad}
              className="inputAmount"
              onChange={(e) => {
                setUnidad(e.target.value);
              }}
            />
            <button className="buttonMore" onClick={amountAdd}>
              +
            </button>
          </div>
        <div className="unitButtons">
          {/* <div className="d-flex mt-3 justify-content-center">
            <button className="buttonType buttonTypeGr">125 g</button>
            <button className="buttonType buttonTypeTray">Bandeja</button>
          </div> */}
        </div>
        <p className="amount">{`$ ${producto.precioProd * unidad}`}</p>
        <button button="button" className="buttonAdd" onClick={handleButton}>
          AGREGAR
        </button>
      </section>
    </div>
  );
};

export default ListProductHomeItem;
