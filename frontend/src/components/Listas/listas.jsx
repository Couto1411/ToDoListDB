import React from "react";
import "./listas.css"

// Listas criadas e Listas compartilhadas comigo, referência "init" no Figma
export default function Listas(){
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