import { IMotivoRetorno } from '../../domain/entities/motivo-retorno.entity';
import { IMotivoRetornoRepository } from '../../domain/repositories/motivo-retorno.repository.interface';
import { MotivoRetornoModel } from '../models/motivo-retorno.mongoose.model';

export class MotivoRetornoMongooseRepository implements IMotivoRetornoRepository {
  private toEntity(doc: any): IMotivoRetorno {
    return { id: doc._id.toString(), descricao: doc.descricao };
  }

  async findAll(): Promise<IMotivoRetorno[]> {
    const docs = await MotivoRetornoModel.find().sort({ descricao: 1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IMotivoRetorno | null> {
    const doc = await MotivoRetornoModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IMotivoRetorno, 'id'>): Promise<IMotivoRetorno> {
    const doc = new MotivoRetornoModel(data);
    return this.toEntity(await doc.save());
  }

  async update(id: string, data: Partial<Omit<IMotivoRetorno, 'id'>>): Promise<IMotivoRetorno | null> {
    const doc = await MotivoRetornoModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    return (await MotivoRetornoModel.findByIdAndDelete(id)) !== null;
  }
}
