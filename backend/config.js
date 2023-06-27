const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "TrabalhoBD",
    password: "maravilha2023",
    database:"todolist" 
    
})

module.exports = {
    Token_Key:"Sua-chave-aqui", db:db
}