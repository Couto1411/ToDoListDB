import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login/login';
import Perfil from '../components/Perfil/perfil';
import Listas from '../components/Listas/listas';
import Notificacoes from '../components/Notificacoes/notificacoes';
import Tarefas from '../components/Tarefas/tarefas';
import { useNavigate } from "react-router-dom"

export default function Props(){
    const navigate = useNavigate();
    return <Routes>
        <Route path='/login' element={<Login navigate={navigate}/>} exact/>
        <Route path='/listas' element={<Listas navigate={navigate}/>} exact/>
        <Route path='/tarefas' element={<Tarefas navigate={navigate}/>} exact/>
        <Route path='/perfil' element={<Perfil navigate={navigate}/>} exact/>
        <Route path='/notificacoes' element={<Notificacoes navigate={navigate}/>} exact/>
        <Route path='*' element={<Navigate to='/login' navigate={navigate}/>} exact/>
    </Routes>
}