import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IMotivoSituacaoRepository } from '../domain/repositories/motivo-situacao.repository.interface';

export class MotivosSituacaoController extends BaseRouter {
  constructor(private readonly repo: IMotivoSituacaoRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/motivos-situacao', async (req, res, next) => {
      try {
        res.json(await this.repo.findAll());
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.get('/motivos-situacao/:id', async (req, res, next) => {
      try {
        this.render(res, next)(await this.repo.findById(req.params.id));
      } catch (e) {
        return next(e);
      }
    });

    application.post('/motivos-situacao', async (req, res, next) => {
      try {
        if (!req.body.descricao)
          return next(new BadRequestError('Campo "descricao" é obrigatório'));
        const created = await this.repo.create({ descricao: req.body.descricao });
        res.json(201, { id: created.id });
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.patch('/motivos-situacao/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Motivo de situação não encontrado'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.del('/motivos-situacao/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id)))
          return next(new NotFoundError('Motivo de situação não encontrado'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });
  }
}
