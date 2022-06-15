// Importação de bibliotecas
import Puppeteer from 'puppeteer';

// Importação de funções
import auth from './services/authService';

import extract from './services/extractService';
import extractDate from './services/extractDateService';

import processGen from './helper/generators/processGen';

const classFilter = require("./helper/filters/classFilter.js").classFilter;
const dateFilter = require("./helper/filters/dateFilter.js").dateFilter;

const formatProcesses = require("./services/formatProcessesService.js").formatProcesses;

// Importação de variáveis globais
import { BASEURL, CLASS, CLIENT, DATE } from "./config/params";

async function robot() {
  // Abertura do navegador
  const browser = await Puppeteer.launch({ headless: true });

  // Autenticação
  await auth(browser, BASEURL);

  // Extração do id e da classe dos processos
  const { ids, classes } = await extract(browser, BASEURL, CLIENT);

  // Cria processos na forma de vetores
  const processes = processGen(ids, classes);

  // Filtra os processos pela classe escolhida
  const processesByClass = await classFilter(CLASS, processes);

  // Extração da data da última modificação dos processos
  await extractDate(browser, BASEURL, processesByClass);

  // Filtra os processos pela data desejada
  const processesByClassAndDate = await dateFilter(DATE, processesByClass);

  // Estrutura os processos filtrados em objetos
  const formattedProcesses = formatProcesses(processesByClassAndDate, CLIENT);

  // Imprime no terminal os processos a serem analisados
  console.log({
    title: 'Processos a serem analisados',
    processes: formattedProcesses
  });

  await browser.close();
}

robot();
