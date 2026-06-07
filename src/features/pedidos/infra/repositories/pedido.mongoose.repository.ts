import { IPedido } from '../../domain/entities/pedido.entity';
import { IPedidoRepository } from '../../domain/repositories/pedido.repository.interface';
import { PedidoModel } from '../models/pedido.mongoose.model';

export class PedidoMongooseRepository implements IPedidoRepository {
  private toEntity(doc: any): IPedido {
    return {
      id: doc._id.toString(),
      codigoCliente: doc.codigoCliente,
      codigoExterno: doc.codigoExterno,
      idCliente: doc.idCliente,
      nomeCliente: doc.nomeCliente,
      codigoTecnico: doc.codigoTecnico,
      codigoVendedor: doc.codigoVendedor,
      nomeVendedor: doc.nomeVendedor,
      nomeTecnico: doc.nomeTecnico,
      dataRomaneio: doc.dataRomaneio,
      dataVisita: doc.dataVisita,
      pendencia: doc.pendencia,
      prazoPagamento: doc.prazoPagamento,
      situacao: doc.situacao,
      frete: doc.frete,
      acrescimo: doc.acrescimo,
      desconto: doc.desconto,
      observacao: doc.observacao,
      situacaoRomaneio: doc.situacaoRomaneio,
      tiposPagamento: doc.tiposPagamento,
      tipoVenda: doc.tipoVenda,
      tipoPedido: doc.tipoPedido,
      turno: doc.turno,
      pedidoTeste: doc.pedidoTeste,
      index: doc.index,
      cliente: doc.cliente,
      produtos: doc.produtos,
      servicos: doc.servicos,
      fotos: doc.fotos,
      assinatura: doc.assinatura,
      horaInstalacao: doc.horaInstalacao,
      lancado: doc.lancado,
      lancadoLogistica: doc.lancadoLogistica,
      lancadoComercial: doc.lancadoComercial,
      quemAssinou: doc.quemAssinou,
      transformadoEmVipzon: doc.transformadoEmVipzon,
      ordemServicoEnviada: doc.ordemServicoEnviada,
      numeroInformadoPeloTecnico: doc.numeroInformadoPeloTecnico,
      observacaoTecnico: doc.observacaoTecnico,
      enderecoCobranca: doc.enderecoCobranca,
      dadosPedidoDeCobranca: doc.dadosPedidoDeCobranca,
      importado: doc.importado,
    };
  }

  async findAll(
    month?: number,
    year?: number,
    day?: number,
    codigoTecnico?: string,
    importado?: boolean,
  ): Promise<IPedido[]> {
    const query: any = {};
    if (codigoTecnico !== undefined) {
      query.codigoTecnico = codigoTecnico;
    }
    if (importado !== undefined) {
      query.importado = importado === false ? { $ne: true } : true;
    }
    if (month !== undefined && year !== undefined) {
      const pad = (n: number) => String(n).padStart(2, '0');
      let start: string;
      let end: string;
      if (day !== undefined) {
        const d = new Date(Date.UTC(year, month - 1, day));
        const next = new Date(Date.UTC(year, month - 1, day + 1));
        start = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T00:00:00`;
        end = `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}T00:00:00`;
      } else {
        const d = new Date(Date.UTC(year, month - 1, 1));
        const next = new Date(Date.UTC(year, month, 1));
        start = `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T00:00:00`;
        end = `${next.getUTCFullYear()}-${pad(next.getUTCMonth() + 1)}-${pad(next.getUTCDate())}T00:00:00`;
      }
      query.dataRomaneio = { $gte: start, $lt: end };
    }
    const docs = await PedidoModel.find(query).sort({ dataRomaneio: -1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IPedido | null> {
    const doc = await PedidoModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  // PUT — upsert com ID fornecido pelo app (comportamento idêntico ao Firebase do Flutter)
  async upsert(id: string, data: Omit<IPedido, 'id'>): Promise<IPedido> {
    const doc = await PedidoModel.findByIdAndUpdate(
      id,
      { _id: id, ...data },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );
    return this.toEntity(doc);
  }

  async update(id: string, data: Partial<Omit<IPedido, 'id'>>): Promise<IPedido | null> {
    const doc = await PedidoModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    return (await PedidoModel.findByIdAndDelete(id)) !== null;
  }
}
