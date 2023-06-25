import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { limit } from "../utils";
import { Container, Icon } from "@mui/material";

const style = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Tarefas() {

    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    function handleOpen(temp) { setOpen(temp) };
    const handleOpen2 = () => { setOpen2(true); };
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(true);
    const [Tarefass] = React.useState({
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

    const [dense] = React.useState(false);

    const [Tar, setTar] = React.useState(true);

    function renderTarefas() {
        return Tarefass.tarefa.map(tarefa => {
            return <ListItem key={'tarefa' + tarefa.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
            >
                <ButtonBase onClick={() => handleOpen(tarefa)}><ListItemText className="tarefa">{tarefa.titulo}</ListItemText></ButtonBase>

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
                }
            >
                <ListItemText>{tarefa.usuario}</ListItemText>
            </ListItem>
        })
    }

    function titulo() {
        return <Box variant="3" display="flex">
            <Box edge="end" align="center" className="TEKOtarefa" sx={{ flexGrow: 1 }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{Tarefass.lista}
            </Box>

            <IconButton>
                <PersonAddAlt1Icon sx={{ color: "#94d0f8" }} />
            </IconButton>

            <IconButton edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
        </Box>

    }

    const secao = () => {

        return <Container>

            {titulo()}

            <Box align="center" display="flex">
                <Button onClick={() => { setTar(true) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Tarefas</Typography>
                </Button>
                <Typography display="inline" sx={{ flexGrow: 1 }}>|</Typography>
                <Button onClick={() => { setTar(false) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Convidados</Typography>
                </Button>

            </Box>
            <Grid>
                <List dense={dense}>

                    {Tar ?

                        <div>
                            {renderTarefas()}
                            <Box textAlign={"center"}>
                                <Button variant="contained" color="success" align="center" onClick={handleOpen2}>
                                    Nova Tarefa
                                </Button>
                            </Box>
                        </div>
                        :
                        renderUsu()
                    }
                </List>
            </Grid>


            <Pagination count={10} className="pagination" />

        </Container>
    }

    return (
        <div>
            <MenuPage secao={secao} />
            {/* MODAL TAREFA X */}

            <Modal
                open={Boolean(open)}
                onClose={handleClose}
            >
                <Fade in={Boolean(open)}>
                    <Box sx={style} className="modal">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {open.titulo}
                        </Typography>
                        <Typography className="deOndeVem">
                            na {Tarefass.lista}
                        </Typography>
                        <br />
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
                                id="standard-multiline-flexible"
                                label="Descrição"
                                multiline
                                maxRows={10}
                                variant="standard"
                                fullWidth
                                value={open.descricao}
                                minRows={3}
                            />
                        <br />
                        <Button sx={{ mt: 2 }} variant="contained" onClick={handleClose}>Salvar</Button>
                    </Box>
                </Fade>

            </Modal>

            {/* MODAL NOVA TAREFA */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={() => setOpen2(false)}
            >
                <Fade in={open2}>
                    <Box component="form" sx={style} className="modal">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nova Tarefa
                        </Typography>
                        <br />
                        <Box>
                            <TextField
                                id="nome_tarefa" label="Nome Tarefa" name="nome_tarefa"
                                variant="outlined"
                                required
                                onChange={e => { limit(e, 100); setValue(e.target.value) }}
                                error={!value}
                            />
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateField', 'DateField']}>
                                <DatePicker label="Início Tarefa" />
                                <DatePicker label="Fim Tarefa" />
                            </DemoContainer>
                        </LocalizationProvider>
                        
                            <TextField sx={{ mt: 2 }}
                                id="standard-multiline-flexible"
                                label="Descrição"
                                multiline
                                maxRows={10}
                                variant="standard"
                                fullWidth
                                value={open.descricao}
                                minRows={3}
                            />
                        
                        <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpen2(false)}>Salvar</Button>
                    </Box>
                </Fade>

            </Modal>
        </div>
    )
}