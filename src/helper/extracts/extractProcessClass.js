// Função que obtém a classe dos processos
async function extractProcessClass(extractPage) {
  const processesClass = await extractPage.evaluate(() => {
    // Vetor que armazena o texto (classe) dos elementos
    const classes = [];

    // Obtém os elementos de classe 'classeProcesso'
    let elements = $('.classeProcesso').toArray();

    // Insere o texto (classe) dos elementos no vetor
    for (i = 0; i < elements.length; i++) {
      classes.push(elements[i].innerText);
    }

    return classes;
  });

  return processesClass;
}

// Exportação da função
module.exports = { extractProcessClass: extractProcessClass };
