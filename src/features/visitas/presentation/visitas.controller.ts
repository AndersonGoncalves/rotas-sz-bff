import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IVisitaRepository } from '../domain/repositories/visita.repository.interface';

export class VisitasController extends BaseRouter {
  constructor(private readonly repo: IVisitaRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/visitas', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/visitas/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/visitas', async (req, res, next) => {
      try {
        const { dataVisita, codigoVendedor, nomeVendedor, codigoVisitante, nomeVisitante, situacao, horaVisita, turno } = req.body;
        if (!dataVisita || !codigoVendedor || !nomeVendedor || !codigoVisitante || !nomeVisitante || !situacao || !horaVisita || !turno) {
          return next(new BadRequestError('Campos obrigatórios: dataVisita, codigoVendedor, nomeVendedor, codigoVisitante, nomeVisitante, situacao, horaVisita, turno'));
        }
        const created = await this.repo.create({
          dataVisita, codigoVendedor, nomeVendedor, codigoVisitante, nomeVisitante, situacao, horaVisita, turno,
          motivoSituacao: req.body.motivoSituacao,
          nomeCliente: req.body.nomeCliente,
          nomeContato: req.body.nomeContato,
          telefone1: req.body.telefone1,
          telefone2: req.body.telefone2,
          telefone3: req.body.telefone3,
          cep: req.body.cep,
          logradouro: req.body.logradouro,
          numero: req.body.numero,
          complemento: req.body.complemento,
          bairro: req.body.bairro,
          cidade: req.body.cidade,
          estado: req.body.estado,
          pontoDeReferencia: req.body.pontoDeReferencia,
          observacao: req.body.observacao,
          index: req.body.index,
        });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/visitas/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Visita não encontrada'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });

    application.del('/visitas/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id))) return next(new NotFoundError('Visita não encontrada'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
