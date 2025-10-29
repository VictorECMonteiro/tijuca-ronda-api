const obsModel = require("../models/modelObservacao");


class observacao {
    constructor() { }
    //Insere linha na tabela observação
    insertObservacao = async (txtObservacao, idGeral) => {
        let insert = await obsModel.create(
            {
                observacao: txtObservacao,
                idGeral: idGeral
            })
        return insert;
    }












    



    
}


module.exports = observacao