import React from "react";
import ListProductHomeItem from "./ListProductHomeItem";
import { useState } from "react";
import "../../assets/styles/components/ListProductHome.scss";

const ListProductHome = (props) => {
  const {
    productos,
    setProductosCarrito,
    productosCarrito,
    setRefrescar,
    total,
    setTotal,
  } = props;
  return (
    <div className="listProductHome">
      {productos.map((producto) => (
        <ListProductHomeItem
          key={producto._id}
          productosCarrito={productosCarrito}
          /*  cantidad={cantidad}
          setCantidad={setCantidad} */
          producto={producto}
          setProductosCarrito={setProductosCarrito}
          setRefrescar={setRefrescar}
          total={total}
          setTotal={setTotal}
        ></ListProductHomeItem>
      ))}
    </div>
  );
};

export default ListProductHome;
