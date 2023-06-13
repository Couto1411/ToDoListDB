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
        db.query("SELECT * FROM usuario WHERE nome_usuario = ?",[req.body.nome_usuario],(err,result)=>{
            console.log(result)
            if(err) res.status(500).send(err)
            const token = criaToken({...req.body},result[0].senha,res)
            res.status(200).json({id:result[0].id,token:token})
        });
    } catch (error) {
        //console.log(error);
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