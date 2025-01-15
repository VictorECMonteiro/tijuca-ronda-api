loginValidator = (cpf, senhadeUsuario) =>{
    var validatorUser = String(cpf).match(/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g)
    var validatorPassword = toString(senhadeUsuario).length >= 6
    console.log(validatorUser + "validatoruser")
    console.log(validatorPassword + "validator password")
    if(validatorUser != null&& validatorPassword == true){
        return true
    }
    else{
        return false
    }

}

module.exports = {loginValidator}