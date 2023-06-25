import React from "react";
import "./tarefas.css"
import {
    Container,Box,Typography,
    IconButton,Button,ButtonBase,
    List,ListItem,ListItemText,
    TextField,Pagination,Modal,Fade, FormControl, InputLabel, Input, InputAdornment, ListItemButton, FormHelperText
} from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";

import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import MenuPage from "../Menu/menupage";
import { limit } from "../utils";
import { Convidar, ProcuraUsuarios } from "../Consultas";

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
    const [seeNovaTarefa, setSeeNovaTarefa] = React.useState(false);
    const [seeNovoConvite, setSeeNovoConvite] = React.useState(false);
    const [value, setValue] = React.useState(true);

    const [Tar, setTar] = React.useState(true);
    const [Tarefass,setTarefass] = React.useState({
        "lista": "Lista 1",
        "tarefa": [
            {
                "titulo": "Tarefa 1",
                "dataCadastro": "07/05/2003",
                "dataVencimento": "01/06/2023",
                "descricao": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
                "concluida": true,
                "id": 1,
                "usuarioId" : 1
            },
            {
                "titulo": "Tarefa 2",
                "dataCadastro": "15/06/2023",
                "dataVencimento": "30/09/2023",
                "descricao": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
                "concluida": true,
                "id": 2,
                "usuarioId" : 2
            },
        ],
        "usuarios": [
            {
                "usuario": "Convidado 1",
                "id": 1
            },
            {
                "usuario": "Convidado 2 ",
                "id": 2
            },
        ]
    });
    const [convidados,setConvidados] = React.useState([])
    const [usuAConvidar,setUsuAConvidar] = React.useState()

    function renderTarefas() {
        return Tarefass.tarefa.map(tarefa => {
            return <ListItem key={'tarefa' + tarefa.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ButtonBase onClick={() => setOpen(tarefa)}><ListItemText className="tarefa">{tarefa.titulo}</ListItemText></ButtonBase>

            </ListItem>
        }
        )
    }

    function renderUsu() {
        return Tarefass.usuarios.map(tarefa => {
            return <ListItem key={'usuario' + tarefa.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }>
                <ListItemText>{tarefa.usuario}</ListItemText>
            </ListItem>
        })
    }

    function renderConvidados(){
        return convidados.map(convidado => {
            return <ListItem key={'convidado' + convidado.id}>
                <ListItemButton selected={usuAConvidar === convidado.id} onClick={e=>{setUsuAConvidar(convidado.id)}}>
                    <ListItemText id={"convidadotext"+convidado.id}>{convidado.nome}</ListItemText>
                </ListItemButton>
            </ListItem>
        })
    }

    const secao = () => {

        return <Container>

            <Box variant="3" display="flex">
                <Box edge="end" align="center" className="TEKOtarefa" sx={{ flexGrow: 1 }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Tarefass.lista}
                </Box>
                
                <IconButton onClick={()=>{setSeeNovoConvite(true)}}>
                    <PersonAddAlt1Icon sx={{ color: "#94d0f8" }} />
                </IconButton>

                <IconButton edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                    <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
            </Box>

            <Box align="center" display="flex">
                <Button onClick={() => { setTar(true) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Tarefas</Typography>
                </Button>
                <Typography display="inline" sx={{ flexGrow: 1 }}>|</Typography>
                <Button onClick={() => { setTar(false) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Convidados</Typography>
                </Button>
            </Box>

            <List>
                {Tar ?
                    <div>
                        {renderTarefas()}
                        <Box textAlign={"center"}>
                            <Button variant="contained" color="success" align="center" onClick={() => {setSeeNovaTarefa(true);}}>
                                Nova Tarefa
                            </Button>
                        </Box>
                    </div>
                    :
                    renderUsu()
                }
            </List>

            <Pagination count={10} className="pagination" />

        </Container>
    }

    return (
        <div>
            <MenuPage secao={secao} />

            {/* MODAL TAREFA X */}
            <Modal open={Boolean(open)}  onClose={() => setOpen(false)}>
                <Fade in={Boolean(open)}>
                    <Box sx={style} className="modal">
                        <Typography variant="h6" component="h2">
                            {open.titulo}
                        </Typography>
                        <Typography className="deOndeVem">
                            na {Tarefass.lista}
                        </Typography>
                        <br/>
                        <Box display="flex">
                            <Box sx={{ flexGrow: 1 }} display="flex">
                                <CalendarMonthOutlinedIcon />
                                <Typography sx={{ pl: 1 }}>
                                    {open.dataCadastro}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 3 }} display="flex">
                                <IconButton sx={{padding: 0}}>
                                    <EventAvailableOutlined />
                                </IconButton>
                                <Typography sx={{ pl: 1 }}>
                                    {open.dataVencimento}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 8 }} display="flex">
                                <Typography sx={{ pr: 1 }}>
                                    Concluída
                                </Typography>

                                <IconButton onClick={() => setOpen({ ...open, concluida: !open.concluida })} sx={{ padding: 0 }}>
                                    {open.concluida ? <CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} /> : <CloseOutlinedIcon sx={{ color: "red" }} />}
                                </IconButton>
                            </Box>
                        </Box>
                            <TextField  sx={{ mt: 2 }}
                                label="Descrição"
                                multiline minRows={3} maxRows={10}
                                variant="standard" fullWidth
                                value={open.descricao}/>
                        <br/>
                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpen(false)}>Salvar</Button>
                    </Box>
                </Fade>

            </Modal>

            {/* MODAL NOVA TAREFA */}
            <Modal open={seeNovaTarefa} onClose={() => setSeeNovaTarefa(false)}>
                <Fade in={seeNovaTarefa}>
                    <Box component="form" sx={style} className="modal">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nova Tarefa
                        </Typography>
                        <br />
                        <TextField
                            id="nome_nova_tarefa" label="Nome Tarefa" name="nome_nova_tarefa"
                            variant="outlined" required
                            onChange={e => { limit(e, 100); setValue(e.target.value) }}
                            error={!value}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DatePicker label="Início Tarefa" />
                                <DatePicker label="Fim Tarefa" />
                            </DemoContainer>
                        </LocalizationProvider>
                        
                        <TextField sx={{ mt: 2 }}
                            id="desc_nova_tarefa" label="Descrição"
                            multiline minRows={3} maxRows={10}
                            variant="standard" fullWidth
                            value={open.descricao}
                        />
                        
                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => setSeeNovaTarefa(false)}>Salvar</Button>
                    </Box>
                </Fade>
            </Modal>

            {/* MODAL CONVITE*/}
            <Modal open={seeNovoConvite} onClose={() => setSeeNovoConvite(false)}>
                <Fade in={seeNovoConvite}>
                    <Box component="form" sx={style} className="modal">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
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
            <Button onClick={e=>{sessionStorage.setItem('listaId',1)}}>TESTE</Button>
        </div>
    )
}