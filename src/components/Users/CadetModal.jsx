import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../assets/styles/components/UserModal.scss";

const CadetModal = (props) => {
  const { setRefrescar, setShowCadetModal, showCadetModal } = props;
  const [styleCadetModal, setStyleCadetModal] = useState({ display: "none" });

  useEffect(() => {
    if (showCadetModal) {
      setStyleCadetModal({
        display: "flex",
      });
    } else {
      setStyleCadetModal({
        display: "none",
      });
    }
  }, [showCadetModal]);
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };
  const cleanCadetModal = () => {
    document.getElementById("inputNameCadet").value = "";
    document.getElementById("inputSurnameCadet").value = "";
    document.getElementById("inputAddressCadet").value = "";
    document.getElementById("inputTelephoneCadet").value = "";
    document.getElementById("inputDetailCadet").value = "";
  };
  const handleSaveCadet = async (event) => {
    event.preventDefault();
    try {
      const newCadet = {
        nombreCadete: document.getElementById("inputNameCadet").value,
        apellidoCadete: document.getElementById("inputSurnameCadet").value,
        direccionCadete: document.getElementById("inputAddressCadet").value,
        telefonoCadete: document.getElementById("inputTelephoneCadet").value,
        detalleCadete: document.getElementById("inputDetailCadet").value,
      };
      console.log(newCadet);
      const resultado = await fetch(
        "https://boa-terra.herokuapp.com/api/boaterra/administracion/cadetes/nuevo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCadet),
        }
      );
      console.log(resultado.status)
      if (resultado.status === 200) {
        Swal.fire("Listo!", "La venta se cargó correctamente", "success");
        cleanCadetModal();
        setRefrescar(true);
        setShowCadetModal(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: "<p>No se pudo guardar el cadete.</p>",
      });
    }
  };
  return (
    <>
      <div className="fade modal-backdrop show" style={styleCadetModal}></div>
      <div className="modalNew" style={styleCadetModal}>
        <div className="backgroudItem contentModalNew">
          <div>
            <p className="userModal_title">Registrar Cadete</p>
            <form onSubmit={handleSaveCadet}>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Nombre: </p>
                <input
                  type="text"
                  placeholder="Ingrese el nombre"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputNameCadet"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Apellido: </p>
                <input
                  type="text"
                  placeholder="Ingrese el apellido"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputSurnameCadet"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Dirección: </p>
                <input
                  type="text"
                  placeholder="Ingrese el domicilio"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputAddressCadet"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Telefono: </p>
                <input
                  type="text"
                  placeholder="Ingrese el Teléfono"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputTelephoneCadet"
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-4">
                <p className="userModal_text">Detalle: </p>
                <input
                  type="text"
                  placeholder="Ingrese algun detalle"
                  className="userModal_input"
                  onKeyDown={handleEnter}
                  autoComplete="off"
                  id="inputDetailCadet"
                  required
                />
              </div>

              <section className="d-flex justify-content-around pt-5 pb-3">
                <button
                  className="userModal_button userModal_buttonText"
                  type="button"
                  onClick={() => (setShowCadetModal(false), cleanCadetModal())}
                >
                  ATRÁS
                </button>
                <button
                  className="userModal_button userModal_buttonText"
                  type="submit"
                >
                  CONFIRMAR
                </button>
              </section>
            </form>
          </div>
          <p className="msjOptional">* El detalle es Opcional</p>
        </div>
      </div>
    </>
  );
};

export default CadetModal;
