// Importação dos tipos das dependências
import type { Page } from "puppeteer";

// Função que obtém o id dos processos
async function extractProcessId(extractPage: Page) {
  const processesId = await extractPage.evaluate(() => {
    // Vetores que armazenam o id e o href (link) dos elementos
    const elementsId: string[] = [];
    const elementsHRef: (string | null)[] = [];

    // Obtém os elementos de classe 'linkProcesso'
    let elements = $('.linkProcesso').toArray();

    // Insere os textos (id e link) dos elementos nos vetores
    for (let i = 0; i < elements.length; i++) {
      elementsId.push(elements[i].innerText);
      elementsHRef.push(elements[i].getAttribute('href'));
    }

    // Vetor que armazena o vetor [id, link] dos elementos
    const ids: (string | null)[][] = [];

    // Insere o vetor [id, link] dos elementos no vetor ids
    for (let i = 0; i < elements.length; i++) {
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
export default extractProcessId;
