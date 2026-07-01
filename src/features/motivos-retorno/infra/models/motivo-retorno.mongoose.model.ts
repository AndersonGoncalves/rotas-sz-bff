import mongoose from 'mongoose';

const motivoRetornoSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

motivoRetornoSchema.index({ descricao: 1 });

export const MotivoRetornoModel = mongoose.model('MotivoRetorno', motivoRetornoSchema, 'motivoRetorno');
