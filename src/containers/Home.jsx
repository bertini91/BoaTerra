import React, { useState, useEffect } from "react";
import Carousel from "../components/Home/Carousel";
/* import Header from "../components/Header"; */
import ListProductHome from "../components/Home/ListProductHome";
import Search from "../components/Home/Search";
import ShoppingCart from "../components/Home/ShoppingCart";
/* import carritoLogo from "../assets/static/carritoCompra.png"; */
import "../assets/styles/Home.scss";

const Home = (props) => {
  const {
    productos,
    setRefrescar,
    combos,
    setProductos,
    productosCarrito,
    setProductosCarrito,
    setTotal,
    total,
    clearSale,
  } = props;
  /* const [productosCarrito, setProductosCarrito] = useState([]); */
  /* const [productoDetalle, setProductoDetalle] = useState(); */

  /* const [cantidad, setCantidad] = useState(1); */
  /* const [importe, setImporte] = useState(); */
  /* const [total, setTotal] = useState(0); */

  const removeProdCart = (index) => {
    const carrito = productosCarrito.filter((item, i) => i !== index);
    let calcularTotal = 0;
    carrito.forEach((item) => {
      calcularTotal = calcularTotal + item.producto.precioProd * item.unidad;
    });
    setTotal(calcularTotal);
    setProductosCarrito(carrito);
  };

  /* const cancelSale = () => {
    setProductosCarrito([]);
    setTotal(0);
  };
 */
  return (
    <div className="home">
      <Carousel
        combos={combos}
        productosCarrito={productosCarrito}
        setRefrescar={setRefrescar}
        total={total}
        setProductosCarrito={setProductosCarrito}
        setTotal={setTotal}
      ></Carousel>
      <Search
        productos={productos}
        setProductos={setProductos}
        setRefrescar={setRefrescar}
      ></Search>

      <div className="home-content">
        <div className="d-flex">
          <ListProductHome
            productos={productos}
            productosCarrito={productosCarrito}
            setProductosCarrito={setProductosCarrito}
            setRefrescar={setRefrescar}
            total={total}
            setTotal={setTotal}
          ></ListProductHome>
        </div>
        <div className="d-block">
          {productosCarrito.length > 0 ? (
            <ShoppingCart
              productosCarrito={productosCarrito}
              total={total}
              setTotal={setTotal}
              removeProdCart={removeProdCart}
              clearSale={clearSale}
            ></ShoppingCart>
          ) : null}
          {/* <div className="conteinetButton_shop">
            {<button className="button-shop">
              <img src={carritoLogo} alt="Carrito" />
            </button>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
