function verificarItensRepetidos(array) {
  return new Set(array).size !== array.length;
}
module.exports = verificarItensRepetidos;
