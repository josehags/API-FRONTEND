import { type } from '@testing-library/user-event/dist/type';
import { useEffect, useState } from 'react';

export interface ICidades {
  nome: string;
  codigo_ibge: string;
}
type Props = {
  uf: string;
};
export const useListCidade = ({ uf }: Props) => {
  const [cidades, setCidades] = useState<ICidades[]>([]);

  useEffect(() => {
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/${uf}/municipios?view=nivelado `,
    )
      .then(response => response.json())
      .then(data => setCidades(data));
  }, [uf]);

  return {
    cidades,
  };
};
