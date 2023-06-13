import Axios from 'axios'
import baseUrl from "../main/backend";

export async function SignUp(payload){
    await Axios.post(baseUrl+'signup',{
        "nome_usuario":(null || payload.nome_usuario)??"",
        "nome":(null || payload.nome)??"",
        "senha":(null || payload.senha)??"",
        "telefone1":(null || payload.telefone1)??"",
        "telefone2": (null || payload.telefone2)??"",
        "email":(null || payload.email)??""
    })
    .then((response)=>{
        console.log(response)
        if(response.data.token)sessionStorage.setItem('token',response.data.token)
    })
    .catch((error)=>{
        console.log(error)
    })
}

export async function Login(payload){
    await Axios.post(baseUrl+'login',{
        "nome_usuario":(null || payload.nome_usuario)??"",
        "nome":(null || payload.nome)??"",
        "senha":(null || payload.senha)??"",
        "telefone1":(null || payload.telefone1)??"",
        "telefone2": (null || payload.telefone2)??"",
        "email":(null || payload.email)??""
    })
    .then((response)=>{
        console.log(response)
        if(response.data.token)sessionStorage.setItem('token',response.data.token)
    })
    .catch((error)=>{
        console.log(error)
    })
}