var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const Token_Key = require('./chave')

const validaToken = (req, res, next) => {
    // Deve ser mandado como 'bearer TOKENHERE' pois o destructuring ignora o primeiro termo
    const [, token] = req.headers.authorization?.split(' ') || [' ', ' '];

    if (!token) return res.status(401).send('Acesso negado, nenhum token foi enviado');

    try {
        const payload = jsonwebtoken.verify(token, Token_Key);
        if (!payload.nomeUsuario)  return res.send(401).json({ message: 'Token Invalido' });
        let tempoAtual = Math.floor(Date.now() / 1000);
        if (decoded.exp - tempoAtual > 300){ // Renova o token se faltar menos de 5 minutos para expirar
            const novoToken = jwt.sign(payload, chaveSecreta, { expiresIn: '1h' });
            req.headers.authorization = novoToken;
        }
        next()
    }catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token Invalido' });
    }
}

const criaToken = (payload, senhaBanco, res) => {
    console.log(payload,senhaBanco)
    if (senhaBanco!==true && !bcrypt.compareSync(payload.senha, senhaBanco)) res.status(401).send('Senha não bate')
    return jwt.sign( 
        payload, // Body da requisicao (User info)
        Token_Key, // Chave Secreta
        { expiresIn: 3600 } // Tempo de token
    );
}

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    validaToken, criaToken, encryptPassword
}