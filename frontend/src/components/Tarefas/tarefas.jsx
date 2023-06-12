import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Tarefas() {

    const [dense] = React.useState(false);

    const [Tar, setTar] = React.useState(false);

    const Tarefass = {
        "nome": "Lista 1",
        "tarefa": [
            {
                "titulo": "Título 1",
                "descricao": "werwe"
            },
            {
                "titulo": "Título 2",
                "descricao": "wfsdfsd"
            },
        ],
        "usuarios": [
            {
                "usuario": "Usuário 1"
            },
            {
                "usuario": "Usuário 2"
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

    const secao = () => {
        return <section>

            <Box align="center" display="flex">
                <Button onClick={() => { setTar(true) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Tarefas</Typography>
                </Button>


                <Button onClick={() => { setTar(false) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Usuários</Typography>
                </Button>

            </Box>
            {Tar &&
                <Grid item xs={12} md={6}>
                    {/* <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Avatar with text and icon
                    </Typography> */}

                    <List dense={dense}>
                        {renderTarefas()}
                    </List>
                </Grid>
            }

            {!Tar &&
                renderUsu()
            }

            {/* {Tarefas.tarefa} */}

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}