// Campos do CarrinhoDto.toMap() — chaves idênticas ao Flutter
export interface ICarrinho {
  id: string;
  idProduto?: string;
  variacaoProdutoId?: string;
  servicoId?: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  desconto: number;
  devolvido: number;
  devolucaoLancada?: boolean | null;
  precoMinimo?: number | null;
}

export interface ITipoPagamento {
  id: string;
  descricao: string;
  valor?: number;
  quantidade?: number;
}

export interface IPedido {
  id?: string;
  codigoCliente: string;
  codigoExterno: string;
  idCliente: string;
  nomeCliente: string;
  codigoTecnico: string;
  codigoVendedor: string;
  nomeVendedor: string;
  nomeTecnico: string;
  dataRomaneio: string;
  dataVisita?: string | null;
  pendencia: string;
  prazoPagamento: string;
  situacao: number;
  frete: number;
  acrescimo: number;
  desconto: number;
  observacao?: string;
  situacaoRomaneio: string;
  tiposPagamento?: ITipoPagamento[] | null;
  tipoVenda: string;
  tipoPedido: string;
  turno: string;
  pedidoTeste: string;
  index?: number;
  cliente?: Record<string, any> | null;
  produtos?: ICarrinho[] | null;
  servicos?: ICarrinho[] | null;
  fotos?: string[];
  assinatura?: string | null;
  horaInstalacao: string;
  lancado?: boolean | null;
  lancadoLogistica?: boolean | null;
  lancadoComercial?: boolean | null;
  quemAssinou?: string;
  transformadoEmVipzon?: boolean;
  ordemServicoEnviada?: boolean | null;
  numeroInformadoPeloTecnico?: boolean | null;
  observacaoTecnico?: string;
  enderecoCobranca?: string | null;
  dadosPedidoDeCobranca?: string | null;
  importado?: boolean | null;
}
