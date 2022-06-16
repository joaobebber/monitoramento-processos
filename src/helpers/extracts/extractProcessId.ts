// Importação dos tipos das dependências
import type { Page } from "puppeteer";

// Importação dos tipos locais
import type { IProcessId } from '../../types/IProcessId';

// Função que obtém o id dos processos
async function extractProcessId(extractPage: Page) {
  const processesId = await extractPage.evaluate(() => {
    // Vetores que armazenam o id e o href (link) dos elementos
    const processesId: IProcessId[] = [];

    // Obtém os elementos de classe 'linkProcesso'
    let elements = $('.linkProcesso').toArray();

    // Insere os textos (id e link) dos elementos nos vetores
    for (let i = 0; i < elements.length; i++) {
      const processId: IProcessId = {
        id: elements[i].innerText,
        href: elements[i].getAttribute('href')!  // not null
      };
      processesId.push(processId);
    }

    return processesId;
  });

  return processesId;
}

// Exportação da função
export default extractProcessId;
