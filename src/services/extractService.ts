// Importação de funções
const { extractNumberOfPages } = require("../helper/extracts/extractNumberOfPages");
const { extractProcessId } = require("../helper/extracts/extractProcessId");
const { extractProcessClass } = require("../helper/extracts/extractProcessClass");
const { formatClient } = require("./formatClientService");

// Função que realiza a extração dos dados (id e classe) dos processos
async function extract(browser, BASEURL, CLIENT) {
  // Cria uma nova aba
  const extractPage = await browser.newPage();

  // Entra na página de extração
  const formattedClient = await formatClient(CLIENT);
  await extractPage.goto(BASEURL + `/cpopg/search.do?conversationId=&cbPesquisa=NMPARTE&dadosConsulta.valorConsulta=${formattedClient}&dadosConsulta.localPesquisa.cdLocal=-1`);

  // Extrai o número de páginas de processos
  const numberOfPages = await extractNumberOfPages(extractPage);
  
  // Extrai o id dos processos
  const ids = await extractProcessId(extractPage);
  
  // Extrai a classe dos processos
  const classes = await extractProcessClass(extractPage);

  // Fecha a aba
  await extractPage.close();

  const v1: any[] = [];
  const v2: any[] = [];

  for (let i = 0; i < (numberOfPages - 1); i++) {
    // Cria uma nova aba
    const extractPage = await browser.newPage();

    // Entra na página de extração
    await extractPage.goto(BASEURL + '/cpopg/trocarPagina.do?paginaConsulta=' + `${i+2}` + '&conversationId=&cbPesquisa=NMPARTE&dadosConsulta.valorConsulta=industria+de+produtos+alimenticios+cory&dadosConsulta.localPesquisa.cdLocal=-1');

    // Extrai o id dos processos
    const ids_temp = await extractProcessId(extractPage);
    v1.push(ids_temp);
    
    // Extrai a classe dos processos
    const classes_temp = await extractProcessClass(extractPage);
    v2.push(classes_temp);

    // Fecha a aba
    await extractPage.close();
  }

  // Atualiza os vetores de dados
  updateArrays(numberOfPages, ids, classes, v1, v2);

  return { ids, classes };
}

// Função que insere o vetor 2 no vetor 1
function append(array1, array2) {
  for (let i = 0; i < array2.length; i++) {
    array1.push(array2[i]);
  }
}

// Função que atualiza os vetores dos dados
function updateArrays(numberOfPages, ids, classes, v1, v2) {
  if (numberOfPages == 2) {
    append(ids, v1[0]);
    append(classes, v2[0]);
  } else if (numberOfPages == 3) {
    append(ids, v1[0]);
    append(ids, v1[1]);
    append(classes, v2[0]);
    append(classes, v2[1]);
  } else if (numberOfPages == 4) {
    append(ids, v1[0]);
    append(ids, v1[1]);
    append(ids, v1[2]);
    append(classes, v2[0]);
    append(classes, v2[1]);
    append(classes, v2[2]);
  } else if (numberOfPages == 5) {
    append(ids, v1[0]);
    append(ids, v1[1]);
    append(ids, v1[2]);
    append(ids, v1[3]);
    append(classes, v2[0]);
    append(classes, v2[1]);
    append(classes, v2[2]);
    append(classes, v2[3]);
  } else if (numberOfPages == 6) {
    append(ids, v1[0]);
    append(ids, v1[1]);
    append(ids, v1[2]);
    append(ids, v1[3]);
    append(ids, v1[4]);
    append(classes, v2[0]);
    append(classes, v2[1]);
    append(classes, v2[2]);
    append(classes, v2[3]);
    append(classes, v2[4]);
  } else if (numberOfPages == 7) {
    append(ids, v1[0]);
    append(ids, v1[1]);
    append(ids, v1[2]);
    append(ids, v1[3]);
    append(ids, v1[4]);
    append(ids, v1[5]);
    append(classes, v2[0]);
    append(classes, v2[1]);
    append(classes, v2[2]);
    append(classes, v2[3]);
    append(classes, v2[4]);
    append(classes, v2[5]);
  }
}

// Exportação da função
export default extract;
