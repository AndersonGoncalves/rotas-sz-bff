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
  const maxId = Math.max(...items.map(item => parseInt(item.id, 10) || 0));
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
