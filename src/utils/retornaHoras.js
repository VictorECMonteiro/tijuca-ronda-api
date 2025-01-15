function retornaHoras() {
  const dataAtual = new Date(); // Cria um objeto Date com a hora atual
  let horas = dataAtual.getHours(); // Pega a hora atual
  let minutos = dataAtual.getMinutes(); // Pega os minutos atuais

  // Adiciona um 0 à frente se as horas ou minutos forem menores que 10
  horas = horas < 10 ? "0" + horas : horas;
  minutos = minutos < 10 ? "0" + minutos : minutos;

  return `${horas}:${minutos}`;
}



module.exports = retornaHoras;
