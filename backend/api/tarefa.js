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

const getUsuarios = async(req,res) =>{
    try{
        if(!req.query.nome) res.status(400).send("Não possui nome de usuário")
        else{
            let usuarios = await db.promise().query(`SELECT u.usuario_id as id,u.nome FROM usuario u WHERE nome_usuario LIKE '%${req.query.nome}%'`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            res.json({resposta:usuarios,token:req.headers.authorization})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getTarefas, updateTarefa, postTarefa, getUsuarios
}