const sequelize = require("../configs/sequelize");
// const rotaLocalReposityClass = require("../repositories/rotaLocalreposity");
// const rotaReposity = require("./rotaReposity")
// const localReposity =  new rotaReposity()
// const rotaLocalreposityInstance = new rotaLocalReposityClass();
// const modelGerais = require("../models/modelGerais")
// const modelRotas_Locais = require("../models/modelRotas_Locais")
// const modelRotas = require("../models/modelRotas")
// const modelRondas = require("../models/modelRondas")


async function teste(){ 
  let jsonResposta = [];

  let fresult = await sequelize.sequelize.query(
    `
      SELECT g.*, o.*, r.nomeRota, r.horaInicio, r.horaFim, r.data, r.idUsuario, r.idRonda, l.idLocal from rondas as r
      LEFT JOIN rotas as rt on rt.idRota = r.idRota
      LEFT JOIN rotas_locais as l on rt.idRota = l.idRota
      LEFT JOIN gerais as g on g.idRonda = r.idRonda
      LEFT JOIN observacaos as o on o.idGeral = g.idGeral
      WHERE r.idUsuario = 4;
    `, {
      type:sequelize.Sequelize.QueryTypes.SELECT
    })
for (let i = 0; i <= fresult.length - 1; i++) {
  if(!jsonResposta.some((item)=>item.idRonda === fresult[i].idRonda)){
    let index = jsonResposta.push({idRonda: fresult[i].idRonda, data:[]}) - 1
    jsonResposta[index].data.push(JSON.stringify(fresult[i]))
  }
  else{
    let index = jsonResposta.findIndex((item)=>item.idRonda === fresult[i].idRonda)
    jsonResposta[index].data.push(JSON.stringify(fresult[i]))
  }
}



console.log(jsonResposta)
}


teste();


























// const haversine = require("haversine")











// async function teste() {
//   //Dado que será retornado do banco de dados
//   const pointLocalBanco = {
//     latitude: -3.856597,
//     longitude: -38.506905
//   }

//   //Dado que será enviado pelo dispositivo do usuario
//   const userLocal = {
//     latitude: -3.856503,
//     longitude: -38.506888

//   }

//   //PS: Dá pra fazer na mão esse calculo usando a formula de haversine  
//   let noLocal = haversine(pointLocalBanco, userLocal, {unit: "meter"})
//   console.log(Math.round(noLocal))

  
  
//   noLocal >= 20?console.log("Fora do Local"):console.log("No Local")
  
// }

// teste();


