// Função que preenche os dados de autenticação (login)
async function login(page, cpf, password) {
  // Insere o CPF no input
  await page.type('#usernameForm', cpf);

  // Insere a senha no input
  await page.type('#passwordForm', password);

  // Pressiona a tecla 'Enter'
  await page.keyboard.press('Enter');
}

// Exportação da função
export default login;
