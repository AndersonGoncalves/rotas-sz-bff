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
    assinatura: { type: String, default: '' },
    cliente: { type: mongoose.Schema.Types.Mixed, default: null },
    codigoCliente: { type: String, default: '' },
    codigoExterno: { type: String, default: '' },
    codigoTecnico: { type: String, default: '' },
    codigoVendedor: { type: String, default: '' },
    dadosPedidoDeCobranca: { type: String, default: '' },
    dataRomaneio: { type: String, default: '' },
    dataVisita: { type: String, default: '' },
    enderecoCobranca: { type: String, default: '' },
    horaInstalacao: { type: String, default: '' },
    idCliente: { type: String, default: '' },
    index: { type: Number, default: 0 },
    nomeCliente: { type: String, default: '' },
    nomeTecnico: { type: String, default: '' },
    nomeVendedor: { type: String, default: '' },
    observacao: { type: String, default: '' },
    pendencia: { type: String, default: '' },
    prazoPagamento: { type: String, default: '' },
    produtos: { type: [produtoSchema], default: [] },
    quemAssinou: { type: String, default: '' },
    situacao: { type: Number, default: 0 },
    situacaoRomaneio: { type: String, default: '' },
    tipoVenda: { type: String, default: '' },
    tiposPagamento: { type: [tipoPagamentoSchema], default: [] },
    turno: { type: String, default: '' },
    importado: { type: Boolean, default: false },
    pedidoOrigemId: { type: String, default: null },
    pedidoPecasId: { type: String, default: null },
    pedidoPecas: { type: Boolean, default: null },
  },
  { timestamps: false, versionKey: false },
);

export const PedidoModel = mongoose.model('Pedido', pedidoSchema, 'pedido');
