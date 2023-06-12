import React from "react";
import "./tarefas.css"

export default function Tarefas(){
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