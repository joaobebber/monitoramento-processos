// Função que formata o nome do cliente para ser inserido na rota do site
function formatClient(client: string) {
  // Armazena o nome do cliente formatado
  let formattedClient: string;

  // Desconstrução do nome do cliente em palavras
  const temp = client.split(' ');

  // Inclusão da primeira palavra no nome formatado seguida de '+'
  formattedClient = temp[0] + '+';

  for (let i = 1; i < (temp.length - 1); i++) {
    // Inclusão das palavras intermediárias no nome formatado seguida de '+'
    formattedClient = formattedClient + temp[i] + '+';
  }

  // Inclusão da última palavra no nome formatado
  formattedClient = formattedClient + temp[temp.length - 1];

  return formattedClient;
}

// Exportação da função
export default formatClient;
