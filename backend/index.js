const express = require("express"); //import express
const cors = require('cors');
const db = require('./db')

const app = express()

app.use(cors())
app.use(express.json())

app.listen(8081, () => {
    console.log("listening")
})