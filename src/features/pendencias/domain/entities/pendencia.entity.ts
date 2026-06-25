export interface IPendencia {
  id?: string;
  pedidoId: string;
  codigoCliente: string;
  idCliente: string;
  nomeCliente: string;
  idMotivoRetorno?: string | null;
  pendencia: string;
  observacao: string;
  dataRomaneio: string;
  importado?: boolean | null;
}
