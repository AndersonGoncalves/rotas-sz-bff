import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IChecklistAssistenciaAguaNaturalRepository } from '../domain/repositories/checklist-assistencia-agua-natural.repository.interface';
import { IChecklistAssistenciaAguaNatural } from '../domain/entities/checklist-assistencia-agua-natural.entity';

export class ChecklistAssistenciaAguaNaturalController extends BaseRouter {
  constructor(private readonly repo: IChecklistAssistenciaAguaNaturalRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/checklist-assistencia-agua-natural', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/checklist-assistencia-agua-natural/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/checklist-assistencia-agua-natural', async (req, res, next) => {
      try {
        const body = req.body as Partial<IChecklistAssistenciaAguaNatural>;
        if (!body.pedidoId || !body.nomeCliente || !body.numeroSerie || !body.modelo || !body.dataChecklist) {
          return next(new BadRequestError('Campos obrigatórios: pedidoId, nomeCliente, numeroSerie, modelo, dataChecklist'));
        }
        const created = await this.repo.create({
          pedidoId: body.pedidoId, codigoCliente: body.codigoCliente ?? '',
          idCliente: body.idCliente ?? '', nomeCliente: body.nomeCliente,
          numeroSerie: body.numeroSerie, modelo: body.modelo,
          trincado: body.trincado ?? false, volante: body.volante ?? false,
          adesivoDesgastado: body.adesivoDesgastado ?? false, amarelado: body.amarelado ?? false,
          torneira: body.torneira ?? false, rabicho: body.rabicho ?? false,
          maisInformacoes: body.maisInformacoes ?? '',
          descricaoDoDefeito: body.descricaoDoDefeito ?? '',
          dataChecklist: body.dataChecklist,
        });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/checklist-assistencia-agua-natural/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Checklist não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
