import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IPendenciaRepository } from '../domain/repositories/pendencia.repository.interface';

export class PendenciasController extends BaseRouter {
  constructor(private readonly repo: IPendenciaRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/pendencia', async (req, res, next) => {
      try {
        const importado =
          req.query.importado !== undefined ? req.query.importado === 'true' : undefined;
        res.json(await this.repo.findAll(importado));
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.get('/pendencia/:id', async (req, res, next) => {
      try {
        this.render(res, next)(await this.repo.findById(req.params.id));
      } catch (e) {
        return next(e);
      }
    });

    application.post('/pendencia', async (req, res, next) => {
      try {
        const {
          pedidoId,
          codigoCliente,
          idCliente,
          nomeCliente,
          pendencia,
          observacao,
          idMotivoRetorno,
        } = req.body;
        if (!pedidoId || !nomeCliente || !pendencia) {
          return next(new BadRequestError('Campos obrigatórios: pedidoId, nomeCliente, pendencia'));
        }
        const created = await this.repo.create({
          pedidoId,
          codigoCliente: codigoCliente ?? '',
          idCliente: idCliente ?? '',
          nomeCliente,
          pendencia,
          observacao: observacao ?? '',
          idMotivoRetorno: idMotivoRetorno ?? null,
          importado: false,
        });
        res.json(201, { id: created.id });
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.patch('/pendencia/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Pendência não encontrada'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.del('/pendencia/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id)))
          return next(new NotFoundError('Pendência não encontrada'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });
  }
}
