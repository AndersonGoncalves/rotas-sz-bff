import { ICliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';
import { ClienteModel } from '../models/cliente.mongoose.model';

export class ClienteMongooseRepository implements IClienteRepository {
  private toEntity(doc: any): ICliente {
    return {
      id: doc._id.toString(),
      codigoExterno: doc.codigoExterno,
      dataCadastro: doc.dataCadastro,
      nome: doc.nome,
      foto: doc.foto,
      celular: doc.celular,
      whatsapp: doc.whatsapp,
      telegram: doc.telegram,
      email: doc.email,
      cep: doc.cep,
      logradouro: doc.logradouro,
      numero: doc.numero,
      complemento: doc.complemento,
      bairro: doc.bairro,
      cidade: doc.cidade,
      estado: doc.estado,
      pontoDeReferencia: doc.pontoDeReferencia,
      observacao: doc.observacao,
    };
  }

  async findAll(): Promise<ICliente[]> {
    const docs = await ClienteModel.find().sort({ nome: 1 });
    return docs.map((doc) => this.toEntity(doc));
  }

  async findById(id: string): Promise<ICliente | null> {
    const doc = await ClienteModel.findById(id);
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async create(data: Omit<ICliente, 'id'>): Promise<ICliente> {
    const doc = new ClienteModel(data);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async update(id: string, data: Partial<Omit<ICliente, 'id'>>): Promise<ICliente | null> {
    const doc = await ClienteModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    if (!doc) return null;
    return this.toEntity(doc);
  }

  async delete(id: string): Promise<boolean> {
    const doc = await ClienteModel.findByIdAndDelete(id);
    return doc !== null;
  }
}
