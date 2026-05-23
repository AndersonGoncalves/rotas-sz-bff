import * as mongoose from 'mongoose';

const visitaSchema = new mongoose.Schema(
  {
    dataVisita: { type: String, required: true },
    codigoVendedor: { type: String, required: true },
    nomeVendedor: { type: String, required: true },
    codigoVisitante: { type: String, required: true },
    nomeVisitante: { type: String, required: true },
    situacao: { type: String, required: true },
    motivoSituacao: { type: String },
    nomeCliente: { type: String },
    nomeContato: { type: String },
    telefone1: { type: String },
    telefone2: { type: String },
    telefone3: { type: String },
    cep: { type: String },
    logradouro: { type: String },
    numero: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    cidade: { type: String },
    estado: { type: String },
    pontoDeReferencia: { type: String },
    observacao: { type: String },
    index: { type: Number },
    horaVisita: { type: String, required: true },
    turno: { type: String, required: true },
  },
  { timestamps: false, versionKey: false }
);

export const VisitaModel = mongoose.model('Visita', visitaSchema, 'visita');
