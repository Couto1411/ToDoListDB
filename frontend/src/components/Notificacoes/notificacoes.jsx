import React, {  useEffect, useState } from "react";
import "./notificacoes.css"
import MenuPage from "../Menu/menupage";
import { Box, Button, Grid, IconButton, Paper, Typography } from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import { AceitaConvite, GetConvites, RejeitaConvite } from "../Consultas";

export default function Notificacoes(props){
    const [convites,setConvites] = useState([])

    useEffect(() => {
        GetConvites(props,setConvites);
    },[]);

    function handleAceita(id){
        if(AceitaConvite(props,id)){
            setConvites(convites.map(el => (el.lista_id === id ? {...el, estado_convite:1} : el)))
        }
    }

    function handleRejeita(id){
        if(RejeitaConvite(props,id)){
            setConvites(convites.filter(el => el.lista_id !== id))
        }
    }

    function renderizaConvites(){
        return convites.map(element=>{
            return <Paper key={'lista'+element.lista_id} align="start" sx={{p:1,fontSize:"1.2em",bgcolor:'black', borderRadius: 2,mb:1}}>
                <Grid container>
                    <Grid item xs={12} sm={10} sx={{display:"flex",alignItems:"center"}}>
                        <AccountCircleIcon fontSize="large" sx={{mr:1}}/>
                        <Typography fontSize="1.1em">
                        "{element.nome_usuario}" te convidou para "{element.nome_lista}"
                        </Typography>
                    </Grid>
                    {element.estado_convite?
                        <Grid item xs={12} sm={2} container direction="row" justifyContent="flex-end" alignItems="center">
                            <Box sx={{mr:1}} className="TEKONORMAL" color="green">
                                ACEITO
                            </Box>
                        </Grid>:
                        <Grid item xs={12} sm={2} container direction="row" justifyContent="flex-end" alignItems="center">
                            <IconButton onClick={()=>handleAceita(element.lista_id)}>
                                <CheckIcon color="success"/>
                            </IconButton>
                            <IconButton onClick={()=>handleRejeita(element.lista_id)}>
                                <DoNotDisturbIcon color="error"/>
                            </IconButton>
                        </Grid>
                    }
                </Grid>
            </Paper>
        })
    }

    const secao = () =>{
        return <section>
                <Box align="center" className="TEKOTITLE" sx={{ flexGrow: 1 }}>
                    Convites
                </Box>
                <Box align="center" >
                    {renderizaConvites()}
                </Box>
            </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}