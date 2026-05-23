import { Server } from './src/shared/http/server';

// Clientes
import { ClientesController } from './src/features/clientes/presentation/clientes.controller';
import { ClienteMongooseRepository } from './src/features/clientes/infra/repositories/cliente.mongoose.repository';

// Checklist Assistência
import { ChecklistAssistenciaController } from './src/features/checklist-assistencia/presentation/checklist-assistencia.controller';
import { ChecklistAssistenciaMongooseRepository } from './src/features/checklist-assistencia/infra/repositories/checklist-assistencia.mongoose.repository';

// Checklist Assistência Água Natural
import { ChecklistAssistenciaAguaNaturalController } from './src/features/checklist-assistencia-agua-natural/presentation/checklist-assistencia-agua-natural.controller';
import { ChecklistAssistenciaAguaNaturalMongooseRepository } from './src/features/checklist-assistencia-agua-natural/infra/repositories/checklist-assistencia-agua-natural.mongoose.repository';

// Funcionários
import { FuncionariosController } from './src/features/funcionarios/presentation/funcionarios.controller';
import { FuncionarioMongooseRepository } from './src/features/funcionarios/infra/repositories/funcionario.mongoose.repository';

// Motivos Retorno
import { MotivosRetornoController } from './src/features/motivos-retorno/presentation/motivos-retorno.controller';
import { MotivoRetornoMongooseRepository } from './src/features/motivos-retorno/infra/repositories/motivo-retorno.mongoose.repository';

// Motivos Situação
import { MotivosSituacaoController } from './src/features/motivos-situacao/presentation/motivos-situacao.controller';
import { MotivoSituacaoMongooseRepository } from './src/features/motivos-situacao/infra/repositories/motivo-situacao.mongoose.repository';

// Pedidos
import { PedidosController } from './src/features/pedidos/presentation/pedidos.controller';
import { PedidoMongooseRepository } from './src/features/pedidos/infra/repositories/pedido.mongoose.repository';

// Pendências
import { PendenciasController } from './src/features/pendencias/presentation/pendencias.controller';
import { PendenciaMongooseRepository } from './src/features/pendencias/infra/repositories/pendencia.mongoose.repository';

// Produtos Entregue
import { ProdutosEntregueController } from './src/features/produtos-entregue/presentation/produtos-entregue.controller';
import { ProdutosEntregueMongooseRepository } from './src/features/produtos-entregue/infra/repositories/produtos-entregue.mongoose.repository';

// Produtos Recebido
import { ProdutosRecebidoController } from './src/features/produtos-recebido/presentation/produtos-recebido.controller';
import { ProdutosRecebidoMongooseRepository } from './src/features/produtos-recebido/infra/repositories/produtos-recebido.mongoose.repository';

// Produtos
import { ProdutosController } from './src/features/produtos/presentation/produtos.controller';
import { ProdutoMongooseRepository } from './src/features/produtos/infra/repositories/produto.mongoose.repository';

// Usuários
import { UsuariosController } from './src/features/usuarios/presentation/usuarios.controller';
import { UsuarioMongooseRepository } from './src/features/usuarios/infra/repositories/usuario.mongoose.repository';

// Visitas
import { VisitasController } from './src/features/visitas/presentation/visitas.controller';
import { VisitaMongooseRepository } from './src/features/visitas/infra/repositories/visita.mongoose.repository';

// Títulos
import { TitulosController } from './src/features/titulos/presentation/titulos.controller';
import { TituloMongooseRepository } from './src/features/titulos/infra/repositories/titulo.mongoose.repository';

// Composition Root — toda a injeção de dependência acontece aqui
const server = new Server();

server
  .bootstrap([    
    new ChecklistAssistenciaController(new ChecklistAssistenciaMongooseRepository()),
    new ChecklistAssistenciaAguaNaturalController(new ChecklistAssistenciaAguaNaturalMongooseRepository()),
    new FuncionariosController(new FuncionarioMongooseRepository()),
    new MotivosRetornoController(new MotivoRetornoMongooseRepository()),
    new MotivosSituacaoController(new MotivoSituacaoMongooseRepository()),
    new PedidosController(new PedidoMongooseRepository()),
    new PendenciasController(new PendenciaMongooseRepository()),
    new ProdutosEntregueController(new ProdutosEntregueMongooseRepository()),
    new ProdutosRecebidoController(new ProdutosRecebidoMongooseRepository()),    
    new VisitasController(new VisitaMongooseRepository()),
    //por enquanto sem Clientes, Produtos, Usuários e Títulos para focar no desenvolvimento das funcionalidades principais do sistema
    // new ClientesController(new ClienteMongooseRepository()),
    // new ProdutosController(new ProdutoMongooseRepository()),    
    // new UsuariosController(new UsuarioMongooseRepository()),
    // new TitulosController(new TituloMongooseRepository()),
  ])
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  });
