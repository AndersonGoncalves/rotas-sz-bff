import mongoose from 'mongoose';

const produtosEntregueSchema = new mongoose.Schema(
  {
    dataRomaneio: { type: String, required: true },
    codigoTecnico: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const ProdutosEntregueModel = mongoose.model('ProdutosEntregue', produtosEntregueSchema);
