import { Server } from './src/shared/http/server';
import { ClientesController } from './src/features/clientes/presentation/clientes.controller';
import { ClienteMongooseRepository } from './src/features/clientes/infra/repositories/cliente.mongoose.repository';

// Composition Root — toda a injeção de dependência acontece aqui
const clienteRepository = new ClienteMongooseRepository();
const clientesController = new ClientesController(clienteRepository);

const server = new Server();
server
  .bootstrap([clientesController])
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  });
