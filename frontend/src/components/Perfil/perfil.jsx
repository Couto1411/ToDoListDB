import React, { useEffect, useState } from "react";
import "./perfil.css"
import MenuPage from "../Menu/menupage";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { EditInfoUser, GetInfoUser } from "../Consultas";
import { Typography } from "@mui/material";
import InputMask from "react-input-mask";

export default function Perfil(props) {
    const [user,setUser] = useState({});
    const [erroconfsenha,setErroconfsenha] = useState(false);

    useEffect(()=>{
        GetInfoUser(props,setUser)
    },[])

    function handleSave(){
        if((user?.senha && user.senha===user.confsenha) || !user.senha){
            setErroconfsenha(false)
            EditInfoUser(props,user,setUser)
        }
        else setErroconfsenha(true)
    }

    const secao = <Grid container spacing={2} component="section">
            <iframe title="temp" name="votar" style={{display:'none'}}></iframe>
            <Grid item xs={12} md={4} sx={{display: 'flex', pt: 5, flexDirection: 'column', alignItems: 'center'}}>
                <Avatar sx={{ m: 2, bgcolor: 'primary.main', width: 200, height: 200}}>
                    <AccountCircleIcon sx={{ fontSize: 200 }} />
                </Avatar>
                <Grid container>
                    <Grid item xs={6} sx={{display:'flex',justifyContent:"end"}}>
                        <Typography variant={"h5"}>{user?.nome}</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{pl:1,display:'flex',alignItems:"end", color:'grey'}}>
                        <Typography>#{user?.nome_usuario}</Typography>
                    </Grid>
                </Grid>
                <p>{user?.email}</p>
            </Grid>
            <Grid item xs={12} md={8} sx={{display: 'flex', p:2,pt: 5, flexDirection: 'column', alignItems: 'center'}}>
                <Grid container spacing={2} sx={{mt:1}} component="form" onSubmit={e=>{handleSave()}} target="votar" >
                    <Grid item xs={12}>
                        <TextField
                            value={user?.nome||""} onChange={e=>{setUser({...user,nome:e.target.value})}}
                            required fullWidth label="Nome"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={user?.nome_usuario||""} onChange={e=>{setUser({...user,nome_usuario:e.target.value})}}
                            required fullWidth label="Nome usuário"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputMask
                            value={user?.telefone1||""} onChange={e=>{setUser({...user,telefone1:e.target.value.replace(/\D+/g, '')})}}
                            mask="(99) 99999-9999"
                            disabled={false}>
                            <TextField label={"Telefone 1"} fullWidth/>
                        </InputMask>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputMask
                            value={user?.telefone2||""} onChange={e=>{setUser({...user,telefone2:e.target.value.replace(/\D+/g, '')})}}
                            mask="(99) 99999-9999"
                            disabled={false}>
                            <TextField label={"Telefone 2"} fullWidth/>
                        </InputMask>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={user?.email||""} onChange={e=>{setUser({...user,email:e.target.value})}}
                            required fullWidth label="Email"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={user?.senha||""} onChange={e=>{setUser({...user,senha:e.target.value})}}
                            fullWidth label="Senha"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            error={erroconfsenha}
                            disabled={!user?.senha}
                            value={user?.confsenha||""} onChange={e=>{setUser({...user,confsenha:e.target.value})}}
                            fullWidth label="Confirma Senha"/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth
                            type="submit"
                            variant="contained">
                            Salvar Dados
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    return (
        <MenuPage secao={secao} tamanho="lg" />
    )
}