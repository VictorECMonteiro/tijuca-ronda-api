const jwt = require('jsonwebtoken');
require("dotenv").config();
//Token tem que estar no header com o nome de: x-auth-token
//decodifica o token de autorizaçao da API
module.exports = (req, res, next)=>{
    const token  = req.header("x-auth-token");

    if(!token) return res.status(401).send({
        "resultado": false,
        "error":"acesso negado"
    });

    try{
        const decode = jwt.verify(token, process.env.tokenKey);
        req.user = decode
    }
    catch (error) {
        return res.status(401).send({
            "resultado": false,
            'error': "Token expired"
        });

}
next()
}
