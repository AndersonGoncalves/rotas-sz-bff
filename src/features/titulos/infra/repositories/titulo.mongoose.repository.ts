import { ITitulo } from '../../domain/entities/titulo.entity';
import { ITituloRepository } from '../../domain/repositories/titulo.repository.interface';
import { TituloModel } from '../models/titulo.mongoose.model';

export class TituloMongooseRepository implements ITituloRepository {
  private toEntity(doc: any): ITitulo {
    const obj = doc.toObject();
    return { id: obj._id.toString(), ...obj, _id: undefined };
  }

  async findAll(month?: number, year?: number): Promise<ITitulo[]> {
    if (month && year) {
      const start = new Date(year, month - 1, 1).toISOString().split('T')[0];
      const end = new Date(year, month, 0).toISOString().split('T')[0];
      return (await TituloModel.find({ dataVencimento: { $gte: start, $lte: end } })).map(this.toEntity);
    }
    return (await TituloModel.find()).map(this.toEntity);
  }

  async findById(id: string): Promise<ITitulo | null> {
    const doc = await TituloModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<ITitulo, 'id'>): Promise<ITitulo> {
    return this.toEntity(await TituloModel.create(data));
  }

  async updateByTpgCodigo(tpgCodigo: number, data: Partial<ITitulo>): Promise<ITitulo | null> {
    const doc = await TituloModel.findOneAndUpdate({ tpgCodigo }, data, { new: true, runValidators: true });
    return doc ? this.toEntity(doc) : null;
  }

  async deleteByTpgCodigo(tpgCodigo: number): Promise<boolean> {
    const result = await TituloModel.findOneAndDelete({ tpgCodigo });
    return result !== null;
  }
}
