const { encryptPassword, criaToken } = require("../auth");
const { db } = require("../config")

const SignUp = async (req,res)=>{
    try {
        db.query("INSERT INTO usuario (nome_usuario,nome,senha,telefone1,telefone2,email) VALUES(?,?,?,?,?,?)",[req.body.nome_usuario,req.body.nome,encryptPassword(req.body.senha),req.body.telefone1,req.body.telefone2,req.body.email],(err,result)=>{
            if(err){
                if(err.errno===1062) res.status(405).send("Usuario já cadastrado")
                else throw err
            }else{
                const token= criaToken({...req.body},true,res)
                db.query('SELECT usuario_id from usuario where email= ? ',[req.body.email], (err,result)=>{
                    res.status(200).json({id:result[0].usuario_id,token:token})
                })
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const Login = async (req,res)=>{
    try {
        db.query("SELECT * FROM usuario WHERE email = ?",[req.body.email],(err,result)=>{
            if(err) throw err
            if(!result[0]) res.status(404).send("Não encontrado")
            else{
                const token = criaToken({...req.body},result[0].senha,res)
                if(token) res.json({id:result[0].usuario_id,token:token})
            }
        });
    } catch (error) {
        //console.log(error);
        return res.status(500).json({ message: error });
    }
}


const getUsuario = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else{
            await db.promise().query('SELECT usuario_id,nome_usuario,nome,email,telefone1,telefone2 FROM usuario where usuario_id=?',[req.params.userId])
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
            if(req.body.senha && req.body.senha===req.body.confsenha){
                await db.promise().query('UPDATE usuario SET nome_usuario = ?, senha = ?, nome = ?, email = ?, telefone1 = ?, telefone2 = ? WHERE usuario_id = ?',[req.body.nome_usuario,encryptPassword(req.body.senha),req.body.nome,req.body.email,req.body?.telefone1,req.body?.telefone2,req.params.userId])
                    .then(result=>{res.json({token:req.headers.authorization})})
                    .catch((err) => {throw err});
            }else{
                await db.promise().query('UPDATE usuario SET nome_usuario = ?, nome = ?, email = ?, telefone1 = ?, telefone2 = ? WHERE usuario_id = ?}',[req.body.nome_usuario,req.body.nome,req.body.email,req.body?.telefone1,req.body?.telefone2,req.params.userId])
                    .then(result=>{res.json({token:req.headers.authorization})})
                    .catch((err) => {throw err});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getUsuario,editUsuario, SignUp, Login
}