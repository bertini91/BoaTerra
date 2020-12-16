import React from "react";
import Table from "react-bootstrap/Table";
import { Modal, Button } from "react-bootstrap";
import SendingModalDetailItem from "./SendingModalDetailItem";
import "bootstrap/dist/css/bootstrap.min.css";

const SendingModalDetail = (props) => {
  const { actuallySend, setShowDetail, showDetail, handleCloseDetail } = props;
  console.log(actuallySend);
  return (
    <Modal
      show={showDetail}
      onHide={handleCloseDetail}
      backdrop="static"
      keyboard={false}
    >
      <div className="backgroudItem modalCombo">
        <Modal.Header className="d-block" closeButton>
          <Modal.Title className="modal-title-amount modal-title-detail">
            DETALLE DEL ENVÍO
          </Modal.Title>
          <p className="modal-subTitle">Datos del cliente</p>
          <section className="modealDetailSection">
            <div className="d-flex">
              <p className="modalDetailProperty">Nombre y Apellido:</p>
              <p>
                {actuallySend.ventaEnvio.clienteVen.nombreCli}{" "}
                {actuallySend.ventaEnvio.clienteVen.apellidoCli}
              </p>
            </div>
            <div className="d-flex">
              <p className="modalDetailProperty">Direccion:</p>
              <p>{actuallySend.ventaEnvio.direccionVen}</p>
            </div>
            <div className="d-flex">
              <p className="modalDetailProperty">Detalle:</p>
              <p>{actuallySend.ventaEnvio.detalleVen}</p>
            </div>
            {actuallySend.estadoEnvio === "Camino" ? (
              <div>
                <p className="modal-subTitle">DETOS DEL CADETE</p>
                <div className="d-flex">
                  <p className="modalDetailProperty">Cadete:</p>
                  <p >
                    {`${actuallySend.cadeteEnvio.nombreCadete} ${actuallySend.cadeteEnvio.apellidoCadete}`}
                  </p>
                </div>
                <div className="d-flex">
                  <p className="modalDetailProperty">TELEFONO:</p>
                  <p >
                    {actuallySend.cadeteEnvio.telefonoCadete}
                  </p>
                </div>
              </div>
            ) : null}
          </section>
        </Modal.Header>
        <Modal.Body>
          <Table className="sendingTableModal">
            <thead>
              <tr>
                <th>PRODUCTO</th>
                <th>DETALLE</th>
                <th>CANTIDAD</th>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {actuallySend.ventaEnvio.productoVen.map((item, index) => (
                <SendingModalDetailItem
                  key={index}
                  nombreProd={item.producto.nombreProd}
                  detalleProd={item.producto.detalleProd}
                  unidad={item.unidad}
                  precioProd={item.producto.precioProd}
                ></SendingModalDetailItem>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex modalDetailContent_total">
            <p className="modalDetail_total">TOTAL $ </p>
            <p className="modalDetail_total">
              {actuallySend.ventaEnvio.totalVen}
            </p>
          </div>
          <button className="modalDetail_button" onClick={() => setShowDetail(false)}>CERRAR</button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SendingModalDetail;
