import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IProdutoRepository } from '../domain/repositories/produto.repository.interface';

export class ProdutosController extends BaseRouter {
  constructor(private readonly repo: IProdutoRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/produtos', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/produtos/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/produtos', async (req, res, next) => {
      try {
        const { dataCadastro, nome, quantidadeEmEstoque, precoDeCusto, precoDeVenda } = req.body;
        if (!dataCadastro || !nome || quantidadeEmEstoque === undefined || precoDeCusto === undefined || precoDeVenda === undefined) {
          return next(new BadRequestError('Campos obrigatórios: dataCadastro, nome, quantidadeEmEstoque, precoDeCusto, precoDeVenda'));
        }
        const created = await this.repo.create({
          dataCadastro,
          nome,
          quantidadeEmEstoque,
          precoDeCusto,
          precoDeVenda,
          unidadeMedida: req.body.unidadeMedida ?? 'Un',
          codigoBarras: req.body.codigoBarras,
          codigoExterno: req.body.codigoExterno,
          referencia: req.body.referencia,
          descricao: req.body.descricao,
          marca: req.body.marca,
          categoria: req.body.categoria,
          ncm: req.body.ncm,
          localNoDeposito: req.body.localNoDeposito,
          fotos: req.body.fotos ?? [],
        });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/produtos/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Produto não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });

    application.del('/produtos/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id))) return next(new NotFoundError('Produto não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
