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
import Pagination from '@mui/material/Pagination';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

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
    const handleOpen2 = () => {setOpen2(true);};
    const handleClose = () => setOpen(false);
    const handleClose2 = () => setOpen2(false);

    const [dense] = React.useState(false);

    const [Tar, setTar] = React.useState(true);


    const Tarefass = {
        "lista": "Lista 1",
        "tarefa": [
            {
                "titulo": "Tarefa 1",
                "dataCadastro": "07/05/2003",
                "dataVencimento": "01/06/2023",
                "descricao": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
                "concluida": true
            },
            {
                "titulo": "Tarefa 2",
                "dataCadastro": "15/06/2023",
                "dataVencimento": "30/09/2023",
                "descricao": "Duis mollis, est non commodo luctus, nisi erat porttitor ligula.",
                "concluida": true
            },
        ],
        "usuarios": [
            {
                "usuario": "Convidado 1"
            },
            {
                "usuario": "Convidado 2 "
            },
        ]
    }



    function renderTarefas() {
        return Tarefass.tarefa.map(tarefa => {
            return <ListItem
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
            return <ListItem
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
        return <Box variant="3" align display="flex">
            <Box edge="end" align="center" className="TEKOtarefa" sx={{ flexGrow: 1 }}>
                {Tarefass.lista}
            </Box>
            <IconButton edge="end" aria-label="delete" sx={{ flexGrow: 0 }}>
                <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
        </Box>

    }

    const secao = () => {

        return <section>

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
                        renderTarefas()
                        :
                        renderUsu()
                    }
                </List>
            </Grid>

            <Box textAlign={"center"}>
                <Button variant="contained" color="success" align="center" onClick={handleOpen2}>
                    Nova Tarefa
                </Button>
            </Box>

            <Pagination count={10} className="pagination" />

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
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
                                <EventAvailableOutlined />
                                <Typography sx={{ pl: 1 }}>
                                    {open.dataVencimento}
                                </Typography>
                            </Box>
                            <Box sx={{ flexGrow: 8 }} display="flex">

                            </Box>
                        </Box>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                id="standard-multiline-flexible"
                                label="Descrição"
                                multiline
                                maxRows={10}
                                variant="standard"
                                fullWidth
                                value={open.descricao}
                                minRows={4}
                            />
                        </Typography>
                        <br />
                        <Button variant="contained" onClick={handleClose2}>Salvar</Button>
                    </Box>
                </Fade>

            </Modal>

                {/* MODAL NOVA TAREFA */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open2}
                onClose={handleClose2}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open2}>
                    <Box sx={style} className="modal">

                    </Box>
                </Fade>

            </Modal>

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}