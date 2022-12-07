import { useEffect, useState } from 'react';

export interface ICidade {
  nome: string;
  codigo_ibge: string;
}
export const useCidades = () => {
  const [cidades, setCidades] = useState<ICidade[]>([]);

  useEffect(() => {
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios?view=nivelado`,
    )
      .then(res => res.json())
      .then(data => setCidades(data));
  }, []);

  return {
    cidades,
  };
};
