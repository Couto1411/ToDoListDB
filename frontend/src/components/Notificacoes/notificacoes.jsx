import React from "react";
import "./notificacoes.css"
import MenuPage from "../Menu/menupage";

export default function Notificacoes(){
    const secao = () =>{
        return <section>
                NOTIFICAÇÕES
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}