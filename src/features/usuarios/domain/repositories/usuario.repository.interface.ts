import { IUsuario } from '../entities/usuario.entity';

export interface IUsuarioRepository {
  findAll(): Promise<IUsuario[]>;
  findById(id: string): Promise<IUsuario | null>;
  create(data: Omit<IUsuario, 'id'>): Promise<IUsuario>;
  update(id: string, data: Partial<IUsuario>): Promise<IUsuario | null>;
  delete(id: string): Promise<boolean>;
}
