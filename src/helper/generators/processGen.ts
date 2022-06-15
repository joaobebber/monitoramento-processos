// Função que gera um vetor para cada processo contendo suas informações
function processGen(ids, classes) {
  // Vetor que armazena os processos
  const processes: any[] = [];

  for (let i = 0; i < ids.length; i++) {
    // Armazena o id e a classe do processo
    const processId = ids[i];
    const processClass = classes[i];

    // Cria o processo contendo ambas as informações
    const process = [processId, processClass];

    // Insere o processo no vetor
    processes.push(process);
  }

  return processes;
}

// Exportação da função
export default processGen;
