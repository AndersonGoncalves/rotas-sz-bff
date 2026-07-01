import mongoose from 'mongoose';

const motivoSituacaoSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

motivoSituacaoSchema.index({ descricao: 1 });

export const MotivoSituacaoModel = mongoose.model('MotivoSituacao', motivoSituacaoSchema, 'motivoSituacao');
