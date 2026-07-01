import * as mongoose from 'mongoose';

const tituloSchema = new mongoose.Schema(
  {
    tpgCodigo: { type: Number, required: true, unique: true },
    centroCusto: { type: String, required: true },
    conta: { type: String, required: true },
    codigoCliente: { type: String },
    nomeCliente: { type: String },
    fornecedor: { type: String },
    tpgNumero: { type: String, required: true },
    tpgSequencia: { type: Number, required: true },
    dataVencimento: { type: String, required: true },
    valorAPagar: { type: Number, required: true },
    tpgObservacao: { type: String },
    tipoTitulo: { type: String, required: true },
    situacaoTitulo: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

tituloSchema.index({ dataVencimento: 1 });

export const TituloModel = mongoose.model('Titulo', tituloSchema, 'titulo');
