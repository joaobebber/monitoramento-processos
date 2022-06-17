// Importação dos tipos das dependências
import type { Browser } from 'puppeteer';

// Importação dos tipos locais
import type { IProcess } from '../interfaces/IProcess';

// Importação de funções
import extractProcessDate from '../helpers/extracts/extractProcessDate';

// Função que realiza a extração da data da última modificação dos processos
async function extractDate(
  browser: Browser,
  BASEURL: string,
  processesByClass: IProcess[]
) {
  for (let i = 0; i < processesByClass.length; i++) {
    // Cria uma nova aba
    const processPage = await browser.newPage();

    // Entra na página de extração
    await processPage.goto(BASEURL + processesByClass[i].href);

    // Extrai a data da última modificação dos processos
    const processDate = await extractProcessDate(processPage);

    // Insere a data no vetor do processo
    processesByClass[i].date = processDate;

    // Fecha a aba
    await processPage.close();
  }
}

// Exportação da função
export default extractDate;
