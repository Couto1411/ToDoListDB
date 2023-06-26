const db = require("../db")

const postTarefa = async(req,res) =>{
    try{
        if(!req.body.data_inicio) res.status(400).send("Não possui data início da tarefa")
        else if(!req.body.data_vencimento) res.status(400).send("Não possui data vencimento da tarefa")
        else if(!req.body.nome) res.status(400).send("Não possui nome da tarefa")
        else if(!req.body.descricao) res.status(400).send("Não possui descrição da tarefa")
        else if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else{
            let usuarios = await db.promise().query(`SELECT c.usuario_id as convidados_id, l.usuario_id FROM convidado c join lista l on c.lista_id=l.lista_id where c.lista_id=${req.params.listaId} and c.estado_convite=1`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if(usuarios.length===0){usuarios = await db.promise().query(`SELECT l.usuario_id FROM lista l where l.lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            }
            if (usuarios[0].usuario_id===Number(req.params.userId) || usuarios.find(el=>el.convidados_id===Number(req.params.userId))){
                    await db.promise().query(`INSERT INTO tarefa(descricao,data_cadastro,data_vencimento,concluida,titulo,lista_id,usuario_id) VALUES
                                            ("${req.body.descricao}", "${req.body.data_inicio}","${req.body.data_vencimento}",0,"${req.body.nome}",${req.params.listaId},${req.params.userId})`)
                        .then(result=> res.json({token:req.headers.authorization}))
                        .catch((err) => {throw err});
            } else res.status(403).send("Usuário não é criador ou convidado")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const updateTarefa = async(req,res) =>{
    try{
        if(!req.body.data_cadastro) res.status(400).send("Não possui data início da tarefa")
        else if(!req.body.tarefa_id) res.status(400).send("Não possui id da tarefa")
        else if(!req.body.data_vencimento) res.status(400).send("Não possui data vencimento da tarefa")
        else if(!req.body.titulo) res.status(400).send("Não possui nome da tarefa")
        else if(!req.body.descricao) res.status(400).send("Não possui descrição da tarefa")
        else if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else{
            let usuarios = await db.promise().query(`SELECT c.usuario_id as convidados_id, l.usuario_id FROM convidado c join lista l on c.lista_id=l.lista_id where c.lista_id=${req.params.listaId} and c.estado_convite=1`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if(usuarios.length===0){usuarios = await db.promise().query(`SELECT l.usuario_id FROM lista l where l.lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            }
            if (usuarios[0].usuario_id===Number(req.params.userId) || usuarios.find(el=>el.convidados_id===Number(req.params.userId))){
                await db.promise().query(`UPDATE tarefa SET descricao = "${req.body.descricao}", data_cadastro = "${req.body.data_cadastro.substring(0,req.body.data_cadastro.indexOf('T'))}", data_vencimento = "${req.body.data_vencimento.substring(0,req.body.data_vencimento.indexOf('T'))}", concluida = ${req.body.concluida?req.body.concluida:0},titulo = "${req.body.titulo}",lista_id = ${req.params.listaId},usuario_id = ${req.params.userId} WHERE tarefa_id=${req.body.tarefa_id}`)
                    .then(result=> res.json({token:req.headers.authorization}))
                    .catch((err) => {throw err});
            } else res.status(403).send("Usuário não é criador ou convidado")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const deletaTarefa = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else if(!Number(req.params.tarefaId)) res.status(400).send("Não possui id da tarefa")
        else{
            let usuarios = await db.promise().query(`SELECT c.usuario_id as convidados_id, l.usuario_id FROM convidado c join lista l on c.lista_id=l.lista_id where c.lista_id=${req.params.listaId} and c.estado_convite=1`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if(usuarios.length===0){usuarios = await db.promise().query(`SELECT l.usuario_id FROM lista l where l.lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            }
            if (usuarios[0].usuario_id===Number(req.params.userId) || usuarios.find(el=>el.convidados_id===Number(req.params.userId))){
                await db.promise().query(`DELETE FROM tarefa WHERE tarefa_id=${req.params.tarefaId}`)
                    .then(result=> res.json({token:req.headers.authorization}))
                    .catch((err) => {throw err});
            } else res.status(403).send("Usuário não é criador ou convidado")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getTarefas = async(req,res) =>{
    try{
        if(!Number(req.params.userId) || !Number(req.params.listaId)) res.status(400).send("Não possui id da lista ou do usuário")
        else{
            let aux=true
            let resposta ={}
            resposta.lista = await db.promise().query(`SELECT * FROM lista where lista_id=${req.params.listaId}`)
                .then(result=>{return result[0][0]})
                .catch((err) => {throw err});
            resposta.usuarios = await db.promise().query(`SELECT c.usuario_id as id,u.nome_usuario as usuario FROM convidado c join usuario u on u.usuario_id=c.usuario_id where lista_id=${req.params.listaId} and c.estado_convite=1`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if (resposta.lista?.usuario_id===Number(req.params.userId)) resposta.lista.admin=true
            else if(resposta.usuarios.find(el=>el.id===Number(req.params.userId))) resposta.lista.admin=false
            else aux=false
            if(aux){
                resposta.tarefas = await db.promise().query(`SELECT * FROM tarefa where lista_id=${req.params.listaId}`)
                    .then(result=>{return result[0]})
                    .catch((err) => {throw err});
                res.json({resposta:resposta,token:req.headers.authorization})
            }else res.status(403).send("Acesso de lista que não pertence")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

const getUsuarios = async(req,res) =>{
    try{
        if(!Number(req.params.userId)) res.status(400).send("Não possui id de quem criou")
        else if(!Number(req.params.listaId)) res.status(400).send("Não possui lista que está associada")
        else if(!req.query.nome) res.status(400).send("Não possui nome de usuário")
        else{
            let usuarios = await db.promise().query(`SELECT c.usuario_id as convidados_id, l.usuario_id FROM convidado c join lista l on c.lista_id=l.lista_id where c.lista_id=${req.params.listaId} and c.estado_convite=1`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            if(usuarios.length===0){usuarios = await db.promise().query(`SELECT l.usuario_id FROM lista l where l.lista_id=${req.params.listaId}`)
                .then(result=>{return result[0]})
                .catch((err) => {throw err});
            }
            if (usuarios[0].usuario_id===Number(req.params.userId) || usuarios.find(el=>el.convidados_id===Number(req.params.userId))){
                let convidados = await db.promise().query(`SELECT u.usuario_id as id,u.nome FROM usuario u WHERE nome_usuario LIKE '%${req.query.nome}%'`)
                    .then(result=>{return result[0]})
                    .catch((err) => {throw err});
                res.json({resposta:convidados,token:req.headers.authorization})
            } else res.status(403).send("Usuário não é criador ou convidado")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

module.exports = {
    getTarefas, updateTarefa, postTarefa, getUsuarios, deletaTarefa
}