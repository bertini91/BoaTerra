import React from "react";
import CarouselItem from "./CarouselItem";
import "../assets/styles/components/Carousel.scss";

const Carousel = (props) => {
  const {
    combos,
    productosCarrito,
    setRefrescar,
    total,
    setProductosCarrito,
    setTotal,
  } = props;
  return (
    <section className="carousel">
      <div className="carousel__container">
        {combos.map((item) => (
          <CarouselItem
            key={item._id}
            productoCombo={item.productoCombo}
            nombreCombo={item.nombreCombo}
            detalleCombo={item.detalleCombo}
            precioCombo={item.precioCombo}
            productosCarrito={productosCarrito}
            setRefrescar={setRefrescar}
            total={total}
            setProductosCarrito={setProductosCarrito}
            setTotal={setTotal}
          ></CarouselItem>
        ))}
        {/* <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem>
        <CarouselItem></CarouselItem> */}
      </div>
    </section>
  );
};

export default Carousel;
