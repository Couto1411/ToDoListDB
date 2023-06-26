const db = require("../db")

const postLista = async(req,res) =>{
    try{
        if(!req.body.usuario_id) res.status(400).send("Não possui usuário")
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
        if(!req.params.userId) res.status(400).send("Não possui usuário")
        else{
            let listas = await db.promise().query(`SELECT l.lista_id,l.nome,l.data_hora_crt,l.data_hora_mod,uc.nome_usuario AS criador,um.nome_usuario AS modificador FROM lista AS l JOIN usuario AS uc ON uc.usuario_id = l.usuario_id JOIN usuario AS um ON um.usuario_id = l.usuario_id_mod WHERE l.usuario_id=${req.params.userId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            console.log(listas)
            res.json({resposta:listas,token:req.headers.authorization})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const deleteLista = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else{
            let usuarios = await db.promise().query(`SELECT l.usuario_id FROM lista l where l.lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if (usuarios[0].usuario_id===Number(req.params.userId)){
                await db.promise().query(`DELETE FROM convidado WHERE lista_id=${req.params.listaId}`)
                    .catch((err) => {throw err});
                await db.promise().query(`DELETE FROM tarefa WHERE lista_id=${req.params.listaId}`)
                    .catch((err) => {throw err});
                await db.promise().query(`DELETE FROM lista WHERE lista_id=${req.params.listaId}`)
                    .catch((err) => {throw err});
                res.json({token:req.headers.authorization})
            } else res.status(401).send()
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getListas, updateLista, postLista, deleteLista
}