import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IUsuarioRepository } from '../domain/repositories/usuario.repository.interface';

export class UsuariosController extends BaseRouter {
  constructor(private readonly repo: IUsuarioRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/usuarios', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/usuarios/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/usuarios', async (req, res, next) => {
      try {
        const { funcao, codigoExterno, nome, email, password } = req.body;
        if (!funcao || !codigoExterno || !nome || !email || !password) {
          return next(new BadRequestError('Campos obrigatórios: funcao, codigoExterno, nome, email, password'));
        }
        const created = await this.repo.create({ funcao, codigoExterno, nome, email, password });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/usuarios/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Usuário não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });

    application.del('/usuarios/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id))) return next(new NotFoundError('Usuário não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
