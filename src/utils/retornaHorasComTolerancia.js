function incrementarMinutos(tempo, minutosIncremento) {
    // Passo 1: Separar a hora e os minutos
    let [hora, minutos] = tempo.split(':').map(Number);

    // Passo 2: Incrementar os minutos
    minutos += minutosIncremento;

    // Passo 3: Ajustar a hora caso os minutos ultrapassem 60
    while (minutos >= 60) {
        minutos -= 60;
        hora += 1;
        if (hora >= 24) {
            hora = 0; // Se ultrapassar 24 horas, reinicia a contagem
        }
    }

    // Passo 4: Garantir que os minutos e horas tenham dois dígitos
    let horaFormatada = String(hora).padStart(2, '0');
    let minutosFormatados = String(minutos).padStart(2, '0');

    // Passo 5: Retornar o novo tempo formatado
    return `${horaFormatada}:${minutosFormatados}`;
}

// Exemplo de uso:
// let novoTempo = incrementarMinutos("13:00", 2);
// console.log(novoTempo); // Saída: "13:02"


module.exports = incrementarMinutos