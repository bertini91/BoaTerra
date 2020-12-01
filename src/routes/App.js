import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Sending from "../containers/Sending";
import Client from "../containers/Client";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [combos, setCombos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [refrescar, setRefrescar] = useState(true);
  const [usuarioActivo, setUsuarioActivo] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [enviosHoy, setEnviosHoy] = useState([]);
  const [total, setTotal] = useState(0);
  const [medioPago, setMedioPago] = useState("");
  

  useEffect(() => {
    if (refrescar) {
      consultarAPI();
      setRefrescar(false);
    }
  }, [refrescar]);

  const clearSale = () => {
    setProductosCarrito([]);
    setTotal(0);
  };

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
      setProductos(resultadoProd);
      setCombos(resultadoCombos);
      setUsuarios(resultadoUsuarios);
      setClientes(resultadoCliente);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    /* Object.keys(usuarioActivo).length !== 0 ? ( */
    <Router>
      <Header isLogin={isLogin} isAdmin={isAdmin}></Header>
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
          <Sending></Sending>
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
