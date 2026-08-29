import mongoose from 'mongoose';

const funcionarioSchema = new mongoose.Schema(
  {
    funcao: { type: String, required: true },
    codigoExterno: { type: String, default: '' },
    nome: { type: String, required: true },
    email: { type: String, default: '' },
    assinatura: { type: String, default: null },
    // Preferências de roteirização do técnico (tela "Configurações" do
    // app) — os defaults abaixo são os mesmos que o app usava como padrão
    // via SharedPreferences antes dessa migração (ver `Preferencias` em
    // core/constants/preferencias.dart no app), aplicados automaticamente
    // a todo funcionário novo. Funcionários já existentes antes dessa
    // migração continuam com `null` até salvarem algo em Configurações —
    // o app já sabe cair pro mesmo padrão nesse caso.
    origemRotaPadrao: { type: String, default: 'atual' },
    enderecoEmpresaRota: {
      type: String,
      default: 'Av. Duque de Caxias, 68, Centro Fortaleza - CE',
    },
    destinoRotaPadrao: { type: String, default: 'empresa' },
    enderecoFinalRota: {
      type: String,
      default: 'Av. Duque de Caxias, 68, Centro Fortaleza - CE',
    },
    modoTransporteRota: { type: String, default: 'moto' },
    tempoMedioAtendimentoMinutos: { type: Number, default: 15 },
    consumoMedioKmPorLitro: { type: Number, default: 10.0 },
  },
  { timestamps: false, versionKey: false },
);

funcionarioSchema.index({ nome: 1 });

export const FuncionarioModel = mongoose.model('Funcionario', funcionarioSchema, 'funcionario');
