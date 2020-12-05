import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const SendingModal = (props) => {
  const { show, handleClose, cadetes, setCadetSelected, processSend } = props;
  /* const [cadetesModal, setCadetesModales] = useState([]); */
  /* const [styleCadet, setStyleCadet] = useState({}); */

  /*  const [show, setShow] = useState(false);
  const operationSend = (envio, id) => {
    if (envio.estadoEnvio === "Preparacion") {
      console.log("EN PREPARACION " + id);
      console.log(cadetes);
      setShow(true);
    } else {
      console.log("EN CAMINO");
    }
  }; */

/*   useEffect(() => {
    setCadetesModales(cadetes);
  }, []); */

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <div className="backgroudItem modalCombo">
          <Modal.Header closeButton>
            <Modal.Title className="modal-title-amount">
              ¿Cuál es el Cadete que realizara el pedido?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cadetes.map((element, i) => (
              <button
                key={i}
                className="sendingCadet"
                id={`styleCadet${i}`}
                onClick={()=>setCadetSelected(element)}
              >
                <p className="mb-0">{`${element.nombreCadete}, ${element.apellidoCadete}`}</p>
                <p className="mb-0">{element.telefonoCadete}</p>
              </button>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <div>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="buttonClose"
              >
                Atrás
              </Button>
              <Button
                variant="primary" //Aqui debo llamar a la funcion que cambie de estdo
                className="buttonAcept"
                onClick={()=>processSend()}
              >
                Confirmar
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default SendingModal;
