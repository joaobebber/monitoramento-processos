// Importação dos tipos locais
import type { IProcess } from '../../types/IProcess';

// Função que filtra os processos por data
async function dateFilter(
  date: string,
  processesByClass: IProcess[]
) {
  // Vetor que armazena os processos desejados
  const processesByClassAndDate: IProcess[] = [];

  // Desconstrução da data escolhida em: dia, mês, ano
  const [day, month, year] = date.split('/');

  for (let i = 0; i < processesByClass.length; i++) {
    // Indica se a data do processo é posterior ou não à data escolhida
    let validDate = false;

    // Armazena a data do processo
    const processDate = processesByClass[i].date;

    // Descontrução da data do processo em: dia, mês, ano
    const [dayP, monthP, yearP] = processDate.split('/');

    // Se o ano do processo for maior que o ano escolhido
    if (yearP > year) {

      validDate = true;

      // Se o ano do processo for igual ao ano escolhido
    } else if (yearP == year) {
      // Se o mês do processo for maior que o mês escolhido
      if (monthP > month) {

        validDate = true;

        // Se o mês do processo for igual ao mês escolhido
      } else if (monthP == month) {
        // Se o dia do processo for maior ou igual ao dia escolhido
        if (dayP >= day) {

          validDate = true;

        }
      }
    }

    // Se a data for válida, insere o processo no vetor
    if (validDate == true) processesByClassAndDate.push(processesByClass[i]);
  }

  return processesByClassAndDate;
}

// Exportação da função
export default dateFilter;
