// Função que obtém a classe dos processos
async function extractProcessClass(extractPage) {
  const processesClass = await extractPage.evaluate(() => {
    // Vetor que armazena o texto (classe) dos elementos
    const classes: any[] = [];

    // Obtém os elementos de classe 'classeProcesso'
    let elements = $('.classeProcesso').toArray();

    // Insere o texto (classe) dos elementos no vetor
    for (let i = 0; i < elements.length; i++) {
      classes.push(elements[i].innerText);
    }

    return classes;
  });

  return processesClass;
}

// Exportação da função
export default extractProcessClass;
