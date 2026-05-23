import mongoose from 'mongoose';

const produtosRecebidoSchema = new mongoose.Schema(
  {
    dataRomaneio: { type: String, required: true },
    codigoTecnico: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const ProdutosRecebidoModel = mongoose.model('ProdutosRecebido', produtosRecebidoSchema, 'produtos_recebido');
