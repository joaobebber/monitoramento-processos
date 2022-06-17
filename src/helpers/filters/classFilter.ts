// Importação dos tipos locais
import type { IProcess } from '../../interfaces/IProcess';

// Função que filtra os processos por classe
async function classFilter(
  processClass: string,
  processes: IProcess[]
) {
  // Vetor que armazena os processos desejados
  const processesByClass: IProcess[] = [];

  // Insere no vetor apenas os processos com a classe escolhida
  for (let i = 0; i < processes.length; i++) {
    if (processes[i].class == processClass) processesByClass.push(processes[i]);
  }
  
  return processesByClass;
}

// Exportação da função
export default classFilter;
