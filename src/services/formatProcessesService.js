// Função que formata os processos para serem retornados
function formatProcesses(processesByClassAndDate, CLIENT) {
  // Armazena os processos formatados
  const formattedProcesses = [];

  for (i = 0; i < processesByClassAndDate.length; i++) {
    // Cria o objeto (processo) contendo as informações do processo
    const formattedProcess = {
      id: processesByClassAndDate[i][0][0],
      client: CLIENT,
      class: processesByClassAndDate[i][1],
      date: processesByClassAndDate[i][2]
    }

    // Insere o processo formatado no vetor
    formattedProcesses.push(formattedProcess);
  }

  return formattedProcesses;
}

// Exportação da função
module.exports = { formatProcesses: formatProcesses };
