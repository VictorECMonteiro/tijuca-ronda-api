const haversine = require("haversine")











async function teste() {
  //Dado que será retornado do banco de dados
  const pointLocalBanco = {
    latitude: -3.856597,
    longitude: -38.506905
  }

  //Dado que será enviado pelo dispositivo do usuario
  const userLocal = {
    latitude: -3.856503,
    longitude: -38.506888

  }

  //PS: Dá pra fazer na mão esse calculo usando a formula de haversine  
  let noLocal = haversine(pointLocalBanco, userLocal, {unit: "meter"})
  console.log(Math.round(noLocal))

  
  
  noLocal >= 20?console.log("Fora do Local"):console.log("No Local")
  
}

teste();


