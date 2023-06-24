import Axios from 'axios'
import baseUrl from "../main/backend";

export async function SignUp(props,payload){
    await Axios.post(baseUrl+'signup',{
        "nome_usuario":(null || payload.nome_usuario)??"",
        "nome":(null || payload.nome)??"",
        "senha":(null || payload.senha)??"",
        "telefone1":(null || payload.telefone1)??"",
        "telefone2": (null || payload.telefone2)??"",
        "email":(null || payload.email)??""
    })
    .then((response)=>{
        if(response.data.token)sessionStorage.setItem('token',response.data.token)
        props.navigate('/listas')
    })
    .catch((error)=>{
        console.log(error)
    })
}

export async function Login(props,payload,setEmail,setSenha){
    await Axios.post(baseUrl+'login',{
        "nome_usuario":(null || payload.nome_usuario)??"",
        "nome":(null || payload.nome)??"",
        "senha":(null || payload.senha)??"",
        "telefone1":(null || payload.telefone1)??"",
        "telefone2": (null || payload.telefone2)??"",
        "email":(null || payload.email)??""
    })
    .then((response)=>{
        if(response.data.token)sessionStorage.setItem('token',response.data.token)
        props.navigate('/listas')
    })
    .catch((error)=>{
        if (error?.response?.status===404) setEmail(false)
        else if (error?.response?.status===401) setSenha(false)
        console.log(error)
    })
}

export async function CriaTarefa(props,listaId,payload,setTarefas){
    await Axios.post(baseUrl+'/lista/'+listaId+'/tarefa',{
        "descricao": (null || payload.descricao)??"",

    },{
        headers: {
            'Authorization': 'bearer ' + sessionStorage.getItem("token")
        }
    })
    .then(response=>{setTarefas(response.data)})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}