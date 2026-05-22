import * as bcrypt from 'bcrypt';
import { IUsuario } from '../../domain/entities/usuario.entity';
import { IUsuarioRepository } from '../../domain/repositories/usuario.repository.interface';
import { UsuarioModel } from '../models/usuario.mongoose.model';

export class UsuarioMongooseRepository implements IUsuarioRepository {
  private readonly SALT_ROUNDS = 10;

  private toEntity(doc: any): IUsuario {
    const obj = doc.toObject();
    return { id: obj._id.toString(), ...obj, _id: undefined };
  }

  async findAll(): Promise<IUsuario[]> {
    return (await UsuarioModel.find()).map(this.toEntity);
  }

  async findById(id: string): Promise<IUsuario | null> {
    const doc = await UsuarioModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IUsuario, 'id'>): Promise<IUsuario> {
    const hashed = await bcrypt.hash(data.password, this.SALT_ROUNDS);
    return this.toEntity(await UsuarioModel.create({ ...data, password: hashed }));
  }

  async update(id: string, data: Partial<IUsuario>): Promise<IUsuario | null> {
    if (data.password) {
      data = { ...data, password: await bcrypt.hash(data.password, this.SALT_ROUNDS) };
    }
    const doc = await UsuarioModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    return doc ? this.toEntity(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await UsuarioModel.findByIdAndDelete(id);
    return result !== null;
  }
}
