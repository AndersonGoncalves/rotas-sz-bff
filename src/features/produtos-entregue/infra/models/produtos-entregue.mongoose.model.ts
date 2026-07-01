import mongoose from 'mongoose';

const produtosEntregueSchema = new mongoose.Schema(
  {
    dataRomaneio: { type: String, required: true },
    codigoTecnico: { type: String, required: true },
    importado: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false },
);

produtosEntregueSchema.index({ importado: 1, dataRomaneio: -1 });

export const ProdutosEntregueModel = mongoose.model(
  'ProdutosEntregue',
  produtosEntregueSchema,
  'produtos_entregue',
);
