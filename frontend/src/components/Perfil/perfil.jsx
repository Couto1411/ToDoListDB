import React from "react";
import "./perfil.css"
import MenuPage from "../Menu/menupage";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = {
    "nome": "Usuário 1"
}

export default function Perfil() {
    const secao = () => {
        return <section>
            <Grid container>
                <Grid item xs={12} md={4}
                    sx={{
                        display: 'flex',
                        p: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    style={{ width: 150 }}
                    />
                    <h5>John Smith</h5>
                    <p>Full Stack Developer</p>
                    <p>Bay Area, San Francisco, CA</p>
                    <div>
                    <button type="button">
                        Follow
                    </button>
                    <button type="button">
                        Message
                    </button>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}
                    sx={{
                        display: 'flex',
                        p: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>

                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth
                                    id="nome_cadastro" name="nome_cadastro" label="Nome"
                                    autoFocus/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth
                                    id="user_name" name="user_name" label="Nome usuário"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="Telefone_1" name="Telefone_1" label="Telefone 1"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="Telefone_2" name="Telefone_2" label="Telefone 2"/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required fullWidth
                                    id="email_cadastro" name="email_cadastro" label="Email"/>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2 }}
            >
                Salvar Dados
            </Button>


        </section>
    }

    return (
        <MenuPage secao={secao} tamanho="lg" />
    )
}