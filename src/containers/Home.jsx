import React from "react";
import Carousel from "../components/Home/Carousel";
import ListProductHome from "../components/Home/ListProductHome";
import Search from "../components/Home/Search";
import ShoppingCart from "../components/Home/ShoppingCart";
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

  const removeProdCart = (index) => {
    const carrito = productosCarrito.filter((item, i) => i !== index);
    let calcularTotal = 0;
    carrito.forEach((item) => {
      calcularTotal = calcularTotal + item.producto.precioProd * item.unidad;
    });
    setTotal(calcularTotal);
    setProductosCarrito(carrito);
  };

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
              removeProdCart={removeProdCart}
              clearSale={clearSale}
            ></ShoppingCart>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
