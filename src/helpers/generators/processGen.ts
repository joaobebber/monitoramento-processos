// Importação dos tipos locais
import type { IProcess } from '../../types/IProcess';
import type { IProcessId } from '../../types/IProcessId';

// Função que gera um vetor para cada processo contendo suas informações
function processGen(ids: IProcessId[], classes: string[], client: string) {
  // Vetor que armazena os processos
  const processes: IProcess[] = [];

  for (let i = 0; i < ids.length; i++) {
    // Armazena o id e a classe do processo
    const process: IProcess = {
      client: client,
      id: ids[i].id,
      href: ids[i].href,
      class: classes[i],
      date: 'undefined'
    };

    // Insere o processo no vetor
    processes.push(process);
  }

  return processes;
}

// Exportação da função
export default processGen;
