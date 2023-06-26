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

export async function ProcuraUsuarios(props,nome,setUsuarios){
    await Axios.get(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId')+'/usuarios?nome='+nome,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setUsuarios(response.data.resposta)
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function Convidar(props,id,setConvidados,setSeeNovoConvite){
    await Axios.post(baseUrl+'novoconvite',{
        usuario_id: id,
        lista_id: sessionStorage.getItem('listaId')
    },{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setConvidados([])
        setSeeNovoConvite(false)
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        if (error?.response?.status===403) document.getElementById('helptext').style.display='block'
        console.log(error)
    })
}

export async function Desconvidar(props,id){
    await Axios.delete(baseUrl+'user/'+sessionStorage.getItem('userId')+'/desconvidar/'+sessionStorage.getItem('listaId')+'/user/'+id,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function GetTarefas(props,setTarefas){
    await Axios.get(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId')+'/tarefas',{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setTarefas(response.data.resposta)
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function CriaTarefa(props,payload){
    await Axios.post(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId')+'/tarefas',payload,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{return true})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function EditaTarefa(props,payload){
    await Axios.put(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId')+'/tarefas',payload,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{return true})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function DeletaTarefa(props,id){
    await Axios.delete(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId')+'/tarefas/'+id,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{return true})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function GetListas(props,setListas) {
    await Axios.get(baseUrl+'listas/'+sessionStorage.getItem('userId'),{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response => {
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setListas(response.data.resposta)
    })
    .catch((error) => {
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function GetListasCompartilhadas(props,setListas) {
    await Axios.get(baseUrl+'listas/'+sessionStorage.getItem('userId'),{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response => {
        if(response.data.token) sessionStorage.setItem('token',response.data.token)
        setListas(response.data.resposta)
    })
    .catch((error) => {
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function DeletaLista(props){
    await Axios.delete(baseUrl+'user/'+sessionStorage.getItem('userId')+'/lista/'+sessionStorage.getItem('listaId'),{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{
        sessionStorage.removeItem("listaId")
        props.navigate('/listas')
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}

export async function GetInfoUser(props,setUser){
    await Axios.get(baseUrl+'user/'+sessionStorage.getItem('userId'),{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(response=>{setUser(response.data.resposta)})
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        else if (error?.response?.status===403) props.navigate('/listas')
        console.log(error)
    })
}

export async function EditInfoUser(props,user,setUser){
    await Axios.put(baseUrl+'user/'+sessionStorage.getItem('userId'),user,{
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
    .then(result=>{
        setUser({...user,senha:"",confsenha:""})
    })
    .catch((error)=>{
        if (error?.response?.status===401) props.navigate('/login')
        console.log(error)
    })
}
