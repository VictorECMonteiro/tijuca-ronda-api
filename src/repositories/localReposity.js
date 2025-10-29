const { Op } = require("sequelize");
const sequelize = require("../configs/sequelize");
const modelLocal = require("../models/modelLocais");
const modelRotaLocal = require("../models/modelRotas_Locais")

class localQueries {
  constructor() { }

  createLocal = async (nomeLocal, latitude, longitude, idSetor) => {
    //Insere um local na tabela locais, utilizando o nome do local, as coordenadas, e o setor a qual pertence
    try {
      const fresult = await modelLocal.create({
        nomeLocal: nomeLocal,
        latitude: String(latitude),
        longitude: String(longitude),
        idSetor: idSetor
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  listLocals = async () => {
    //Retorna todos os locais da tabela
    try {
      const fresult = await modelLocal.findAll();
      return fresult;
    } catch (E) {
      throw E;
    }
  };
  listByIDList = async (lista) => {
    //Lista os locais baseado num array de ID's e retorna a latitude, longitude e o idLocal 
    console.log("CONSULTANDO LOCAIS")
    console.log(Array.isArray(lista))
    const result = await modelLocal.findAll({
      attributes:["latitude","longitude","idLocal"],
      where: {
        idLocal: {
          [Op.in]: lista
        }
      }
    });
    
    let fresult = result.sort((a,b)=>(lista.indexOf(a.idLocal) - lista.indexOf(b.idLocal)))
    
    return fresult

  };
  edit = async (dados) => {
    //Edita os dados de um local
    var json = {};
    for (let key in dados) {
      if (dados[key]) {
        json[key.toString()] = dados[key];
      }
    }
    try {
      await modelLocal.update(json, { where: { idLocal: dados.idLocal } })

      return true
    }
    catch (e) {
      return false

    }

  }
  deleteLocal = async (idLocal) => {
    //Remove um local da tabela
    try {
      await modelLocal.destroy({
        where: {
          idLocal: idLocal,
        },
      });
      await modelRotaLocal.destroy({
        where: {
          idLocal: idLocal,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  };
}

module.exports = localQueries;
