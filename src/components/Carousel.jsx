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
        {combos.map((item, i) => (
          <CarouselItem
            key={i}
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
      </div>
    </section>
  );
};

export default Carousel;
