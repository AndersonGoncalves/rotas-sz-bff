import { IFuncionario } from '../entities/funcionario.entity';

export interface IFuncionarioRepository {
  findAll(): Promise<IFuncionario[]>;
  findById(id: string): Promise<IFuncionario | null>;
  create(data: Omit<IFuncionario, 'id'>): Promise<IFuncionario>;
  update(id: string, data: Partial<Omit<IFuncionario, 'id'>>): Promise<IFuncionario | null>;
  delete(id: string): Promise<boolean>;
}
