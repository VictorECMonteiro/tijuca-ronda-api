const modelRotaUser = require("../models/modelRota_User")



class rotaUserReposity{



constructor(){}



    insertRotaInTable(idRota){
        try{
            if(idRota){
            modelRotaUser.create({idRota: idRota, idUsuario: null})
            }
            return true
        }
        catch(e){
            return false
        }
    }

    updateRotaUser(idRota, idUsuario){
        try{
            if(idRota){
                modelRotaUser.update({idUsuario: idUsuario}, {where:{idRota: idRota}})
            }
            return true
        }
        catch(E){
            return false
        }

    }

    deleteRotaUser = (idRota)=>{
        try{
            if(idRota){
            modelRotaUser.destroy({where:{idRota: idRota}})
            }
            return true
        }
        catch(E){
            throw E

        }
    }


}


module.exports = rotaUserReposity