import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import SendingListItem from './SendingListItem';

const SendingList = (props) => {
    const { enviosPendientes, enviosEnCurso, setRefrescarVentEnv } = props;
    return (
        <div className="">
           {
               enviosPendientes.map((envio, index) => <SendingListItem key={index} envio={envio} index ={index}></SendingListItem>)
           }
        </div>
    );
};

export default SendingList;