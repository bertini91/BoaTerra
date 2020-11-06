import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/static/index3.png";
import "../assets/styles/components/Header.scss";
import user_person from "../assets/static/user_person.png";

const Header = (props) => {
  const { isLogin, isAdmin } = props;
  return (
    <div className="header">
      {!isLogin ? (
        <div>
          <button>Productos</button>
          <button>Clientes</button>
          <button>Envios</button>
        </div>
      ) : null}
      <Link to="/">
        <img id="header_logo" src={logo} alt="Logo BoaTerra"></img>
      </Link>

      {isLogin ? <h1 className="title">Bienvenidos</h1> : null}
      <div className="d-flex">
        {isAdmin ? <button>Cierre de Caja</button> : null}
        <div className="header__menu">
          <div className="header__menu--profile">
            <img src={user_person} alt="" />
            <p id="p_perfil">Perfil</p>
          </div>
          <ul>
            {isLogin ? (
              <li>
                <Link to="/">Iniciar Sesion</Link>{" "}
              </li>
            ) : (
              <div>
                <div>
                  <ul>
                    {isAdmin ? (
                      <>
                        <li>
                          <Link to="">Mis Datos</Link>
                        </li>
                        <li>
                          <Link to="">Control Caja</Link>
                        </li>
                        <li>
                          <Link to="">Usuarios</Link>
                        </li>
                      </>
                    ) : null}
                    <li>
                      <Link to="/">Cerrar Sesion</Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
