import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema(
  {
    funcao: { type: String, required: true },
    codigoExterno: { type: String, default: '' },
    nome: { type: String, required: true },
    email: { type: String, default: '' },
    assinatura: { type: String, default: null },
  },
  { timestamps: false, versionKey: false },
);

funcionarioSchema.index({ nome: 1 });

export const FuncionarioModel = mongoose.model('Funcionario', funcionarioSchema, 'funcionario');
