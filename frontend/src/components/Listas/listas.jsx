import React, { useEffect } from "react";
import "./listas.css"
import MenuPage from "../Menu/menupage";
import { Box, Grid } from "@mui/material";

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { GetListas } from "../Consultas";

// Listas criadas e Listas compartilhadas comigo, referência "init" no Figma
export default function Listas(props) {

    

    useEffect(() => {
        GetListas(props,setLista);
    },[]);

    const navigate = useNavigate();
    const navigateClick = () => navigate('/tarefas');

    const [lista, setLista] = React.useState([]);

    function renderizaListas() {
        return lista.map((value) => {
            const addLeadingZero = (number) => {
                return number < 10 ? `0${number}` : number;
            };
            const datetimeMod = new Date(value.data_hora_mod);
            const hours = addLeadingZero(datetimeMod.getUTCHours());
            const minutes = addLeadingZero(datetimeMod.getUTCMinutes());
            const day = addLeadingZero(datetimeMod.getUTCDate());
            const month = addLeadingZero(datetimeMod.getUTCMonth() + 1); // O mês começa em zero, então é necessário adicionar 1
            const year = datetimeMod.getUTCFullYear();
            const formattedDatetime = `${hours}:${minutes} em ${day}/${month}/${year}`;
            const labelId = `checkbox-list-label-${value}`;
            return (
                <ListItem key = {"lista" + value.lista_id}>
                    <Grid container >
                    <Grid item xs={12} sm={10} sx={{display:"flex",alignItems:"center"}} >
                        <ListItemButton role={undefined} onClick={ navigateClick } dense >
                            <ListItemText id={labelId} primary={`${value.nome}`} secondary= {"Última modificação às " + formattedDatetime + ", por " + value.modificador}/>
                        </ListItemButton>
                    </Grid>
                    <Grid item xs={12} sm={2} container direction="row" justifyContent="flex-end" alignItems="center">
                        <Box sx={{mr:1}} className="TEKONORMAL">
                            CRIADA POR: {value.criador}
                        </Box>
                    </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }


    const secao = () => {
        return <section>
            <Box align="center" className="TEKOTITLE" sx={{ flexGrow: 1 }}>
                Listas
            </Box>
            <Box align="center" >
                {renderizaListas()}
            </Box>
        </section>
    }

    return(
        <MenuPage secao={secao}/>
    )
}