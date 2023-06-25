import React, { useEffect } from "react";
import "./tarefas.css"
import {
    Container,Box,Typography,
    IconButton,Button,ButtonBase,
    List,ListItem,ListItemText,
    TextField,Pagination,Modal,Fade, FormControl, InputLabel, Input, InputAdornment, ListItemButton, FormHelperText, Divider, Grid
} from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import MenuPage from "../Menu/menupage";
import { limit } from "../utils";
import { Convidar, CriaTarefa, DeletaLista, DeletaTarefa, Desconvidar, EditaTarefa, GetTarefas, ProcuraUsuarios } from "../Consultas";
import dayjs from "dayjs";

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

export default function Tarefas(props) {

    const [open, setOpen] = React.useState(false);
    const [NovaTarefa, setNovaTarefa] = React.useState(false);
    const [seeNovoConvite, setSeeNovoConvite] = React.useState(false);
    const [deleta, setDeleta] = React.useState(false);
    const [pagination, setPagination] = React.useState(0);
    const [convidados,setConvidados] = React.useState([])
    const [usuAConvidar,setUsuAConvidar] = React.useState()

    const [Tar, setTar] = React.useState(true);
    const [dados,setDados] = React.useState({lista:{},tarefas:[],usuarios:[]});

    useEffect(() => {
        GetTarefas(props,setDados);
    },[]);

    function renderTarefas() {
        let count=0;
        return dados.tarefas.slice(pagination*10,(pagination*10)+10).map(tarefa => {
            count++;
            return <div key={'tarefa' + tarefa.tarefa_id}>{count>1?<Divider component="li" />:<></>}<ListItem
                secondaryAction={
                    <IconButton onClick={()=>{handleDeletaTarefa(tarefa.tarefa_id)}} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                <ButtonBase onClick={() => setOpen(tarefa)}><ListItemText className="tarefa">{tarefa.titulo}</ListItemText></ButtonBase>
                
            </ListItem></div>
        }
        )
    }

    function renderUsu() {
        let count=0;
        return dados.usuarios.slice(pagination*10,(pagination*10)+10).map(usuario => {
            count++;
            return <div key={'usuario' + usuario.id}>{count>1?<Divider component="li" />:<></>}<ListItem 
                secondaryAction={
                    dados.lista?.admin && <IconButton onClick={e=>{handleDeletaConvidado(usuario.id)}} edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                <ListItemText>{usuario.usuario}</ListItemText>
            </ListItem></div>
        })
    }

    function renderConvidados(){
        return convidados.map(convidado => {
            return <ListItem key={'convidado' + convidado.id}>
                <ListItemButton selected={usuAConvidar === convidado.id} onClick={e=>{setUsuAConvidar(convidado.id)}}>
                    <Typography id={"convidadotext"+convidado.id}>{convidado.nome}</Typography>
                </ListItemButton>
            </ListItem>
        })
    }

    function handleNewTarefa(){
        if (dayjs(NovaTarefa.data_inicio,"YYYY-MM-DD")<=dayjs(NovaTarefa.data_vencimento,"YYYY-MM-DD")) {
            if(CriaTarefa(props,NovaTarefa)){
                GetTarefas(props,setDados)
                setNovaTarefa(false)
            }
        }
    }

    function handleEditTarefa(){
        if (dayjs(open.data_cadastro,"YYYY-MM-DD")<=dayjs(open.data_vencimento,"YYYY-MM-DD")) {
            if(EditaTarefa(props,open)){
                setDados({...dados, tarefas:dados.tarefas.map(el => (el.tarefa_id === open.tarefa_id ? {...open} : el))})
                setOpen(false)
            }
        }
    }

    function handleDeletaTarefa(id){
        if(DeletaTarefa(props,id)){
            setDados({...dados, tarefas:dados.tarefas.filter(el => el.tarefa_id !== id)})
        }
    }

    function handleDeletaConvidado(id){
        if(Desconvidar(props,id)){
            setDados({...dados, usuarios:dados.usuarios.filter(el => el.id !== id)})
        }
    }

    const secao = () => {
        return <Container>
            <Box variant="3" display="flex">
                <Box edge="end" align="center" className="TEKOtarefa" sx={dados.lista?.admin?{ flexGrow: 1, pl:4 }:{ flexGrow: 1,pr:4}}>
                    {dados.lista.nome}
                </Box>
                {dados.lista?.admin && <div>
                    <IconButton onClick={()=>{setSeeNovoConvite(true)}}>
                        <PersonAddAlt1Icon sx={{ color: "#94d0f8" }} />
                    </IconButton>

                    <IconButton onClick={()=>{setDeleta(true)}} edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                        <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                </div>}
            </Box>

            <Box align="center" display="flex">
                <Button variant="text" onClick={() => { setTar(true);setPagination(0) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Tarefas</Typography>
                </Button>
                <Typography color="primary" display="inline" sx={{ flexGrow: 1 }}>|</Typography>
                <Button variant="text" onClick={() => { setTar(false);setPagination(0) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Convidados</Typography>
                </Button>
            </Box>

            <List>
                {Tar ? renderTarefas() : renderUsu() }
            </List>
            { Tar && <Box sx={{m:2}} textAlign={"start"}>
                <Button variant="outlined"  align="center" onClick={() => {setNovaTarefa({data_inicio: dayjs().format("YYYY-MM-DD")})}}>
                    Nova Tarefa
                </Button>
            </Box>}
            
            {Tar?
            <Pagination 
                hideNextButton hidePrevButton page={pagination+1} count={Math.ceil(dados.tarefas.length/10)} 
                onChange={e=>{setPagination(e.target.textContent-1)}} className="pagination" />:
            <Pagination 
                hideNextButton hidePrevButton page={pagination+1} count={Math.ceil(dados.usuarios.length/10)} 
                onChange={e=>{setPagination(e.target.textContent-1)}}  className="pagination" />}

        </Container>
    }

    return (
        <div>
            <MenuPage secao={secao} />

            {/* MODAL TAREFA X */}
            <Modal open={Boolean(open)}  onClose={() => setOpen(false)}>
                <Fade in={Boolean(open)}>
                    <Box onSubmit={() => handleEditTarefa()} component="form" target="votar"  sx={style} className="modal">
                        <TextField 
                            onChange={e=>{limit(e,30);setOpen({...open,titulo:e.target.value})}}
                            value={open.titulo} variant="standard" fullWidth required
                            InputProps={{ disableUnderline: true,style: {fontSize: 30} }}/>
                        <Typography className="deOndeVem">
                            na {dados.lista.nome}
                        </Typography>
                        <br/>
                        <Box display="flex">
                            <Grid container spacing={1}>
                            <Grid item sm={12} md={8}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={6}>
                                        <DatePicker format="DD/MM/YYYY" error label="Início Tarefa" 
                                            defaultValue={dayjs(open.data_cadastro)}
                                            onChange={e => {setOpen({...open,data_cadastro:e.format("YYYY-MM-DD")})}}
                                            slotProps={{textField: {required: true, variant: 'standard'}}}/></Grid>
                                        <Grid item xs={12} sm={6}>
                                        <DatePicker format="DD/MM/YYYY"  label="Fim Tarefa"
                                            defaultValue={dayjs(open.data_vencimento)}
                                            minDate={dayjs(open.data_cadastro)}
                                            onChange={e => {setOpen({...open,data_vencimento:e.format("YYYY-MM-DD")})}}
                                            slotProps={{textField: {required: true, variant: 'standard'}}}/></Grid>
                                    </Grid>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item sm={12} md={4} sx={{display: 'flex', alignItems: 'end', justifyContent: 'center'}}>
                                <Typography sx={{ pr: 1 }}>
                                    Concluída
                                </Typography>
                                <IconButton onClick={() => setOpen({ ...open, concluida: !open.concluida })} sx={{ padding: 0 }}>
                                    {open.concluida ? <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} /> : <CloseOutlinedIcon sx={{ color: "red" }} />}
                                </IconButton>
                            </Grid>
                            </Grid>
                        </Box>
                            <TextField  sx={{ mt: 2 }}
                                onChange={e => {setOpen({ ...open, descricao: e.target.value })}}
                                label="Descrição"
                                multiline minRows={3} maxRows={10}
                                variant="standard" fullWidth required
                                value={open.descricao}/>
                        <br/>
                        <Button sx={{ mt: 2 }} variant="contained" type="submit">Salvar</Button>
                    </Box>
                </Fade>
            </Modal>

            {/* MODAL NOVA TAREFA */}
            <Modal open={Boolean(NovaTarefa)} onClose={() => setNovaTarefa(false)}>
                <Fade in={Boolean(NovaTarefa)}>
                    <Grid onSubmit={e => handleNewTarefa()} component="form" target="votar" maxWidth="lg" sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            Nova Tarefa
                        </Typography>
                        <br/>
                        <TextField
                            id="nome_nova_tarefa" label="Nome Tarefa" name="nome_nova_tarefa"
                            variant="outlined" required
                            onChange={e => { limit(e, 100); setNovaTarefa({...NovaTarefa,nome:e.target.value})}}/>
                        <Grid container sx={{mt:2}} spacing={1}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Grid item xs={12} sm={6}><DatePicker format="DD/MM/YYYY" error label="Início Tarefa"
                                defaultValue={dayjs()}
                                onChange={e => {setNovaTarefa({...NovaTarefa,data_inicio:e.format("YYYY-MM-DD")})}}
                                slotProps={{textField: {required: true}}}/></Grid>
                            <Grid item xs={12} sm={6}><DatePicker format="DD/MM/YYYY"  label="Fim Tarefa"
                                disabled={!(NovaTarefa.data_inicio!=='Invalid Date')}
                                minDate={dayjs(NovaTarefa.data_inicio,"YYYY-MM-DD")}
                                onChange={e => {setNovaTarefa({...NovaTarefa,data_vencimento:e.format("YYYY-MM-DD")})}}
                                slotProps={{textField: {required: true}}}/></Grid>
                        </LocalizationProvider>
                        </Grid>
                        <TextField sx={{ mt: 2 }}
                            required label="Descrição"
                            multiline minRows={3} maxRows={10}
                            variant="standard" fullWidth
                            onChange={e => { setNovaTarefa({...NovaTarefa,descricao:e.target.value})}}
                        />
                        <Button type="submit" sx={{ mt: 2 }} variant="contained">Salvar</Button>
                    </Grid>
                </Fade>
            </Modal>

            {/* MODAL CONVITE*/}
            <Modal open={seeNovoConvite} onClose={() => setSeeNovoConvite(false)}>
                <Fade in={seeNovoConvite}>
                    <Box component="form" sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            Quem deseja convidar pra lista?
                        </Typography>
                        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                            <InputLabel htmlFor="busca_usuario">Nome de usuário</InputLabel>
                            <Input id="busca_usuario"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton onClick={e=>{ProcuraUsuarios(props,document.getElementById('busca_usuario').value,setConvidados);setUsuAConvidar(false)}}><SearchIcon/></IconButton>
                                    </InputAdornment>
                                }/>
                            <FormHelperText id="helptext" sx={{display:'none'}} error={true}>Teste</FormHelperText>
                        </FormControl>
                        <List sx={{maxHeight:"100vh", overflow:'auto'}}>
                            {renderConvidados()}
                        </List>
                        <Button disabled={!Boolean(usuAConvidar)} sx={{ mt: 2 }} variant="contained" onClick={() => {Convidar(props,usuAConvidar,setConvidados,setSeeNovoConvite)}}>Enviar Convite</Button>
                    </Box>
                </Fade>
            </Modal>

            {/* MODAL DELETA LISTA*/}
            <Modal open={Boolean(deleta)} onClose={() => setDeleta(false)}>
                <Fade in={deleta}>
                    <Box component="form" sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            Tem certeza que quer deletar a lista?
                        </Typography>
                        <Button sx={{ mt: 2 }} color="error" variant="contained" onClick={() => {DeletaLista(props)}}>Deletar Lista</Button>
                    </Box>
                </Fade>
            </Modal>
            <iframe name="votar" style={{display:'none'}}></iframe>
        </div>
    )
}