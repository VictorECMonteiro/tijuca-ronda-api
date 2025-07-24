function cleanFormDataObject(raw) {
  const result = {};

  for (const key in raw) {
    const value = raw[key];

    // Se for array com valores repetidos, pega o primeiro diferente de 'null' ou vazio
    const first = Array.isArray(value) ? value.find(v => v !== null && v !== '') : value;

    // Tenta fazer JSON.parse (para strings como '[1,2]' ou '{"a":1}')
    if (typeof first === 'string') {
      try {
        result[key] = JSON.parse(first);
      } catch {
        result[key] = first;
      }
    } else {
      result[key] = first;
    }
  }

  return result;
}


module.exports = cleanFormDataObject