import React from "react";
import "./tarefas.css"
import MenuPage from "../Menu/menupage";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Container } from "@mui/material";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Tarefas() {

    const [Tar, setTar] = React.useState(false);

    const Tarefass = {
        "nome": "Lista 1",
        "tarefa": [
            {
                "titulo": "TÍTULO 1",
                "descricao": "werwe"
            },
            {
                "titulo": "TÍTULO 2",
                "descricao": "wfsdfsd"
            },
        ]
    }

    const Usuarioss = {
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
        return <div>
            <div>Tarefas</div>
            {Tarefass.tarefa.map(tarefa => {
                return <div>
                    {tarefa.titulo}<br />
                    {tarefa.descricao}<br />
                </div>
            })}
        </div>
    }

    function renderUsu() {
        return <div>
            <div>Usuários</div>
            {Usuarioss.usuarios.map(tarefa => {
                return <div>
                    {tarefa.usuario}<br />
                </div>
            })}
        </div>
    }

    const secao = () => {
        return <section>

            <Box align="center" display="flex">
                <Button onClick={() => { setTar(true) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Tarefas</Typography>
                </Button>

                {Tar &&
                    renderTarefas()
                }

                <Button onClick={() => { setTar(false) }} sx={{ flexGrow: 1 }}>
                    <Typography display="inline">Usuários</Typography>
                </Button>

                {!Tar &&
                    renderUsu()
                }

            </Box>

            {/* {Tarefas.tarefa} */}

        </section>
    }

    return (
        <MenuPage secao={secao} />
    )
}