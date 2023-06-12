import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function Tarefas() {

    const [usuTar, setUsuTar] = React.useState(false);

    const Tarefass = {
        "nome": "Lista 1",
        "tarefa": [
            {
                "titulo": "TÍTULO 1",
                "descricao": "werwe"
            },
                {
                    "titulo": "TÍTULO 2",
                    "descricao": "wfsdfsd"
                },
        ]
    }

    function renderTarefas() {
        return <div>
            <div>Tarefas</div>
            {Tarefass.tarefa.map(tarefa=>{
                return 
                <div>
                    {tarefa.titulo}<br/>
                    {tarefa.descricao}<br/>
                </div>
            })}
        </div>
    }

    function renderUsu() {
        return <div style={{display: "inline-block"}}>
            {/* <span style={{marginRight: 120}}>Tarefas</span>
            <span style={{marginLeft: 120}}>Usuários</span> */}
        </div>
    }

    const secao = () => {
        return <section>
            <Typography align="center" variant="h4">
                <div>
                    <span style={{textAlign: "left"}}>Tarefas</span>
                    <span style={{textAlign: "right"}}>Usuários</span>
                    <Button onClick={() => { setUsuTar(!usuTar) }}> Botão</Button>
                    {usuTar ?
                        renderTarefas() :
                        renderUsu()}
                </div>
            </Typography>

            {Tarefas.tarefa}

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}