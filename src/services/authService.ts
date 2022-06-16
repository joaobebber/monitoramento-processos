// Importação dos tipos das dependências
import type { Browser } from "puppeteer";

// Importação de funções
import login from "../helpers/auth/login";

// Importação de variáveis globais
import { CPF, PASSWORD } from '../config/auth';

// Função que realiza a autenticação (login)
async function auth(browser: Browser, BASEURL: string) {
  // Cria uma nova aba
  const loginPage = await browser.newPage();

  // Entra na página de autenticação
  await loginPage.goto(BASEURL + '/cpopg/open.do?gateway=true');

  // Preenche as informações da autenticação
  await login(loginPage, CPF, PASSWORD);

  // Espera 4 segundos
  await loginPage.waitForTimeout(4000);

  // Fecha a aba
  await loginPage.close();
}

// Exportação da função
export default auth;
