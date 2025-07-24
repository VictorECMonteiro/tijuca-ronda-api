const haversine = require("haversine")


function calculateToleranceOfLocation({ latitudeUsuario, longitudeUsuario }, { latitudeLocal, longitudeLocal }, distanciaDeTolerancia) {





    // console.log(latitudeUsuario + "LATITUDE")


    let start = { latitude: latitudeUsuario, longitude: longitudeUsuario }

    let end = {latitude: latitudeLocal, longitude:longitudeUsuario}


    let resultHaversine = haversine(start, end, {unit: 'meter'})

    
    console.log(resultHaversine + "Resultado Haversine" )
    console.log(latitudeUsuario)

    if(resultHaversine > distanciaDeTolerancia){
        return false
    }
    return true

        























}









module.exports = calculateToleranceOfLocation