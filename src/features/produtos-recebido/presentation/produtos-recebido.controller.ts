import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IProdutosRecebidoRepository } from '../domain/repositories/produtos-recebido.repository.interface';

export class ProdutosRecebidoController extends BaseRouter {
  constructor(private readonly repo: IProdutosRecebidoRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/produtos_recebido', async (req, res, next) => {
      try {
        const importado =
          req.query.importado !== undefined ? req.query.importado === 'true' : undefined;
        res.json(await this.repo.findAll(importado));
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.get('/produtos_recebido/:id', async (req, res, next) => {
      try {
        this.render(res, next)(await this.repo.findById(req.params.id));
      } catch (e) {
        return next(e);
      }
    });

    application.post('/produtos_recebido', async (req, res, next) => {
      try {
        const { dataRomaneio, codigoTecnico } = req.body;
        if (!dataRomaneio || !codigoTecnico) {
          return next(new BadRequestError('Campos obrigatórios: dataRomaneio, codigoTecnico'));
        }
        const created = await this.repo.create({ dataRomaneio, codigoTecnico });
        res.json(201, { id: created.id });
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.patch('/produtos_recebido/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Produtos recebido não encontrado'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });
  }
}
