import React from "react";
import eliminarProducto from "../assets/static/usertrash.png";

const CartIem = (props) => {
  const {
    nombre,
    productoDetalle,
    cantidad,
    precio,
    totalUnitario,
    removeProdCart,
    index
  } = props;
  return (
    <div className="cartItem">

      <div className="container">
        <div className="row">
          <div className="col p-0">
            <p className="text-center">{cantidad}</p>
          </div>
          <div className="col-md-4">
            <p>{nombre}</p>
          </div>
          <div className="col">
            <p /* className="text-center" */>{productoDetalle}</p>
          </div>
          <div className="col p-0">
            <p className="text-center">{"$ " + precio}</p>
          </div>
          <div className="col p-0">
            <p className="text-center">{"$ " + totalUnitario}</p>
          </div>
          <div className="col text-center p-0">
            <button
              className="transparentButton"
              onClick={() => removeProdCart(index)}
            >
              <img
                src={eliminarProducto}
                alt="Eliminar"
                className="shoppingCart-img_delete"
              />
            </button>
          </div>
        </div>
      </div>

      {/* <p className="pl-1">{cantidad}</p>
      <p>{nombre}</p>
      <p>{productoDetalle}</p>
      <p>{"$ " + precio}</p>
      <p>{"$ " + totalUnitario}</p>
      <button
        className="transparentButton"
        onClick={() => removeProdCart(index)}
      >
        <img
          src={eliminarProducto}
          alt="Eliminar"
          className="shoppingCart-img_delete"
        />
      </button> */}
    </div>
  );
};

export default CartIem;
