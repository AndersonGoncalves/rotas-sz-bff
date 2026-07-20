import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    idProduto: { type: String, default: '' },
    idPedido: { type: String, default: '' },
    codigoPedido: { type: String, default: '' },
    codigoProduto: { type: String, default: '' },
    descricao: { type: String, default: '' },
    quantidade: { type: Number, default: 0 },
    precoUnitario: { type: Number, default: 0 },
    precoMinimo: { type: Number, default: 0 },
    situacaoRomaneio: { type: String, default: '' },
  },
  { _id: false },
);

const tipoPagamentoSchema = new mongoose.Schema(
  {
    id: { type: String, default: '' },
    descricao: { type: String, default: '' },
    valor: { type: Number, default: 0 },
    quantidade: { type: Number, default: 0 },
  },
  { _id: false },
);

const pedidoSchema = new mongoose.Schema(
  {
    _id: { type: String },
    id: { type: String, default: '' },
    acrescimo: { type: Number, default: 0 },
    assinatura: { type: String, default: '' },
    cliente: { type: mongoose.Schema.Types.Mixed, default: null },
    codigoCliente: { type: String, default: '' },
    codigoExterno: { type: String, default: '' },
    codigoTecnico: { type: String, default: '' },
    codigoVendedor: { type: String, default: '' },
    dadosPedidoDeCobranca: { type: String, default: '' },
    dataRomaneio: { type: String, default: '' },
    dataVisita: { type: String, default: '' },
    desconto: { type: Number, default: 0 },
    enderecoCobranca: { type: String, default: '' },
    fotos: { type: [String], default: [] },
    frete: { type: Number, default: 0 },
    horaInstalacao: { type: String, default: '' },
    idCliente: { type: String, default: '' },
    index: { type: Number, default: 0 },
    lancado: { type: Boolean, default: null },
    lancadoComercial: { type: Boolean, default: null },
    lancadoLogistica: { type: Boolean, default: null },
    nomeCliente: { type: String, default: '' },
    nomeTecnico: { type: String, default: '' },
    nomeVendedor: { type: String, default: '' },
    numeroInformadoPeloTecnico: { type: Boolean, default: null },
    observacao: { type: String, default: '' },
    observacaoTecnico: { type: String, default: '' },
    ordemServicoEnviada: { type: Boolean, default: null },
    pedidoTeste: { type: String, default: '0' },
    pendencia: { type: String, default: '' },
    prazoPagamento: { type: String, default: '' },
    produtos: { type: [produtoSchema], default: [] },
    quemAssinou: { type: String, default: '' },
    servicos: { type: [produtoSchema], default: [] },
    situacao: { type: Number, default: 0 },
    situacaoRomaneio: { type: String, default: '' },
    tipoPedido: { type: String, default: '' },
    tipoVenda: { type: String, default: '' },
    tiposPagamento: { type: [tipoPagamentoSchema], default: [] },
    transformadoEmVipzon: { type: Boolean, default: false },
    turno: { type: String, default: '' },
    importado: { type: Boolean, default: false },
    pedidoOrigemId: { type: String, default: null },
  },
  { timestamps: false, versionKey: false },
);

pedidoSchema.index({ codigoTecnico: 1, importado: 1, dataRomaneio: -1 });

export const PedidoModel = mongoose.model('Pedido', pedidoSchema, 'pedido');
