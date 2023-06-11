const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "TrabalhoBD",
    password: "TrabalhoBD",
    database:"todolist" 
})

module.exports = db;