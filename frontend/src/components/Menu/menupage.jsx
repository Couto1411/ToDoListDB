import React from "react";
import "./menupage.css"

import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';

import AccountCircle from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';


import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function MenuPage({secao: Secao, tamanho}){
    // Faz Menu aparecer
    const [menuAppearing, setMenuAppearing] = React.useState(null);
    const navigate = useNavigate();

    function vaiPara (localizacao){
        setMenuAppearing(null)
        if(localizacao==='login'){
            sessionStorage.removeItem('token')
        }
        navigate('/'+localizacao)
    }

    return(
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar>
                    <Box sx={{flexGrow: 1}}>
                    <Button onClick={ ()=> vaiPara('listas')} type="text" sx={{px:1,py:0,m:0}}>
                        <img className="img-fluid" alt="Imagem não encontrada" src={require('./../Imgs/Logo.png')}></img>
                        <Typography variant="h4" sx={{ mt:0.5,ml:2 }}>
                            <div className="TEKO">To Do List</div>
                        </Typography>
                    </Button>
                    </Box>
                    <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" color="inherit"
                        className="svg_icons"onClick={e=>{setMenuAppearing(e.currentTarget)}}>
                        <AccountCircle />
                    </IconButton>
                    <Menu id="menu-appbar" anchorEl={menuAppearing} keepMounted
                        open={Boolean(menuAppearing)} 
                        onClose={()=>{setMenuAppearing(null)}}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            //setinha
                            '&:before': {
                              content: '""',
                              display: 'block',
                              position: 'absolute',
                              top: 0,
                              right: 22,
                              width: 10,
                              height: 10,
                              bgcolor: 'background.paper',
                              transform: 'translateY(-50%) rotate(45deg)',
                              zIndex: 0,
                            },
                          },
                    }}>
                        <MenuItem onClick={()=> vaiPara('perfil')}><PersonIcon sx={{mr:1}}/>Perfil</MenuItem>
                        <MenuItem onClick={()=> vaiPara('listas')}><FormatListBulletedIcon sx={{mr:1}}/>Listas</MenuItem>
                        <MenuItem onClick={()=> vaiPara('notificacoes')}><NotificationsIcon sx={{mr:1}}/>Notificações</MenuItem>
                        <MenuItem sx={{color: 'red'}} onClick={()=> vaiPara('login')}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Main */}
            <Container component="main" maxWidth={tamanho||"md"} sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ bgcolor: '#282828',my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    {Secao}
                </Paper>
            </Container >

            {/* Footer */}
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
    )
}