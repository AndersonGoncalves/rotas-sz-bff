const BASE_URL = 'http://localhost:3001/pedidos';

const pedidos = [
  {
    "id": "966497",
    "assinatura": "",
    "cliente": { "bairro": "MEIRELES", "celular": "99710273", "cep": "60120020", "cidade": "FORTALEZA", "codigoExterno": "219213", "complemento": "PAT 102", "dataCadastro": "2022-03-21T09:56:00", "email": "", "estado": "CE", "foto": "", "id": "219213", "logradouro": "RUA SILVA PAULET", "nome": "VILMA BARRETO PERDIGAO PAES", "numero": "1151", "observacao": "PARA DIA 29/05", "pontoDeReferencia": "ENTRE A SANTOS DUMONT E TORRES CAMERA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "219213", "codigoExterno": "966497", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "PARA DIA 29/05", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "219213", "index": 20,
    "nomeCliente": "VILMA BARRETO PERDIGAO PAES", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "PARA DIA 29/05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "966497", "codigoProduto": "181", "descricao": "ELEM. FILTRANTE SOFT EVEREST (2 EM 1)", "id": "181", "idPedido": "966497", "idProduto": "181", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 198 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "967360",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABHNCSVQICAgIfAhkiAAAAEBJREFUCJl1jbENwDAMw5g8ltfsy+xcxk5pllaTAJHQUOUj85TuJjPvohoRAgJWlaoTYK31gnvvaxzr0Krj7/wBhcM0HtzGK7UAAAAASUVORK5CYII=",
    "cliente": { "bairro": "CIDADE 2000", "celular": "85988133556", "cep": "60190130", "cidade": "FORTALEZA", "codigoExterno": "242503", "complemento": "QUADRA 2", "dataCadastro": "2025-02-15T11:16:00.000", "email": "mayrahoracio@hotmail.com", "estado": "CE", "foto": "", "id": "242503", "logradouro": "ALAMEDA ANA ELISA", "nome": "Mayra Horacio De Araujo Do Vale", "numero": "55", "observacao": "AUT PELA SRA MAYRA P 28 05", "pontoDeReferencia": "", "telegram": "85988133556", "whatsapp": "85988133556" },
    "codigoCliente": "242503", "codigoExterno": "967360", "codigoTecnico": "1866", "codigoVendedor": "1069",
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
    "id": "967696",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,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",
    "cliente": { "bairro": "EDSON QUEIROZ", "celular": "99538986", "cep": "60834472", "cidade": "FORTALEZA", "codigoExterno": "252127", "complemento": "CASA 100", "dataCadastro": "2026-05-09T12:13:00.000", "email": "", "estado": "CE", "foto": "", "id": "252127", "logradouro": "RUA MARIA IVONE", "nome": "Piaui Plastico", "numero": "175", "observacao": "VAI LIGAR QUANQUISER ENTREGA E INSTALACAO", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "252127", "codigoExterno": "967696", "codigoTecnico": "1852", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "VAI LIGAR QUANQUISER ENTREGA E INSTALACAO", "dataRomaneio": "2026-05-27T00:00:00.000", "dataVisita": "2026-05-27T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "252127", "index": 5,
    "lancadoComercial": true, "lancadoLogistica": true, "nomeCliente": "Piaui Plastico", "nomeTecnico": "LUIZ FELIPE", "nomeVendedor": "ANDREA LINS",
    "observacao": "VAI LIGAR QUANQUISER ENTREGA E INSTALACAO", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [{ "desconto": 0, "descricao": "PURIFICADOR SOFT STAR (N) PRATA", "devolvido": 0, "id": "1758", "idProduto": "1758", "precoMinimo": 0, "precoUnitario": 1300, "quantidade": 1 }],
    "quemAssinou": "", "situacao": 4, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 12, "valor": 1300 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "968111",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAABCCAYAAAB9wsUNAAAABHNCSVQICAgIfAhkiAAABLRJREFUeJztnW2OpCAQhnGz9xo4mXgy8GTsjwm9ZVl82SgF8iSdTLd2WuWlPoBiFuecE5MJwZ/WFzDhy9/WF3AHSikhpRRCCLGua+vL6ZZlNLeybZvQWh8+8++nUMoY0nJgoFimQPIZznIsyxI9rrWeAslk6IDUOSeMMQfLobUWSqmWl9UPbiCMMU4I4YQQTkp5OKa1/hyjjk/ODGU59n3//O2zFc+6rgcLYq2dFiTBUOJIQQlk27am18Sa1qarJtBtGGOC52EXo7V+9Dp7YahsBWYqqdtSSglr7ee9Mebkit7OMG4FNnROI2MxYLFMBhJHLBgNYYw5vJ/xx5FhxHEVKJCZwRwZRhzQJfz8/GR/T0o5BRJgSHGUIqWcKS5F63SpFjA1vcpMcY8MIQ44bP6t3qdA/jOcOGrMmWCBxAbURoZFzOF9/NW44UoaG2Nd1zkGwiUgVUp9ptK5BIJzDISBOHCP1FqLZVmKeupdvfrtKW5zcYS42lNLxjhSvD7FbR304EzjSqZQK1MJ8dYAlZU4pJSnhsjhbnE455yU8pHf4QQ7t0JlCjFKZ2OvggPUN8QfzcVBpaFwdXgq2KydxsbAAero8UdzcVBIKQ8NzaURcICqtR57/KO1X4MxBgxAc4fEWwSKMP4YeRU7S8shCOuR00OfWuaH3d6w8UdrdcJeiHt+as4EWp2nezC2bCNO0LG1HBhrbdR6PL04+A3xB+tCau9aQg/96uqvENTvwGwodS7c+qGGUCjBU5/5e6/dQZqXJqTKCaBPx0v6cksRfEPt+35qtNF6u8cLBQumSEit/VoqIwllLVQ8YoxxxhgnpTyNaM5X/EXR1K3kjG5i12KtFVLKg7m31ia3Xsgh14wLwo3B9SjYwl0lx83Bc2pbwaZuJeYyYueJwgcBTSxu1Jp+Ggq0lkCuAl0p9Tl+fqQM7nEWeYQGwCDeTeSYRu9OtNYfF/Mk2AX2PnvLMlspXTbIpc4Vu0ClVLJmlzNsxOHHMUr9ptaahTA8xpiDe1FKNXUv38BmECwkDO+78Q6BnMGzt92myy18mTHmtKgHxw5UzIBjD85D1vhae4w/HhVHKrj0ogiRE8ByovfZ20fEkZNx5OIzkR7ofXLuVnHERPGWNZk9l1fe0iopUfie/wZxuI5Xr1dtlZgocI+pXd/KnR4D1CriKBEF/M6bxOGQpexBIF+J44ooPL1lHjWgCrg4C+TSIJifCKOqz7XWwjk3N58noCbjOFfwF4tj27Ypii/oSSDZ4vDWAg9j+5udosgnJBAu9TkfcnwPNdSdGs1MEVt1/haoGIRT/JUUBxVw1riBKY5fqKCey/MIioO66G+tBWSK4whHgZDieMLcvWV0tAQoEA7uhVzsg8v7uKy0GplvNsy7DawWXGJ4l3mbluMXam0LB6vhKMuB1bvvO1kMlPpeCbFC5FiFV865XAmtk+X03ytPpQk16j84AIUSqvqijtWGqrYLdaTW5QyYgziG3k6ggBqCKa2rwdtdceBkOXDllidVqFxyY7hIKWZGqUJm6sGzC+YSwPvmJgpPk4o3KI67fCwUy5MlhBiq2o6rGDBs6lZqE4s5UmK8a/uE3mi+BcOEL/8A7FpAu2E6F2MAAAAASUVORK5CYII=",
    "cliente": { "bairro": "CENTRO", "celular": "94301426", "cep": "61800000", "cidade": "PACATUBA", "codigoExterno": "213381", "complemento": "", "dataCadastro": "2021-07-14T09:52:00.000", "email": "suprimentos.ce@gpssa.com.br", "estado": "CE", "foto": "", "id": "213381", "logradouro": "CE 060 KM11 ", "nome": "Top Service Servicos E Sistema", "numero": "S/N", "observacao": "AUT SRA ANA BEATRIZ PROCURAR KVAMAR OU JAQUELINE NA PORTARIA - PED PAGO ORDEM DE COMPRA 028489", "pontoDeReferencia": "HEINEKEN ", "telegram": "", "whatsapp": "" },
    "codigoCliente": "213381", "codigoExterno": "968111", "codigoTecnico": "1879", "codigoVendedor": "1271",
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
    "id": "968927",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAAA1CAYAAACUax/TAAAABHNCSVQICAgIfAhkiAAAA/VJREFUeJztnGuSqyAQhfHW7MvOyoSVgSvz/mqrg7xtHhpOVapSY0YiH6e7BcNyHMchpl6nf72/wFQdTbAv1V+NkyqlhDHm62/btgkAqNHclEMLd45VSgkppfPYTOftxA52WRbvMQAQWmvO5qY8Ys2xNPwiROpeY8wlRE/VESvYfd/P9wAgAOCSW5VSnE1OeVTNsVQ0/E7XthFrjqX51T6tMUZ8Ph8hKudaY4xQSp1RYtu2Ku0Mr4NRQojzFTuuteZs+hQAfLWDLylllfZGFRtYKeXZiQBQ/Bmu7/DrcKvMPPkmItZ1Pd/XyLW0AgeAy/20lFIsy/IbBRzXCKFuCTmDhkpO19puDR2rFTFGEptjqfuoM221KGZsp27b5rynfrV7uUZIrHDyfZariEo9p8u9b8y9XcDWCMc57WutncVVrUq9h1hCsT2VGBN3OKbhNKV9ABDHcVxC9ufzeU1oZgFrTyXGRD/DXR3nLA1u2+asnF8Bl9pXa31IKbNDUmpFTMUZjjnCqZ17AeDRofkLrOuWIAV0CVia5zjB3tGbCquzJ3wFhX2Rrgul7ssZ5dxO44DwFrhfQzw2Jedzc6ljOMIxPQcXANcgfxrcC4kU54ZeOc67MyjOC2AKwy7ZCwpPguvsDa315aLQob7VE5+jY51RGsaPBosKdhtPghsc5i64KIRWErp9beTC4c6vKe08BW40fsWKCds1qY7GgRGavM/5XrXluh0aWUk9EoLrcw1CSwWd64ZWbvW1OTrc5KHuK6pSq9Lc0I2fd+Xd1m4NtT0q3OxeCcHJcU4p6MOqhHvkuyfALRruPiB3Ojk3ZPdwK9XocG/1DOcsjW9SIAVu6q0Vt0aulm8Pec6nAl0dVTJh0hL0qHBvg43l3NwLTQnJJRV3TdAjwmUFy+Ve32DxLaXhciP3rNid79wbLmsoxk7nKK4QVgho7H9zQd9df7Xb67meWwUsqkb1XKKWjq71eG2uqoI9IvervcJVLmiao2MutIu9XtdYHSwqBrhnTiopxkKubrHqFFMzsKgQYOys3ipxNAXN+dhPqZqDRcWmFDmKGS4h6Jwp0N6DtRtYqliHjeBiW3dWr1oM2ttgMexwhJwYYK7bkhoqgVzzmth3jeEQPrDt21YIhcfXde2yhxT+el54tmnAfThyHoqne3fc0ZBgqVIho7BjqOiv/0oHAILZ9z0KyrWpCp4DfzWRej34uVzQw4OlyoXcWj6gIVHHx1ydA/lRYKno6O+1Ew3dwIQrFeSmIR/kx4L1iQKnf3O9zxGCA4AztNfO66lullJeAbOWYlNVFau86W3hBPtQxebfXxeKf032brOIc4J9iTAfY66dYF+q//88r5DTNR9JAAAAAElFTkSuQmCC",
    "cliente": { "bairro": "PASSARE", "celular": "988902285", "cep": "60743710", "cidade": "FORTALEZA", "codigoExterno": "219094", "complemento": "", "dataCadastro": "2022-03-16T09:33:00.000", "email": "", "estado": "CE", "foto": "", "id": "219094", "logradouro": "RUA DOUTOR EDUARDO DIAS", "nome": "Francisca Nathalia Chaves Cardoso", "numero": "46", "observacao": "PEDE A PARTIR DE 12:00//REINSTALAR SOFT", "pontoDeReferencia": "NA RUA DO COLÉGIO EXODUS", "telegram": "", "whatsapp": "" },
    "codigoCliente": "219094", "codigoExterno": "968927", "codigoTecnico": "1879", "codigoVendedor": "1694",
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
    "id": "969057",
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "83981097374", "cep": "62880208", "cidade": "HORIZONTE", "codigoExterno": "245822", "complemento": "CASA", "dataCadastro": "2025-07-25T09:57:00", "email": "", "estado": "CE", "foto": "", "id": "245822", "logradouro": "RUA JOAO LUIZ DA SILVA", "nome": "BRUNA DE PAULA SILVA", "numero": "147", "observacao": "AUT SRA BRUNA - ROTA 27/05", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "245822", "codigoExterno": "969057", "codigoTecnico": "1866", "codigoVendedor": "1661",
    "dadosPedidoDeCobranca": "AUT SRA BRUNA - ROTA 27/05", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "245822", "index": 3,
    "nomeCliente": "BRUNA DE PAULA SILVA", "nomeTecnico": "EMERSON", "nomeVendedor": "SONIA",
    "observacao": "AUT SRA BRUNA - ROTA 27/05", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "969057", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "969057", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 198, "quantidade": 1, "situacaoRomaneio": "ATENDIMENTO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 198 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "969186",
    "assinatura": "",
    "cliente": { "bairro": "PEDRAS", "celular": "987792651", "cep": "60874765", "cidade": "FORTALEZA", "codigoExterno": "248923", "complemento": "", "dataCadastro": "2025-12-02T07:58:00", "email": "", "estado": "CE", "foto": "", "id": "248923", "logradouro": "RUA JORGE FIGUEIREDO", "nome": "LIVIS MARIA MOREIRA DE SOUZA", "numero": "2400", "observacao": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "pontoDeReferencia": "DEPOSITO NOVA CONSTRUCAO", "telegram": "987792651", "whatsapp": "987792651" },
    "codigoCliente": "248923", "codigoExterno": "969186", "codigoTecnico": "1866", "codigoVendedor": "559",
    "dadosPedidoDeCobranca": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "248923", "index": 15,
    "nomeCliente": "LIVIS MARIA MOREIRA DE SOUZA", "nomeTecnico": "EMERSON", "nomeVendedor": "ADRIANA",
    "observacao": "CL VIP RUBI 1/6  DECDICR COM TECNICO", "pendencia": "", "prazoPagamento": "0+12",
    "produtos": [
      { "codigoPedido": "969186", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "969186", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "969186", "codigoProduto": "2532", "descricao": "VIPZON RUBI", "id": "2532", "idPedido": "969186", "idProduto": "2532", "precoMinimo": 0, "precoUnitario": 900, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "969186", "codigoProduto": "2534", "descricao": "VIPZON 1/6 RUBI", "id": "2534", "idPedido": "969186", "idProduto": "2534", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 12, "valor": 900 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "969565",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,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",
    "cliente": { "bairro": "LAGOA REDONDA", "celular": "989489014", "cep": "60832160", "cidade": "FORTALEZA", "codigoExterno": "60490", "complemento": "", "dataCadastro": "1999-01-02T00:00:00.000", "email": "", "estado": "CE", "foto": "", "id": "60490", "logradouro": "RUA JOSERISSE HORTENCIO DOS SANTOS", "nome": "Luiziane Bezerra Ferreira", "numero": "646", "observacao": "AUT P/SRA LUIZIANE", "pontoDeReferencia": "PX  DEPOSITO LAURINDA :31144461 (SRLUCIO 85087961", "telegram": "", "whatsapp": "" },
    "codigoCliente": "60490", "codigoExterno": "969565", "codigoTecnico": "286", "codigoVendedor": "1487",
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
    "id": "969659",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAABHNCSVQICAgIfAhkiAAAAEBJREFUCJl1jbENwDAMw5g8ltfsy+xcxk5pllaTAJHQUOUj85TuJjPvohoRAgJWlaoTYK31gnvvaxzr0Krj7/wBhcM0HtzGK7UAAAAASUVORK5CYII=",
    "cliente": { "bairro": "CENTRO", "celular": "85984312527", "cep": "61800000", "cidade": "PACATUBA", "codigoExterno": "188467", "complemento": "CASA 167", "dataCadastro": "2018-12-11T09:47:00.000", "email": "", "estado": "CE", "foto": "", "id": "188467", "logradouro": "AV B", "nome": "Marcelo Cordeiro Dos Santos", "numero": "400", "observacao": "AUT: SR MARCELO ", "pontoDeReferencia": "CONDOMINIO MORADADA DOS BUQUES/ENFRENTE ASSEMBLEIA DE DEUS", "telegram": "85986722810", "whatsapp": "85986722810" },
    "codigoCliente": "188467", "codigoExterno": "969659", "codigoTecnico": "1866", "codigoVendedor": "1071",
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
    "id": "970007",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "992288536", "cep": "61000000", "cidade": "ITAITINGA", "codigoExterno": "82827", "complemento": "CENTRO", "dataCadastro": "2004-01-06T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "82827", "logradouro": "JOSE FELIX BATISTA 368", "nome": "MARIA SOCORRO FLORENCIO ANDRADE", "numero": "368", "observacao": "CL VIPZON 2/4 AUT SRA SOCORRO", "pontoDeReferencia": "PROX A MERCERIA DO EDIVALDO", "telegram": "", "whatsapp": "" },
    "codigoCliente": "82827", "codigoExterno": "970007", "codigoTecnico": "1866", "codigoVendedor": "936",
    "dadosPedidoDeCobranca": "CL VIPZON 2/4 AUT SRA SOCORRO", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "82827", "index": 7,
    "nomeCliente": "MARIA SOCORRO FLORENCIO ANDRADE", "nomeTecnico": "EMERSON", "nomeVendedor": "SAMARA LOURENCO",
    "observacao": "CL VIPZON 2/4 AUT SRA SOCORRO", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "970007", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "970007", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "970007", "codigoProduto": "2480", "descricao": "VIPZON 2/4 DIAMOND/BRONZE", "id": "2480", "idPedido": "970007", "idProduto": "2480", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "970066",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "998102345", "cep": "61880000", "cidade": "ITAITINGA", "codigoExterno": "241539", "complemento": "", "dataCadastro": "2025-01-04T11:41:00", "email": "", "estado": "CE", "foto": "", "id": "241539", "logradouro": "RUA JOAQUIM PEREIRA DA SILVEIRA", "nome": "JOSE EVERARDO FERREIRA", "numero": "695", "observacao": "AUT JOSE EVERARDO ", "pontoDeReferencia": "PROXIMO AO FINAL DA RUA DO CAPES", "telegram": "", "whatsapp": "" },
    "codigoCliente": "241539", "codigoExterno": "970066", "codigoTecnico": "1866", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT JOSE EVERARDO ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "241539", "index": 8,
    "nomeCliente": "JOSE EVERARDO FERREIRA", "nomeTecnico": "EMERSON", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT JOSE EVERARDO ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "970066", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "970066", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "970066", "codigoProduto": "2480", "descricao": "VIPZON 2/4 DIAMOND/BRONZE", "id": "2480", "idPedido": "970066", "idProduto": "2480", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "970147",
    "acrescimo": 0,
    "assinatura": "",
    "cliente": { "bairro": "PASSARE", "celular": "8589738509", "cep": "60861350", "cidade": "FORTALEZA", "codigoExterno": "252264", "complemento": "", "dataCadastro": "2026-05-15T08:57:00.000", "email": "", "estado": "CE", "foto": "", "id": "252264", "logradouro": "RUA MOURA MATOS", "nome": "Marcondes Lopes Da Rocha", "numero": "1513", "observacao": "", "pontoDeReferencia": "PROXINO A FARMACIA EXTRA FARMA", "telegram": "8589738509", "whatsapp": "8589738509" },
    "codigoCliente": "252264", "codigoExterno": "970147", "codigoTecnico": "1879", "codigoVendedor": "559",
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
    "id": "970271",
    "assinatura": "",
    "cliente": { "bairro": "ALDEOTA", "celular": "8532241172", "cep": "60115280", "cidade": "FORTALEZA", "codigoExterno": "74749", "complemento": "AP 300", "dataCadastro": "2000-02-17T00:00:00", "email": "", "estado": "CE", "foto": "", "id": "74749", "logradouro": "RUA DRUA  JOSE LOURENCO", "nome": "MARIA DO CARMO FERNANDES CAVALCANTE", "numero": "440", "observacao": "", "pontoDeReferencia": "A MESMA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "74749", "codigoExterno": "970271", "codigoTecnico": "1976", "codigoVendedor": "1694",
    "dadosPedidoDeCobranca": "", "dataRomaneio": "2026-05-29T00:00:00", "dataVisita": "2026-05-29T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "74749", "index": 5,
    "nomeCliente": "MARIA DO CARMO FERNANDES CAVALCANTE", "nomeTecnico": "SAMUEL OLIVEIRA", "nomeVendedor": "ANDREA LINS",
    "observacao": "", "pendencia": "", "prazoPagamento": "0+4",
    "produtos": [{ "codigoPedido": "970271", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "970271", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 160, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "CARTÃO DE CRÉDITO                                           ", "id": "482", "quantidade": 4, "valor": 160 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "970764",
    "assinatura": "",
    "cliente": { "bairro": "PACAJUS", "celular": "85992789180", "cep": "62870000", "cidade": "PACAJUS", "codigoExterno": "168758", "complemento": "SITIO AQUARIOS / LAGOA SECA", "dataCadastro": "2016-12-30T17:45:00", "email": "", "estado": "CE", "foto": "", "id": "168758", "logradouro": "MANOEL CONRRADO FILHO", "nome": "MARIA DE FATIMA GURGEL DE CASTRO", "numero": "286", "observacao": "AUT SRA FATIMA /CL VIPZON 3/4 ", "pontoDeReferencia": "AO LADO CEMITERIO NOVO / LAGOA SECA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "168758", "codigoExterno": "970764", "codigoTecnico": "1866", "codigoVendedor": "936",
    "dadosPedidoDeCobranca": "AUT SRA FATIMA /CL VIPZON 3/4 ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "168758", "index": 12,
    "nomeCliente": "MARIA DE FATIMA GURGEL DE CASTRO", "nomeTecnico": "EMERSON", "nomeVendedor": "SAMARA LOURENCO",
    "observacao": "AUT SRA FATIMA /CL VIPZON 3/4 ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "970764", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "970764", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 2, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "970764", "codigoProduto": "2481", "descricao": "VIPZON 3/4 DIAMOND/BRONZE", "id": "2481", "idPedido": "970764", "idProduto": "2481", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "971941",
    "assinatura": "",
    "cliente": { "bairro": "CENTRO", "celular": "94305247", "cep": "61700000", "cidade": "HORIZONTE", "codigoExterno": "157213", "complemento": "JUSTINIANO DE SERPA", "dataCadastro": "2015-10-05T14:39:00", "email": "e portao marrom", "estado": "CE", "foto": "", "id": "157213", "logradouro": "RUA RUFINO CORREA ASSUNÇAO", "nome": "MARIA EUGENIA GOMES SANTIAGO", "numero": "47", "observacao": "AUT EUGENIA ", "pontoDeReferencia": "", "telegram": "", "whatsapp": "" },
    "codigoCliente": "157213", "codigoExterno": "971941", "codigoTecnico": "1866", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT EUGENIA ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "157213", "index": 4,
    "nomeCliente": "MARIA EUGENIA GOMES SANTIAGO", "nomeTecnico": "EMERSON", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT EUGENIA ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "971941", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "971941", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" },
      { "codigoPedido": "971941", "codigoProduto": "2479", "descricao": "VIPZON 1/4 DIAMOND/BRONZE", "id": "2479", "idPedido": "971941", "idProduto": "2479", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "REAGENDADO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
  {
    "id": "972122",
    "acrescimo": 0,
    "assinatura": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4CAYAAAB1ovlvAAAABHNCSVQICAgIfAhkiAAABbdJREFUeJztneuSsyoQRfGr817ok2GeDPNknl9aLfECCLSTrFWVqtzGYXRndzf0kG6e59kAKPFPewDw29wS4DRN5XYCP0mWAMdxNF3XmWEYzDiOxQcFv0OXkgNO02SGYfh4njQScolywGmaTN/3u+IzxuCCkE2UAIdhMO/3e31srTXOufUxuSBkM1/gnJuNMevNObe+Zq1dn/feXx0K4IOkIsQ5twm3fd+v9wnDkMNlEdJ13XpzMW61SijNaJDRqpYcrJtIpXS9X7GnJXm9CiWwI6KBQgRi2S1CWNGAVuw64N08Tv48DghnVJmGQYAQSxUHBIilugOyJAdnNFkJIQzDEasApVOVCMFU0hADDgiqVBMglTDE0ESAAEf8MwUaUfeQAkSMcMR/NQ/unDN93yNAOKSqAOkHhCs+QjBuBS2hJR9UQYCgCgIEVRAgqIIAQRUECKogQFAFAYIqCBBUQYCgCgIEVRAgqPLP0L0MiuCAoAoCBFXW7dnYUg00wAFBlVWA7OkHGuCAoAoCBFVWATIXCBrggKAKDgiq4ICgyq4A2dUUWlHli2oAYtk4IJPR0BpyQFAFAYIqGwEyFQOtQYCgCiEYVDkUIHOB0ILDEGwIw9CADwd86jccjeNouq5j3+lvYw5wzs3GmNkYM1trw5fVWMa03Jxz2kOCAnw44BM3Kd9zvdfrRYrwBZwK8OmFCOH477NpRljo+34Vn/de3RVlk4T33gzDsD52zqkIcXHfaZp2v+aCL+iJZC8uW2sflWvJ3G+e59l7//FcS2SefHWz1j7iHD6V3asnL7B2IXJUFMkPScsxpogPMV5zKUANh5HICy4vXjhG733TsUhBee/Xm3Nuds5tPiCI8ZhDdckT2OLixowjvGCtXTAUUAyLIM/EuLznFzkU4FPC8JkTt3TBUES5x0CMW6IEqBWGY8bQygVLT4LHhOlfEOOpsrTD8FH+J2nhgiXcL+X4R2LUTIVqcXo2tcNwjADD99UYZ6tpqaWI+aXi5fLj3LrSzP3dtUSilYrEiPEbQvTlGdUKw6kXvlYojnXhmnxz8XJ5ZbXCcM6Fr1GQlC4+7pIyx/gXcsaomKIRhnMEWNoFaxcfd4kR49MFGXVWNZa9coVUcqxPCL+xxIpxOS+LKLWFudsNEzJN06YDpXaHTPj7UrYJKTnWv7pVydId9Hq9sn5+6YoPz5vs9ClGrFJbuuBd5ykx1qd2hucQuz6degudNMdNowXYcjqixJTK3eLhaS1pJZFNEzWEKfPOK1FGhWBpwbUbVe+E37PjpIy31Bj+IrK59uh+bqe8tXZt1F2vReonp3ZYKpn454biv1R8aBK2oMX2SspzmhxLa0/J3A2dkjBtiD1eyTH8KlKYRQVYMzmvMe8WHvNKUN9UfDyNvdWarKtcK0GvFfpiRZgqVrhPlgBrVcQ1q+y9Sk+mEOHfhPu1IftKl3bBFon/Xj6yTBeEz0Mbss904XXXVqEvplJ74prpt3Lro15qdURj0f9IiIivLUkT0XuTliV2KZBrri13OpC7Gxh2M9DhroLvuheTvr/N7S16x3HcbCmY4iDjOGZ3bMCXUELFuSsO37zgD3EUy/jvrDgw7fG7FL3y4WTvUSs4Kw6wcKsK3kO2bIUsuaJ8XWt/P3gGxQVoTHxxYa1lm90fp4oAFxZnm6bpwxURH5jaAgyRgkR8YFoLECDkf4CuhOmGAUUrAAAAAElFTkSuQmCC",
    "cliente": { "bairro": "ALDEOTA", "celular": "991360237", "cep": "60140200", "cidade": "FORTALEZA", "codigoExterno": "198846", "complemento": "APTO 702", "dataCadastro": "2019-12-26T13:00:00.000", "email": "", "estado": "CE", "foto": "", "id": "198846", "logradouro": "RUA PAULA NEY", "nome": "Hevaldo Andre Sabino Moreira", "numero": "550", "observacao": "AUT HEVALDO ", "pontoDeReferencia": "ESQUINA COM PROF. DIAS ROCHA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "198846", "codigoExterno": "972122", "codigoTecnico": "1221", "codigoVendedor": "1858",
    "dadosPedidoDeCobranca": "AUT HEVALDO ", "dataRomaneio": "2026-05-27T00:00:00.000", "dataVisita": "2026-05-27T00:00:00.000",
    "desconto": 0, "enderecoCobranca": "", "frete": 0, "horaInstalacao": "", "idCliente": "198846", "index": 11,
    "lancadoComercial": true, "lancadoLogistica": true, "nomeCliente": "Hevaldo Andre Sabino Moreira", "nomeTecnico": "TIAGO SOARES", "nomeVendedor": "ANA BEATRIZ",
    "observacao": "AUT HEVALDO ", "observacaoTecnico": "", "pedidoTeste": "0", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "desconto": 0, "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "devolvido": 0, "id": "1253", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 },
      { "desconto": 0, "descricao": "VIPZON 3/4 DIAMOND/BRONZE", "devolvido": 0, "id": "2481", "idProduto": "2481", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1 }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "FINALIZADO", "tipoPedido": "", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "transformadoEmVipzon": false, "turno": "INTEGRAL"
  },
  {
    "id": "972226",
    "assinatura": "",
    "cliente": { "bairro": "ITAITINGA", "celular": "85992198866", "cep": "61880000", "cidade": "ITAITINGA", "codigoExterno": "108235", "complemento": "BAIRRO ANCURI", "dataCadastro": "2008-05-21T10:41:00", "email": "", "estado": "CE", "foto": "", "id": "108235", "logradouro": "RUA NATALIA ARAUJO REBOLCAS CHAGAS", "nome": "LIDIANE DANTAS ROCHA", "numero": "308", "observacao": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "pontoDeReferencia": "ENTRADA NA RUA DA MORENA", "telegram": "", "whatsapp": "" },
    "codigoCliente": "108235", "codigoExterno": "972226", "codigoTecnico": "1866", "codigoVendedor": "1953",
    "dadosPedidoDeCobranca": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "dataRomaneio": "2026-05-27T00:00:00", "dataVisita": "2026-05-27T00:00:00",
    "enderecoCobranca": "", "horaInstalacao": "", "idCliente": "108235", "index": 9,
    "nomeCliente": "LIDIANE DANTAS ROCHA", "nomeTecnico": "EMERSON", "nomeVendedor": "VIVIANE ANDRADE",
    "observacao": "AUT SRA LIDIANE - CL VIP LIGAR 20 MINUTOS ANTES ", "pendencia": "", "prazoPagamento": "VIPZON",
    "produtos": [
      { "codigoPedido": "972226", "codigoProduto": "1253", "descricao": "FILTRO ORIGINAL SUPERZON AGUA GELADA", "id": "1253", "idPedido": "972226", "idProduto": "1253", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "EM ABERTO" },
      { "codigoPedido": "972226", "codigoProduto": "2540", "descricao": "VIPZON 6/6 RUBI", "id": "2540", "idPedido": "972226", "idProduto": "2540", "precoMinimo": 0, "precoUnitario": 0, "quantidade": 1, "situacaoRomaneio": "EM ABERTO" }
    ],
    "quemAssinou": "", "situacao": 0, "situacaoRomaneio": "EM ABERTO", "tipoVenda": "VENDA",
    "tiposPagamento": [{ "descricao": "VIPZON                                                      ", "id": "4716", "quantidade": 1, "valor": 0 }],
    "turno": "INTEGRAL"
  },
];

async function put(pedido, index) {
  try {
    const res = await fetch(`${BASE_URL}/${pedido.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
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
  console.log(`Enviando ${pedidos.length} pedidos para ${BASE_URL}\n`);
  const results = await Promise.all(pedidos.map((p, i) => put(p, i)));
  const ok = results.filter(Boolean).length;
  console.log(`\nConcluído: ${ok}/${pedidos.length} inseridos com sucesso.`);
}

main();
