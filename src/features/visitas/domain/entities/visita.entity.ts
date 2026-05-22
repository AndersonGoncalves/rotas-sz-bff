export interface IVisita {
  id?: string;
  dataVisita: string;
  codigoVendedor: string;
  nomeVendedor: string;
  codigoVisitante: string;
  nomeVisitante: string;
  situacao: string;
  motivoSituacao?: string;
  nomeCliente?: string;
  nomeContato?: string;
  telefone1?: string;
  telefone2?: string;
  telefone3?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pontoDeReferencia?: string;
  observacao?: string;
  index?: number;
  horaVisita: string;
  turno: string;
}
