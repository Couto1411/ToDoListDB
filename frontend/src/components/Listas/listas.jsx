import React, { useEffect } from "react";
import "./listas.css"
import MenuPage from "../Menu/menupage";
import { Box, Grid, Button, Typography, List, Container, IconButton, Modal, Fade } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { DeletaLista, GetListas } from "../Consultas";

// Listas criadas e Listas compartilhadas comigo, referência "init" no Figma
export default function Listas(props) {
    const [pagination, setPagination] = React.useState(0);
    const [lista, setLista] = React.useState([]);
    const [listaCompartilhada, setListaCompartilhada] = React.useState([]);
    const [toggle, setToggle] = React.useState(true);
    const [deleta, setDeleta] = React.useState(false);

    useEffect(() => {
        GetListas(props,setLista, setListaCompartilhada);
    },[]);

    // function handleEditTarefa(){
    //     if (dayjs(open.data_cadastro,"YYYY-MM-DD")<=dayjs(open.data_vencimento,"YYYY-MM-DD")) {
    //         if(EditaTarefa(props,open)){
    //             setDados({...dados, tarefas:dados.tarefas.map(el => (el.tarefa_id === open.tarefa_id ? {...open} : el))})
    //             setOpen(false)
    //         }
    //     }
    // }
 
    function renderizaMinhasListas() {
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
                <ListItem key = { "lista" + value.lista_id }>
                    <ListItemButton role={undefined} onClick={ () => { props.navigate('/tarefas'); sessionStorage.setItem('listaId', value.lista_id) } } dense >
                        <ListItemText id={labelId} primary={`${value.nome}`} secondary= { "Última modificação às " + formattedDatetime }/>
                    </ListItemButton>
                    <IconButton onClick={()=>{ {} }} edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                        <EditIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton onClick={()=>{setDeleta(true)}} edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                </ListItem>
            );
        })
    }

    function renderizaListasCompartilhadas() {
        return listaCompartilhada.map((value) => {
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
                        <ListItemButton role={undefined} onClick={ () => { props.navigate('/tarefas'); sessionStorage.setItem('listaId', value.lista_id) } } dense >
                            <ListItemText id={ labelId } primary={`${value.nome}`} secondary= {"Última modificação às " + formattedDatetime + ", feita por " + value.ultima_mod}/>
                        </ListItemButton>
                    </Grid>
                    <Grid item xs={12} sm={2} container direction="row" justifyContent="flex-end" alignItems="center">
                        <Box sx={{mr:1}} className="TEKONORMAL">
                            Proprietário: {value.criador}
                        </Box>
                    </Grid>
                    </Grid>
                </ListItem>
            );
        })
    }

    function header() {
        return <Box align="center" display="flex">
            <Button variant="text" onClick={() => { {setToggle(true)} }} sx={{ flexGrow: 4 }}>
                <Typography display="inline">Minhas listas</Typography>
            </Button>
            <Typography color="primary" display="inline" sx={{ flexGrow: 8 }}>|</Typography>
            <Button variant="text" onClick={() => { {setToggle(false)} }} sx={{ flexGrow: 2 }}>
                <Typography display="inline">Compartilhadas comigo</Typography>
            </Button>
        </Box>
    }

    function renderTela() {
        return <Container>
            <List>
            {toggle ? renderizaMinhasListas() : renderizaListasCompartilhadas() }
            </List>
            { toggle && <Box sx={{m:2}} textAlign={"start"}>
                <Button variant="outlined"  align="center" onClick={ {  } }>
                    Nova Lista
                </Button>
            </Box>}
        </Container>
    }

    const secao = <section>
        <Box align="center" className="TEKOTITLE" sx={{ flexGrow: 1 }}>
            Listas
            { header() }
        </Box>
        <Box align="center" >
            {renderTela()}
        </Box>
    </section>

    return(
        <MenuPage secao={secao}/>
    )
}