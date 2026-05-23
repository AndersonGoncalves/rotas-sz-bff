import mongoose from 'mongoose';

// Schema para itens do carrinho (produtos/servicos) — chaves iguais ao CarrinhoDto.toMap()
const carrinhoSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    idProduto: { type: String, default: null },
    variacaoProdutoId: { type: String, default: null },
    servicoId: { type: String, default: null },
    descricao: { type: String, default: '' },
    quantidade: { type: Number, default: 0 },
    precoUnitario: { type: Number, default: 0 },
    desconto: { type: Number, default: 0 },
    devolvido: { type: Number, default: 0 },
    devolucaoLancada: { type: Boolean, default: null },
    precoMinimo: { type: Number, default: null },
  },
  { _id: false },
);

const tipoPagamentoSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    descricao: { type: String, required: true },
    valor: { type: Number, default: 0 },
    quantidade: { type: Number, default: 0 },
  },
  { _id: false },
);

// Pedido usa _id como String para aceitar IDs gerados pelo app Flutter
const pedidoSchema = new mongoose.Schema(
  {
    _id: { type: String },
    codigoCliente: { type: String, default: '' },
    codigoExterno: { type: String, default: '' },
    idCliente: { type: String, default: '' },
    nomeCliente: { type: String, default: '' },
    codigoTecnico: { type: String, default: '' },
    codigoVendedor: { type: String, default: '' },
    nomeVendedor: { type: String, default: '' },
    nomeTecnico: { type: String, default: '' },
    dataRomaneio: { type: String, default: '' },
    dataVisita: { type: String, default: null },
    pendencia: { type: String, default: '' },
    prazoPagamento: { type: String, default: '' },
    situacao: { type: Number, default: 0 },
    frete: { type: Number, default: 0 },
    acrescimo: { type: Number, default: 0 },
    desconto: { type: Number, default: 0 },
    observacao: { type: String, default: '' },
    situacaoRomaneio: { type: String, default: '' },
    tiposPagamento: { type: [tipoPagamentoSchema], default: null },
    tipoVenda: { type: String, default: '' },
    tipoPedido: { type: String, default: '' },
    turno: { type: String, default: '' },
    pedidoTeste: { type: String, default: '0' },
    index: { type: Number, default: 0 },
    cliente: { type: mongoose.Schema.Types.Mixed, default: null },
    produtos: { type: [carrinhoSchema], default: null },
    servicos: { type: [carrinhoSchema], default: null },
    fotos: { type: [String], default: [] },
    assinatura: { type: String, default: null },
    horaInstalacao: { type: String, default: '' },
    lancado: { type: Boolean, default: null },
    lancadoLogistica: { type: Boolean, default: null },
    lancadoComercial: { type: Boolean, default: null },
    quemAssinou: { type: String, default: '' },
    transformadoEmVipzon: { type: Boolean, default: false },
    ordemServicoEnviada: { type: Boolean, default: null },
    numeroInformadoPeloTecnico: { type: Boolean, default: null },
    observacaoTecnico: { type: String, default: '' },
    enderecoCobranca: { type: String, default: null },
    dadosPedidoDeCobranca: { type: String, default: null },
  },
  { timestamps: false, versionKey: false },
);

export const PedidoModel = mongoose.model('Pedido', pedidoSchema, 'pedido');
