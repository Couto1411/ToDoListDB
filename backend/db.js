const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "TrabalhoBD",
    password: "maravilha2023",
    database:"todolist" 
})

module.exports = db;