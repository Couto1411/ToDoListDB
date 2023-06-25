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
        if(!req.params.userId || !req.params.listaId) res.status(400).send("Não possui id da lista ou do usuário")
        else{
            let aux=true
            let resposta ={}
            resposta.lista = await db.promise().query(`SELECT * FROM lista where lista_id=${req.params.listaId}`)
                .then(result=>{return result[0][0]})
                .catch((err) => {throw err});
            resposta.usuarios = await db.promise().query(`SELECT c.usuario_id as id,u.nome_usuario as usuario FROM convidado c join usuario u on u.usuario_id=c.usuario_id where lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if (resposta.lista?.usuario_id===Number(req.params.userId)) resposta.lista.admin=true
            else if(resposta.usuarios.find(el=>el.id===req.params.userId)) resposta.lista.admin=false
            else aux=false
            if(aux){
                resposta.tarefas = await db.promise().query(`SELECT * FROM tarefa where lista_id=${req.params.listaId}`)
                    .then(result=>{return result[0]})
                    .catch((err) => {throw err});
                res.json({resposta:resposta,token:req.headers.authorization})
            }else res.status(401).send("Acesso de lista que não pertence")
        }
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