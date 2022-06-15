// Função que obtém o id dos processos
async function extractProcessId(extractPage) {
  const processesId = await extractPage.evaluate(() => {
    // Vetores que armazenam o id e o href (link) dos elementos
    const elementsId = [];
    const elementsHRef = [];

    // Obtém os elementos de classe 'linkProcesso'
    let elements = $('.linkProcesso').toArray();

    // Insere os textos (id e link) dos elementos nos vetores
    for (i = 0; i < elements.length; i++) {
      elementsId.push(elements[i].innerText);
      elementsHRef.push(elements[i].getAttribute('href'));
    }

    // Vetor que armazena o vetor [id, link] dos elementos
    const ids = [];

    // Insere o vetor [id, link] dos elementos no vetor ids
    for (i = 0; i < elements.length; i++) {
      const processId = elementsId[i];
      const processHRef = elementsHRef[i];
      const processData = [processId, processHRef];
      ids.push(processData);
    }

    return ids;
  });

  return processesId;
}

// Exportação da função
module.exports = { extractProcessId: extractProcessId };
