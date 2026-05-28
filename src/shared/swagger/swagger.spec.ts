export const swaggerSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Rotas SZ BFF',
    description: 'API do sistema Rotas-SZ com Clean Architecture',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:3001', description: 'Desenvolvimento local' },
  ],
  tags: [
    { name: 'Checklist Assistência', description: 'Checklists de assistência técnica' },
    { name: 'Checklist Assistência Água Natural', description: 'Checklists de assistência para purificadores de água natural' },
    { name: 'Funcionários', description: 'Gestão de funcionários' },
    { name: 'Motivos de Retorno', description: 'Motivos de retorno de pedidos' },
    { name: 'Motivos de Situação', description: 'Motivos de situação de visitas' },
    { name: 'Pedidos', description: 'Gestão de pedidos e romaneios' },
    { name: 'Pendências', description: 'Gestão de pendências de pedidos' },
    { name: 'Produtos Entregue', description: 'Controle de produtos entregues' },
    { name: 'Produtos Recebido', description: 'Controle de produtos recebidos' },
    { name: 'Visitas', description: 'Gestão de visitas comerciais' },
  ],
  paths: {
    '/checklist-assistencia': {
      get: {
        tags: ['Checklist Assistência'],
        summary: 'Listar checklists de assistência',
        responses: {
          200: {
            description: 'Lista de checklists',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ChecklistAssistencia' } } } },
          },
        },
      },
      post: {
        tags: ['Checklist Assistência'],
        summary: 'Criar checklist de assistência',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistenciaInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes' },
        },
      },
    },
    '/checklist-assistencia/{id}': {
      get: {
        tags: ['Checklist Assistência'],
        summary: 'Buscar checklist de assistência por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Checklist encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistencia' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Checklist Assistência'],
        summary: 'Atualizar parcialmente checklist de assistência',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistenciaInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/checklist-assistencia-agua-natural': {
      get: {
        tags: ['Checklist Assistência Água Natural'],
        summary: 'Listar checklists de assistência água natural',
        responses: {
          200: {
            description: 'Lista de checklists',
            content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ChecklistAssistenciaAguaNatural' } } } },
          },
        },
      },
      post: {
        tags: ['Checklist Assistência Água Natural'],
        summary: 'Criar checklist de assistência água natural',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistenciaAguaNaturalInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes' },
        },
      },
    },
    '/checklist-assistencia-agua-natural/{id}': {
      get: {
        tags: ['Checklist Assistência Água Natural'],
        summary: 'Buscar checklist de assistência água natural por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Checklist encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistenciaAguaNatural' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Checklist Assistência Água Natural'],
        summary: 'Atualizar parcialmente checklist de assistência água natural',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ChecklistAssistenciaAguaNaturalInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/funcionarios': {
      get: {
        tags: ['Funcionários'],
        summary: 'Listar funcionários',
        responses: {
          200: { description: 'Lista de funcionários', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Funcionario' } } } } },
        },
      },
      post: {
        tags: ['Funcionários'],
        summary: 'Criar funcionário',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/FuncionarioInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes: funcao, nome, email' },
        },
      },
    },
    '/funcionarios/{id}': {
      get: {
        tags: ['Funcionários'],
        summary: 'Buscar funcionário por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Funcionário encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Funcionario' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Funcionários'],
        summary: 'Atualizar parcialmente funcionário',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/FuncionarioInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Funcionários'],
        summary: 'Remover funcionário',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/motivos-retorno': {
      get: {
        tags: ['Motivos de Retorno'],
        summary: 'Listar motivos de retorno',
        responses: {
          200: { description: 'Lista de motivos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/MotivoRetorno' } } } } },
        },
      },
      post: {
        tags: ['Motivos de Retorno'],
        summary: 'Criar motivo de retorno',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campo "descricao" é obrigatório' },
        },
      },
    },
    '/motivos-retorno/{id}': {
      get: {
        tags: ['Motivos de Retorno'],
        summary: 'Buscar motivo de retorno por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Motivo encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoRetorno' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Motivos de Retorno'],
        summary: 'Atualizar motivo de retorno',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Motivos de Retorno'],
        summary: 'Remover motivo de retorno',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/motivos-situacao': {
      get: {
        tags: ['Motivos de Situação'],
        summary: 'Listar motivos de situação',
        responses: {
          200: { description: 'Lista de motivos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/MotivoSituacao' } } } } },
        },
      },
      post: {
        tags: ['Motivos de Situação'],
        summary: 'Criar motivo de situação',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campo "descricao" é obrigatório' },
        },
      },
    },
    '/motivos-situacao/{id}': {
      get: {
        tags: ['Motivos de Situação'],
        summary: 'Buscar motivo de situação por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Motivo encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoSituacao' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Motivos de Situação'],
        summary: 'Atualizar motivo de situação',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/MotivoInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Motivos de Situação'],
        summary: 'Remover motivo de situação',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/pedidos': {
      get: {
        tags: ['Pedidos'],
        summary: 'Listar pedidos com filtros opcionais de data',
        parameters: [
          { name: 'month', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 12 }, description: 'Mês (1-12)' },
          { name: 'year', in: 'query', schema: { type: 'integer' }, description: 'Ano (ex: 2025)' },
          { name: 'day', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 31 }, description: 'Dia (1-31)' },
        ],
        responses: {
          200: { description: 'Lista de pedidos', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pedido' } } } } },
        },
      },
    },
    '/pedidos/{id}': {
      get: {
        tags: ['Pedidos'],
        summary: 'Buscar pedido por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Pedido encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pedido' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      put: {
        tags: ['Pedidos'],
        summary: 'Criar ou substituir pedido (upsert)',
        description: 'O app fornece o ID. Comportamento idêntico ao Firebase: cria se não existir, substitui se existir.',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PedidoInput' } } },
        },
        responses: {
          200: { description: 'Operação realizada com sucesso' },
          400: { description: 'Campo "horaInstalacao" é obrigatório' },
        },
      },
      patch: {
        tags: ['Pedidos'],
        summary: 'Atualizar parcialmente pedido',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PedidoInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Pedidos'],
        summary: 'Remover pedido',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/pendencias': {
      get: {
        tags: ['Pendências'],
        summary: 'Listar pendências',
        responses: {
          200: { description: 'Lista de pendências', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Pendencia' } } } } },
        },
      },
      post: {
        tags: ['Pendências'],
        summary: 'Criar pendência',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PendenciaInput' } } },
        },
        responses: {
          201: { description: 'Criada com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes: pedidoId, nomeCliente, pendencia' },
        },
      },
    },
    '/pendencias/{id}': {
      get: {
        tags: ['Pendências'],
        summary: 'Buscar pendência por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Pendência encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Pendencia' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Pendências'],
        summary: 'Atualizar parcialmente pendência',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/PendenciaInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Pendências'],
        summary: 'Remover pendência',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/produtos-entregue': {
      get: {
        tags: ['Produtos Entregue'],
        summary: 'Listar registros de produtos entregues',
        responses: {
          200: { description: 'Lista de registros', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ProdutosEntregue' } } } } },
        },
      },
      post: {
        tags: ['Produtos Entregue'],
        summary: 'Registrar produtos entregues',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosMovimentacaoInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes: dataRomaneio, codigoTecnico' },
        },
      },
    },
    '/produtos-entregue/{id}': {
      get: {
        tags: ['Produtos Entregue'],
        summary: 'Buscar registro de produtos entregues por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Registro encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosEntregue' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Produtos Entregue'],
        summary: 'Atualizar parcialmente registro de produtos entregues',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosMovimentacaoInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/produtos-recebido': {
      get: {
        tags: ['Produtos Recebido'],
        summary: 'Listar registros de produtos recebidos',
        responses: {
          200: { description: 'Lista de registros', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/ProdutosRecebido' } } } } },
        },
      },
      post: {
        tags: ['Produtos Recebido'],
        summary: 'Registrar produtos recebidos',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosMovimentacaoInput' } } },
        },
        responses: {
          201: { description: 'Criado com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes: dataRomaneio, codigoTecnico' },
        },
      },
    },
    '/produtos-recebido/{id}': {
      get: {
        tags: ['Produtos Recebido'],
        summary: 'Buscar registro de produtos recebidos por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Registro encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosRecebido' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Produtos Recebido'],
        summary: 'Atualizar parcialmente registro de produtos recebidos',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ProdutosMovimentacaoInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },

    '/visitas': {
      get: {
        tags: ['Visitas'],
        summary: 'Listar visitas',
        responses: {
          200: { description: 'Lista de visitas', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Visita' } } } } },
        },
      },
      post: {
        tags: ['Visitas'],
        summary: 'Criar visita',
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/VisitaInput' } } },
        },
        responses: {
          201: { description: 'Criada com sucesso', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatedResponse' } } } },
          400: { description: 'Campos obrigatórios ausentes: dataVisita, codigoVendedor, nomeVendedor, codigoVisitante, nomeVisitante, situacao, horaVisita, turno' },
        },
      },
    },
    '/visitas/{id}': {
      get: {
        tags: ['Visitas'],
        summary: 'Buscar visita por ID',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          200: { description: 'Visita encontrada', content: { 'application/json': { schema: { $ref: '#/components/schemas/Visita' } } } },
          404: { description: 'Não encontrado' },
        },
      },
      patch: {
        tags: ['Visitas'],
        summary: 'Atualizar parcialmente visita',
        parameters: [{ $ref: '#/components/parameters/id' }],
        requestBody: {
          required: true,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/VisitaInput' } } },
        },
        responses: {
          204: { description: 'Atualizado com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
      delete: {
        tags: ['Visitas'],
        summary: 'Remover visita',
        parameters: [{ $ref: '#/components/parameters/id' }],
        responses: {
          204: { description: 'Removido com sucesso' },
          404: { description: 'Não encontrado' },
        },
      },
    },
  },
  components: {
    parameters: {
      id: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        description: 'ID do registro (MongoDB ObjectId)',
      },
    },
    schemas: {
      CreatedResponse: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '665f1a2b3c4d5e6f7a8b9c0d' },
        },
      },
      ChecklistAssistencia: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          numeroSerie: { type: 'string' },
          modelo: { type: 'string' },
          botaoAguaGelada: { type: 'boolean' },
          botaoAguaGeladaFuncionando: { type: 'boolean' },
          botaoAguaNatural: { type: 'boolean' },
          botaoAguaNaturalFuncionando: { type: 'boolean' },
          painelSemTrinca: { type: 'boolean' },
          painelSemViolacaoEncaixes: { type: 'boolean' },
          painelComAdesivoFrontal: { type: 'boolean' },
          painelComColoracaoAmarelado: { type: 'boolean' },
          torneiraPingando: { type: 'boolean' },
          torneiraComPoucoVazao: { type: 'boolean' },
          semATorneira: { type: 'boolean' },
          comAPingadeira: { type: 'boolean' },
          pingadeiraAmassada: { type: 'boolean' },
          pingadeiraSemGrade: { type: 'boolean' },
          pingadeiraArranhada: { type: 'boolean' },
          gabineteComFerrugem: { type: 'boolean' },
          pinturaDesgastada: { type: 'boolean' },
          amassadoNoGabinete: { type: 'boolean' },
          gabineteComCaixaEletrica: { type: 'boolean' },
          ausenciaFiltroCompartimento: { type: 'boolean' },
          ausenciaTampaCompartimento: { type: 'boolean' },
          ausenciaEngate: { type: 'boolean' },
          violacaoEncaixeCompartimento: { type: 'boolean' },
          contemTodosPedais: { type: 'boolean' },
          condensadorSemArranhoes: { type: 'boolean' },
          condensadorSemAmassado: { type: 'boolean' },
          condensadorSemFerrugem: { type: 'boolean' },
          compressorSemBarulho: { type: 'boolean' },
          caboCortado: { type: 'boolean' },
          plugMachoTrocado: { type: 'boolean' },
          caboResecado: { type: 'boolean' },
          maisInformacoes: { type: 'string' },
          descricaoDoDefeito: { type: 'string' },
          dataChecklist: { type: 'string', format: 'date-time' },
        },
      },
      ChecklistAssistenciaInput: {
        type: 'object',
        required: ['pedidoId', 'nomeCliente', 'numeroSerie', 'modelo', 'dataChecklist'],
        properties: {
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          numeroSerie: { type: 'string' },
          modelo: { type: 'string' },
          botaoAguaGelada: { type: 'boolean', default: false },
          botaoAguaGeladaFuncionando: { type: 'boolean', default: false },
          botaoAguaNatural: { type: 'boolean', default: false },
          botaoAguaNaturalFuncionando: { type: 'boolean', default: false },
          painelSemTrinca: { type: 'boolean', default: false },
          painelSemViolacaoEncaixes: { type: 'boolean', default: false },
          painelComAdesivoFrontal: { type: 'boolean', default: false },
          painelComColoracaoAmarelado: { type: 'boolean', default: false },
          torneiraPingando: { type: 'boolean', default: false },
          torneiraComPoucoVazao: { type: 'boolean', default: false },
          semATorneira: { type: 'boolean', default: false },
          comAPingadeira: { type: 'boolean', default: false },
          pingadeiraAmassada: { type: 'boolean', default: false },
          pingadeiraSemGrade: { type: 'boolean', default: false },
          pingadeiraArranhada: { type: 'boolean', default: false },
          gabineteComFerrugem: { type: 'boolean', default: false },
          pinturaDesgastada: { type: 'boolean', default: false },
          amassadoNoGabinete: { type: 'boolean', default: false },
          gabineteComCaixaEletrica: { type: 'boolean', default: false },
          ausenciaFiltroCompartimento: { type: 'boolean', default: false },
          ausenciaTampaCompartimento: { type: 'boolean', default: false },
          ausenciaEngate: { type: 'boolean', default: false },
          violacaoEncaixeCompartimento: { type: 'boolean', default: false },
          contemTodosPedais: { type: 'boolean', default: false },
          condensadorSemArranhoes: { type: 'boolean', default: false },
          condensadorSemAmassado: { type: 'boolean', default: false },
          condensadorSemFerrugem: { type: 'boolean', default: false },
          compressorSemBarulho: { type: 'boolean', default: false },
          caboCortado: { type: 'boolean', default: false },
          plugMachoTrocado: { type: 'boolean', default: false },
          caboResecado: { type: 'boolean', default: false },
          maisInformacoes: { type: 'string', default: '' },
          descricaoDoDefeito: { type: 'string', default: '' },
          dataChecklist: { type: 'string', format: 'date-time' },
        },
      },
      ChecklistAssistenciaAguaNatural: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          numeroSerie: { type: 'string' },
          modelo: { type: 'string' },
          trincado: { type: 'boolean' },
          volante: { type: 'boolean' },
          adesivoDesgastado: { type: 'boolean' },
          amarelado: { type: 'boolean' },
          torneira: { type: 'boolean' },
          rabicho: { type: 'boolean' },
          maisInformacoes: { type: 'string' },
          descricaoDoDefeito: { type: 'string' },
          dataChecklist: { type: 'string', format: 'date-time' },
        },
      },
      ChecklistAssistenciaAguaNaturalInput: {
        type: 'object',
        required: ['pedidoId', 'nomeCliente', 'numeroSerie', 'modelo', 'dataChecklist'],
        properties: {
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          numeroSerie: { type: 'string' },
          modelo: { type: 'string' },
          trincado: { type: 'boolean', default: false },
          volante: { type: 'boolean', default: false },
          adesivoDesgastado: { type: 'boolean', default: false },
          amarelado: { type: 'boolean', default: false },
          torneira: { type: 'boolean', default: false },
          rabicho: { type: 'boolean', default: false },
          maisInformacoes: { type: 'string', default: '' },
          descricaoDoDefeito: { type: 'string', default: '' },
          dataChecklist: { type: 'string', format: 'date-time' },
        },
      },
      Funcionario: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          funcao: { type: 'string', example: 'Técnico' },
          codigoExterno: { type: 'string' },
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          foto: { type: 'string' },
          assinatura: { type: 'string' },
        },
      },
      FuncionarioInput: {
        type: 'object',
        required: ['funcao', 'nome', 'email'],
        properties: {
          funcao: { type: 'string', example: 'Técnico' },
          codigoExterno: { type: 'string' },
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          foto: { type: 'string' },
          assinatura: { type: 'string' },
        },
      },
      MotivoRetorno: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          descricao: { type: 'string' },
        },
      },
      MotivoSituacao: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          descricao: { type: 'string' },
        },
      },
      MotivoInput: {
        type: 'object',
        required: ['descricao'],
        properties: {
          descricao: { type: 'string' },
        },
      },
      Carrinho: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          idProduto: { type: 'string' },
          variacaoProdutoId: { type: 'string' },
          servicoId: { type: 'string' },
          descricao: { type: 'string' },
          quantidade: { type: 'number' },
          precoUnitario: { type: 'number' },
          desconto: { type: 'number' },
          devolvido: { type: 'number' },
          devolucaoLancada: { type: 'boolean', nullable: true },
          precoMinimo: { type: 'number', nullable: true },
        },
      },
      TipoPagamento: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          descricao: { type: 'string' },
          valor: { type: 'number' },
          quantidade: { type: 'number' },
        },
      },
      Pedido: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          codigoCliente: { type: 'string' },
          codigoExterno: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          codigoTecnico: { type: 'string' },
          codigoVendedor: { type: 'string' },
          nomeVendedor: { type: 'string' },
          nomeTecnico: { type: 'string' },
          dataRomaneio: { type: 'string', format: 'date-time' },
          dataVisita: { type: 'string', format: 'date-time', nullable: true },
          pendencia: { type: 'string' },
          prazoPagamento: { type: 'string' },
          situacao: { type: 'integer' },
          frete: { type: 'number' },
          acrescimo: { type: 'number' },
          desconto: { type: 'number' },
          observacao: { type: 'string' },
          situacaoRomaneio: { type: 'string' },
          tiposPagamento: { type: 'array', items: { $ref: '#/components/schemas/TipoPagamento' }, nullable: true },
          tipoVenda: { type: 'string' },
          tipoPedido: { type: 'string' },
          turno: { type: 'string' },
          pedidoTeste: { type: 'string' },
          index: { type: 'integer' },
          produtos: { type: 'array', items: { $ref: '#/components/schemas/Carrinho' }, nullable: true },
          servicos: { type: 'array', items: { $ref: '#/components/schemas/Carrinho' }, nullable: true },
          fotos: { type: 'array', items: { type: 'string' } },
          assinatura: { type: 'string', nullable: true },
          horaInstalacao: { type: 'string' },
          lancado: { type: 'boolean', nullable: true },
          lancadoLogistica: { type: 'boolean', nullable: true },
          lancadoComercial: { type: 'boolean', nullable: true },
          quemAssinou: { type: 'string' },
          transformadoEmVipzon: { type: 'boolean' },
          ordemServicoEnviada: { type: 'boolean', nullable: true },
          numeroInformadoPeloTecnico: { type: 'boolean', nullable: true },
          observacaoTecnico: { type: 'string' },
          enderecoCobranca: { type: 'string', nullable: true },
          dadosPedidoDeCobranca: { type: 'string', nullable: true },
        },
      },
      PedidoInput: {
        type: 'object',
        required: ['horaInstalacao'],
        properties: {
          codigoCliente: { type: 'string' },
          codigoExterno: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          codigoTecnico: { type: 'string' },
          codigoVendedor: { type: 'string' },
          nomeVendedor: { type: 'string' },
          nomeTecnico: { type: 'string' },
          dataRomaneio: { type: 'string', format: 'date-time' },
          dataVisita: { type: 'string', format: 'date-time', nullable: true },
          pendencia: { type: 'string' },
          prazoPagamento: { type: 'string' },
          situacao: { type: 'integer', default: 0 },
          frete: { type: 'number', default: 0 },
          acrescimo: { type: 'number', default: 0 },
          desconto: { type: 'number', default: 0 },
          observacao: { type: 'string' },
          situacaoRomaneio: { type: 'string' },
          tiposPagamento: { type: 'array', items: { $ref: '#/components/schemas/TipoPagamento' }, nullable: true },
          tipoVenda: { type: 'string' },
          tipoPedido: { type: 'string' },
          turno: { type: 'string' },
          pedidoTeste: { type: 'string', default: '0' },
          index: { type: 'integer', default: 0 },
          produtos: { type: 'array', items: { $ref: '#/components/schemas/Carrinho' }, nullable: true },
          servicos: { type: 'array', items: { $ref: '#/components/schemas/Carrinho' }, nullable: true },
          fotos: { type: 'array', items: { type: 'string' } },
          assinatura: { type: 'string', nullable: true },
          horaInstalacao: { type: 'string' },
          lancado: { type: 'boolean', nullable: true },
          lancadoLogistica: { type: 'boolean', nullable: true },
          lancadoComercial: { type: 'boolean', nullable: true },
          quemAssinou: { type: 'string' },
          transformadoEmVipzon: { type: 'boolean' },
          ordemServicoEnviada: { type: 'boolean', nullable: true },
          numeroInformadoPeloTecnico: { type: 'boolean', nullable: true },
          observacaoTecnico: { type: 'string' },
          enderecoCobranca: { type: 'string', nullable: true },
          dadosPedidoDeCobranca: { type: 'string', nullable: true },
        },
      },
      Pendencia: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          idMotivoRetorno: { type: 'string', nullable: true },
          pendencia: { type: 'string' },
          observacao: { type: 'string' },
        },
      },
      PendenciaInput: {
        type: 'object',
        required: ['pedidoId', 'nomeCliente', 'pendencia'],
        properties: {
          pedidoId: { type: 'string' },
          codigoCliente: { type: 'string' },
          idCliente: { type: 'string' },
          nomeCliente: { type: 'string' },
          idMotivoRetorno: { type: 'string', nullable: true },
          pendencia: { type: 'string' },
          observacao: { type: 'string', default: '' },
        },
      },
      ProdutosEntregue: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          dataRomaneio: { type: 'string', format: 'date-time' },
          codigoTecnico: { type: 'string' },
        },
      },
      ProdutosRecebido: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          dataRomaneio: { type: 'string', format: 'date-time' },
          codigoTecnico: { type: 'string' },
        },
      },
      ProdutosMovimentacaoInput: {
        type: 'object',
        required: ['dataRomaneio', 'codigoTecnico'],
        properties: {
          dataRomaneio: { type: 'string', format: 'date-time' },
          codigoTecnico: { type: 'string' },
        },
      },
      Visita: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          dataVisita: { type: 'string', format: 'date-time' },
          codigoVendedor: { type: 'string' },
          nomeVendedor: { type: 'string' },
          codigoVisitante: { type: 'string' },
          nomeVisitante: { type: 'string' },
          situacao: { type: 'string' },
          motivoSituacao: { type: 'string' },
          nomeCliente: { type: 'string' },
          nomeContato: { type: 'string' },
          telefone1: { type: 'string' },
          telefone2: { type: 'string' },
          telefone3: { type: 'string' },
          cep: { type: 'string' },
          logradouro: { type: 'string' },
          numero: { type: 'string' },
          complemento: { type: 'string' },
          bairro: { type: 'string' },
          cidade: { type: 'string' },
          estado: { type: 'string' },
          pontoDeReferencia: { type: 'string' },
          observacao: { type: 'string' },
          index: { type: 'integer' },
          horaVisita: { type: 'string' },
          turno: { type: 'string' },
        },
      },
      VisitaInput: {
        type: 'object',
        required: ['dataVisita', 'codigoVendedor', 'nomeVendedor', 'codigoVisitante', 'nomeVisitante', 'situacao', 'horaVisita', 'turno'],
        properties: {
          dataVisita: { type: 'string', format: 'date-time' },
          codigoVendedor: { type: 'string' },
          nomeVendedor: { type: 'string' },
          codigoVisitante: { type: 'string' },
          nomeVisitante: { type: 'string' },
          situacao: { type: 'string' },
          motivoSituacao: { type: 'string' },
          nomeCliente: { type: 'string' },
          nomeContato: { type: 'string' },
          telefone1: { type: 'string' },
          telefone2: { type: 'string' },
          telefone3: { type: 'string' },
          cep: { type: 'string' },
          logradouro: { type: 'string' },
          numero: { type: 'string' },
          complemento: { type: 'string' },
          bairro: { type: 'string' },
          cidade: { type: 'string' },
          estado: { type: 'string' },
          pontoDeReferencia: { type: 'string' },
          observacao: { type: 'string' },
          index: { type: 'integer' },
          horaVisita: { type: 'string' },
          turno: { type: 'string' },
        },
      },
    },
  },
};
