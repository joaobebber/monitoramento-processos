// Importação dos tipos das dependências
import type { Browser } from 'puppeteer';

// Importação dos tipos locais
import type { IProcessId } from 'src/interfaces/IProcessId';

// Importação de funções
import extractNumberOfPages from '../helpers/extracts/extractNumberOfPages';
import extractProcessId from '../helpers/extracts/extractProcessId';
import extractProcessClass from '../helpers/extracts/extractProcessClass';

import formatClient from './formatClientService';

// Função que realiza a extração dos dados (id e classe) dos processos
async function extract(browser: Browser, BASEURL: string, CLIENT: string) {
  // Cria uma nova aba
  const extractPage = await browser.newPage();

  // Entra na página de extração
  const formattedClient = formatClient(CLIENT);
  await extractPage.goto(BASEURL + `/cpopg/search.do?conversationId=&cbPesquisa=NMPARTE&dadosConsulta.valorConsulta=${formattedClient}&dadosConsulta.localPesquisa.cdLocal=-1`);

  // Extrai o número de páginas de processos
  const numberOfPages = await extractNumberOfPages(extractPage);
  
  // Extrai o id dos processos
  const ids = await extractProcessId(extractPage);
  
  // Extrai a classe dos processos
  const classes = await extractProcessClass(extractPage);

  // Fecha a aba
  await extractPage.close();

  const ids_temp_array: IProcessId[][] = [];
  const classes_temp_array: string[][] = [];

  for (let i = 0; i < (numberOfPages - 1); i++) {
    // Cria uma nova aba
    const extractPage = await browser.newPage();

    // Entra na página de extração
    await extractPage.goto(BASEURL + '/cpopg/trocarPagina.do?paginaConsulta=' + `${i+2}` + '&conversationId=&cbPesquisa=NMPARTE&dadosConsulta.valorConsulta=industria+de+produtos+alimenticios+cory&dadosConsulta.localPesquisa.cdLocal=-1');

    // Extrai o id dos processos
    const ids_temp = await extractProcessId(extractPage);
    ids_temp_array.push(ids_temp);
    
    // Extrai a classe dos processos
    const classes_temp = await extractProcessClass(extractPage);
    classes_temp_array.push(classes_temp);

    // Fecha a aba
    await extractPage.close();
  }

  // Atualiza os vetores de dados
  updateArrays(numberOfPages, ids, classes, ids_temp_array, classes_temp_array);

  return { ids, classes };
}

// Função que insere o vetor 2 no vetor 1
function append(array1: any[], array2: any[]) {
  for (let i = 0; i < array2.length; i++) {
    array1.push(array2[i]);
  }
}

// Função que atualiza os vetores dos dados
function updateArrays(
  numberOfPages: number,
  ids: IProcessId[],
  classes: string[],
  ids_temp_array: IProcessId[][],
  classes_temp_array: string[][]
) {
  if (numberOfPages == 2) {
    append(ids, ids_temp_array[0]);
    append(classes, classes_temp_array[0]);
  } else if (numberOfPages == 3) {
    append(ids, ids_temp_array[0]);
    append(ids, ids_temp_array[1]);
    append(classes, classes_temp_array[0]);
    append(classes, classes_temp_array[1]);
  } else if (numberOfPages == 4) {
    append(ids, ids_temp_array[0]);
    append(ids, ids_temp_array[1]);
    append(ids, ids_temp_array[2]);
    append(classes, classes_temp_array[0]);
    append(classes, classes_temp_array[1]);
    append(classes, classes_temp_array[2]);
  } else if (numberOfPages == 5) {
    append(ids, ids_temp_array[0]);
    append(ids, ids_temp_array[1]);
    append(ids, ids_temp_array[2]);
    append(ids, ids_temp_array[3]);
    append(classes, classes_temp_array[0]);
    append(classes, classes_temp_array[1]);
    append(classes, classes_temp_array[2]);
    append(classes, classes_temp_array[3]);
  } else if (numberOfPages == 6) {
    append(ids, ids_temp_array[0]);
    append(ids, ids_temp_array[1]);
    append(ids, ids_temp_array[2]);
    append(ids, ids_temp_array[3]);
    append(ids, ids_temp_array[4]);
    append(classes, classes_temp_array[0]);
    append(classes, classes_temp_array[1]);
    append(classes, classes_temp_array[2]);
    append(classes, classes_temp_array[3]);
    append(classes, classes_temp_array[4]);
  } else if (numberOfPages == 7) {
    append(ids, ids_temp_array[0]);
    append(ids, ids_temp_array[1]);
    append(ids, ids_temp_array[2]);
    append(ids, ids_temp_array[3]);
    append(ids, ids_temp_array[4]);
    append(ids, ids_temp_array[5]);
    append(classes, classes_temp_array[0]);
    append(classes, classes_temp_array[1]);
    append(classes, classes_temp_array[2]);
    append(classes, classes_temp_array[3]);
    append(classes, classes_temp_array[4]);
    append(classes, classes_temp_array[5]);
  }
}

// Exportação da função
export default extract;
