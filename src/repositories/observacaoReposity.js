const obsModel = require("../models/modelObservacao");


class observacao {
    constructor() { }

    insertObservacao = async (txtObservacao, idGeral) => {
        let insert = await obsModel.create(
            {
                observacao: txtObservacao,
                idGeral: idGeral
            })
        return insert;
    }












    



    
}