import { IProdutosEntregue } from '../../domain/entities/produtos-entregue.entity';
import { IProdutosEntregueRepository } from '../../domain/repositories/produtos-entregue.repository.interface';
import { ProdutosEntregueModel } from '../models/produtos-entregue.mongoose.model';

export class ProdutosEntregueMongooseRepository implements IProdutosEntregueRepository {
  private toEntity(doc: any): IProdutosEntregue {
    return {
      id: doc._id.toString(),
      dataRomaneio: doc.dataRomaneio,
      codigoTecnico: doc.codigoTecnico,
      importado: doc.importado,
    };
  }

  async findAll(importado?: boolean): Promise<IProdutosEntregue[]> {
    const query: any = {};
    if (importado !== undefined) {
      query.importado = importado === false ? { $ne: true } : true;
    }
    const docs = await ProdutosEntregueModel.find(query).sort({ dataRomaneio: -1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IProdutosEntregue | null> {
    const doc = await ProdutosEntregueModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IProdutosEntregue, 'id'>): Promise<IProdutosEntregue> {
    return this.toEntity(await new ProdutosEntregueModel(data).save());
  }

  async update(
    id: string,
    data: Partial<Omit<IProdutosEntregue, 'id'>>,
  ): Promise<IProdutosEntregue | null> {
    const doc = await ProdutosEntregueModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return doc ? this.toEntity(doc) : null;
  }
}
