import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

import ComponentToPrint from "./ComponentToPrint";

const Example = (props) => {
  const {productosCarrito, currentCliente, medioPago} = props;
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button className="buttonCli textButtonCli" type="button" id="buttonPrint">IMPRIMIR</button>}
        content={() => componentRef.current}
      />
      <div style={{ display: "none" }}>
        <ComponentToPrint ref={componentRef} productosCarrito={productosCarrito} currentCliente={currentCliente} medioPago={medioPago}/>
      </div>
    </div>
  );
};

export default Example;


/* pagina: https://www.npmjs.com/package/react-to-print */