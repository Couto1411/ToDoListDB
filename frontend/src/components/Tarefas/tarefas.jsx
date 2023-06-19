import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
//import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
//import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';
//import Container from '@mui/material/Container';
//import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function Tarefas() {

    const [open, setOpen] = React.useState(false);
    function handleOpen (temp) {setOpen(temp)};
    const handleClose = () => setOpen(false);

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
                "titulo": "Tarefa 2"
            },
        ],
        "usuarios": [
            {
                "usuario": "Usuário Compartilhado 1"
            },
            {
                "usuario": "Usuário Compartilhado 2 "
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
                <ButtonBase onClick={()=>handleOpen(tarefa)}><ListItemText className="tarefa">{tarefa.titulo}</ListItemText></ButtonBase>
                
            </ListItem>
        })
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

                <Button onClick={() => { setTar(false) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Usuários</Typography>
                </Button>

            </Box>
            {Tar &&
                <Grid>
                    <List dense={dense}>
                        {renderTarefas()}
                    </List>
                </Grid>
            }

            {!Tar && renderUsu()}

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
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {open.titulo}
                        </Typography>
                        <Typography className="deOndeVem">
                            na {Tarefass.lista}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Fade>
            </Modal>

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}