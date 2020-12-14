import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/components/Header.scss";
import logo from "../../assets/static/index3.png";
import user_person from "../../assets/static/user_person.png";
import icon_option from "../../assets/static/header-icon_option.png";
import { useState } from "react";
import { useEffect } from "react";

const Header = (props) => {
  const { isLogin, isAdmin, setRefrescar } = props;
  const [linkImg, setLinkImg] = useState("/principal");
  useEffect(() => {
    isLogin ? setLinkImg("/") : setLinkImg("/principal");
  }, [isLogin]);
  return (
    <div className="header">
      {!isLogin ? (
        <div className="sectionOption">
          <button className="buttonOption">
            <img src={icon_option} className="img_option" alt="" srcSet="" />
          </button>
          <ul className="ulOptionHeader">
            <div className="commonButtons">
              <li>
                <button>
                  <Link to="/productos">Productos</Link>
                </button>
              </li>
              <li>
                <button>
                  <Link to="/clientes">Clientes</Link>
                </button>
              </li>
              <li>
                <button /* onClick={setRefrescar(true)} */>
                  <Link to="/envios">Envios</Link>
                </button>
              </li>
            </div>
          </ul>
        </div>
      ) : null}
      <Link to={linkImg}>
        <img id="header_logo" src={logo} alt="Logo BoaTerra"></img>
      </Link>

      {isLogin ? (
        <h1 id="headerTitle" className="title">
          Bienvenidos
        </h1>
      ) : null}
      <div className="d-flex">
        {isAdmin ? (
          <button className="closeBox_perfil-nav">
            <Link to="">Cierre de Caja</Link>
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
                    <li className="closeBox_perfil">
                      <Link>Cierre de Caja</Link>
                    </li>
                    <li>
                      <Link to="">Control Caja</Link>
                    </li>
                    <li>
                      <Link to="/administracion/usuarios">Personal</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="">Mis Datos</Link>
                    </li>
                    <li>
                      <Link to="/administracion/usuarios">Cadetes</Link>
                    </li>
                  </>
                )}
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
