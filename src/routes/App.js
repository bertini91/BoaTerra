import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Common/Header.jsx";
import Footer from "../components/Common/Footer.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Sending from "../containers/Sending";
import Client from "../containers/Client";
import Swal from "sweetalert2";
import Product from "../containers/Product.jsx";
import ClientRectList from "../containers/ClientList";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [combos, setCombos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cadetes, setCadetes] = useState([]);
  const [refrescar, setRefrescar] = useState(true);
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [enviosHoy, setEnviosHoy] = useState([]);
  const [total, setTotal] = useState(0);
  const [medioPago, setMedioPago] = useState("");
  const [enviosPendientes, setEnviosPendientes] = useState([]); //envios pendientes
  const [enviosEnCurso, setEnviosEnCurso] = useState([]); //envios en camino
  /* const [refrescarVentEnv, setRefrescarVentEnv] = useState(true); */

  useEffect(() => {
    if (refrescar) {
      consultarAPI();
      /* console.log("Refrescar en useEffect App.js " + refrescar); */
      setRefrescar(false);
    }
    /* if (refrescarVentEnv) {
      console.log("APP - useEffect - setRefrescarVentEnv " + refrescarVentEnv);
      consultarAPIVentEnv();
      
    } */
  }, [refrescar /* , refrescarVentEnv */]);

  const clearSale = () => {
    setProductosCarrito([]);
    setTotal(0);
  };

  /*   const consultarAPIVentEnv = async () => {
    try {
      const respuestaEnviosPend = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/pendientes"
      );
      const resultadoEnvioPend = await respuestaEnviosPend.json();
      console.log(resultadoEnvioPend);
      setEnviosPendientes(resultadoEnvioPend);
      console.log("en consultarAPIVentEnv")
      const respuestaVentPend = await fetch(
        "http://localhost:4000/api/boaTerra/principal/venta/pendientes"
      );
      if(respuestaVentPend.status === 200){
        console.log("ESTADO 200")
      }
      if(respuestaVentPend.status===500){
        console.log("ESTADO 500")
      }
      const resultadoVentPend = await respuestaVentPend.json();
      setEnviosPendientes(resultadoVentPend);
      console.log(enviosPendientes);
      const respuestaEnvCurso = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/pendientes"
      );
      const resultadoEnvCurso = await respuestaEnvCurso.json();
      setEnviosEnCurso(resultadoEnvCurso);
      
    } catch (error) {
      //Enviar a 404
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error de conexion!",
        footer: error,
      });
    }
    setRefrescarVentEnv(false);
  }; */

  const consultarAPI = async () => {
    try {
      const respuestaProd = await fetch(
        "http://localhost:4000/api/boaTerra/principal"
      );
      /* const respuestaProd = await fetch(
        "https://boa-terra.herokuapp.com/api/boaTerra/principal"
      ) */
      /* console.log(respuestaProd); */
      const resultadoProd = await respuestaProd.json();
      /* console.log(resultadoProd); */
      const respuestaCombo = await fetch(
        "http://localhost:4000/api/boaTerra/principal/combos"
      );
      const resultadoCombos = await respuestaCombo.json();
      const respuestaUsuarios = await fetch(
        "http://localhost:4000/api/boaTerra/"
      ); //codigo 11000 me devuelve de error si los datos ya estan almacenados
      const resultadoUsuarios = await respuestaUsuarios.json();
      resultadoProd.sort((a, b) => {
        if (a.nombreProd > b.nombreProd) {
          return 1;
        }
        if (a.nombreProd < b.nombreProd) {
          return -1;
        }
        return 0;
      });

      const respuestaCli = await fetch(
        "http://localhost:4000/api/boaTerra/principal/venta/cliente"
      );
      const resultadoCliente = await respuestaCli.json();

      /* const respuestaEnviosPend = await fetch(
        "http://localhost:4000/api/boaTerra/principal/envios/pendientes"
      );
      const resultadoEnvioPend = await respuestaEnviosPend.json();
      console.log(resultadoEnvioPend);
      setEnviosPendientes(resultadoEnvioPend); */
      setProductos(resultadoProd);
      setCombos(resultadoCombos);
      setUsuarios(resultadoUsuarios);
      setClientes(resultadoCliente);

      const respuestaEnviosPend = await fetch(
        /* "http://localhost:4000/api/boaTerra/principal/venta/pendientes" */
        "http://localhost:4000/api/boaTerra/principal/envios/pendientes"
      );
      const resultadoEnvioProceso = await respuestaEnviosPend.json();
      /* console.log(resultadoEnvioProceso); */
      setEnviosPendientes(resultadoEnvioProceso);

      const respuestaCadete = await fetch(
        "http://localhost:4000/api/boaTerra/principal/cadetes"
      );
      const resultadoCadete = await respuestaCadete.json();
      setCadetes(resultadoCadete);
      /* const respuestaVentPend = await fetch(
        "http://localhost:4000/api/boaTerra/principal/venta/pendientes"
      );
      const resultadoVentPend = await respuestaVentPend.json();
      setEnviosPendientes(resultadoVentPend); */
      /* console.log(enviosPendientes); */
    } catch (error) {
      //Enviar a 404
      console.log(error);
    }
  };
  return (
    /* Object.keys(usuarioActivo).length !== 0 ? ( */
    <Router>
      <Header
        isLogin={isLogin}
        isAdmin={isAdmin}
        setRefrescar={setRefrescar}
      ></Header>
      <Switch>
        {/* Esta ruta de debo sacar al finalizar el proyecto, para no acceder si no estoy logueado */}
        <Route exact path="/">
          <Login
            usuarios={usuarios}
            setUsuarioActivo={setUsuarioActivo}
            setIsLogin={setIsLogin}
            setIsAdmin={setIsAdmin}
          ></Login>
        </Route>
        {/* FALTA PREGUNTAR SI EL USUARIO ESTA ACTIVO, SINO MANDAR A LA PAG404 */}
        <Route exact path="/principal">
          <Home
            productos={productos}
            setRefrescar={setRefrescar}
            combos={combos}
            setProductos={setProductos}
            productosCarrito={productosCarrito}
            setProductosCarrito={setProductosCarrito}
            total={total}
            setTotal={setTotal}
            clearSale={clearSale}
          ></Home>
        </Route>
        <Route exact path="/principal/confirmarEnvio">
          <Cart
            productosCarrito={productosCarrito}
            setRefrescar={setRefrescar}
            total={total}
            setTotal={setTotal}
            setProductosCarrito={setProductosCarrito}
            usuarioActivo={usuarioActivo}
            medioPago={medioPago}
            setMedioPago={setMedioPago}
            clearSale={clearSale}
          ></Cart>
        </Route>
        <Route exact path="/principal/confirmarEnvio/cliente">
          <Client
            clientes={clientes}
            setClientes={setClientes}
            usuarioActivo={usuarioActivo}
            total={total}
            productosCarrito={productosCarrito}
            medioPago={medioPago}
            setRefrescar={setRefrescar}
            clearSale={clearSale}
          ></Client>
        </Route>

        <Route exact path="/envios">
          <Sending
            enviosPendientes={enviosPendientes}
            /* enviosEnCurso={enviosEnCurso} */
            setRefrescar={setRefrescar}
            cadetes={cadetes}
          ></Sending>
        </Route>
        <Route exact path="/productos">
          <Product
            productos={productos}
            setProductos={setProductos}
            setRefrescar={setRefrescar}
            tipoUsuario = {usuarioActivo.permisoUsu}
            combos={combos}
            setCombos={setCombos}
          ></Product>
        </Route>
        <Route exact path="/clientes">
          <ClientRectList
            clientes={clientes}
            setClientes={setClientes}
            setRefrescar={setRefrescar}
            usuarioActivo={usuarioActivo}
          ></ClientRectList>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
    /* ) : (
      <Router>
        <Header isLogin={isLogin} isAdmin={isAdmin}></Header>
        <Route exact path="/">
          <Login
            usuarios={usuarios}
            setUsuarioActivo={setUsuarioActivo}
            setIsLogin={setIsLogin}
            setIsAdmin={setIsAdmin}
          ></Login>
        </Route>
        <Footer></Footer>
      </Router>
    ) */
  );
};

export default App;
