const db = require("../db")

const postTarefa = async(req,res) =>{
    try{
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const updateTarefa = async(req,res) =>{
    try{
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getTarefas = async(req,res) =>{
    try{

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getTarefas, updateTarefa, postTarefa
}