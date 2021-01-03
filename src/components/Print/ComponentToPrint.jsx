import React from "react";
import logo from "../../assets/static/index3.png";
import Table from "react-bootstrap/Table";
import "../../assets/styles/components/Print.scss";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { listProd: this.props.productosCarrito };
  }

  render() {
    const fecha = new Date();
    let total = 0;

    this.props.productosCarrito.map(
      (element) =>
        (total = total = total + element.unidad * element.producto.precioProd)
    );
    return (
      <div className="print">
        <section className="d-flex justify-content-between mx-2 pt-3">
          <div>
            <img src={logo} alt="Logo Boa-Terra" />
            <p className="text-center">San Lorenzo 1082</p>
            <p>(0381)153329762 / 156563666 </p>
          </div>
          <div>
            <p className="fw-bold pStrong">Comprobante de Compra</p>
            <p className="fw-bold pStrong">No valido como factura</p>
          </div>
          <div>
            <p>{`Fecha: ${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`}</p>
            <p>{`Hora: ${fecha.getHours()}:${fecha.getMinutes()}`}</p>
          </div>
        </section>
        <section className="d-flex justify-content-between">
          <div className="d-flex">
            <p className="fw-bold pr-1 pl-1 pStrong">Cliente: </p>
            <p>{` ${this.props.currentCliente.nombreCli} ${this.props.currentCliente.apellidoCli}`}</p>
          </div>
          <div className="d-flex">
            <p className="fw-bold pr-1 pStrong">Direccion: </p>
            <p>{this.props.currentCliente.direccionCli}</p>
          </div>

          <div className="d-flex">
            <p className="fw-bold pr-1 pStrong">Telefono: </p>
            <p>{this.props.currentCliente.telefonoCli}</p>
          </div>
          <div className="d-flex">
            <p className="fw-bold pr-1 pStrong">Medio de Pago: </p>
            <p>{this.props.medioPago}</p>
          </div>
        </section>
        {this.props.currentCliente.detalleCli !== "" ? (
          <div className="d-flex">
            <p className="fw-bold pr-1 pl-1 pStrong">Detalle: </p>
            <p>{this.props.currentCliente.detalleCli}</p>
          </div>
        ) : null}
        <Table className="table">
          <thead>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Detalle</th>
            <th>P. Unitario</th>
            <th>Importe</th>
          </thead>
          <tbody>
            {this.props.productosCarrito.map((element) => (
              <tr>
                <td className="pl-2">{element.unidad}</td>
                <td>{element.producto.nombreProd}</td>
                <td>{element.producto.detalleProd}</td>
                <td className="pl-2">{element.producto.precioProd}</td>
                <td className="pl-2">{element.unidad * element.producto.precioProd}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <section className="d-flex justify-content-end mt-3 mr-5 ">
          <p className="pStrong">TOTAL ($)</p>
          <p  className="pStrong">{total}</p>
        </section>
      </div>
    );
  }
}
export default ComponentToPrint;
