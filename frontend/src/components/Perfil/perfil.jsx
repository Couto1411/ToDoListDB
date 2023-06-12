import React from "react";
import "./perfil.css"

export default function Perfil(){
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