import React, { useState, useEffect }  from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Login from "../containers/Login";
import Home from "../containers/Home";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [refrescar, setRefrescar] = useState(true);
  useEffect(() => {
    if (refrescar) {
      consultarAPI();
      setRefrescar(false)
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
      setProductos(resultadoProd);
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
          <Home productos={productos} setRefrescar={setRefrescar}></Home>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router> /* :null */
  );
};

export default App;
