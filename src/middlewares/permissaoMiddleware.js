require("dotenv").config();
//A função tem que estar presente no header da requisição com nome de: permissão
function admin(req, res, next) {
    const header = req.header("permissao")
    console.log(header)
    if (header!=="admin") return res.status(403).send({
        success: false,
        erro: "Acesso Negado, você nao é administrador"
    });

    next();
}

function vigia(req, res, next) {
    switch(header){
        case 'vigia':
            next()
        case 'admin':
            return res.status(403).send({
                success: false,
                erro: "Você não é vigia"
            })
            
    }
    
}

module.exports = { admin, vigia };