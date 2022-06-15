// Importação de bibliotecas
const puppeteer = require('puppeteer');

// Importação de funções
const auth = require("./services/authService.js").auth;

const extract = require("./services/extractService.js").extract;
const extractDate = require("./services/extractDateService.js").extractDate;

const processGen = require("./helper/generators/processGen.js").processGen;

const classFilter = require("./helper/filters/classFilter.js").classFilter;
const dateFilter = require("./helper/filters/dateFilter.js").dateFilter;

const formatProcesses = require("./services/formatProcessesService.js").formatProcesses;

// Importação de variáveis globais
const { BASEURL, CLASS, CLIENT, DATE } = require("./config/params.js");

async function robot() {
  // Abertura do navegador
  const browser = await puppeteer.launch({ headless: true });

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
