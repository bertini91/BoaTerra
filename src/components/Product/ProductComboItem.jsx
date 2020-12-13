import React from "react";
import logo_delete from "../../assets/static/usertrash.png";

const ProductComboItem = (props) => {
  const {
    producto,
    index,
    selectedProducts,
    setSelectedProducts,
    setReloadTable,
  } = props;

  /* const removeProdCart = (index) => {
        const carrito = productosCarrito.filter((item, i) => i !== index);
        let calcularTotal = 0;
        carrito.forEach((item) => {
          calcularTotal = calcularTotal + item.producto.precioProd * item.unidad;
        });
        setTotal(calcularTotal);
        setProductosCarrito(carrito);
      }; */

  const handleDeleteProduct = (index) => {
    console.log("EN handleDeleteProduct --------");
    const productsArray = selectedProducts.filter((item, i) => i !== index);
    console.log(productsArray);
    setSelectedProducts(productsArray);
    setReloadTable(true);
  };
  return (
    <tr>
      <td scope="row" className="pt-1">
        {index}
      </td>
      <td className="pt-1">{producto.nombreProd}</td>
      <td className="pt-1">{producto.detalleProd}</td>
      <td className="pl-4 pt-1">
        <button className="transparentButton" onClick={()=>handleDeleteProduct(index)}>
          <img
            src={logo_delete}
            className="imgProductAddCombo"
            alt="Eliminar"
          ></img>
        </button>
      </td>
    </tr>
  );
};

export default ProductComboItem;
