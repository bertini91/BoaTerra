import React, { useState } from "react";
import CartIem from "../components/CartIem";
import { Link, useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Cart = (props) => {
  const [showModal, setShowModal] = useState(false);
  
  /* const[hasSending, setHasSending] = useState(false); */
  /* const [medioPago, setMedioPago] = useState(""); */
  /* const [mensaje, setMensaje] = useState(""); */
  const {
    setRefrescar,
    productosCarrito,
    setTotal,
    total,
    setProductosCarrito,
    usuarioActivo,
    medioPago,
    setMedioPago,
    clearSale
  } = props;
  let history = useHistory();

  useEffect(()=>{ 
    setMedioPago("");
  }, [])

  const removeProdCart = (index) => {
    const carrito = productosCarrito.filter((item, i) => i !== index);
    let calcularTotal = 0;
    carrito.forEach((item) => {
      calcularTotal = calcularTotal + item.producto.precioProd * item.unidad;
    });
    setTotal(calcularTotal);
    setProductosCarrito(carrito);
  };

  const hangleSaveSend = async () => {
    const fecha = new Date();
    console.log(productosCarrito);
    console.log(medioPago === "");
    if (medioPago === "" || productosCarrito.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          "No seleccionaste el medio de pago y/o el carrito no tiene productos",
        footer: "<p>*Son campos obligatorios.</p>",
      });
    } else {
      const newBuy = {
        fechaVen: fecha,
        estadoVen: true,
        vendedorVen: usuarioActivo,
        totalVen: total,
        productoVen: productosCarrito,
        mediopagoVen: medioPago,
      };
      console.log(newBuy);
      try {
        const resultado = await fetch(
          "http://localhost:4000/api/boaTerra/principal/venta",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newBuy),
          }
        );
        if (resultado.status === 200) {
          Swal.fire("Listo!", "La venta se cargó correctamente", "success");
          clearSale();
          setRefrescar(true);

          history.push("/principal");
        }
      } catch (error) {
        console.log(error);
        
        setShowModal(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrió un error de conexion!",
          footer: "<p>No se pudo cargar la venta.</p>",
        });
      }
    }
    setShowModal(false);
  };

  const handleAsk = ()=>{
    setShowModal(false);
    if (medioPago === "" || productosCarrito.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          "No seleccionaste el medio de pago y/o el carrito no tiene productos",
        footer: "<p>*Son campos obligatorios.</p>",
      });
    } else{
      history.push("/principal/confirmarEnvio/cliente");
    }
  }

  return (
    <>
      <div className="home">
        <p className="cartTitle">CARRITO DE COMPRA</p>
        <div className="px-4 mb-3">
          {/*  {productosCarrito.map((item, i) => {
          const totalUnitario = Number.parseFloat(
            item.producto.precioProd * item.unidad
          );
          setTotal(Number.parseFloat(totalUnitario + total));
          <CartIem
            key={i}
            index={i}
            nombre={item.producto.nombreProd}
            productoDetalle={item.producto.detalleProd}
            cantidad={item.unidad}
            precio={item.producto.precioProd}
            totalUnitario={totalUnitario}
            total={total}
            removeProdCart={removeProdCart}
          ></CartIem>;
        })} */}
          <div className="cartItem">
            <div className="container">
              <div className="row">
                <div className="col p-0">
                  <p className="text-center">UNIDAD</p>
                </div>
                <div className="col-md-4">
                  <p>PRODUCTO</p>
                </div>
                <div className="col">
                  <p /* className="text-center" */>DETALLE</p>
                </div>
                <div className="col p-0">
                  <p className="text-center">PRECIO</p>
                </div>
                <div className="col P-0">
                  <p className="text-center">IMPORTE</p>
                </div>
                <div className="col p-0 cartCol-delete">
                  <p className="text-center">BORRAR</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="cartItem mt-0">
          <p>CANTIDAD</p>
          <p>PRODUCTO</p>
          <p>DETALLE</p>
          <p>PRECIO</p>
          <p>IMPORTE</p>
          <p>ELIMINAR</p>
        </div> */}
          {productosCarrito.map((item, i) => (
            <CartIem
              key={i}
              index={i}
              nombre={item.producto.nombreProd}
              productoDetalle={item.producto.detalleProd}
              cantidad={item.unidad}
              precio={item.producto.precioProd}
              totalUnitario={Number.parseFloat(
                item.producto.precioProd * item.unidad
              )}
              removeProdCart={removeProdCart}
              /* setProductosCarrito={setProductosCarrito} */
            ></CartIem>
          ))}
        </div>
        <div className="d-flex justify-content-center my-4">
          <div
            className="form-check mr-4"
            onClick={() => setMedioPago("EFECTIVO")}
          >
            <input
              className="form-check-input mt-2"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="EFECTIVO"
              /* defaultChecked */
            />
            <label className="form-check-label" for="exampleRadios1">
              <p id="checkText1" className="cartText_total">
                Efectivo
              </p>
            </label>
          </div>
          <div
            className="form-check mr-4"
            onClick={() => setMedioPago("MERCADO PAGO")}
          >
            <input
              className="form-check-input mt-2"
              type="radio"
              name="exampleRadios"
              id="exampleRadios2"
              value="Mercado Pago"
            />
            <label className="form-check-label" for="exampleRadios2">
              <p id="checkText2" className="cartText_total">
                Mercado Pago
              </p>
            </label>
          </div>
          <div
            className="form-check mr-4"
            onClick={() => setMedioPago("TRANSFERENCIA BANCARIA")}
          >
            <input
              className="form-check-input mt-2"
              type="radio"
              name="exampleRadios"
              id="exampleRadios3"
              value="Transferencia Bancaria"
            />
            <label className="form-check-label" for="exampleRadios3">
              <p id="checkText3" className="cartText_total">
                Transferencia Bancaria
              </p>
            </label>
          </div>
          <div className="form-check mr-4" onClick={() => setMedioPago("OTRO")}>
            <input
              className="form-check-input mt-2"
              type="radio"
              name="exampleRadios"
              id="exampleRadios4"
              value="Otro"
            />
            <label className="form-check-label" for="exampleRadios4">
              <p id="checkText4" className="cartText_total">
                Otro
              </p>
            </label>
          </div>
        </div>
        <div className="cart_buttons">
          <div className="cartTotal_content">
            <p className="cartText_total pb-0">TOTAL ($)</p>
            <p className="cartText_total cartText_total-imp">{total}</p>
          </div>
          <button className="cart-button" /* onClick={setShowModal(true)} */>
            {/* <p className="cart-button_text" >CONFIRMAR</p> */}
            <Link
              className="cart-button_text"
              onClick={() => setShowModal(true)}
            >
              CONFIRMAR
            </Link>
          </button>
          {/* <button onClick={history.push("/principal")}>ATRÁS</button> */}
          <button className="cart-button">
            <Link to="/principal" className="cart-button_text">
              ATRÁS
            </Link>
          </button>
          {/* <Link to="/principal">ATRÁS</Link> */}
        </div>
      </div>
      <Modal id="modalAskSend" show={showModal} onHide={() => setShowModal(false)}>
        <div className="backgroudItem modalCombo">
          <Modal.Header closeButton>
            <Modal.Title>BOA TERRA</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2 className="cartTitle">¿Desea realizar el envio a domicilio?</h2>
            {/* <ul className="listProd">
              {productoCombo.map((element, i) => (
                <li className="itemList d-flex" key={i}>
                  <p>{element.detalleProd}</p>
                  <p className="ml-4">{element.nombreProd}</p>
                </li>
              ))}
            </ul> */}
          </Modal.Body>
          <Modal.Footer>
            {/* <div className=" itemList">
              <p className="mb-0">PRECIO: $ {precioCombo}</p>
            </div> */}
            <div>
              <Button
                variant="secondary"
                /* onClick={hangleSaveSend} */
                onClick={hangleSaveSend}
                className="buttonClose"
              >
                NO
              </Button>
              <Button variant="primary" className="buttonAcept cart-button_text" onClick={handleAsk}>SI</Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default Cart;
