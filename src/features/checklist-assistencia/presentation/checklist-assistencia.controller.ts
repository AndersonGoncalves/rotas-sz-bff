import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IChecklistAssistenciaRepository } from '../domain/repositories/checklist-assistencia.repository.interface';
import { IChecklistAssistencia } from '../domain/entities/checklist-assistencia.entity';

export class ChecklistAssistenciaController extends BaseRouter {
  constructor(private readonly repo: IChecklistAssistenciaRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    application.get('/checklist-assistencia', async (req, res, next) => {
      try { res.json(await this.repo.findAll()); return next(); }
      catch (e) { return next(e); }
    });

    application.get('/checklist-assistencia/:id', async (req, res, next) => {
      try { this.render(res, next)(await this.repo.findById(req.params.id)); }
      catch (e) { return next(e); }
    });

    application.post('/checklist-assistencia', async (req, res, next) => {
      try {
        const body = req.body as Partial<IChecklistAssistencia>;
        if (!body.pedidoId || !body.nomeCliente || !body.numeroSerie || !body.modelo || !body.dataChecklist) {
          return next(new BadRequestError('Campos obrigatórios: pedidoId, nomeCliente, numeroSerie, modelo, dataChecklist'));
        }
        const created = await this.repo.create({
          pedidoId: body.pedidoId, codigoCliente: body.codigoCliente ?? '',
          idCliente: body.idCliente ?? '', nomeCliente: body.nomeCliente,
          numeroSerie: body.numeroSerie, modelo: body.modelo,
          botaoAguaGelada: body.botaoAguaGelada ?? false,
          botaoAguaGeladaFuncionando: body.botaoAguaGeladaFuncionando ?? false,
          botaoAguaNatural: body.botaoAguaNatural ?? false,
          botaoAguaNaturalFuncionando: body.botaoAguaNaturalFuncionando ?? false,
          painelSemTrinca: body.painelSemTrinca ?? false,
          painelSemViolacaoEncaixes: body.painelSemViolacaoEncaixes ?? false,
          painelComAdesivoFrontal: body.painelComAdesivoFrontal ?? false,
          painelComColoracaoAmarelado: body.painelComColoracaoAmarelado ?? false,
          torneiraPingando: body.torneiraPingando ?? false,
          torneiraComPoucoVazao: body.torneiraComPoucoVazao ?? false,
          semATorneira: body.semATorneira ?? false, comAPingadeira: body.comAPingadeira ?? false,
          pingadeiraAmassada: body.pingadeiraAmassada ?? false,
          pingadeiraSemGrade: body.pingadeiraSemGrade ?? false,
          pingadeiraArranhada: body.pingadeiraArranhada ?? false,
          gabineteComFerrugem: body.gabineteComFerrugem ?? false,
          pinturaDesgastada: body.pinturaDesgastada ?? false,
          amassadoNoGabinete: body.amassadoNoGabinete ?? false,
          gabineteComCaixaEletrica: body.gabineteComCaixaEletrica ?? false,
          ausenciaFiltroCompartimento: body.ausenciaFiltroCompartimento ?? false,
          ausenciaTampaCompartimento: body.ausenciaTampaCompartimento ?? false,
          ausenciaEngate: body.ausenciaEngate ?? false,
          violacaoEncaixeCompartimento: body.violacaoEncaixeCompartimento ?? false,
          contemTodosPedais: body.contemTodosPedais ?? false,
          condensadorSemArranhoes: body.condensadorSemArranhoes ?? false,
          condensadorSemAmassado: body.condensadorSemAmassado ?? false,
          condensadorSemFerrugem: body.condensadorSemFerrugem ?? false,
          compressorSemBarulho: body.compressorSemBarulho ?? false,
          caboCortado: body.caboCortado ?? false, plugMachoTrocado: body.plugMachoTrocado ?? false,
          caboResecado: body.caboResecado ?? false,
          maisInformacoes: body.maisInformacoes ?? '',
          descricaoDoDefeito: body.descricaoDoDefeito ?? '',
          dataChecklist: body.dataChecklist,
        });
        res.json(201, { id: created.id });
        return next();
      } catch (e) { return next(e); }
    });

    application.patch('/checklist-assistencia/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Checklist não encontrado'));
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
