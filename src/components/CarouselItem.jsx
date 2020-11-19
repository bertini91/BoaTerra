import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "../assets/styles/components/CarouselItem.scss";
import { useEffect } from "react";

const CarouselItem = (props) => {
  const [show, setShow] = useState(false);
  const [showAmount, setShowAmount] = useState(false);
  const [unidad, setUnidad] = useState(1);
  const [priceTotal, setPriceTotal] = useState(precioCombo);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseAmount = () => setShowAmount(false);
  const handleShowAmount = () => {
    setShow(false);
    setShowAmount(true);
  };
  const amountAdd = () => setUnidad(unidad + 1);
  const amountLess = () => (unidad > 1 ? setUnidad(unidad - 1) : null);

  const {
    productoCombo,
    nombreCombo,
    detalleCombo,
    precioCombo,
    productosCarrito,
    setRefrescar,
    total,
    setProductosCarrito,
    setTotal,
  } = props;

  useEffect(() => {
    setPriceTotal(unidad * precioCombo);
  }, [unidad]);

  const handleBuy = () => {
    handleCloseAmount();
    setTotal(total + priceTotal);
    const carrito = productosCarrito;
    const producto = {
      nombreProd: nombreCombo,
      detalleProd: `Precio unidad $ ${precioCombo}`,
      unidad,
      precioProd: precioCombo,
    };
    const p = {
      producto,
      unidad,
    };
    carrito.push(p);
    setProductosCarrito(carrito);
    setUnidad(1);
    setRefrescar(true);
  };
  return (
    <>
      <div className="carouselItem backgroudItem">
        <Link onClick={handleShow}>
          <p>{nombreCombo}</p>
        </Link>
        <ul className="listProd">
          {productoCombo.map((element, i) =>
            i < 4 ? (
              <li className="itemList" key={i}>
                {element.detalleProd} - {element.nombreProd}
              </li>
            ) : null
          )}
        </ul>
        <div className="d-flex justify-content-around align-items-center px-1 pb-1">
          <button onClick={handleShow}>VER..</button>
          <p>
            <Link>$ {precioCombo}</Link>
          </p>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <div className="backgroudItem modalCombo">
          <Modal.Header closeButton>
            <Modal.Title>{nombreCombo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>{detalleCombo}</h6>
            <ul className="listProd">
              {productoCombo.map((element, i) => (
                <li className="itemList d-flex" key={i}>
                  <p>{element.detalleProd}</p>
                  <p className="ml-4">{element.nombreProd}</p>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <div className=" itemList">
              <p className="mb-0">PRECIO: $ {precioCombo}</p>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="buttonClose"
              >
                Cerrar
              </Button>
              <Button
                variant="primary"
                onClick={handleShowAmount}
                className="buttonAcept"
              >
                Agregar
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>

      <Modal
        show={showAmount}
        onHide={handleCloseAmount}
        backdrop="static"
        keyboard={false}
      >
        <div className="backgroudItem modalCombo">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-amount">
              ¿Cuantas unidades desea comprar?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{nombreCombo}</h5>
            <h5>PRECIO UNITARIO = $ {precioCombo}</h5>
            <div className="d-flex justify-content-center mt-3">
              <button className="buttonLess" onClick={amountLess}>
                -
              </button>
              <input
                type="text"
                placeholder={unidad}
                className="inputAmount"
                onChange={(e) => {
                  setUnidad(e.target.value);
                }}
              />
              <button className="buttonMore" onClick={amountAdd}>
                +
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className=" itemList">
              <p className="mb-0">TOTAL: $ {priceTotal}</p>
            </div>
            <div>
              <Button
                variant="secondary"
                onClick={handleCloseAmount}
                className="buttonClose"
              >
                Cerrar
              </Button>
              <Button
                variant="primary"
                onClick={handleBuy}
                className="buttonAcept"
              >
                Agregar
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default CarouselItem;
