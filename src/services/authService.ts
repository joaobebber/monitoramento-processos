// Importação de funções
import login from "../helper/auth/login";

// Importação de variáveis globais
const { CPF, PASSWORD } = require("../config/auth.js");

// Função que realiza a autenticação (login)
async function auth(browser, BASEURL) {
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
