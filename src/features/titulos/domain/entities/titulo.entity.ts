export interface ITitulo {
  id?: string;
  tpgCodigo: number;
  centroCusto: string;
  conta: string;
  codigoCliente?: string;
  nomeCliente?: string;
  fornecedor?: string;
  tpgNumero: string;
  tpgSequencia: number;
  dataVencimento: string;
  valorAPagar: number;
  tpgObservacao?: string;
  tipoTitulo: string;
  situacaoTitulo: string;
}
