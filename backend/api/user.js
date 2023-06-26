const db = require("../db")

const getUsuario = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else{
            await db.promise().query(`SELECT usuario_id,nome_usuario,nome,email,telefone1,telefone2 FROM usuario where usuario_id=${req.params.userId}`)
                .then(result=>{res.json({resposta:result[0][0],token:req.headers.authorization})})
                .catch((err) => {throw err});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const editUsuario = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!req.body.nome) res.status(400).send("Não possui nome")
        else if(!req.body.nome_usuario) res.status(400).send("Não possui nome de usuario")
        else if(!req.body.email) res.status(400).send("Não possui email")
        else{
            await db.promise().query(`UPDATE usuario SET nome_usuario = "${req.body.nome_usuario}", nome = "${req.body.nome_usuario}", email = "${req.body.nome_usuario}", telefone1 = "${req.body?.telefone1}", telefone2 = "${req.body?.telefone2}" WHERE usuario_id = ${req.params.userId}`)
                .then(result=>{res.json({token:req.headers.authorization})})
                .catch((err) => {throw err});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getUsuario,editUsuario
}