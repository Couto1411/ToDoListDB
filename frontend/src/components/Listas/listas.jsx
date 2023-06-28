import React, { useEffect } from "react";
import "./listas.css"
import MenuPage from "../Menu/menupage";
import { Box, Grid, Button, Typography, List, Container, IconButton, Modal, Fade, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { CriaLista, EditaLista, GetListas } from "../Consultas";
import { limit } from "../utils";

const style = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    p: 4,
};

// Listas criadas e Listas compartilhadas comigo, referência "init" no Figma
export default function Listas(props) {
    const [lista, setLista] = React.useState([]);
    const [listaCompartilhada, setListaCompartilhada] = React.useState([]);
    const [novaLista, setNovaLista] = React.useState(true);
    const [editLista, setEditLista] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [toggle, setToggle] = React.useState(true);
    // const [pagination, setPagination] = React.useState(0);

    useEffect(() => {
        GetListas(props,setLista, setListaCompartilhada);
    },[]);

    function handleNewLista() {
        if (novaLista !== null && novaLista !== '' && novaLista !== true) {
            if(CriaLista(props, {nome: novaLista})) {
                GetListas(props, setLista, setListaCompartilhada)
                setOpen(false)
            }
            setNovaLista(true)
        }
    }
    
    function handleEditLista() {
        if (editLista !== null && editLista !== '' && editLista !== true) {
            if(EditaLista(props, {nome: editLista, listaId: openEdit} )) {                
                GetListas(props, setLista, setListaCompartilhada)
                setOpenEdit(false)
            }
            setEditLista(true)
        }
    }
 
    function renderizaMinhasListas() {
        return lista.map((value) => {
            const addLeadingZero = (number) => {
                return number < 10 ? `0${number}` : number;
            };
            const datetimeMod = new Date(value.data_hora_mod);
            const hours = addLeadingZero(datetimeMod.getHours());
            const minutes = addLeadingZero(datetimeMod.getMinutes());
            const day = addLeadingZero(datetimeMod.getDate());
            const month = addLeadingZero(datetimeMod.getMonth() + 1); // O mês começa em zero, então é necessário adicionar 1
            const year = datetimeMod.getFullYear();
            const formattedDatetime = `${hours}:${minutes} em ${day}/${month}/${year}`;
            const labelId = `checkbox-list-label-${value}`;
            return (
                <ListItem key = { "lista" + value.lista_id }>
                    <ListItemButton role={undefined} onClick={ () => { props.navigate('/tarefas'); sessionStorage.setItem('listaId', value.lista_id) } } dense >
                        <ListItemText id={labelId} primary={`${value.nome}`} secondary= { "Última modificação às " + formattedDatetime + ", feita por " + value.modificador}/>
                    </ListItemButton>
                    <IconButton onClick={()=>{ { setOpenEdit(value.lista_id) } }} edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                        <EditIcon sx={{ color: "white" }} />
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
                            <IconButton onClick={ ()=> setOpenEdit(value.lista_id) } edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                                <EditIcon sx={{ color: "white" }} />
                            </IconButton>
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
                <Button variant="outlined"  align="center" onClick={ () => setOpen(true) }>
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
        <div>
            <MenuPage secao={secao}/>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Fade in={open}>
                    <Grid maxWidth="lg" sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            Nova Lista
                        </Typography>
                        <br/>
                        <TextField
                            error = {!novaLista}
                            id="nome_nova_list" label="Nome Lista" name="nome_nova_lista"
                            variant="outlined" required
                            onChange={ e => { limit(e, 100); setNovaLista(e.target.value) } }/>
                        <Grid container sx={{mt:2}} spacing={1}>
                        </Grid>
                        <Button sx={{ mt: 2 }} variant="contained" onClick={ e => { handleNewLista() } }>Salvar</Button>
                    </Grid>
                </Fade>
            </Modal>

            <Modal open={Boolean(openEdit)} onClose={() => setOpenEdit(false)}>
                <Fade in={Boolean(openEdit)}>
                    <Grid maxWidth="lg" sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            Editar Lista
                        </Typography>
                        <br/>
                        <TextField
                            error = {!editLista}
                            id="nome_edit_list" label="Nome Lista" name="nome_edit_lista"
                            variant="outlined" required
                            onChange={ e => { limit(e, 100); setEditLista(e.target.value) } }/>
                        <Grid container sx={{mt:2}} spacing={1}>
                        </Grid>
                        <Button sx={{ mt: 2 }} variant="contained" onClick={ e => { handleEditLista() } }>Salvar</Button>
                    </Grid>
                </Fade>
            </Modal>
            
        </div>
    )
}
