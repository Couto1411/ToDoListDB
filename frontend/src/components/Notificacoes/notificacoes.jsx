import React, {  useEffect, useState } from "react";
import "./notificacoes.css"
import MenuPage from "../Menu/menupage";
import { Button } from "@mui/material";
import { CriaConvite, GetConvites } from "../Consultas";

export default function Notificacoes(props){
    const [convites,setConvites] = useState([])

    useEffect(() => {
        GetConvites(props,setConvites);
    },[]);

    function renderizaConvites(){
        return convites.map(element=>{
            return <div>
                {element.nome_lista}
            </div>
        })
    }

    const secao = () =>{
        return <section>
            Convites
                {renderizaConvites()}
                <Button
                    onClick={()=>{console.log(convites)}}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}>
                    Teste
                </Button>
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}