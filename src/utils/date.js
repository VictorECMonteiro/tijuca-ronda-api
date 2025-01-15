function date(){
    const dataAtual = new Date()

    const dataFormatada = `${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${dataAtual.getDate()}`



    return dataFormatada
}






module.exports= date