import React, { useEffect, useState } from "react";
import ProdListSummary from "../components/Summary/ProdListSummary";
import SalesListSummary from "../components/Summary/SalesListSummary";
import SendListSummary from "../components/Summary/SendListSummary";
import DatePicker, { registerLocale } from "react-datepicker";
import Calendar from "react-calendar";
import iconCalendar from "../assets/static/calendarIcon.png";
import logo_search from "../assets/static/search_find.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/Calendar.css";
import es from "date-fns/locale/es";
import "../assets/styles/BillingSummary.scss";
import { Link } from "react-router-dom";
registerLocale("es", es);

const BillingSummary = (props) => {
  const [total, setTotal] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSend, setTotalSend] = useState(0);
  const [openTable, setOpenTable] = useState("Ventas");
  const [shipping, setShipping] = useState([]);
  const [productsSold, setProductsSold] = useState([]);
  const [sales, setSales] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const arrayProductsSold = [];

  useEffect(() => {
    setTotal(0);
    setTotalSend(0);
    setTotalSales(0);
    LoadData();
    setProductsSold([]);
  }, [currentDate]);

  const LoadData = async () => {
    try {
      const respuestaVentas = await fetch(
        `http://localhost:4000/api/boaterra/administracion/ventas/buscar/${currentDate.getDate()}&${currentDate.getMonth()}&${currentDate.getFullYear()}`
      );
      const resultadoVentas = await respuestaVentas.json();
      const respuestaEnvios = await fetch(
        `http://localhost:4000/api/boaTerra/principal/envios/fecha/${currentDate.getDate()}&${currentDate.getMonth()}&${currentDate.getFullYear()}`
      );
      const resultadoEnvios = await respuestaEnvios.json();
      let importe = 0;
      let arrayProductsSold = [];
      arrayProductsSold = productsSold;
      
      resultadoVentas.forEach((item) => {
        importe = importe + item.totalVen;
        setTotal(importe);
        for (let productElement of item.productoVen) {
          arrayProductsSold.push(productElement);
        }
      });

      /* Prueba codigo */

      let hash = {};
      let arrayFiltered = arrayProductsSold.filter(
        (o) => (
          hash[o.producto._id] ? false : (hash[o.producto._id] = true)
        )
      );

      arrayFiltered.forEach((element) => {
        let contador = 0;
        const arr = arrayProductsSold.filter((o) =>
          o.producto._id === element.producto._id ? true : false
        );
        arr.forEach((o) => (contador = o.unidad + contador));
        element.unidad = contador;
      });

      arrayFiltered.sort((a, b)=>{
        if (a.producto.nombreProd > b.producto.nombreProd ) {
          return 1;
        }
        if (a.producto.nombreProd  < b.producto.nombreProd ) {
          return -1;
        }
        return 0;
      })

      /* Fin de Prueba de codigo */

      setProductsSold(arrayFiltered);

      setTotalSend(resultadoEnvios.length);
      setSales(resultadoVentas);
      setTotalSales(resultadoVentas.length);
      setShipping(resultadoEnvios);
    } catch (error) {
      console.log(error);
    }
  };

  /* const handleSearch = (event) => {
    event.preventDefault();
    const word = document.getElementById("inputSearch").value.toUpperCase();
    const resultCli = [];
    if (word !== "") {
      for (let cliente of clientes) {
        let nombre = cliente.nombreCli.toUpperCase();
        let apellido = cliente.apellidoCli.toUpperCase();
        let direccion = cliente.direccionCli.toUpperCase();
        if (
          nombre.indexOf(word) !== -1 ||
          apellido.indexOf(word) !== -1 ||
          direccion.indexOf(word) !== -1
        ) {
          resultCli.push(cliente);
        }
      }
      setResultClient(resultCli);
      setStyleSearch({
        display: "block",
      });
    } else {
      setResultClient(clientes);
      setStyleSearch({
        display: "none",
      });
    }
  }; */

  return (
    <>
      <div className="billingSummary">
        <p className="billingTitle">RESUMEN DIARIO</p>
        <div className="containerDate">
          <p>Fecha: </p>
          {/*           <img
            src={iconCalendar}
            alt="Calendario"
            onClick={() => console.log("Click calendario")}
          /> */}
          <DatePicker
            selected={currentDate}
            onChange={setCurrentDate}
            placeholder="DD/MM/YYYY"
            locale="es"
            className="pickers"
            dateFormat="dd/MM/yyyy"
            /* onSelect={()=>setDataLoad(true)} */
          />
          <button className="transparentButton ">
            <img src={logo_search} alt="Buscar" />
          </button>
          {/* <Calendar onChange={setCurrentDate} value={currentDate} /> */}
          {/* 
          {
            (window.onload = function () {
              Calendar.setup({
                inputField: "fecha",
                ifFormat: "%d / %m / %Y",
                button: "selector",
              });
            })
          } */}
          {/* <input type="text" placeholder="DD" /> /
          <input type="text" placeholder="MM" /> /
          <input type="text" placeholder="YYYY" /> */}
        </div>
        <section className="containerDetail">
          <div className="d-flex justify-content-center">
            <p
              className="cartText_total cursorText"
              onClick={() => console.log("CLICK EN TOTAL")}
            >
              TOTAL ($)
            </p>{" "}
            <p className="cartText_total cartText_total-imp">{total}</p>
            {/* <button>Ver...</button>
            <Link>Ver...</Link> */}
          </div>
          <div className="d-flex justify-content-around mt-3">
            <div className="d-flex">
              <p className="cartText_total cursorText">Ventas </p>{" "}
              <p className="cartText_total">({totalSales})</p>
              {/* <button>Ver...</button> */}
            </div>
            <div className="d-flex">
              <p className="cartText_total cursorText">Envios </p>{" "}
              <p className="cartText_total">({totalSend})</p>
              {/* <button>Ver...</button> */}
            </div>
          </div>
        </section>
        <section className="containerTable">
          <div className="d-flex">
            <button onClick={() => setOpenTable("Ventas")}>Ventas</button>
            <button onClick={() => setOpenTable("Envios")}>Envios</button>
            <button onClick={() => setOpenTable("Productos")}>Productos</button>
          </div>
          <div className="contentTable">
            {(() => {
              switch (openTable) {
                case "Ventas":
                  return <SalesListSummary sales={sales}></SalesListSummary>;
                case "Envios":
                  return (
                    <SendListSummary shipping={shipping}></SendListSummary>
                  );
                case "Productos":
                  return (
                    <ProdListSummary
                      productsSold={productsSold}
                    ></ProdListSummary>
                  );
              }
            })()}
          </div>
        </section>
        <section className="d-flex justify-content-around">
          <button className="productList_button">
            <Link to="/principal">ATRÁS</Link>
          </button>
        </section>
      </div>
    </>
  );
};

/* <div className="tab">
        <button className="tablinks" onClick={() => setTypeOpenTable(true)}>
          Productos
        </button>
        <button className="tablinks" onClick={() => setTypeOpenTable(false)}>
          Combos
        </button>
      </div>
      <div className="productConteiner_Table">
        {typeOpenTable ? (
          <ProductListProd
            productos={productos}
            tipoUsuario={tipoUsuario}
            setRefrescar={setRefrescar}
          ></ProductListProd>
        ) : (
          <ProductListCom
            combos={combos}
            tipoUsuario={tipoUsuario}
            setRefrescar={setRefrescar}
          ></ProductListCom>
        )}
      </div> */

export default BillingSummary;
