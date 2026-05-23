import mongoose from 'mongoose';

export interface IClienteDocument extends mongoose.Document {
  codigoExterno: string;
  dataCadastro: string;
  nome: string;
  foto: string;
  celular: string;
  whatsapp: string;
  telegram: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  pontoDeReferencia: string;
  observacao: string;
}

const clienteSchema = new mongoose.Schema(
  {
    codigoExterno: { type: String, default: '' },
    dataCadastro: { type: String, required: true },
    nome: { type: String, required: true, maxlength: 150 },
    foto: { type: String, default: '' },
    celular: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    telegram: { type: String, default: '' },
    email: { type: String, default: '' },
    cep: { type: String, default: '' },
    logradouro: { type: String, default: '' },
    numero: { type: String, default: '' },
    complemento: { type: String, default: '' },
    bairro: { type: String, default: '' },
    cidade: { type: String, default: '' },
    estado: { type: String, default: '' },
    pontoDeReferencia: { type: String, default: '' },
    observacao: { type: String, default: '' },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export const ClienteModel = mongoose.model<IClienteDocument>('Cliente', clienteSchema, 'cliente');
