const db = require("../db")

const postLista = async(req,res) =>{
    try{
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const updateLista = async(req,res) =>{
    try{
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getListas = async(req,res) =>{
    try{

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getListas, updateLista, postLista
}