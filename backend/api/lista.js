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