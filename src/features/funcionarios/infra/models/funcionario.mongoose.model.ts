import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema(
  {
    funcao: { type: String, required: true },
    codigoExterno: { type: String, default: '' },
    nome: { type: String, required: true },
    email: { type: String, required: true },
    foto: { type: String, default: null },
    assinatura: { type: String, default: null },
  },
  { timestamps: false, versionKey: false },
);

export const FuncionarioModel = mongoose.model('Funcionario', funcionarioSchema);
