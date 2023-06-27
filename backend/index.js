const express = require("express"); //import express
const cors = require('cors');
const {validaToken,criaToken, encryptPassword} = require('./auth')
const { getConvites, postConvite, aceitaConvite, rejeitaConvite, deleteConvite } = require("./api/notificacao");
const { getUsuarios, getTarefas, postTarefa, updateTarefa, deletaTarefa } = require("./api/tarefa");
const { deleteLista, getListas, postLista } = require("./api/lista");
const { getUsuario, editUsuario, SignUp, Login } = require("./api/user");

const app = express()

app.use(cors())
app.use(express.json())


// Cadastro
app.post("/signup",SignUp)
// Login
app.post("/login",Login)

// Deleta lista
app.delete("/user/:userId/lista/:listaId",validaToken,deleteLista)

// Faz convite
app.post("/novoconvite",validaToken,postConvite)
// Desfaz convites
app.delete("/user/:userId/desconvidar/:listaId/user/:conviteId",validaToken,deleteConvite)
// Busca convites
app.get("/convites/:userId",validaToken,getConvites)
// Aceita convites
app.put("/convites/aceita",validaToken,aceitaConvite)
// Rejeita convites
app.delete("/convites/rejeita/:userId/:listaId",validaToken,rejeitaConvite)

// Busca usuarios
app.get("/user/:userId/lista/:listaId/usuarios",validaToken,getUsuarios)
// Busca tarefas
app.get("/user/:userId/lista/:listaId/tarefas",validaToken,getTarefas)
// Cria tarefas
app.post("/user/:userId/lista/:listaId/tarefas",validaToken,postTarefa)
// Edita tarefas
app.put("/user/:userId/lista/:listaId/tarefas",validaToken,updateTarefa)
// Deleta tarefas
app.delete("/user/:userId/lista/:listaId/tarefas/:tarefaId",validaToken,deletaTarefa)

// Pega informações do usuário
app.get("/user/:userId",validaToken,getUsuario)
// Edita informações do usuário
app.put("/user/:userId",validaToken,editUsuario)

// Busca listas
app.get("/listas/:userId",validaToken,getListas)
// Cria listas
app.post("/novalista",validaToken,postLista)


app.listen(8081, () => {
    console.log("listening")
})