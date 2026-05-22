export interface IChecklistAssistenciaAguaNatural {
  id?: string;
  pedidoId: string;
  codigoCliente: string;
  idCliente: string;
  nomeCliente: string;
  numeroSerie: string;
  modelo: string;
  trincado: boolean;
  volante: boolean;
  adesivoDesgastado: boolean;
  amarelado: boolean;
  torneira: boolean;
  rabicho: boolean;
  maisInformacoes: string;
  descricaoDoDefeito: string;
  dataChecklist: string;
}
