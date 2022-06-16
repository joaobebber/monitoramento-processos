// Função que filtra os processos por classe
async function classFilter(processClass, processes) {
  // Vetor que armazena os processos desejados
  const processesByClass: any[] = [];

  // Insere no vetor apenas os processos com a classe escolhida
  for (let i = 0; i < processes.length; i++) {
    if (processes[i][1] == processClass) processesByClass.push(processes[i]);
  }
  
  return processesByClass;
}

// Exportação da função
export default classFilter;
