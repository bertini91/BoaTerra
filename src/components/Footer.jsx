import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/static/index3.png";
import instagram from "../assets/static/instagram_icon.png";
import facebook from "../assets/static/Facebook_icon.png";
import whatsapp from "../assets/static/Whatsapp_icon.png";
import "../assets/styles/components/Footer.scss";

const Footer = (props) => {
  const { isLogin } = props;
  return (
    <div className="footer">
        {isLogin ? (
          <Link to="/">
            <img className="footer_logo" src={logo} alt="logo" />
          </Link>
        ) : (
          <Link to="/Home">
            <img className="footer_logo" src={logo} alt="logo" />
          </Link>
        )}
        <p>San Lorenzo 1084 - San Miguel de Tucuman</p>
      <div>
        <a href="https://web.whatsapp.com/" target="_blank">
          <img className="socialNetworks" src={whatsapp} alt="whatsapp" />
        </a>
        <a href="https://www.instagram.com/boaterratuc/" target="_blank">
          <img className="socialNetworks" src={instagram} alt="instagram" />
        </a>
        <a
          href="https://www.facebook.com/BOA-TERRA-390972284995060"
          target="_blank"
        >
          <img className="socialNetworks" src={facebook} alt="facebook" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
