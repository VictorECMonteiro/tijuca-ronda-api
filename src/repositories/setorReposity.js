const modelSetor = require("../models/modelSetor")


class Setor{

    constructor(){}

    returnSetor = async ()=>{
        return await modelSetor.findAll()
    }

    async insertNewSetor(idSetor, nomeSetor){
        try{
            await modelSetor.create({nomeSetor: nomeSetor})
            return true
        }
        catch(E){
            return false
        }

    }
    updateSetor(idSetor, nomeSetor){
        // try{
        //     modelSetor.update({idSetor: idSetor, nomeSetor: nomeSetor})
        // }
        // catch(e){

        // }

    }
     deleteSetor = async (idSetor)=> {
        try{
            await modelSetor.destroy({
                where:{
                    idSetor: idSetor
                }
            })
            return true
        }
        catch(e){
            return false

        }

    }
}