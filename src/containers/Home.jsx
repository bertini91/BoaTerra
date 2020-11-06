import React, { useState } from "react";
import Carousel from "../components/Carousel";
import Header from "../components/Header";
import ListProductHome from "../components/ListProductHome";
import Search from "../components/Search";
import "../assets/styles/Home.scss";
import ShoppingCart from "../components/ShoppingCart";
import { useEffect } from "react";

const Home = (props) => {
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState();
  /* const [cantidad, setCantidad] = useState(1); */
  /* const [importe, setImporte] = useState(); */
  const [total, setTotal] = useState(0);
/* const t=0; */
  const { productos, setRefrescar } = props;
  

  useEffect(() => {
    console.log(productosCarrito);
    /* const t = total; */
    /* const t=0;
    setTotal(productosCarrito.forEach((item)=> {t= total+item.producto.precioProd})) */
    /* productosCarrito.forEach((item)=> t=t+item.producto.precioProd) */
  }, [productosCarrito]);
  const removeProdCart = (index) => {
    /* const carrito = productosCarrito.filter(item => item.producto._id !== index); */
    /* console.log("En removeProdCart HOME index = " + index); */
    /* console.log(productosCarrito.splice(index,1))
    const long = productosCarrito.splice(index,1).length;
    console.log("LONGUITUD = "+long) */
    const carrito = productosCarrito.filter((item, i) => i !== index);
    /* console.log(carrito); */
    let calcularTotal=0;
    carrito.forEach((item)=> calcularTotal =calcularTotal+ item.producto.precioProd);
    setTotal(calcularTotal);
    setProductosCarrito(carrito);
    /* productosCarrito.forEach((item) =>
      item.id !== index
        ? carrito.push(item)
        : setTotal(total - item.producto.precioProd)
    ); */
    /* console.log(carrito.splice(index,1)) */
    /* setProductosCarrito(carrito.splice(index,1)); */
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
