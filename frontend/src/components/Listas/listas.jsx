import React from "react";
import "./listas.css"
import MenuPage from "../Menu/menupage";

// Listas criadas e Listas compartilhadas comigo, referência "init" no Figma
export default function Listas(){
    const secao = () =>{
        return <section>
                LISTAS
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}