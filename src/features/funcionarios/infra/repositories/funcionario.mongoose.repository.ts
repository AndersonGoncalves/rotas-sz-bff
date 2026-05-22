import { IFuncionario } from '../../domain/entities/funcionario.entity';
import { IFuncionarioRepository } from '../../domain/repositories/funcionario.repository.interface';
import { FuncionarioModel } from '../models/funcionario.mongoose.model';

export class FuncionarioMongooseRepository implements IFuncionarioRepository {
  private toEntity(doc: any): IFuncionario {
    return {
      id: doc._id.toString(),
      funcao: doc.funcao,
      codigoExterno: doc.codigoExterno,
      nome: doc.nome,
      email: doc.email,
      foto: doc.foto,
      assinatura: doc.assinatura,
    };
  }

  async findAll(): Promise<IFuncionario[]> {
    const docs = await FuncionarioModel.find().sort({ nome: 1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IFuncionario | null> {
    const doc = await FuncionarioModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IFuncionario, 'id'>): Promise<IFuncionario> {
    const doc = new FuncionarioModel(data);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async update(id: string, data: Partial<Omit<IFuncionario, 'id'>>): Promise<IFuncionario | null> {
    const doc = await FuncionarioModel.findByIdAndUpdate(id, data, { runValidators: true, new: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const doc = await FuncionarioModel.findByIdAndDelete(id);
    return doc !== null;
  }
}
