import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { ITituloRepository } from '../domain/repositories/titulo.repository.interface';

export class TitulosController extends BaseRouter {
  constructor(private readonly repo: ITituloRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/titulos', async (req, res, next) => {
      try {
        const month = req.query.month ? parseInt(req.query.month, 10) : undefined;
        const year = req.query.year ? parseInt(req.query.year, 10) : undefined;
        res.json(await this.repo.findAll(month, year));
        return next();
      } catch (e) { return next(e); }
    });

    application.get('/titulos/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/titulos', async (req, res, next) => {
      try {
        const { tpgCodigo, centroCusto, conta, tpgNumero, tpgSequencia, dataVencimento, valorAPagar, tipoTitulo, situacaoTitulo } = req.body;
        if (!tpgCodigo || !centroCusto || !conta || !tpgNumero || tpgSequencia === undefined || !dataVencimento || valorAPagar === undefined || !tipoTitulo || !situacaoTitulo) {
          return next(new BadRequestError('Campos obrigatórios: tpgCodigo, centroCusto, conta, tpgNumero, tpgSequencia, dataVencimento, valorAPagar, tipoTitulo, situacaoTitulo'));
        }
        const created = await this.repo.create({
          tpgCodigo, centroCusto, conta, tpgNumero, tpgSequencia, dataVencimento, valorAPagar, tipoTitulo, situacaoTitulo,
          codigoCliente: req.body.codigoCliente,
          nomeCliente: req.body.nomeCliente,
          fornecedor: req.body.fornecedor,
          tpgObservacao: req.body.tpgObservacao,
        });
        res.json(201, { id: created.id, tpgCodigo: created.tpgCodigo });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/titulos/:tpgCodigo', async (req, res, next) => {
      try {
        const tpgCodigo = parseInt(req.params.tpgCodigo, 10);
        if (isNaN(tpgCodigo)) return next(new BadRequestError('tpgCodigo deve ser um número inteiro'));
        const updated = await this.repo.updateByTpgCodigo(tpgCodigo, req.body);
        if (!updated) return next(new NotFoundError('Título não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });

    application.del('/titulos/:tpgCodigo', async (req, res, next) => {
      try {
        const tpgCodigo = parseInt(req.params.tpgCodigo, 10);
        if (isNaN(tpgCodigo)) return next(new BadRequestError('tpgCodigo deve ser um número inteiro'));
        if (!(await this.repo.deleteByTpgCodigo(tpgCodigo))) return next(new NotFoundError('Título não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
