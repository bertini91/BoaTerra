import React from "react";
import { Link } from "react-router-dom";
import logo_search from "../assets/static/search_find.png";
import '../assets/styles/components/Search.scss'

const Search = () => {
  return (
    <div className="search">
      <Link>
        <img src={logo_search} alt="Buscar" />
      </Link>
      <input type="text" placeholder="Buscar Producto" className="search_input"/>
    </div>
  );
};

export default Search;
