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
                    <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 200, height: 200}}>
                        <AccountCircleIcon sx={{ fontSize: 200 }} />
                    </Avatar>
                    <h5>Marcus</h5>
                    <p>marcus@cefet.com</p>
                    <p>CEFET-MG Campus V</p>
                </Grid>
                <Grid item xs={12} md={8}
                    sx={{
                        display: 'flex',
                        p: 5,
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    

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
            <Grid container justifyContent="end">
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{mb: 2, width: "63%" }}
                >
                    Salvar Dados
                </Button>
            </Grid>


        </section>
    }

    return (
        <MenuPage secao={secao} tamanho="lg" />
    )
}