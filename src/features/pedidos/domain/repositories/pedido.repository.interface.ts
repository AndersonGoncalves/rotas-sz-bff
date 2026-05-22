import { IPedido } from '../entities/pedido.entity';

export interface IPedidoRepository {
  findAll(month?: number, year?: number): Promise<IPedido[]>;
  findById(id: string): Promise<IPedido | null>;
  upsert(id: string, data: Omit<IPedido, 'id'>): Promise<IPedido>;
  update(id: string, data: Partial<Omit<IPedido, 'id'>>): Promise<IPedido | null>;
  delete(id: string): Promise<boolean>;
}
