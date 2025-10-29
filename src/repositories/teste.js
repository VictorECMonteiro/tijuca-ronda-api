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
      SELECT g.idGeral, g.latitude, g.longitude, g.data, g.hora, g.idLocal, g.atrasado, o.*, r.nomeRota, r.horaInicio, r.horaFim, r.data, r.idUsuario, r.idRonda, r.idRota from rondas as r
      LEFT JOIN gerais as g on g.idRonda = r.idRonda
      LEFT JOIN observacaos as o on o.idGeral = g.idGeral
      WHERE r.idRonda = 169;
    `, {
      type:sequelize.Sequelize.QueryTypes.SELECT
    })
for (let i = 0; i <= fresult.length - 1; i++) {
  if(!jsonResposta.some((item)=>item.idRonda === fresult[i].idRonda)){
    let index = jsonResposta.push({idRonda: fresult[i].idRonda, data:[], idRota: fresult[i].idRota, locais:[]}) - 1
    jsonResposta[index].data.push(JSON.stringify(fresult[i]))
  }
  else{
    let index = jsonResposta.findIndex((item)=>item.idRonda === fresult[i].idRonda)
    jsonResposta[index].data.push(JSON.stringify(fresult[i]))
  }
}
  let getLocaisFromRoutes = await sequelize.sequelize.query(`          
          SELECT l.nomeLocal, rl1.horario, rl1.idLocal, rl1.id FROM rotas_locais as rl1
          LEFT JOIN locais as l on rl1.idLocal = l.idLocal
          WHERE rl1.idRota = :idRota;`,
        {
          type: sequelize.Sequelize.QueryTypes.SELECT,
          replacements:{
            idRota: jsonResposta[0].idRota
          }
        })

jsonResposta[0].locais.push(JSON.stringify(getLocaisFromRoutes))


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


