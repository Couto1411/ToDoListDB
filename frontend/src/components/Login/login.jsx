import React, { useState } from "react";
import "./login.css"

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Fade from "@mui/material/Fade";

import PersonIcon from '@mui/icons-material/Person';
import InputMask from "react-input-mask";

import { limit } from "../utils";
import { Login, SignUp } from "../Consultas";

export default function LoginComponent(props) {
    const [open, setOpen] = React.useState(false);
    // Estados de login
    const [emailLogin, setEmailLogin] = useState(true);
    const [senhaLogin, setSenhaLogin] = useState(true);
    // Estados de cadastro
    const [emailCad, setEmailCad] = useState(true);
    const [senhaCad, setSenhaCad] = useState(true);
    const [nome, setNome] = useState(true);
    const [nomeUsu, setNomeUsu] = useState(true);
    const [confSenha, setConfSenha] = useState(true);

    function handleLogin(event) {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        if (data.get('email_login')) {
            if (data.get('senha_login')) {
                Login(props,{
                    email:data.get('email_login'),
                    senha: data.get('senha_login')
                },setEmailLogin,setSenhaLogin)
            }else setSenhaLogin(false);
        }else setEmailLogin(false);
    };

    function handleCad(event) {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        if (data.get('nome_cadastro')) {
            if (data.get('user_name')) {
                if (data.get('email_cadastro')) {
                    if (data.get('senha_cadastro')) {
                        if (data.get('confirma_senha_cadastro')) {
                            if (data.get('senha_cadastro')===data.get('confirma_senha_cadastro')) {
                                SignUp(props,{
                                    nome_usuario: data.get('user_name'),
                                    nome: data.get('nome_cadastro'),
                                    senha: data.get('senha_cadastro'),
                                    telefone1: data.get('Telefone_1').replace(/\D+/g, ''),
                                    telefone2: data.get('Telefone_2').replace(/\D+/g, ''),
                                    email: data.get('email_cadastro')
                                })
                            }
                            else setConfSenha(false)
                        } else setConfSenha(false)
                    } else setSenhaCad(false)
                } else setEmailCad(false)
            } else setNomeUsu(false)
        } else setNome(false)
        
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
        <Container component="main" maxWidth="xs" sx={{display:'flex',justifyContent:'center'}}>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    p: 5,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: "black",
                    color: 'white',
                    borderRadius: 2.3,
                }}>
                <Avatar sx={{ p:0, m: 1, bgcolor: 'main' }}>
                    <PersonIcon fontSize="large"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={!emailLogin}
                        onChange={e=>{limit(e,100);setEmailLogin(e.target.value)}} required
                        margin="normal" fullWidth
                        id="email_login" label="Email" name="email_login"
                        autoFocus/>
                    <TextField
                        error={!senhaLogin}
                        onChange={e=>{limit(e,100);setSenhaLogin(e.target.value)}} required
                        margin="normal" fullWidth
                        id="senha_login" name="senha_login" label="Senha"
                        type="password"/>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => setOpen(true)}>
                                {"Cadastrar"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Modal
                className="modalcadastro"
                open={open}
                onClose={() => setOpen(false)}>
                <Fade in={open}>
                    <Container maxWidth="md" sx={{
                        marginTop: 8, p: 5, borderRadius: 2.3,
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        color: "white", bgcolor: "black",}}>
                        <Avatar sx={{ p:0, m: 1, bgcolor: 'main' }}>
                            <PersonIcon fontSize="large"/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Cadastrar
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleCad} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!nome}
                                        onChange={e=>{limit(e,100);setNome(e.target.value)}}
                                        required fullWidth
                                        id="nome_cadastro" name="nome_cadastro" label="Nome"
                                        autoFocus/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!nomeUsu}
                                        onChange={e=>{limit(e,100);setNomeUsu(e.target.value)}}
                                        required fullWidth
                                        id="user_name" name="user_name" label="Nome usuário"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        onChange={e=>{
                                            if(e.target.value.replace(/\D+/g, '').length > 11) {
                                            e.target.value = e.target.value.substring(0, 11);
                                        }}} 
                                        mask="(99) 99999-9999"
                                        disabled={false}>
                                        <TextField label={"Telefone 1"} fullWidth
                                        id="Telefone_1" name="Telefone_1"/>
                                    </InputMask>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <InputMask
                                        onChange={e=>{
                                            if(e.target.value.replace(/\D+/g, '').length > 11) {
                                            e.target.value = e.target.value.substring(0, 11);
                                        }}} 
                                        mask="(99) 99999-9999"
                                        disabled={false}>
                                        <TextField label={"Telefone 2"} fullWidth
                                        id="Telefone_2" name="Telefone_2"/>
                                    </InputMask>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!emailCad}
                                        onChange={e=>{limit(e,100);setEmailCad(e.target.value)}}
                                        required fullWidth
                                        id="email_cadastro" name="email_cadastro" label="Email"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!senhaCad}
                                        onChange={e=>{limit(e,100);setSenhaCad(e.target.value)}}
                                        required fullWidth
                                        id="senha_cadastro" name="senha_cadastro" label="Senha"
                                        type="password"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        error={!confSenha}
                                        onChange={e=>{limit(e,100);setConfSenha(e.target.value)}}
                                        required  fullWidth
                                        id="confirma_senha_cadastro" name="confirma_senha_cadastro" label="Confirmar senha"
                                        type="password"/>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Cadastrar
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => setOpen(false)}>
                                        Login
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Container>
                </Fade>
            </Modal>
        </Container>
        
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', color: 'white', bgcolor: '#121212'}}>
            <Container maxWidth="sm">
                <Typography variant="body1">
                    Interface de lista de tarefas de Banco de Dados I.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {'Produzido por: '}
                    <Link target="_blank" color="inherit" href="https://github.com/Couto1411"> Gabriel Couto</Link>{', '}
                    <Link target="_blank" color="inherit" href="https://github.com/LucasG4K"> Lucas de Souza</Link>{', '}
                    <Link target="_blank" color="inherit" href="https://github.com/mkssantos"> Marcus Vinícius</Link>{', '}
                    <Link target="_blank" color="inherit" href="https://github.com/pablossousa"> Pablo Silva</Link>{', 2023.'}
                </Typography>
            </Container>
        </Box>
        </Box>
    );
}