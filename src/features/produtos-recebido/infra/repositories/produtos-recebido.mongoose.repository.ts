import { IProdutosRecebido } from '../../domain/entities/produtos-recebido.entity';
import { IProdutosRecebidoRepository } from '../../domain/repositories/produtos-recebido.repository.interface';
import { ProdutosRecebidoModel } from '../models/produtos-recebido.mongoose.model';

export class ProdutosRecebidoMongooseRepository implements IProdutosRecebidoRepository {
  private toEntity(doc: any): IProdutosRecebido {
    return { id: doc._id.toString(), dataRomaneio: doc.dataRomaneio, codigoTecnico: doc.codigoTecnico };
  }

  async findAll(): Promise<IProdutosRecebido[]> {
    const docs = await ProdutosRecebidoModel.find().sort({ dataRomaneio: -1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IProdutosRecebido | null> {
    const doc = await ProdutosRecebidoModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IProdutosRecebido, 'id'>): Promise<IProdutosRecebido> {
    return this.toEntity(await new ProdutosRecebidoModel(data).save());
  }

  async update(id: string, data: Partial<Omit<IProdutosRecebido, 'id'>>): Promise<IProdutosRecebido | null> {
    const doc = await ProdutosRecebidoModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return doc ? this.toEntity(doc) : null;
  }
}
