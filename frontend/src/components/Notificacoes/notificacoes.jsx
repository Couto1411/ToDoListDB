import React from "react";
import "./notificacoes.css"
import Menu from "../Menu/menu";

export default function Notificacoes(){
    const secao = () =>{
        return <section>
                notificacoes
                {sessionStorage.setItem('userid',1)}
            </section>
    }

    return(
        <Menu secao={secao}/>
    )
}