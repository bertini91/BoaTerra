import React from "react";
import eliminarProducto from "../assets/static/usertrash.png";
import "../assets/styles/components/ShoppingCart.scss";

const ShoppingCartItem = (props) => {
  const {
    productoDetalle,
    nombre,
    cantidad,
    precio,
    totalUnitario,
    total,
    index,
    removeProdCart
  } = props;
  /* setTotal(Number.parseFloat(totalUnitario + total)); */
  /* console.log(`ShoppingCartItem TOTAL = ${total}`);
  console.log(`${productoDetalle} ${nombre} ${precio}`); */
  /* console.log(index) */
  return (
    <div className="shoppingCardItem">
      <div className="shoppingCart_detail">
        <p className="text-uppercase mb-2">{nombre}</p>
        <p className="text-left pl-3">
          {cantidad} -- {productoDetalle}
        </p>
      </div>
      <div className="cardItem-delete-total">
        <p className="shoppingCart_amount">$ {totalUnitario}</p>
        <button className="" onClick={()=>removeProdCart(index)}>
          <img
            src={eliminarProducto}
            alt="Eliminar"
            className="shoppingCart-img_delete"
          />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
