const BASE_URL = 'http://localhost:3001/pedidos';

const dataArg = process.argv[2];

if (!dataArg) {
  console.error('Uso: node seed-pedidos.js <data>');
  console.error('Exemplo: node seed-pedidos.js 2026-05-30');
  process.exit(1);
}

const dataRomaneioOverride = `${dataArg}T00:00:00.000`;

const pedidos = [
  {
    "id": "1",
    "assinatura": "",
    "cliente": { "bairro": "MEIRELES", "celular": "99710273", "cep": "60120020", "cidade": "FORTALEZA", "codigoExterno": "219213", "complemento": "PAT 102", "dataCadastro": "2022-03-21T09:56:00", "email": "", "estado": "CE", "foto": "", "id": "219213", "logradouro": "RUA SILVA PAULET", "nome": "VILMA BARRETO PERDIGAO PAES", "numero": "1151", "observacao": "PARA DIA 29/05", "pontoDeReferencia": "ENTRE A SANTOS DUMONT E TORRES CAMERA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "219213", "codigoExterno": "1", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "PARA DIA 29/05", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "219213", "index": 20,
    "nomeCliente": "VILMA BARRETO PERDIGAO PAES", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "PARA DIA 29/05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "1", "codigoProduto": "181", "descricao": "ELEM. FILTRANTE SOFT EVEREST (2 EM 1)", "id": "181", "idPedido": "1", "idProduto": "181", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 198 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "2",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "CIDADE 2000", "celular": "85988133556", "cep": "60190130", "cidade": "FORTALEZA", "codigoExterno": "242503", "complemento": "QUADRA 2", "dataCadastro": "2025-02-15T11:16:00.000", "email": "mayrahoracio@hotmail.com", "estado": "CE", "foto": "", "id": "242503", "logradouro": "ALAMEDA ANA ELISA", "nome": "Mayra Horacio De Araujo Do Vale", "numero": "55", "observacao": "AUT PELA SRA MAYRA P 28 05", "pontoDeReferencia": "", "telegram": "85988133556", "whatsapp": "85988133556" },
    "codigoCliente": "242503", "codigoExterno": "2", "codigoTecnico": "1866", "codigoVendedor": "1069",
    "dadosPedidoDeCobranca": "AUT PELA SRA MAYRA P 28 05", "dataRomaneio": "2026-05-28T00:00:00.000", "dataVisita": "2026-05-28T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "242503", "index": 2,
    "lancadoComercial": true, "nomeCliente": "Mayra Horacio De Araujo Do Vale", "nomeTecnico": "EMERSON", "nomeVendedor": "FLAVIANA",
    "observacao": "AUT PELA SRA MAYRA P 28 05", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 208, "quantidade": 1 }],
    "quemAssinou": "Mayra", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 208 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "3",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "94301426", "cep": "61800000", "cidade": "PACATUBA", "codigoExterno": "213381", "complemento": "", "dataCadastro": "2021-07-14T09:52:00.000", "email": "suprimentos.ce@gpssa.com.br", "estado": "CE", "foto": "", "id": "213381", "logradouro": "CE 060 KM11 ", "nome": "Top Service Servicos E Sistema", "numero": "S/N", "observacao": "AUT SRA ANA BEATRIZ PROCURAR KVAMAR OU JAQUELINE NA PORTARIA - PED PAGO ORDEM DE COMPRA 028489", "pontoDeReferencia": "HEINEKEN ", "telegram": "", "whatsapp": "" },
    "codigoCliente": "213381", "codigoExterno": "3", "codigoTecnico": "1879", "codigoVendedor": "1271",
    "dadosPedidoDeCobranca": "AUT SRA ANA BEATRIZ PROCURAR KVAMAR OU JAQUELINE NA PORTARIA - PED PAGO ORDEM DE COMPRA 028489",
    "dataRomaneio": "2026-05-28T00:00:00.000", "dataVisita": "2026-05-28T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "213381", "index": 4,
    "lancadoComercial": true, "nomeCliente": "Top Service Servicos E Sistema", "nomeTecnico": "MAGNO", "nomeVendedor": "TAMYRES",
    "observacao": "AUT SRA ANA BEATRIZ PROCURAR KVAMAR OU JAQUELINE NA PORTARIA - PED PAGO ORDEM DE COMPRA 028489",
    "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+1",
    "produtos": [{ "desconto": 0, "descricao": "PURIFICADOR SOFT PLUS (N) BRANCO", "devolvido": 0, "id": "1750", "idProduto": "1750", "precoMinimo": 0, "precoUnitario": 1460, "quantidade": 2 }],
    "quemAssinou": "", "situacao": 4, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "BOLETO BANCÁRIO                                             ", "id": "412", "quantidade": 1, "valor": 2920 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "4",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "PASSARE", "celular": "988902285", "cep": "60743710", "cidade": "FORTALEZA", "codigoExterno": "219094", "complemento": "", "dataCadastro": "2022-03-16T09:33:00.000", "email": "", "estado": "CE", "foto": "", "id": "219094", "logradouro": "RUA DOUTOR EDUARDO DIAS", "nome": "Francisca Nathalia Chaves Cardoso", "numero": "46", "observacao": "PEDE A PARTIR DE 12:00//REINSTALAR SOFT", "pontoDeReferencia": "NA RUA DO COLÉGIO EXODUS", "telegram": "", "whatsapp": "" },
    "codigoCliente": "219094", "codigoExterno": "4", "codigoTecnico": "1879", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "PEDE A PARTIR DE 12:00//REINSTALAR SOFT", "dataRomaneio": "2026-05-28T00:00:00.000", "dataVisita": "2026-05-28T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "219094", "index": 8,
    "lancadoComercial": true, "lancadoLogistica": true, "nomeCliente": "Francisca Nathalia Chaves Cardoso", "nomeTecnico": "MAGNO", "nomeVendedor": "ANDREA LINS",
    "observacao": "PEDE A PARTIR DE 12:00//REINSTALAR SOFT", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "VISITA",
    "produtos": [
      { "desconto": 0, "descricao": "SUPORTE PARA PAREDE DO SOFT EVEREST", "devolvido": 0, "id": "300", "idProduto": "300", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VISITA SOFT INST/REINST/ASSIST.", "devolvido": 0, "id": "2496", "idProduto": "2496", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "ASSISTÊNCIA",
    "tiposPagamento": [{ "descricao": "VISITA TÉCNICA                                              ", "id": "492", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "5",
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "83981097374", "cep": "62880208", "cidade": "HORIZONTE", "codigoExterno": "245822", "complemento": "CASA", "dataCadastro": "2025-07-25T09:57:00", "email": "", "estado": "CE", "foto": "", "id": "245822", "logradouro": "RUA JOAO LUIZ DA SILVA", "nome": "BRUNA DE PAULA SILVA", "numero": "147", "observacao": "AUT SRA BRUNA - ROTA 27/05", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "245822", "codigoExterno": "5", "codigoTecnico": "1866", "codigoVendedor": "1661",
    "dadosPedidoDeCobranca": "AUT SRA BRUNA - ROTA 27/05", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "245822", "index": 3,
    "nomeCliente": "BRUNA DE PAULA SILVA", "nomeTecnico": "EMERSON", "nomeVendedor": "SONIA",
    "observacao": "AUT SRA BRUNA - ROTA 27/05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "5", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "6", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1, "situacaoRomaneio": "ATENDIMENTO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 198 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "6",
    "assinatura": "",
    "cliente": { "bairro": "PEDRAS", "celular": "987792651", "cep": "60874765", "cidade": "FORTALEZA", "codigoExterno": "248923", "complemento": "", "dataCadastro": "2025-12-02T07:58:00", "email": "", "estado": "CE", "foto": "", "id": "248923", "logradouro": "RUA JORGE FIGUEIREDO", "nome": "LIVIS MARIA MOREIRA DE SOUZA", "numero": "2400", "observacao": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "pontoDeReferencia": "DEPOSITO NOVA CONSTRUCAO", "telegram": "987792651", "whatsapp": "987792651" },
    "codigoCliente": "248923", "codigoExterno": "6", "codigoTecnico": "1866", "codigoVendedor": "559",
    "dadosPedidoDeCobranca": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "248923", "index": 15,
    "nomeCliente": "LIVIS MARIA MOREIRA DE SOUZA", "nomeTecnico": "EMERSON", "nomeVendedor": "ADRIANA",
    "observacao": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [
      { "codigoPedido": "6", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "6", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "6", "codigoProduto": "2532", "descricao": "VIPZON RUBI", "id": "2532", "idPedido": "6", "idProduto": "2532", "precoMinimo": 0, "precoUnitario": 900, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "6", "codigoProduto": "2534", "descricao": "VIPZON 1/6 RUBI", "id": "2534", "idPedido": "6", "idProduto": "2534", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 12, "valor": 900 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "7",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "LAGOA REDONDA", "celular": "989489014", "cep": "60832160", "cidade": "FORTALEZA", "codigoExterno": "60490", "complemento": "", "dataCadastro": "1999-01-02T00:00:00.000", "email": "", "estado": "CE", "foto": "", "id": "60490", "logradouro": "RUA JOSERISSE HORTENCIO DOS SANTOS", "nome": "Luiziane Bezerra Ferreira", "numero": "646", "observacao": "AUT P/SRA LUIZIANE", "pontoDeReferencia": "PX  DEPOSITO LAURINDA :31144461 (SRLUCIO 85087961", "telegram": "", "whatsapp": "" },
    "codigoCliente": "60490", "codigoExterno": "7", "codigoTecnico": "286", "codigoVendedor": "1487",
    "dadosPedidoDeCobranca": "AUT P/SRA LUIZIANE", "dataRomaneio": "2026-05-27T00:00:00.000", "dataVisita": "2026-05-27T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "60490", "index": 14,
    "lancadoComercial": true, "lancadoLogistica": true, "nomeCliente": "Luiziane Bezerra Ferreira", "nomeTecnico": "MACIEL", "nomeVendedor": "NEUSA",
    "observacao": "AUT P/SRA LUIZIANE", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+1",
    "produtos": [{ "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1 }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 198 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "8",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "85984312527", "cep": "61800000", "cidade": "PACATUBA", "codigoExterno": "188467", "complemento": "CASA 167", "dataCadastro": "2018-12-11T09:47:00.000", "email": "", "estado": "CE", "foto": "", "id": "188467", "logradouro": "AV B", "nome": "Marcelo Cordeiro Dos Santos", "numero": "400", "observacao": "AUT: SR MARCELO ", "pontoDeReferencia": "CONDOMINIO MORADADA DOS BUQUES/ENFRENTE ASSEMBLEIA DE DEUS", "telegram": "85986722810", "whatsapp": "85986722810" },
    "codigoCliente": "188467", "codigoExterno": "8", "codigoTecnico": "1866", "codigoVendedor": "1071",
    "dadosPedidoDeCobranca": "AUT: SR MARCELO ", "dataRomaneio": "2026-05-27T00:00:00.000", "dataVisita": "2026-05-27T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "188467", "index": 2,
    "lancadoComercial": true, "lancadoLogistica": true, "nomeCliente": "Marcelo Cordeiro Dos Santos", "nomeTecnico": "EMERSON", "nomeVendedor": "ANGELICA",
    "observacao": "AUT: SR MARCELO ", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+3",
    "produtos": [{ "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 208, "quantidade": 1 }],
    "quemAssinou": "Marcelo", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 3, "valor": 208 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "9",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "992288536", "cep": "61000000", "cidade": "ITAITINGA", "codigoExterno": "82827", "complemento": "CENTRO", "dataCadastro": "2004-01-06T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "82827", "logradouro": "JOSE FELIX BATISTA 368", "nome": "MARIA SOCORRO FLORENCIO ANDRADE", "numero": "368", "observacao": "CL VIPZON 2/4 AUT SRA SOCORRO", "pontoDeReferencia": "PROX A MERCERIA DO EDIVALDO", "telegram": "", "whatsapp": "" },
    "codigoCliente": "82827", "codigoExterno": "9", "codigoTecnico": "1866", "codigoVendedor": "936",
    "dadosPedidoDeCobranca": "CL VIPZON 2/4 AUT SRA SOCORRO", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "82827", "index": 7,
    "nomeCliente": "MARIA SOCORRO FLORENCIO ANDRADE", "nomeTecnico": "EMERSON", "nomeVendedor": "SAMARA LOURENCO",
    "observacao": "CL VIPZON 2/4 AUT SRA SOCORRO", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "9", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "9", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "9", "codigoProduto": "2480", "descricao": "VIPZON 2/4 DIAMOND/BRONZE", "id": "2480", "idPedido": "9", "idProduto": "2480", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "10",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "998102345", "cep": "61880000", "cidade": "ITAITINGA", "codigoExterno": "241539", "complemento": "", "dataCadastro": "2025-01-04T11:41:00", "email": "", "estado": "CE", "foto": "", "id": "241539", "logradouro": "RUA JOAQUIM PEREIRA DA SILVEIRA", "nome": "JOSE EVERARDO FERREIRA", "numero": "695", "observacao": "AUT JOSE EVERARDO ", "pontoDeReferencia": "PROXIMO AO FINAL DA RUA DO CAPES", "telegram": "", "whatsapp": "" },
    "codigoCliente": "241539", "codigoExterno": "10", "codigoTecnico": "1866", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT JOSE EVERARDO ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "241539", "index": 8,
    "nomeCliente": "JOSE EVERARDO FERREIRA", "nomeTecnico": "EMERSON", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT JOSE EVERARDO ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "10", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "10", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "10", "codigoProduto": "2480", "descricao": "VIPZON 2/4 DIAMOND/BRONZE", "id": "2480", "idPedido": "10", "idProduto": "2480", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "11",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "PASSARE", "celular": "8589738509", "cep": "60861350", "cidade": "FORTALEZA", "codigoExterno": "252264", "complemento": "", "dataCadastro": "2026-05-15T08:57:00.000", "email": "", "estado": "CE", "foto": "", "id": "252264", "logradouro": "RUA MOURA MATOS", "nome": "Marcondes Lopes Da Rocha", "numero": "1513", "observacao": "", "pontoDeReferencia": "PROXINO A FARMACIA EXTRA FARMA", "telegram": "8589738509", "whatsapp": "8589738509" },
    "codigoCliente": "252264", "codigoExterno": "11", "codigoTecnico": "1879", "codigoVendedor": "559",
    "dadosPedidoDeCobranca": "", "dataRomaneio": "2026-05-27T00:00:00.000", "dataVisita": "2026-05-27T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "252264", "index": 8,
    "nomeCliente": "Marcondes Lopes Da Rocha", "nomeTecnico": "MAGNO", "nomeVendedor": "ADRIANA",
    "observacao": "", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [{ "desconto": 0, "descricao": "PURIFICADOR SOFT STAR (N) PRATA", "devolvido": 1, "id": "1758", "idProduto": "1758", "precoMinimo": 0, "precoUnitario": 1400, "quantidade": 1 }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "12",
    "assinatura": "",
    "cliente": { "bairro": "ALDEOTA", "celular": "8532241172", "cep": "60115280", "cidade": "FORTALEZA", "codigoExterno": "74749", "complemento": "AP 300", "dataCadastro": "2000-02-17T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "74749", "logradouro": "RUA DRUA  JOSE LOURENCO", "nome": "MARIA DO CARMO FERNANDES CAVALCANTE", "numero": "440", "observacao": "", "pontoDeReferencia": "A MESMA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "74749", "codigoExterno": "12", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "74749", "index": 5,
    "nomeCliente": "MARIA DO CARMO FERNANDES CAVALCANTE", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "12", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "13", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 160, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 160 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "13",
    "assinatura": "",
    "cliente": { "bairro": "PACAJUS", "celular": "85992789180", "cep": "62870000", "cidade": "PACAJUS", "codigoExterno": "168758", "complemento": "SITIO AQUARIOS / LAGOA SECA", "dataCadastro": "2016-12-30T17:45:00", "email": "", "estado": "CE", "foto": "", "id": "168758", "logradouro": "MANOEL CONRRADO FILHO", "nome": "MARIA DE FATIMA GURGEL DE CASTRO", "numero": "286", "observacao": "AUT SRA FATIMA /CL VIPZON 3/4 ", "pontoDeReferencia": "AO LADO CEMITERIO NOVO / LAGOA SECA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "168758", "codigoExterno": "13", "codigoTecnico": "1866", "codigoVendedor": "936",
    "dadosPedidoDeCobranca": "AUT SRA FATIMA /CL VIPZON 3/4 ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "168758", "index": 12,
    "nomeCliente": "MARIA DE FATIMA GURGEL DE CASTRO", "nomeTecnico": "EMERSON", "nomeVendedor": "SAMARA LOURENCO",
    "observacao": "AUT SRA FATIMA /CL VIPZON 3/4 ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "13", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "13", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 2, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "13", "codigoProduto": "2481", "descricao": "VIPZON 3/4 DIAMOND/BRONZE", "id": "2481", "idPedido": "13", "idProduto": "2481", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "14",
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "94305247", "cep": "61700000", "cidade": "HORIZONTE", "codigoExterno": "157213", "complemento": "JUSTINIANO DE SERPA", "dataCadastro": "2015-10-05T14:39:00", "email": "e portao marrom", "estado": "CE", "foto": "", "id": "157213", "logradouro": "RUA RUFINO CORREA ASSUNÇAO", "nome": "MARIA EUGENIA GOMES SANTIAGO", "numero": "47", "observacao": "AUT EUGENIA ", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "157213", "codigoExterno": "14", "codigoTecnico": "1866", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT EUGENIA ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "157213", "index": 4,
    "nomeCliente": "MARIA EUGENIA GOMES SANTIAGO", "nomeTecnico": "EMERSON", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT EUGENIA ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "14", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "15", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "14", "codigoProduto": "2479", "descricao": "VIPZON 1/4 DIAMOND/BRONZE", "id": "2479", "idPedido": "15", "idProduto": "2479", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "15",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "85992198866", "cep": "61880000", "cidade": "ITAITINGA", "codigoExterno": "108235", "complemento": "BAIRRO ANCURI", "dataCadastro": "2008-05-21T10:41:00", "email": "", "estado": "CE", "foto": "", "id": "108235", "logradouro": "RUA NATALIA ARAUJO REBOLCAS CHAGAS", "nome": "LIDIANE DANTAS ROCHA", "numero": "308", "observacao": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "pontoDeReferencia": "ENTRADA NA RUA DA MORENA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "108235", "codigoExterno": "15", "codigoTecnico": "1866", "codigoVendedor": "1953",
    "dadosPedidoDeCobranca": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "108235", "index": 9,
    "nomeCliente": "LIDIANE DANTAS ROCHA", "nomeTecnico": "EMERSON", "nomeVendedor": "VIVIANE ANDRADE",
    "observacao": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "15", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "15", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "EM ABERTO" },
      { "codigoPedido": "15", "codigoProduto": "2540", "descricao": "VIPZON 6/6 RUBI", "id": "2540", "idPedido": "15", "idProduto": "2540", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "EM ABERTO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "16",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "MEIRELES", "celular": "99710273", "cep": "60120020", "cidade": "FORTALEZA", "codigoExterno": "219213", "complemento": "PAT 102", "dataCadastro": "2022-03-21T09:56:00", "email": "", "estado": "CE", "foto": "", "id": "219213", "logradouro": "RUA SILVA PAULET", "nome": "VILMA BARRETO PERDIGAO PAES", "numero": "1151", "observacao": "PARA DIA 29/05", "pontoDeReferencia": "ENTRE A SANTOS DUMONT E TORRES CAMERA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "219213", "codigoExterno": "16", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "PARA DIA 29/05", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "219213", "index": 20,
    "nomeCliente": "VILMA BARRETO PERDIGAO PAES", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "PARA DIA 29/05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "16", "codigoProduto": "181", "descricao": "ELEM. FILTRANTE SOFT EVEREST (2 EM 1)", "id": "181", "idPedido": "16", "idProduto": "181", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 198 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "17",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "FATIMA", "celular": "31993238499", "cep": "60415000", "cidade": "FORTALEZA", "codigoExterno": "227032", "complemento": "APTO 401", "dataCadastro": "2023-02-25T16:23:00", "email": "fcsjr79@gmail.com", "estado": "CE", "foto": "", "id": "227032", "logradouro": "RUA MARIO MAMEDE", "nome": "FRANCISCO CESAR SALOMAO JUNIOR", "numero": "745", "observacao": "AUT SR FRANCISCO", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "227032", "codigoExterno": "17", "codigoTecnico": "1866", "codigoVendedor": "1560",
    "dadosPedidoDeCobranca": "AUT SR FRANCISCO", "dataRomaneio": "2026-05-30T00:00:00", "dataVisita": "2026-05-30T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "227032", "index": 5,
    "nomeCliente": "FRANCISCO CESAR SALOMAO JUNIOR", "nomeTecnico": "EMERSON", "nomeVendedor": "CARLA OLIVEIRA",
    "observacao": "AUT SR FRANCISCO", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "17", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "17", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 180, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 180 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "18",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "ALDEOTA", "celular": "8532241172", "cep": "60115280", "cidade": "FORTALEZA", "codigoExterno": "74749", "complemento": "AP 300", "dataCadastro": "2000-02-17T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "74749", "logradouro": "RUA DRUA  JOSE LOURENCO", "nome": "MARIA DO CARMO FERNANDES CAVALCANTE", "numero": "440", "observacao": "", "pontoDeReferencia": "A MESMA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "74749", "codigoExterno": "18", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "74749", "index": 5,
    "nomeCliente": "MARIA DO CARMO FERNANDES CAVALCANTE", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "18", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "18", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 160, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 160 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "19",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "PRAIA DE IRACEMA", "celular": "8586652476", "cep": "60060292", "cidade": "FORTALEZA", "codigoExterno": "163673", "complemento": "APT 702", "dataCadastro": "2016-06-14T15:27:00.000", "email": "", "estado": "CE", "foto": "", "id": "163673", "logradouro": "RUA JOO CORDEIRO", "nome": "Diociecio De Sousa Lima Neto", "numero": "949", "observacao": "AUT SR DIOCIECIO//VAI DECIDIR O PLANO COM TÉCNICO.", "pontoDeReferencia": "PROX. A AV. ANTONIO SALES", "telegram": "", "whatsapp": "" },
    "codigoCliente": "163673", "codigoExterno": "19", "codigoTecnico": "886", "codigoVendedor": "1487",
    "dadosPedidoDeCobranca": "AUT SR DIOCIECIO//VAI DECIDIR O PLANO COM TÉCNICO.", "dataRomaneio": "2026-06-01T00:00:00.000", "dataVisita": "2026-06-01T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "163673", "index": 22,
    "nomeCliente": "Diociecio De Sousa Lima Neto", "nomeTecnico": "TARCIANO QUEIROZ", "nomeVendedor": "NEUSA",
    "observacao": "AUT SR DIOCIECIO//VAI DECIDIR O PLANO COM TÉCNICO.", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 1, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON PLATINUM", "devolvido": 1, "id": "2558", "idProduto": "2558", "precoMinimo": 0, "precoUnitario": 1046, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON 1/8 PLATINUM", "devolvido": 1, "id": "2560", "idProduto": "2560", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "20",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "DIONISIO TORRES", "celular": "999980988", "cep": "60135215", "cidade": "FORTALEZA", "codigoExterno": "208156", "complemento": "APT 201 / PORTARIA AUTOMATICA", "dataCadastro": "2020-11-27T12:43:00.000", "email": "", "estado": "CE", "foto": "", "id": "208156", "logradouro": "RUA FRANCISCO HOLANDA", "nome": "Francisca Maria Gordiano De Oliveira Barbosa", "numero": "821", "observacao": "AUT SRA FRANCISCA // PASSAR DPS DAS 09:00", "pontoDeReferencia": "PROX A ASSEMBLEIA LEGISLATIVA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "208156", "codigoExterno": "20", "codigoTecnico": "1221", "codigoVendedor": "1560",
    "dadosPedidoDeCobranca": "AUT SRA FRANCISCA // PASSAR DPS DAS 09:00", "dataRomaneio": "2026-05-30T00:00:00.000", "dataVisita": "2026-05-30T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "208156", "index": 3,
    "nomeCliente": "Francisca Maria Gordiano De Oliveira Barbosa", "nomeTecnico": "TIAGO SOARES", "nomeVendedor": "CARLA OLIVEIRA",
    "observacao": "AUT SRA FRANCISCA // PASSAR DPS DAS 09:00", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+2",
    "produtos": [
      { "desconto": 0, "descricao": "ELEM. FILTRANTE 5 HPC200 5P S/ROSCA HIDRO", "devolvido": 1, "id": "813", "idProduto": "813", "precoMinimo": 0, "precoUnitario": 65, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "21",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "ALDEOTA", "celular": "85987944642", "cep": "60140110", "cidade": "FORTALEZA", "codigoExterno": "230094", "complemento": "APT 901", "dataCadastro": "2023-07-10T13:00:00.000", "email": "", "estado": "CE", "foto": "", "id": "230094", "logradouro": "RUA CATO MAMEDE", "nome": "Mariana Teles Monteiro", "numero": "250", "observacao": "AUT SRA.MARIANA/TROCA DE ELEM.FILTRANTE/CLT VIP", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "230094", "codigoExterno": "21", "codigoTecnico": "1221", "codigoVendedor": "2047",
    "dadosPedidoDeCobranca": "AUT SRA.MARIANA/TROCA DE ELEM.FILTRANTE/CLT VIP", "dataRomaneio": "2026-05-30T00:00:00.000", "dataVisita": "2026-05-30T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "230094", "index": 1,
    "nomeCliente": "Mariana Teles Monteiro", "nomeTecnico": "TIAGO SOARES", "nomeVendedor": "VITORIA ALMADA",
    "observacao": "AUT SRA.MARIANA/TROCA DE ELEM.FILTRANTE/CLT VIP", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON 1/8 PLATINUM", "devolvido": 0, "id": "2560", "idProduto": "2560", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "22",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "INDUSTRIAL", "celular": "91587474", "cep": "61925315", "cidade": "MARACANAU", "codigoExterno": "70343", "complemento": "A", "dataCadastro": "1999-03-11T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "70343", "logradouro": "AVENIDA EDSON MAGALHES", "nome": "THAYNARA REGIA EVANGELISTA DE SOUSA", "numero": "11", "observacao": "SRA THAYNARA / 1 TROCA DE 8 / VALOR DA PROMOÇÃO", "pontoDeReferencia": "EM FRENTE AO COLEGIO JB N", "telegram": "", "whatsapp": "" },
    "codigoCliente": "70343", "codigoExterno": "22", "codigoTecnico": "2023", "codigoVendedor": "1402",
    "dadosPedidoDeCobranca": "SRA THAYNARA / 1 TROCA DE 8 / VALOR DA PROMOÇÃO", "dataRomaneio": "2026-05-30T00:00:00", "dataVisita": "2026-05-30T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "70343", "index": 4,
    "nomeCliente": "THAYNARA REGIA EVANGELISTA DE SOUSA", "nomeTecnico": "HERBERSON BARROS", "nomeVendedor": "VANIA",
    "observacao": "SRA THAYNARA / 1 TROCA DE 8 / VALOR DA PROMOÇÃO", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [
      { "codigoPedido": "22", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "22", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "22", "codigoProduto": "2558", "descricao": "VIPZON PLATINUM", "id": "2558", "idPedido": "22", "idProduto": "2558", "precoMinimo": 0, "precoUnitario": 984.72, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "22", "codigoProduto": "2560", "descricao": "VIPZON 1/8 PLATINUM", "id": "2560", "idPedido": "22", "idProduto": "2560", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 12, "valor": 984.72 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "23",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "PRESIDENTE KENNEDY", "celular": "34785053", "cep": "60357320", "cidade": "FORTALEZA", "codigoExterno": "96692", "complemento": "ALTOS A", "dataCadastro": "2006-04-17T16:56:00.000", "email": "", "estado": "CE", "foto": "", "id": "96692", "logradouro": "QUADRA L", "nome": "Maria Iralda Araujo Lelis", "numero": "292", "observacao": "DECEDIR COM OTECNICO", "pontoDeReferencia": "POR TRAS DO COLEGIO INACIO COSTA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "96692", "codigoExterno": "23", "codigoTecnico": "886", "codigoVendedor": "269",
    "dadosPedidoDeCobranca": "DECEDIR COM OTECNICO", "dataRomaneio": "2026-05-30T00:00:00.000", "dataVisita": "2026-05-30T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "96692", "index": 8,
    "nomeCliente": "Maria Iralda Araujo Lelis", "nomeTecnico": "TARCIANO QUEIROZ", "nomeVendedor": "THANYA",
    "observacao": "DECEDIR COM OTECNICO", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "A VISTA",
    "produtos": [
      { "desconto": 0, "descricao": "ELEMENTO FILTRANTE PRIME ALCALINO", "devolvido": 0, "id": "2500", "idProduto": "2500", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON PRIME DIAMOND", "devolvido": 0, "id": "2571", "idProduto": "2571", "precoMinimo": 0, "precoUnitario": 578, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON PRIME 4/4 DIAMOND", "devolvido": 0, "id": "2575", "idProduto": "2575", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "DINHEIRO                                                    ", "id": "481", "quantidade": 1, "valor": 578 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "24",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "DIONISIO TORRES", "celular": "8532578431", "cep": "60135460", "cidade": "FORTALEZA", "codigoExterno": "448", "complemento": "APTº 800", "dataCadastro": "1999-03-16T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "448", "logradouro": "RUA ISRAEL BEZERRA", "nome": "CARLOS ROBERTO CIDRAO MORAIS", "numero": "383", "observacao": "AUT SRA CARLOS", "pontoDeReferencia": "PROXIMO DO COLEGIO SANTO INACIO", "telegram": "", "whatsapp": "" },
    "codigoCliente": "448", "codigoExterno": "24", "codigoTecnico": "2023", "codigoVendedor": "1258",
    "dadosPedidoDeCobranca": "AUT SRA CARLOS", "dataRomaneio": "2026-06-01T00:00:00", "dataVisita": "2026-06-01T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "448", "index": 11,
    "nomeCliente": "CARLOS ROBERTO CIDRAO MORAIS", "nomeTecnico": "HERBERSON BARROS", "nomeVendedor": "THATIANA",
    "observacao": "AUT SRA CARLOS", "pendencia": "", "prazoPagamento": "A VISTA",
    "produtos": [{ "codigoPedido": "24", "codigoProduto": "2500", "descricao": "ELEMENTO FILTRANTE PRIME ALCALINO", "id": "2500", "idPedido": "24", "idProduto": "2500", "precoMinimo": 0, "precoUnitario": 110, "quantidade": 1, "situacaoRomaneio": "ATENDIMENTO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "DEPÓSITO EM CONTA                                           ", "id": "457", "quantidade": 1, "valor": 110 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "25",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "COCO", "celular": "92113434", "cep": "60192050", "cidade": "FORTALEZA", "codigoExterno": "242502", "complemento": "AP 2102-TORRE LILAC", "dataCadastro": "2025-02-15T11:02:00", "email": "", "estado": "CE", "foto": "", "id": "242502", "logradouro": "RUA BENTO ALBUQUERQUE", "nome": "FLAVIO RIBEIRO SANTIAGO", "numero": "2300", "observacao": "AUT SR FLAVIO ", "pontoDeReferencia": "NO COND LAPLACE", "telegram": "", "whatsapp": "" },
    "codigoCliente": "242502", "codigoExterno": "25", "codigoTecnico": "1924", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT SR FLAVIO ", "dataRomaneio": "2026-06-01T00:00:00", "dataVisita": "2026-06-01T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "242502", "index": 6,
    "nomeCliente": "FLAVIO RIBEIRO SANTIAGO", "nomeTecnico": "NIELSON ARAUJO", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT SR FLAVIO ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "25", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "25", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "25", "codigoProduto": "2481", "descricao": "VIPZON 3/4 DIAMOND/BRONZE", "id": "2481", "idPedido": "25", "idProduto": "2481", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "26",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "ICARAI", "celular": "85985834697", "cep": "61624477", "cidade": "CAUCAIA", "codigoExterno": "241387", "complemento": "CCOND. ICARAI GOLD 2, CASA 2", "dataCadastro": "2024-12-26T10:18:00.000", "email": "andreiam25sousa@gmail.com", "estado": "CE", "foto": "", "id": "241387", "logradouro": " RUA K", "nome": "Andreia Mendes De Sousa", "numero": "450", "observacao": "SRA ANDREIA / RETIRAR SOFT VAI MUDAR DE ENDEREçO", "pontoDeReferencia": " BARRA NOVA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "241387", "codigoExterno": "26", "codigoTecnico": "1894", "codigoVendedor": "1402",
    "dadosPedidoDeCobranca": "SRA ANDREIA / RETIRAR SOFT VAI MUDAR DE ENDEREçO", "dataRomaneio": "2026-05-29T00:00:00.000", "dataVisita": "2026-05-29T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "241387", "index": 7,
    "lancadoComercial": true, "lancadoLogistica": true,
    "nomeCliente": "Andreia Mendes De Sousa", "nomeTecnico": "WELTON FERNANDES", "nomeVendedor": "VANIA",
    "observacao": "SRA ANDREIA / RETIRAR SOFT VAI MUDAR DE ENDEREçO", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolucaoLancada": true, "devolvido": 1, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 208, "quantidade": 1 },
      { "desconto": 0, "descricao": "VISITA SOFT INST/REINST/ASSIST.", "devolvido": 0, "id": "2496", "idProduto": "2496", "precoMinimo": 0, "precoUnitario": 90, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 90 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "27",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "MEIRELES", "celular": "996820808", "cep": "60110370", "cidade": "FORTALEZA", "codigoExterno": "98159", "complemento": "A/MEGA ÓTICA", "dataCadastro": "2006-07-22T11:13:00", "email": "", "estado": "CE", "foto": "", "id": "98159", "logradouro": "RUA ANTONIO AUGUSTO", "nome": "RAIMUNDO PESSOA DIAS JUNIOR", "numero": "1260", "observacao": "AUT SR EDNA / P DIA 29 05", "pontoDeReferencia": "PROX.QUASE ESQUINA COM SANTOS DUMONT", "telegram": "", "whatsapp": "" },
    "codigoCliente": "98159", "codigoExterno": "27", "codigoTecnico": "1976", "codigoVendedor": "1659",
    "dadosPedidoDeCobranca": "AUT SR EDNA / P DIA 29 05", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "98159", "index": 15,
    "nomeCliente": "RAIMUNDO PESSOA DIAS JUNIOR", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDRESSA SILVA",
    "observacao": "AUT SR EDNA / P DIA 29 05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "27", "codigoProduto": "181", "descricao": "ELEM. FILTRANTE SOFT EVEREST (2 EM 1)", "id": "181", "idPedido": "27", "idProduto": "181", "precoMinimo": 0, "precoUnitario": 208, "quantidade": 1, "situacaoRomaneio": "ATENDIMENTO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 208 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "28",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "PIRATININGA", "celular": "85984077072", "cep": "61905395", "cidade": "MARACANAU", "codigoExterno": "239141", "complemento": "", "dataCadastro": "2024-09-14T18:36:00", "email": "camilaedanyllo@hotmail.com", "estado": "CE", "foto": "", "id": "239141", "logradouro": "RUA ELSON CARLOS", "nome": "DANYLLO  ALEXANDRE CESAR", "numero": "263", "observacao": "AUT SR DANYLLO - P/ DIA 30/05 ", "pontoDeReferencia": "PROX A AVEND PADRE JOSE", "telegram": "", "whatsapp": "" },
    "codigoCliente": "239141", "codigoExterno": "28", "codigoTecnico": "2023", "codigoVendedor": "1953",
    "dadosPedidoDeCobranca": "AUT SR DANYLLO - P/ DIA 30/05 ", "dataRomaneio": "2026-05-30T00:00:00", "dataVisita": "2026-05-30T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "239141", "index": 9,
    "nomeCliente": "DANYLLO  ALEXANDRE CESAR", "nomeTecnico": "HERBERSON BARROS", "nomeVendedor": "VIVIANE ANDRADE",
    "observacao": "AUT SR DANYLLO - P/ DIA 30/05 ", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "28", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "28", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 180, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 180 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "29",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "AQUIRAZ", "celular": "85 91727822", "cep": "61700000", "cidade": "AQUIRAZ", "codigoExterno": "220492", "complemento": "TAPERA ESQUINA RUA PEDRO PAULO NOGUEIRA", "dataCadastro": "2022-05-06T11:49:00", "email": "", "estado": "CE", "foto": "", "id": "220492", "logradouro": "RUA DO CANTOR ", "nome": "ANA CRISTINA DE OLIVEIRA JERONIMO", "numero": "03", "observacao": "AUT SR ANA", "pontoDeReferencia": "UMA RUA ANTES DO CAMPO LADO DIREITO", "telegram": "", "whatsapp": "" },
    "codigoCliente": "220492", "codigoExterno": "29", "codigoTecnico": "2023", "codigoVendedor": "936",
    "dadosPedidoDeCobranca": "AUT SR ANA", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "220492", "index": 4,
    "nomeCliente": "ANA CRISTINA DE OLIVEIRA JERONIMO", "nomeTecnico": "HERBERSON BARROS", "nomeVendedor": "SAMARA LOURENCO",
    "observacao": "AUT SR ANA", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "29", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "29", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 190, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 190 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "30",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "EDSON QUEIROZ", "celular": "988026018", "cep": "60834355", "cidade": "FORTALEZA", "codigoExterno": "215485", "complemento": "CASA DE ESQUINA", "dataCadastro": "2021-10-20T14:36:00.000", "email": "rafaelcoutovieira@gmail.com", "estado": "CE", "foto": "", "id": "215485", "logradouro": "RUA NESTOR FONTENELE VASCONCELOS", "nome": "Elizabete Couto Vieira", "numero": "251", "observacao": "AUT ELIZABETE - A TARDE", "pontoDeReferencia": "FICA EM FRENTE AO MOTEL HIPNOSE", "telegram": "", "whatsapp": "" },
    "codigoCliente": "215485", "codigoExterno": "30", "codigoTecnico": "286", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT ELIZABETE - A TARDE", "dataRomaneio": "2026-05-29T00:00:00.000", "dataVisita": "2026-05-29T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "215485", "index": 2,
    "lancadoComercial": true, "lancadoLogistica": true,
    "nomeCliente": "Elizabete Couto Vieira", "nomeTecnico": "MACIEL", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT ELIZABETE - A TARDE", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON 4/6 RUBI", "devolvido": 0, "id": "2538", "idProduto": "2538", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "31",
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "NOVO ORIENTE", "celular": "8586800537", "cep": "61921120", "cidade": "MARACANAU", "codigoExterno": "119912", "complemento": "", "dataCadastro": "2010-06-05T11:03:00", "email": "", "estado": "CE", "foto": "", "id": "119912", "logradouro": "R 11", "nome": "MARIA MOREIRA MARINHEIRO", "numero": "17", "observacao": "AUT SRA MARIA   NEG VIP", "pontoDeReferencia": "PROXIMO AO PRACINHA DO ACARUCUZINHO", "telegram": "", "whatsapp": "" },
    "codigoCliente": "119912", "codigoExterno": "31", "codigoTecnico": "2023", "codigoVendedor": "1104",
    "dadosPedidoDeCobranca": "AUT SRA MARIA   NEG VIP", "dataRomaneio": "2026-05-30T00:00:00", "dataVisita": "2026-05-30T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "119912", "index": 7,
    "nomeCliente": "MARIA MOREIRA MARINHEIRO", "nomeTecnico": "HERBERSON BARROS", "nomeVendedor": "ADRIANI ARAGAO",
    "observacao": "AUT SRA MARIA   NEG VIP", "pendencia": "", "prazoPagamento": "0+1",
    "produtos": [{ "codigoPedido": "31", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "31", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 208, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 1, "valor": 208 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "32",
    "acrescimo": 0,
    "assinatura": "",
    "fotos": [],
    "cliente": { "bairro": "SAO JOAO DO TAUAPE", "celular": "997232003", "cep": "60120100", "cidade": "FORTALEZA", "codigoExterno": "213913", "complemento": "BLOCO A- APTO 301", "dataCadastro": "2021-08-09T11:28:00.000", "email": "", "estado": "CE", "foto": "", "id": "213913", "logradouro": "RUA FREI VIDAL", "nome": "Ortulina Sales Andrade", "numero": "2045", "observacao": "AUT ORTULINA ", "pontoDeReferencia": " CONDOMINIO JARDIM DE NAZARE", "telegram": "", "whatsapp": "" },
    "codigoCliente": "213913", "codigoExterno": "32", "codigoTecnico": "286", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT ORTULINA ", "dataRomaneio": "2026-05-30T00:00:00.000", "dataVisita": "2026-05-30T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "213913", "index": 11,
    "nomeCliente": "Ortulina Sales Andrade", "nomeTecnico": "MACIEL", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT ORTULINA ", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 1, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON 1/4 DIAMOND/BRONZE", "devolvido": 1, "id": "2479", "idProduto": "2479", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
];

async function prepareRun() {
  let items = [];
  try {
    const res = await fetch(BASE_URL);
    if (res.ok) {
      const data = await res.json();
      items = Array.isArray(data) ? data : [];
    }
  } catch { /* API inacessível — prossegue com ID 1 */ }

  const existentes = items.filter(item => (item.dataRomaneio || '').startsWith(dataArg));
  if (existentes.length > 0) {
    console.error(`[!] Já existem ${existentes.length} pedido(s) com dataRomaneio ${dataArg}. Abortando.`);
    process.exit(1);
  }

  if (items.length === 0) return 1;
  const seedIds = items
    .map(item => parseInt(item.id, 10) || 0)
    .filter(id => id > 0 && id < 100000); // ignora IDs baseados em timestamp do sistema real
  if (seedIds.length === 0) return 1;
  const maxId = Math.max(...seedIds);
  return isFinite(maxId) ? maxId + 1 : 1;
}

async function put(pedido, index) {
  try {
    const payload = { ...pedido, dataRomaneio: dataRomaneioOverride, dataVisita: dataRomaneioOverride };
    const res = await fetch(`${BASE_URL}/${pedido.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const status = res.ok ? '✓' : '✗';
    console.log(`[${String(index + 1).padStart(2, '0')}] ${status} ${res.status} — ${pedido.id} | ${pedido.nomeCliente.substring(0, 28)} (${pedido.situacaoRomaneio})`);
    return res.ok;
  } catch (err) {
    console.error(`[${String(index + 1).padStart(2, '0')}] ✗ ERRO — ${pedido.id}: ${err.message}`);
    return false;
  }
}

async function main() {
  const startId = await prepareRun();
  const items = pedidos.map((p, i) => {
    const novoId = String(startId + i);
    return {
      ...p,
      id: novoId,
      codigoExterno: novoId,
      produtos: (p.produtos || []).map(prod => ({ ...prod, codigoPedido: novoId, idPedido: novoId })),
    };
  });

  const lastId = startId + items.length - 1;
  console.log(`Data romaneio : ${dataRomaneioOverride}`);
  console.log(`IDs gerados   : ${startId} → ${lastId}  (${items.length} pedidos)`);
  console.log(`Próximo ID    : ${lastId + 1}\n`);

  const results = await Promise.all(items.map((p, i) => put(p, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${items.length} inseridos com sucesso.`);
  console.log(`Próximo idInicial para a próxima execução: ${lastId + 1}`);
}

main();
