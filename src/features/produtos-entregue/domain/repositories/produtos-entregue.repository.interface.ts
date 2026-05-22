import { IProdutosEntregue } from '../entities/produtos-entregue.entity';

export interface IProdutosEntregueRepository {
  findAll(): Promise<IProdutosEntregue[]>;
  findById(id: string): Promise<IProdutosEntregue | null>;
  create(data: Omit<IProdutosEntregue, 'id'>): Promise<IProdutosEntregue>;
  update(id: string, data: Partial<Omit<IProdutosEntregue, 'id'>>): Promise<IProdutosEntregue | null>;
}
