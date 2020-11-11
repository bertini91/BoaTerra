import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/static/index3.png";
import "../assets/styles/components/Header.scss";
import user_person from "../assets/static/user_person.png";
import icon_option from "../assets/static/header-icon_option.png"

const Header = (props) => {
  const { isLogin, isAdmin } = props;
  return (
    <div className="header">
      {!isLogin ? (
        <div className="sectionOption">
          <button className="buttonOption"><img src={icon_option} className="img_option" alt="" srcset=""/></button>
          <ul className="ulOptionHeader">
            <div className="commonButtons">
              <li>
                <button>
                  <Link>Productos</Link>
                </button>{" "}
              </li>
              <li>
                <button>
                  <Link>Clientes</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link>Envios</Link>
                </button>
              </li>
            </div>
          </ul>
        </div>
      ) : null}
      <Link to="/">
        <img id="header_logo" src={logo} alt="Logo BoaTerra"></img>
      </Link>

      {isLogin ? <h1 className="title">Bienvenidos</h1> : null}
      <div className="d-flex">
        {isAdmin ? (
          <button className="closeBox_perfil-nav">
            <Link>Cierre de Caja</Link>
          </button>
        ) : null}
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
              <div className="mt-0 header__menu-ListOption">
                {isAdmin ? (
                  <>
                    <li>
                      <Link to="">Mis Datos</Link>
                    </li>
                    <li className="closeBox_perfil"><Link>Cierre de Caja</Link></li>
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
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;