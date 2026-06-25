import { IPendencia } from '../../domain/entities/pendencia.entity';
import { IPendenciaRepository } from '../../domain/repositories/pendencia.repository.interface';
import { PendenciaModel } from '../models/pendencia.mongoose.model';

export class PendenciaMongooseRepository implements IPendenciaRepository {
  private toEntity(doc: any): IPendencia {
    return {
      id: doc._id.toString(),
      pedidoId: doc.pedidoId,
      codigoCliente: doc.codigoCliente,
      idCliente: doc.idCliente,
      nomeCliente: doc.nomeCliente,
      idMotivoRetorno: doc.idMotivoRetorno,
      pendencia: doc.pendencia,
      observacao: doc.observacao,
      dataRomaneio: doc.dataRomaneio,
      importado: doc.importado,
    };
  }

  async findAll(importado?: boolean): Promise<IPendencia[]> {
    const query: any = {};
    if (importado !== undefined) {
      query.importado = importado === false ? { $ne: true } : true;
    }
    const docs = await PendenciaModel.find(query);
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IPendencia | null> {
    const doc = await PendenciaModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IPendencia, 'id'>): Promise<IPendencia> {
    const doc = new PendenciaModel(data);
    return this.toEntity(await doc.save());
  }

  async update(id: string, data: Partial<Omit<IPendencia, 'id'>>): Promise<IPendencia | null> {
    const doc = await PendenciaModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    return (await PendenciaModel.findByIdAndDelete(id)) !== null;
  }
}
