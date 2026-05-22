export interface IProduto {
  id?: string;
  dataCadastro: string;
  codigoBarras?: string;
  codigoExterno?: string;
  nome: string;
  referencia?: string;
  descricao?: string;
  marca?: string;
  categoria?: string;
  ncm?: string;
  quantidadeEmEstoque: number;
  localNoDeposito?: string;
  precoDeCusto: number;
  precoDeVenda: number;
  unidadeMedida: string;
  fotos?: string[];
}
