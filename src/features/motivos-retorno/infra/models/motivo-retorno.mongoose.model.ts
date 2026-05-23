import mongoose from 'mongoose';

const motivoRetornoSchema = new mongoose.Schema(
  {
    descricao: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const MotivoRetornoModel = mongoose.model('MotivoRetorno', motivoRetornoSchema, 'motivoRetorno');
