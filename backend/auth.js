var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Token_Key = require('./chave')

const validaToken = (req, res, next) => {
    // Deve ser mandado como 'bearer TOKENHERE' pois o destructuring ignora o primeiro termo
    const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];

    if (!token) return res.status(401).send('Acesso negado, nenhum token foi enviado');

    try {
        const payload = jwt.verify(token, Token_Key);
        if (!payload.id)  return res.send(401).send('Token Invalido');
        let tempoAtual = Math.floor(Date.now() / 1000);
        if (payload.exp - tempoAtual < 300){ // Renova o token se faltar menos de 5 minutos para expirar
            const novoToken = jwt.sign({id:payload.id}, Token_Key, { expiresIn: 3600 });
            req.headers.authorization = 'bearer'+ novoToken;
        }
        next()
    }catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token Invalido' });
    }
}

const criaToken = (payload, senhaBanco, res) => {
    if (senhaBanco!==true && !bcrypt.compareSync(payload.senha, senhaBanco)) res.status(401).send('Senha não bate')
    else{
        return jwt.sign( 
            {id:payload.email}, // Body da requisicao (User info)
            Token_Key, // Chave Secreta
            { expiresIn: 3600 } // Tempo de token
        );
    }
}

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    validaToken, criaToken, encryptPassword
}