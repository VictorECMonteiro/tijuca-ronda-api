const sequelize = require("../configs/sequelize");
// async function teste(idRonda){
// const resposta = await sequelize.sequelize.query(`SELECT t3.idGeral, t4.nomeLocal FROM rondas as t1
// 	LEFT JOIN rotas as t2 ON t2.idRota = t1.idRota
//     LEFT JOIN gerais as t3 ON t3.idLocal = t2.idLocal

//     LEFT JOIN locais as t4 ON t4.idLocal = t2.idLocal
//   where t1.idRonda = 1`, {
//     replacements:{
//         idRonda: idRonda

//     }
//   })

//   const respostaUnica = resposta[0].filter((value, index, self) =>
//     index === self.findIndex((t) => (
//       t.idGeral === value.idGeral// ou outros critérios para identificar duplicações
//     ))
//   );
//   console.log(respostaUnica);
// // console.log(teste2)
// }

async function teste(idUsuario, idRonda, latitude, longitude, idLocal) {
  const getRota = await sequelize.sequelize.query(
    `SELECT ro.idRota FROM rondas as r
     LEFT JOIN rotas as ro on r.idRota = ro.idRota
     where r.idRonda = :idRonda;
    `,
    {
      replacements: {
        idRonda: idRonda,
      },
      type: sequelize.Sequelize.QueryTypes.SELECT,
    }
  );
  console.log(getRota[0]);
}

teste(1, 132, 1, 1, 1);

// console.log(teste1)
