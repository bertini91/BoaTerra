import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./ComponentToPrint";
import iconPrint from '../../assets/static/print.png';

const ExampleIcon = (props) => {
  const {productosCarrito, currentCliente, medioPago} = props;
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() =><button className="sendingTable_buttons" type="button"><img src={iconPrint} alt="Imprimir"></img></button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} productosCarrito={productosCarrito} currentCliente={currentCliente} medioPago={medioPago}/>
      </div>
    </div>
  );
};

export default ExampleIcon;
