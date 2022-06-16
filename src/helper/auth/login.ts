// Importação dos tipos das dependências
import type { Page } from "puppeteer";

// Função que preenche os dados de autenticação (login)
async function login(page: Page, cpf: string, password: string) {
  // Insere o CPF no input
  await page.type('#usernameForm', cpf);

  // Insere a senha no input
  await page.type('#passwordForm', password);

  // Pressiona a tecla 'Enter'
  await page.keyboard.press('Enter');
}

// Exportação da função
export default login;
