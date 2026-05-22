// Campos em formato flat, espelhando o DTO do app Flutter (cliente_dto.dart)
export interface ICliente {
  id?: string;
  codigoExterno?: string;
  dataCadastro: string;
  nome: string;
  foto?: string;
  // contato
  celular?: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  // endereço
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pontoDeReferencia?: string;
  observacao?: string;
}
