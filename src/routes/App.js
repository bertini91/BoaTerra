import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Common/Header.jsx";
import Footer from "../components/Common/Footer.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Sending from "../containers/Sending";
import Client from "../containers/Client";
import ProductList from "../containers/ProductList.jsx";
import ClientRectList from "../containers/ClientList";
import Users from "../containers/Users.jsx";
import PageNotFound from "../containers/PageNotFound.jsx";
import MyPerfil from "../containers/MyPerfil.jsx";

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
  const [total, setTotal] = useState(0);
  const [medioPago, setMedioPago] = useState("");
  const [enviosPendientes, setEnviosPendientes] = useState([]); //envios pendientes

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
        "https://boa-terra.herokuapp.com/api/boaTerra/principal"
      );
      const resultadoProd = await respuestaProd.json();
      const respuestaCombo = await fetch(
        "https://boa-terra.herokuapp.com/api/boaTerra/principal/combos"
      );
      const resultadoCombos = await respuestaCombo.json();
      const respuestaUsuarios = await fetch(
        "https://boa-terra.herokuapp.com/api/boaTerra/"
      );
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
        "https://boa-terra.herokuapp.com/api/boaTerra/principal/venta/cliente"
      );
      const resultadoCliente = await respuestaCli.json();
      setProductos(resultadoProd);
      setCombos(resultadoCombos);
      setUsuarios(resultadoUsuarios);
      setClientes(resultadoCliente);

      const respuestaEnviosPend = await fetch(
        "https://boa-terra.herokuapp.com/api/boaTerra/principal/envios/pendientes"
      );
      const resultadoEnvioProceso = await respuestaEnviosPend.json();
      setEnviosPendientes(resultadoEnvioProceso);

      const respuestaCadete = await fetch(
        "https://boa-terra.herokuapp.com/api/boaTerra/principal/cadetes"
      );
      const resultadoCadete = await respuestaCadete.json();
      setCadetes(resultadoCadete);
    } catch (error) {
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
        <Route exact path="/">
          <Login
            usuarios={usuarios}
            setUsuarioActivo={setUsuarioActivo}
            setIsLogin={setIsLogin}
            setIsAdmin={setIsAdmin}
          ></Login>
        </Route>
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
            setRefrescar={setRefrescar}
            cadetes={cadetes}
          ></Sending>
        </Route>
        <Route exact path="/productos">
          <ProductList
            productos={productos}
            setProductos={setProductos}
            setRefrescar={setRefrescar}
            tipoUsuario = {usuarioActivo.permisoUsu}
            combos={combos}
            setCombos={setCombos}
          ></ProductList>
        </Route>
        <Route exact path="/clientes">
          <ClientRectList
            clientes={clientes}
            setClientes={setClientes}
            setRefrescar={setRefrescar}
            usuarioActivo={usuarioActivo}
          ></ClientRectList>
        </Route>
        <Route exact path ="/administracion/usuarios">
          <Users usuarioActivo={usuarioActivo} usuarios={usuarios} cadetes={cadetes} setRefrescar={setRefrescar}></Users>
        </Route>
        <Route exact path="/perfil">
          <MyPerfil usuarioActivo={usuarioActivo} setRefrescar={setRefrescar}></MyPerfil>
        </Route>
        <Route exact path="*">
          <PageNotFound></PageNotFound>
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
