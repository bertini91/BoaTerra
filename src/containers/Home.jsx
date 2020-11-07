import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import ListProductHome from "../components/ListProductHome";
import Search from "../components/Search";
import ShoppingCart from "../components/ShoppingCart";
import "../assets/styles/Home.scss";

const Home = (props) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState();
  /* const [cantidad, setCantidad] = useState(1); */
  /* const [importe, setImporte] = useState(); */
  const [total, setTotal] = useState(0);
  const { productos, setRefrescar } = props;
  

  /* useEffect(() => {

  }, [productosCarrito]); */
  const removeProdCart = (index) => {
    const carrito = productosCarrito.filter((item, i) => i !== index);
    let calcularTotal=0;
    carrito.forEach((item)=> calcularTotal =calcularTotal+ item.producto.precioProd);
    setTotal(calcularTotal);
    setProductosCarrito(carrito);
  };

  const cancelSale=()=>{
    setProductosCarrito([]);
    setTotal(0)
  }

  return (
    <div className="home">
      <Header isLogin={false} isAdmin /* ={false} */></Header>
      <Carousel></Carousel>
      <Search></Search>

      <div className="d-flex">
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
        {productosCarrito.length > 0 ? (
          <ShoppingCart
            productosCarrito={productosCarrito}
            total={total}
            setTotal={setTotal}
            removeProdCart={removeProdCart}
            cancelSale={cancelSale}
          ></ShoppingCart>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
