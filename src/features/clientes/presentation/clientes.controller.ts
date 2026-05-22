import * as restify from 'restify';
import { NotFoundError, BadRequestError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IClienteRepository } from '../domain/repositories/cliente.repository.interface';
import { GetClientesUseCase } from '../application/usecases/get-clientes.usecase';
import { GetClienteByIdUseCase } from '../application/usecases/get-cliente-by-id.usecase';
import { AddClienteUseCase } from '../application/usecases/add-cliente.usecase';
import { UpdateClienteUseCase } from '../application/usecases/update-cliente.usecase';
import { RemoveClienteUseCase } from '../application/usecases/remove-cliente.usecase';
import { ICliente } from '../domain/entities/cliente.entity';

export class ClientesController extends BaseRouter {
  private getClientes: GetClientesUseCase;
  private getClienteById: GetClienteByIdUseCase;
  private addCliente: AddClienteUseCase;
  private updateCliente: UpdateClienteUseCase;
  private removeCliente: RemoveClienteUseCase;

  constructor(clienteRepository: IClienteRepository) {
    super();
    this.getClientes = new GetClientesUseCase(clienteRepository);
    this.getClienteById = new GetClienteByIdUseCase(clienteRepository);
    this.addCliente = new AddClienteUseCase(clienteRepository);
    this.updateCliente = new UpdateClienteUseCase(clienteRepository);
    this.removeCliente = new RemoveClienteUseCase(clienteRepository);
  }

  applyRoutes(application: restify.Server): void {
    // GET /clientes — lista todos os clientes
    application.get('/clientes', async (req, res, next) => {
      try {
        const clientes = await this.getClientes.execute();
        res.json(clientes);
        return next();
      } catch (error) {
        return next(error);
      }
    });

    // GET /clientes/:id — busca cliente por id
    application.get('/clientes/:id', async (req, res, next) => {
      try {
        const cliente = await this.getClienteById.execute(req.params.id);
        this.render(res, next)(cliente);
      } catch (error) {
        return next(error);
      }
    });

    // POST /clientes — cria novo cliente
    // Retorna { id } para compatibilidade futura com o app Flutter
    application.post('/clientes', async (req, res, next) => {
      try {
        const body = req.body as Partial<ICliente>;

        if (!body.nome) {
          return next(new BadRequestError('O campo "nome" é obrigatório'));
        }

        const data: Omit<ICliente, 'id'> = {
          codigoExterno: body.codigoExterno ?? '',
          dataCadastro: body.dataCadastro ?? new Date().toISOString(),
          nome: body.nome,
          foto: body.foto ?? '',
          celular: body.celular ?? '',
          whatsapp: body.whatsapp ?? '',
          telegram: body.telegram ?? '',
          email: body.email ?? '',
          cep: body.cep ?? '',
          logradouro: body.logradouro ?? '',
          numero: body.numero ?? '',
          complemento: body.complemento ?? '',
          bairro: body.bairro ?? '',
          cidade: body.cidade ?? '',
          estado: body.estado ?? '',
          pontoDeReferencia: body.pontoDeReferencia ?? '',
          observacao: body.observacao ?? '',
        };

        const cliente = await this.addCliente.execute(data);
        res.json(201, { id: cliente.id });
        return next();
      } catch (error) {
        return next(error);
      }
    });

    // PATCH /clientes/:id — atualiza cliente parcialmente
    application.patch('/clientes/:id', async (req, res, next) => {
      try {
        const body = req.body as Partial<ICliente>;
        const cliente = await this.updateCliente.execute(req.params.id, body);
        if (!cliente) {
          return next(new NotFoundError('Cliente não encontrado'));
        }
        res.send(204);
        return next();
      } catch (error) {
        return next(error);
      }
    });

    // DELETE /clientes/:id — remove cliente
    application.del('/clientes/:id', async (req, res, next) => {
      try {
        const deleted = await this.removeCliente.execute(req.params.id);
        if (!deleted) {
          return next(new NotFoundError('Cliente não encontrado'));
        }
        res.send(204);
        return next();
      } catch (error) {
        return next(error);
      }
    });
  }
}
