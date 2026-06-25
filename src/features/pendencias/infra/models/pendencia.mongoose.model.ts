import mongoose from 'mongoose';

const pendenciaSchema = new mongoose.Schema(
  {
    pedidoId: { type: String, required: true },
    codigoCliente: { type: String, required: true },
    idCliente: { type: String, required: true },
    nomeCliente: { type: String, required: true },
    idMotivoRetorno: { type: String, default: null },
    pendencia: { type: String, required: true },
    observacao: { type: String, default: '' },
    dataRomaneio: { type: String, default: '' },
    importado: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false },
);

export const PendenciaModel = mongoose.model('Pendencia', pendenciaSchema, 'pendencia');
