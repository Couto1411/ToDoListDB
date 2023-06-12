const express = require("express"); //import express
const cors = require('cors');
const db = require('./db')

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

app.listen(8081, () => {
    console.log("listening")
})