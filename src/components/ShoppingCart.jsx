import React from "react";
import carritoLogo from "../assets/static/carritoCompra.png";
import eliminarProducto from "../assets/static/usertrash.png";
import "../assets/styles/components/ShoppingCart.scss";
import ShoppingCartItem from "./ShoppingCartItem";

const ShoppingCart = (props) => {
  const { productosCarrito, total, removeProdCart, cancelSale } = props;

  /* console.log("EN shoppingCart");
  console.log(`EN shoppingCar TOTAL = ${total}`) */
  /* console.log(productosCarrito); */
  
  return (
    <div className="shoppingCart">
      <div className="cart-img_title">
        <img src={carritoLogo} alt="Carrito" className="img-cart" />
        <p className="shoppingCart_title">PEDIDO</p>
      </div>
      <div>
        {productosCarrito.map((item, i) => (
          <ShoppingCartItem
            key={i}
            index={i}
            nombre={item.producto.nombreProd}
            productoDetalle={item.producto.detalleProd}
            cantidad={item.unidad}
            precio={item.producto.precioProd}
            totalUnitario={Number.parseFloat(
              item.producto.precioProd * item.unidad
            )}
            total={total}
            removeProdCart={removeProdCart}
            /* setProductosCarrito={setProductosCarrito} */
          ></ShoppingCartItem>
        ))}
        <div>
          <p className="shoppingCart_total">TOTAL ${total}</p>
          <div className="d-flex justify-content-around">
            <button className="cartButton" onClick={cancelSale}>CANCELAR</button>
            <button className="cartButton" >CONFIRMAR</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
