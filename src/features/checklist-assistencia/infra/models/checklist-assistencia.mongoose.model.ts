import mongoose from 'mongoose';

const boolField = { type: Boolean, default: false };
const strField = { type: String, default: '' };

const checklistAssistenciaSchema = new mongoose.Schema(
  {
    pedidoId: { type: String, required: true },
    codigoCliente: { type: String, required: true },
    idCliente: { type: String, required: true },
    nomeCliente: { type: String, required: true },
    numeroSerie: { type: String, required: true },
    modelo: { type: String, required: true },
    botaoAguaGelada: boolField,
    botaoAguaGeladaFuncionando: boolField,
    botaoAguaNatural: boolField,
    botaoAguaNaturalFuncionando: boolField,
    painelSemTrinca: boolField,
    painelSemViolacaoEncaixes: boolField,
    painelComAdesivoFrontal: boolField,
    painelComColoracaoAmarelado: boolField,
    torneiraPingando: boolField,
    torneiraComPoucoVazao: boolField,
    semATorneira: boolField,
    comAPingadeira: boolField,
    pingadeiraAmassada: boolField,
    pingadeiraSemGrade: boolField,
    pingadeiraArranhada: boolField,
    gabineteComFerrugem: boolField,
    pinturaDesgastada: boolField,
    amassadoNoGabinete: boolField,
    gabineteComCaixaEletrica: boolField,
    ausenciaFiltroCompartimento: boolField,
    ausenciaTampaCompartimento: boolField,
    ausenciaEngate: boolField,
    violacaoEncaixeCompartimento: boolField,
    contemTodosPedais: boolField,
    condensadorSemArranhoes: boolField,
    condensadorSemAmassado: boolField,
    condensadorSemFerrugem: boolField,
    compressorSemBarulho: boolField,
    caboCortado: boolField,
    plugMachoTrocado: boolField,
    caboResecado: boolField,
    maisInformacoes: strField,
    descricaoDoDefeito: strField,
    dataChecklist: { type: String, required: true },
    importado: { type: Boolean, default: false },
  },
  { timestamps: false, versionKey: false },
);

export const ChecklistAssistenciaModel = mongoose.model(
  'ChecklistAssistencia',
  checklistAssistenciaSchema,
  'checklist_assistencia',
);
