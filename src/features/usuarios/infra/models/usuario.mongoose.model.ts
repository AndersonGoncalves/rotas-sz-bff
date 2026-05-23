import * as mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema(
  {
    funcao: { type: String, required: true },
    codigoExterno: { type: String, required: true },
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema, 'usuario');
