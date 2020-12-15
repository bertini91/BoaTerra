import React, { useEffect } from 'react';
import img404 from '../assets/static/error-404.png'
import "../assets/styles/PageNotFound.scss";

const PageNotFound = () => {
    useEffect(()=>{
        console.log("Error 404 ");
    },[])
    return (
        <div className="pageNotFound">
            <img src={img404} alt="Error 404"/>
        </div>
    );
};

export default PageNotFound;