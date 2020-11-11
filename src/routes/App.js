import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [combos, setCombos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [refrescar, setRefrescar] = useState(true);
  useEffect(() => {
    if (refrescar) {
      consultarAPI();
      setRefrescar(false);
    }
  }, [refrescar]);
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
      );
      const resultadoUsuarios = await respuestaUsuarios.json();
      setProductos(resultadoProd);
      setCombos(resultadoCombos);
      setUsuarios(respuestaUsuarios);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    /* productos.length>0 ? */
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <Route exact path="/principal">
          <Home productos={productos} setRefrescar={setRefrescar} combos={combos}></Home>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router> /* :null */
    /*:null */
   /*:null */);
};

export default App;
