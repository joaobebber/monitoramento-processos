// Importação de funções
const extractProcessDate = require("../helper/extracts/extractProcessDate.js").extractProcessDate;

// Função que realiza a extração da data da última modificação dos processos
async function extractDate(browser, BASEURL, processesByClass) {
  for (i = 0; i < processesByClass.length; i++) {
    // Cria uma nova aba
    const processPage = await browser.newPage();

    // Entra na página de extração
    await processPage.goto(BASEURL + processesByClass[i][0][1]);

    // Extrai a data da última modificação dos processos
    const processDate = await extractProcessDate(processPage);

    // Insere a data no vetor do processo
    processesByClass[i].push(processDate);

    // Fecha a aba
    await processPage.close();
  }
}

// Exportação da função
module.exports = { extractDate: extractDate };
