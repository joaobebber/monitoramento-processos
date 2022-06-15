// Função que obtém o número de páginas de processos
async function extractNumberOfPages(extractPage) {
  const numberOfPages = await extractPage.evaluate(async () => {
    // Obtém os elementos de classe 'paginacao'
    let doublePagination = $('.paginacao').length;

    // Obtém o número de paginações, pois aparece em dobro no site
    const pagination = doublePagination / 2;

    return pagination + 1;
  });

  return numberOfPages;
}

// Exportação da função
module.exports = { extractNumberOfPages: extractNumberOfPages };
