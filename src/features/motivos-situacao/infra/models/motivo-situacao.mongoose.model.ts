import mongoose from 'mongoose';

const motivoSituacaoSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const MotivoSituacaoModel = mongoose.model('MotivoSituacao', motivoSituacaoSchema);
