import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IFuncionarioRepository } from '../domain/repositories/funcionario.repository.interface';

export class FuncionariosController extends BaseRouter {
  constructor(private readonly repo: IFuncionarioRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/funcionarios', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/funcionarios/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/funcionarios', async (req, res, next) => {
      try {
        const { funcao, nome, email, codigoExterno, assinatura } = req.body;
        if (!funcao || !nome) {
          return next(new BadRequestError('Campos obrigatórios: funcao, nome'));
        }
        const created = await this.repo.create({ funcao, nome, email, codigoExterno, assinatura });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/funcionarios/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Funcionário não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });

    application.del('/funcionarios/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id))) return next(new NotFoundError('Funcionário não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
