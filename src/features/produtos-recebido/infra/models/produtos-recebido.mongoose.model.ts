import mongoose from 'mongoose';

const produtosRecebidoSchema = new mongoose.Schema(
  {
    dataRomaneio: { type: String, required: true },
    codigoTecnico: { type: String, required: true },
    importado: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false },
);

produtosRecebidoSchema.index({ importado: 1, dataRomaneio: -1 });

export const ProdutosRecebidoModel = mongoose.model(
  'ProdutosRecebido',
  produtosRecebidoSchema,
  'produtos_recebido',
);
