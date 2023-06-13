import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


export default function Tarefas() {

    const [dense] = React.useState(false);

    const [Tar, setTar] = React.useState(true);

    const Tarefass = {
        "nome": "Lista 1",
        "tarefa": [
            {
                "titulo": "Tarefa 1"
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
                <ListItemText>{tarefa.titulo}</ListItemText>
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
        return <Box variant="3" align>
            <Box edge="end" align="center" className="TEKOtarefa">
                {Tarefass.nome}
            </Box>
            <IconButton edge="end" aria-label="delete">
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

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}