// Importação dos tipos das dependências
import type { Page } from "puppeteer";

// Função que obtém a data dos processos
async function extractProcessDate(processPage: Page) {
  const processDate = await processPage.evaluate(() => {
    // Obtém os elementos de classe 'dataMovimentacao'
    let elements = $('.dataMovimentacao').toArray();

    // Extrai o texto (data) dos elementos
    const date = elements[0].innerText;

    return date;
  });

  return processDate;
}

// Exportação da função
export default extractProcessDate;
