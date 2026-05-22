import { IVisita } from '../../domain/entities/visita.entity';
import { IVisitaRepository } from '../../domain/repositories/visita.repository.interface';
import { VisitaModel } from '../models/visita.mongoose.model';

export class VisitaMongooseRepository implements IVisitaRepository {
  private toEntity(doc: any): IVisita {
    const obj = doc.toObject();
    return { id: obj._id.toString(), ...obj, _id: undefined };
  }

  async findAll(): Promise<IVisita[]> {
    return (await VisitaModel.find()).map(this.toEntity);
  }

  async findById(id: string): Promise<IVisita | null> {
    const doc = await VisitaModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IVisita, 'id'>): Promise<IVisita> {
    return this.toEntity(await VisitaModel.create(data));
  }

  async update(id: string, data: Partial<IVisita>): Promise<IVisita | null> {
    const doc = await VisitaModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await VisitaModel.findByIdAndDelete(id);
    return result !== null;
  }
}
