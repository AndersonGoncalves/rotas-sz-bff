import { IProduto } from '../../domain/entities/produto.entity';
import { IProdutoRepository } from '../../domain/repositories/produto.repository.interface';
import { ProdutoModel } from '../models/produto.mongoose.model';

export class ProdutoMongooseRepository implements IProdutoRepository {
  private toEntity(doc: any): IProduto {
    const obj = doc.toObject();
    return { id: obj._id.toString(), ...obj, _id: undefined };
  }

  async findAll(): Promise<IProduto[]> {
    return (await ProdutoModel.find()).map(this.toEntity);
  }

  async findById(id: string): Promise<IProduto | null> {
    const doc = await ProdutoModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IProduto, 'id'>): Promise<IProduto> {
    return this.toEntity(await ProdutoModel.create(data));
  }

  async update(id: string, data: Partial<IProduto>): Promise<IProduto | null> {
    const doc = await ProdutoModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProdutoModel.findByIdAndDelete(id);
    return result !== null;
  }
}
