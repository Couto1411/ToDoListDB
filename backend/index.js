const express = require("express"); //import express
const cors = require('cors');
const {validaToken,criaToken, encryptPassword} = require('./auth')
const db = require('./db');

const app = express()

app.use(cors())
app.use(express.json())

// Teste
app.get("/get", (req,res)=>{
    db.query("SELECT * FROM usuario",(err,result)=>{
        if(err) {
            res.status(500).send(err)
        } 
            res.json(result)
        }
    );  
});

// Cadastro
app.post("/signup", (req,res)=> {
    try {
        let valores =[]
        for (const i in req.body) valores.push(req.body[i])
        valores[2]=encryptPassword(valores[2])
        db.query("INSERT INTO usuario (nome_usuario,nome,senha,telefone1,telefone2,email) VALUES(?,?,?,?,?,?)",valores,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            const token= criaToken({...req.body},true,res)
            res.status(200).json({token:token})
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
            if(err) res.status(500).send(err)
            if(!result[0]) res.status(404).send("Não encontrado")
            else{
                const token = criaToken({...req.body},result[0].senha,res)
                res.status(200).json({id:result[0].id,token:token})
            }
        });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ message: error });
    }
})

// Faz lista
app.post("/lista/:userId",validaToken,(req,res)=>{
    try{
        db.query(`Select * from usuario where usuario_id = ${req.params.userId}`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            console.log(result)
            res.status(200).send(result)
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

app.post("/lista/:listaId/tarefa",validaToken,(req,res)=>{
    try {
        db.query(`INSERT INTO tarefa (descricao,data_cadastro,data_vencimento,concluida,titulo,lista_id,usuario_id) VALUES(${req.body.descricao},${req.body.data_cadastro},?,?,?,?)`,(err,result)=>{
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            res.status(200).json({email:result.email,})
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
})

// Teste Login
app.get("/teste", validaToken, (req,res)=>{
    db.query("SELECT * FROM usuario",(err,result)=>{
        if(err) {  res.status(500).send(err) } 
        res.json({token:req.headers.authorization,result:result})
    });  
});

app.listen(8081, () => {
    console.log("listening")
})