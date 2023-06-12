import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

export default function Tarefas(){
    const secao = () =>{
        return <section>
                TAREFAS
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}