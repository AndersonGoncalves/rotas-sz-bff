import mongoose from 'mongoose';

const boolField = { type: Boolean, default: false };
const strField = { type: String, default: '' };

const checklistAguaNaturalSchema = new mongoose.Schema(
  {
    pedidoId: { type: String, required: true },
    codigoCliente: { type: String, required: true },
    idCliente: { type: String, required: true },
    nomeCliente: { type: String, required: true },
    numeroSerie: { type: String, required: true },
    modelo: { type: String, required: true },
    trincado: boolField,
    volante: boolField,
    adesivoDesgastado: boolField,
    amarelado: boolField,
    torneira: boolField,
    rabicho: boolField,
    maisInformacoes: strField,
    descricaoDoDefeito: strField,
    dataChecklist: { type: String, required: true },
  },
  { timestamps: false, versionKey: false },
);

export const ChecklistAssistenciaAguaNaturalModel = mongoose.model('ChecklistAssistenciaAguaNatural', checklistAguaNaturalSchema, 'checklist_assistencia_agua_natural');
