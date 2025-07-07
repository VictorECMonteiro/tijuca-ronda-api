const rotaLocalReposityClass = require("../repositories/rotaLocalreposity");
const rotaLocalreposityInstance = new rotaLocalReposityClass();


async function teste(){
  // let array1 = [23,25,50,60]
  // let array2 = [50,25,23,60]

  // for(let i = 0; i<=array1.length - 1; i++){
  //   if(array1[i] === array2[i]){
  //     array1.splice(i, i + 1);
  //     array2.splice(i, i + 1);
  //   }
  //   for(let j = 0; j<= array1.length - 1; j++){
  //     if(array1[i] === array2[j]){
  //       if(array1[j] === array2[i]){
  //         array1.splice(j, j+1)
  //         array2.splice(j, j+1)
  //       }
  //     }
  //   }
  // }
  const fresult = await rotaLocalreposityInstance.changeOrder([2],[3], 4);
  console.log(fresult);
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


