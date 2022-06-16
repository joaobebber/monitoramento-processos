// Importação de bibliotecas
import Puppeteer from 'puppeteer';

// Importação de variáveis globais
import { BASEURL, paramsData } from "./config/params";

// Importação de funções
import processGen from './helpers/generators/processGen';
import classFilter from './helpers/filters/classFilter';
import dateFilter from './helpers/filters/dateFilter';

import auth from './services/authService';
import extract from './services/extractService';
import extractDate from './services/extractDateService';

async function robot() {
  // Abertura do navegador
  const browser = await Puppeteer.launch({ headless: true });

  // Autenticação
  await auth(browser, BASEURL);

  // Extração do id e da classe dos processos
  const { ids, classes } = await extract(browser, BASEURL, paramsData.client);

  // Cria processos na forma de vetores
  const processes = processGen(ids, classes, paramsData.client);

  // Filtra os processos pela classe escolhida
  const processesByClass = await classFilter(paramsData.class, processes);

  // Extração da data da última modificação dos processos
  await extractDate(browser, BASEURL, processesByClass);

  // Filtragem dos processos pela data desejada
  const processesByClassAndDate = await dateFilter(paramsData.date, processesByClass);

  // Impressão no terminal dos processos a serem analisados
  console.log({
    title: 'Processos a serem analisados',
    processes: processesByClassAndDate
  });

  // Fechamento do navegador
  await browser.close();
}

robot();
