import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from "react-router-dom"

export default function Props(){
    const navigate = useNavigate();
    return <Routes>
        <Route path='/' element={<div navigate={navigate}></div>} exact/>
    </Routes>
}