// Função que filtra os processos por classe
async function classFilter(processClass, processes) {
  // Vetor que armazena os processos desejados
  const processesByClass = [];

  // Insere no vetor apenas os processos com a classe escolhida
  for (i = 0; i < processes.length; i++) {
    if (processes[i][1] == processClass) processesByClass.push(processes[i]);
  }
  
  return processesByClass;
}

// Exportação da função
module.exports = { classFilter: classFilter };
