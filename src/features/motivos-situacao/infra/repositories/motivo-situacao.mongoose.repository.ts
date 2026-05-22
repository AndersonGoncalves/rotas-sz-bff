import { IMotivoSituacao } from '../../domain/entities/motivo-situacao.entity';
import { IMotivoSituacaoRepository } from '../../domain/repositories/motivo-situacao.repository.interface';
import { MotivoSituacaoModel } from '../models/motivo-situacao.mongoose.model';

export class MotivoSituacaoMongooseRepository implements IMotivoSituacaoRepository {
  private toEntity(doc: any): IMotivoSituacao {
    return { id: doc._id.toString(), descricao: doc.descricao };
  }

  async findAll(): Promise<IMotivoSituacao[]> {
    const docs = await MotivoSituacaoModel.find().sort({ descricao: 1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IMotivoSituacao | null> {
    const doc = await MotivoSituacaoModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IMotivoSituacao, 'id'>): Promise<IMotivoSituacao> {
    const doc = new MotivoSituacaoModel(data);
    return this.toEntity(await doc.save());
  }

  async update(id: string, data: Partial<Omit<IMotivoSituacao, 'id'>>): Promise<IMotivoSituacao | null> {
    const doc = await MotivoSituacaoModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    return (await MotivoSituacaoModel.findByIdAndDelete(id)) !== null;
  }
}
