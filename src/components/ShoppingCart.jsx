import React from "react";
import carritoLogo from "../assets/static/carritoCompra.png";
import "../assets/styles/components/ShoppingCart.scss";
import '../assets/styles/Cart.scss';
import ShoppingCartItem from "./ShoppingCartItem";
import minimizar from "../assets/static/minimize.png";
import { useState } from "react";
import { Link } from "react-router-dom";


const ShoppingCart = (props) => {
  const { productosCarrito, total, removeProdCart, cancelSale } = props;
  const [hideIcon, setHideIcon] = useState(true);
  const [hideShoppingCart, setHideShoppingCart] = useState(false);


  return (
    <div>
      {!hideShoppingCart ? (
        <div className="shoppingCart" id="shopping">
          <div className="cart-img_title">
            <img src={carritoLogo} alt="Carrito" className="img-cart" />
            <p className="shoppingCart_title">PEDIDO</p>
            <button
              className="transparentButton button-shop_minimizer"
              onClick={() => {
                setHideIcon(false);
                setHideShoppingCart(true);
              }}
            >
              <img className="img-shop_minimizer" src={minimizar} alt="" />
            </button>
          </div>
          <div className="containershoppingCart_item">
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
              ></ShoppingCartItem>
            ))}

            <div>
              <p className="shoppingCart_total">TOTAL ${total}</p>
              <div className="d-flex justify-content-around">
                <button className="cartButton" onClick={cancelSale}>
                  CANCELAR
                </button>
                <button
                  className="cartButton"
                  /* onClick={() => hashHistory.push(`/confirmarEnvio`)} */
                >
                <Link className=" cartButtonLink" to="/confirmarEnvio">CONFIRMAR</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {!hideIcon ? (
        <div className="conteinetButton_shop">
          {
            <button
              className="transparentButton"
              onClick={() => {
                setHideShoppingCart(false);
                setHideIcon(true);
              }}
            >
              <img
                className="button-shop_img"
                src={carritoLogo}
                alt="Carrito"
              />
            </button>
          }
        </div>
      ) : null}
    </div>
  );
};

export default ShoppingCart;
