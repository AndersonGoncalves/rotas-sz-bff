export interface IFuncionario {
  id?: string;
  funcao: string;
  codigoExterno?: string;
  nome: string;
  email?: string;
  assinatura?: string;
  whatsapp?: string;
  // Preferências de roteirização do técnico — antes salvas só no
  // SharedPreferences do aparelho (perdidas ao trocar de dispositivo e
  // invisíveis para o gerente); ver tela "Configurações" do app.
  origemRotaPadrao?: string;
  enderecoEmpresaRota?: string;
  destinoRotaPadrao?: string;
  enderecoFinalRota?: string;
  modoTransporteRota?: string;
  tempoMedioAtendimentoMinutos?: number;
  consumoMedioKmPorLitro?: number;
}
