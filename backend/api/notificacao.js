const { db } = require("../config")

const postConvite = async(req,res) =>{
    try{
        if(!req.body.usuario_id) res.status(400).send("Não possui usuário")
        if(!req.body.lista_id) res.status(400).send("Não possui lista")
        let id=await db.promise().query('SELECT usuario_id FROM lista WHERE lista_id= ? ',[req.body.lista_id])
            .then(result=>{return result[0]})
            .catch(err=>{throw err})
        if(id=req.body.usuario_id){
            await db.promise().query('INSERT INTO convidado(usuario_id,lista_id,estado_convite) VALUES( ? , ? ,0)',[req.body.usuario_id,req.body.lista_id])
                .then(result=>res.status(200).send())
                .catch(err=>{
                    if(err.errno===1062) res.status(403).send("Convite já feito")
                    else throw err
                })
        }else res.status(403).send("Usuario não é o criador")
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const deleteConvite = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else if(!Number(req.params.conviteId)) res.status(400).send("Não possui id do convidado")
        else{
            let usuarios = await db.promise().query('SELECT l.usuario_id FROM lista l where l.lista_id= ? ',[req.params.listaId])
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if (usuarios[0].usuario_id===Number(req.params.userId)){
                await db.promise().query('DELETE FROM convidado WHERE usuario_id= ? and lista_id= ?',[req.params.conviteId,req.params.listaId])
                    .then(result=> res.json({token:req.headers.authorization}))
                    .catch((err) => {throw err});
            } else res.status(401).send()
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getConvites = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui usuário")
        else{
            let convites = await db.promise().query('SELECT c.estado_convite, c.lista_id, l.nome as nome_lista, u.nome_usuario from convidado c join lista l on l.lista_id=c.lista_id join usuario u on u.usuario_id=l.usuario_id WHERE c.usuario_id= ? ',[req.params.userId])
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            res.json({resposta:convites,token:req.headers.authorization})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const aceitaConvite = async(req,res) =>{
    try{
        if(!req.body.usuario_id || !req.body.lista_id) res.status(400).send("Não possui usuário id ou lista id")
        else{
            await db.promise().query('UPDATE convidado SET estado_convite=1 WHERE usuario_id= ? and lista_id= ? ',[req.body.usuario_id,req.body.lista_id])
                .then(result=> res.status(200).json({token:req.headers.authorization}))
                .catch((err) => {throw err});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const rejeitaConvite = async(req,res) =>{
    try{
        if(!Number(req.params.userId) || !Number(req.params.listaId)) res.status(400).send("Não possui usuário id ou lista id")
        else{
            await db.promise().query('DELETE from convidado WHERE usuario_id= ? and lista_id= ?',[req.params.userId,req.params.listaId])
                .then(result=> res.status(200).json({token:req.headers.authorization}))
                .catch((err) => {throw err});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getConvites, postConvite, deleteConvite, aceitaConvite, rejeitaConvite
}