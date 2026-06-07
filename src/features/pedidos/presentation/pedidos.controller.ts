import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import { BaseRouter } from '../../../shared/router/base.router';
import { IPedidoRepository } from '../domain/repositories/pedido.repository.interface';
import { IPedido } from '../domain/entities/pedido.entity';

export class PedidosController extends BaseRouter {
  constructor(private readonly repo: IPedidoRepository) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    // GET /pedido?month=X&year=Y&day=Z&tecnico=X&importado=true
    application.get('/pedido', async (req, res, next) => {
      try {
        const month = req.query.month ? parseInt(req.query.month as string) : undefined;
        const year = req.query.year ? parseInt(req.query.year as string) : undefined;
        const day = req.query.day ? parseInt(req.query.day as string) : undefined;
        const codigoTecnico = req.query.tecnico as string | undefined;
        const importado =
          req.query.importado !== undefined ? req.query.importado === 'true' : undefined;
        res.json(await this.repo.findAll(month, year, day, codigoTecnico, importado));
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.get('/pedido/:id', async (req, res, next) => {
      try {
        this.render(res, next)(await this.repo.findById(req.params.id));
      } catch (e) {
        return next(e);
      }
    });

    // PUT /pedidos/:id — comportamento idêntico ao Firebase: o app fornece o ID
    application.put('/pedido/:id', async (req, res, next) => {
      try {
        const body = req.body as Partial<IPedido>;
        if (!body.horaInstalacao && body.horaInstalacao !== '') {
          return next(new BadRequestError('Campo "horaInstalacao" é obrigatório'));
        }
        await this.repo.upsert(req.params.id, {
          codigoCliente: body.codigoCliente ?? '',
          codigoExterno: body.codigoExterno ?? '',
          idCliente: body.idCliente ?? '',
          nomeCliente: body.nomeCliente ?? '',
          codigoTecnico: body.codigoTecnico ?? '',
          codigoVendedor: body.codigoVendedor ?? '',
          nomeVendedor: body.nomeVendedor ?? '',
          nomeTecnico: body.nomeTecnico ?? '',
          dataRomaneio: body.dataRomaneio ?? new Date().toISOString(),
          dataVisita: body.dataVisita ?? null,
          pendencia: body.pendencia ?? '',
          prazoPagamento: body.prazoPagamento ?? '',
          situacao: body.situacao ?? 0,
          frete: body.frete ?? 0,
          acrescimo: body.acrescimo ?? 0,
          desconto: body.desconto ?? 0,
          observacao: body.observacao ?? '',
          situacaoRomaneio: body.situacaoRomaneio ?? '',
          tiposPagamento: body.tiposPagamento ?? null,
          tipoVenda: body.tipoVenda ?? '',
          tipoPedido: body.tipoPedido ?? '',
          turno: body.turno ?? '',
          pedidoTeste: body.pedidoTeste ?? '0',
          index: body.index ?? 0,
          cliente: body.cliente ?? null,
          produtos: body.produtos ?? null,
          servicos: body.servicos ?? null,
          fotos: body.fotos ?? [],
          assinatura: body.assinatura ?? null,
          horaInstalacao: body.horaInstalacao ?? '',
          lancado: body.lancado ?? null,
          lancadoLogistica: body.lancadoLogistica ?? null,
          lancadoComercial: body.lancadoComercial ?? null,
          quemAssinou: body.quemAssinou ?? '',
          transformadoEmVipzon: body.transformadoEmVipzon ?? false,
          ordemServicoEnviada: body.ordemServicoEnviada ?? null,
          numeroInformadoPeloTecnico: body.numeroInformadoPeloTecnico ?? null,
          observacaoTecnico: body.observacaoTecnico ?? '',
          enderecoCobranca: body.enderecoCobranca ?? null,
          dadosPedidoDeCobranca: body.dadosPedidoDeCobranca ?? null,
        });
        res.send(200);
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.patch('/pedido/:id', async (req, res, next) => {
      try {
        const updated = await this.repo.update(req.params.id, req.body);
        if (!updated) return next(new NotFoundError('Pedido não encontrado'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });

    application.del('/pedido/:id', async (req, res, next) => {
      try {
        if (!(await this.repo.delete(req.params.id)))
          return next(new NotFoundError('Pedido não encontrado'));
        res.send(204);
        return next();
      } catch (e) {
        return next(e);
      }
    });
  }
}
