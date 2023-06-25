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
        sessionStorage.setItem('token','bearer '+response.data.token)
        sessionStorage.setItem('userId',response.data.id)
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
        sessionStorage.setItem('token','bearer '+response.data.token)
        sessionStorage.setItem('userId',response.data.id)
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
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{setTarefas(response.data)})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function CriaConvite(props,listaId,usuarioId){
    await Axios.post(baseUrl+'novoconvite',{
        "lista_id": listaId,
        "usuario_id": usuarioId
    },{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function GetConvites(props,setConvites){
    await Axios.get(baseUrl+'convites/'+sessionStorage.getItem('userId'),{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setConvites(response.data.resposta)
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function AceitaConvite(props,lista_id){
    await Axios.put(baseUrl+'convites/aceita',{
        usuario_id:sessionStorage.getItem('userId'),
        lista_id: lista_id
    },{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        return true
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function RejeitaConvite(props,lista_id){
    await Axios.delete(baseUrl+'convites/rejeita/'+sessionStorage.getItem('userId')+'/'+lista_id,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        return true
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}