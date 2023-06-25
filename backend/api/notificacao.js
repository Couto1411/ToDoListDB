const db = require("../db")

const postConvite = async(req,res) =>{
    try{
        if(!req.body.usuario_id) res.status(400).send("Não possui usuário")
        if(!req.body.lista_id) res.status(400).send("Não possui lista")
        await db.promise().query(`INSERT INTO convidado(usuario_id,lista_id,estado_convite) VALUES(${req.body.usuario_id},${req.body.lista_id},0)`)
            .then(result=>res.status(200).send())
            .catch(err=>{
                if(err.errno===1062) res.status(405).send("Convite já feito")
                else throw err
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getConvites = async(req,res) =>{
    try{
        if(!req.params.userId) res.status(400).send("Não possui usuário")
        else{
            let convites = await db.promise().query(`SELECT l.nome as nome_lista, u.nome_usuario from convidado c join lista l on l.lista_id=c.lista_id join usuario u on u.usuario_id=l.usuario_id WHERE c.usuario_id="${req.params.userId}"`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            res.json({resposta:convites,token:req.headers.authorization})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getConvites, postConvite
}