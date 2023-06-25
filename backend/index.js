const express = require("express"); //import express
const cors = require('cors');
const {validaToken,criaToken, encryptPassword} = require('./auth')
const db = require('./db');
const { getConvites, postConvite, aceitaConvite, rejeitaConvite } = require("./api/notificacao");
const { getUsuarios, getTarefas } = require("./api/tarefa");

const app = express()

app.use(cors())
app.use(express.json())

// Cadastro
app.post("/signup", (req,res)=> {
    try {
        let valores =[]
        for (const i in req.body) valores.push(req.body[i])
        valores[2]=encryptPassword(valores[2])
        db.query("INSERT INTO usuario (nome_usuario,nome,senha,telefone1,telefone2,email) VALUES(?,?,?,?,?,?)",valores,(err,result)=>{
            if(err){
                if(err.errno===1062) res.status(405).send("Usuario já cadastrado")
                else throw err
            }else{
                const token= criaToken({...req.body},true,res)
                db.query(`SELECT usuario_id from usuario where email="${req.body.email}"`, (err,result)=>{
                    res.status(200).json({id:result[0].usuario_id,token:token})
                })
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

// Login
app.post("/login", (req,res)=> {
    try {
        db.query("SELECT * FROM usuario WHERE email = ?",[req.body.email],(err,result)=>{
            if(err) throw err
            if(!result[0]) res.status(404).send("Não encontrado")
            else{
                const token = criaToken({...req.body},result[0].senha,res)
                if(token) res.json({id:result[0].usuario_id,token:token})
            }
        });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ message: error });
    }
})

// Faz convite
app.post("/novoconvite",validaToken,postConvite)
// Busca convites
app.get("/convites/:userId",validaToken,getConvites)
// Aceita convites
app.put("/convites/aceita",validaToken,aceitaConvite)
// Rejeita convites
app.delete("/convites/rejeita/:userId/:listaId",validaToken,rejeitaConvite)

// Busca usuarios
app.get("/usuarios",validaToken,getUsuarios)
// Busca tarefas
app.get("/user/:userId/lista/:listaId/tarefas",validaToken,getTarefas)


app.listen(8081, () => {
    console.log("listening")
})