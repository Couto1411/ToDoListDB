import React from "react";
import "./perfil.css"
import MenuPage from "../Menu/menupage";

export default function Perfil(){
    const secao = () =>{
        return <section>
                PERFIL
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}