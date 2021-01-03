import React from "react";
/* import React, { Component } from "react";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = { subTotal: this.props.total };
  }
  render() {
    return (
      <tr>
        <td class="text-center">{this.props.element.unidad}</td>
        <td>{this.props.element.producto.nombreProd}</td>
        <td>{this.props.element.producto.detalleProd}</td>
        <td class="text-center">{this.props.element.producto.precioProd}</td>
        <td class="text-center">
          {this.props.element.unidad * this.props.element.unidad}
        </td>
        {
          this.setState(this.props.total) =
            this.state.subTotal +
            (this.props.element.producto.precioProd * this.props.element.unidad)
        }
      </tr>
    );
  }
} */

/* export default ProductItem; */

const ProductItem = (props) => {
  const { element, total, setTotal } = props;
  const subTotal = 0;
  subTotal = total + element.producto.precioProd * element.unidad;
  setTotal(subTotal);
  return (
    <tr>
      <td class="text-center">{element.unidad}</td>
      <td>{element.producto.nombreProd}</td>
      <td>{element.producto.detalleProd}</td>
      <td class="text-center">{element.producto.precioProd}</td>
      <td class="text-center">{element.unidad * element.unidad}</td>

      {/* {
        ((subTotal = total + element.producto.precioProd * element.unidad),
        setTotal(subTotal))
      } */}
    </tr>
  );
};

export default ProductItem;
