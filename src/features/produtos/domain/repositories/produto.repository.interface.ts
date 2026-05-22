import { IProduto } from '../entities/produto.entity';

export interface IProdutoRepository {
  findAll(): Promise<IProduto[]>;
  findById(id: string): Promise<IProduto | null>;
  create(data: Omit<IProduto, 'id'>): Promise<IProduto>;
  update(id: string, data: Partial<IProduto>): Promise<IProduto | null>;
  delete(id: string): Promise<boolean>;
}
