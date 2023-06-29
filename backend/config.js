const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "seu-host-aqui",
    user: "seu-user-aqui",
    password: "sua-senha-aqui",
    database:"todolist"
})

module.exports = {
    Token_Key:"sua-chave-aqui", db:db
}