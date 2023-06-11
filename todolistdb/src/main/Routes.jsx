import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../components/Login/login';
import { useNavigate } from "react-router-dom"

export default function Props(){
    const navigate = useNavigate();
    return <Routes>
        <Route path='/login' element={<Login navigate={navigate}/>} exact/>
    </Routes>
}