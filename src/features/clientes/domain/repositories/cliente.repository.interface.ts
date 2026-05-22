import { ICliente } from '../entities/cliente.entity';

export interface IClienteRepository {
  findAll(): Promise<ICliente[]>;
  findById(id: string): Promise<ICliente | null>;
  create(data: Omit<ICliente, 'id'>): Promise<ICliente>;
  update(id: string, data: Partial<Omit<ICliente, 'id'>>): Promise<ICliente | null>;
  delete(id: string): Promise<boolean>;
}
