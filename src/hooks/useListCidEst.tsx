import { useEffect, useState } from 'react';

export interface Regiao {
  id: number;
  sigla: string;
  nome: string;
}

export interface IEstados {
  id: number;
  sigla: string;
  nome: string;
  regiao: Regiao;
}

// export interface ICidades {
//   nome: string;
//   codigo_ibge: string;
// }

export const useListCidEst = () => {
  const [estados, setEstados] = useState<IEstados[]>([]);
  // const [cidades, setCidades] = useState<ICidades[]>([]);

  useEffect(() => {
    fetch(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/11|12|13|14|15|16|17|21|22|23|24|25|26|27|28|29|31|32|33|35|41|42|43|50|51|52|53',
    )
      .then(response => response.json())
      .then(data => setEstados(data));
  }, []);

  // useEffect(() => {
  //   fetch(
  //     'https://servicodados.ibge.gov.br/api/v1/localidades/estados/11|12|13|14|15|16|17|21|22|23|24|25|26|27|28|29|31|32|33|35|41|42|43|50|51|52|53',
  //   )
  //     .then(response => response.json())
  //     .then(data => setCidades(data));
  // }, []);

  return {
    estados,
    // cidades,
  };
};
