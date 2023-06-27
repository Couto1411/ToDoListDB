const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "seu-host-aqui",
    user: "seu-usuario-aqui",
    password: "sua-senha-aqui",
    database: "todolist" 
    
})

module.exports = {
    Token_Key:"Sua-chave-aqui", db:db
}