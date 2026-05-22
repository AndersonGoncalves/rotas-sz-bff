import * as mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema(
  {
    dataCadastro: { type: String, required: true },
    codigoBarras: { type: String },
    codigoExterno: { type: String },
    nome: { type: String, required: true },
    referencia: { type: String },
    descricao: { type: String },
    marca: { type: String },
    categoria: { type: String },
    ncm: { type: String },
    quantidadeEmEstoque: { type: Number, required: true, default: 0 },
    localNoDeposito: { type: String },
    precoDeCusto: { type: Number, required: true },
    precoDeVenda: { type: Number, required: true },
    unidadeMedida: { type: String, required: true, default: 'Un' },
    fotos: { type: [String], default: [] },
  },
  { timestamps: false, versionKey: false }
);

export const ProdutoModel = mongoose.model('Produto', produtoSchema);
