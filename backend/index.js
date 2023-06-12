const express = require("express"); //import express
const cors = require('cors');
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

// Teste
app.get("/get", (req,res)=>{
    db.query("SELECT * FROM usuario")
    .then((result)=>{
        res.json(result)
    })
    .catch((erro)=>{
        res.status(500).send(erroz)
    })
});

app.listen(8081, () => {
    console.log("listening")
})